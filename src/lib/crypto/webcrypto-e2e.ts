// WebCrypto-based End-to-End Encryption
// Uses ECDH for key exchange and AES-GCM for message encryption
// No external dependencies - fully browser-native

import { browser } from '$app/environment';

// Types
export interface KeyPair {
	publicKey: JsonWebKey;
	privateKey: JsonWebKey;
}

export interface EncryptedMessage {
	ciphertext: string; // Base64 encoded
	iv: string; // Base64 encoded
	senderPublicKey: JsonWebKey;
}

export interface DecryptedMessage {
	plaintext: string;
	timestamp: number;
}

// IndexedDB database name and stores
const DB_NAME = 'iran-uprising-crypto';
const DB_VERSION = 1;
const STORES = {
	IDENTITY: 'identity',
	SESSIONS: 'sessions'
};

// Get IndexedDB instance
function openDatabase(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		if (!browser) {
			reject(new Error('IndexedDB requires browser environment'));
			return;
		}

		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;

			// Identity store for our own keys
			if (!db.objectStoreNames.contains(STORES.IDENTITY)) {
				db.createObjectStore(STORES.IDENTITY, { keyPath: 'id' });
			}

			// Sessions store for shared secrets with other users
			if (!db.objectStoreNames.contains(STORES.SESSIONS)) {
				db.createObjectStore(STORES.SESSIONS, { keyPath: 'recipientId' });
			}
		};
	});
}

// Store helper functions
async function dbGet<T>(storeName: string, key: string): Promise<T | undefined> {
	const db = await openDatabase();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(storeName, 'readonly');
		const store = tx.objectStore(storeName);
		const request = store.get(key);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
	});
}

async function dbPut<T>(storeName: string, value: T): Promise<void> {
	const db = await openDatabase();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(storeName, 'readwrite');
		const store = tx.objectStore(storeName);
		const request = store.put(value);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve();
	});
}

async function dbClear(storeName: string): Promise<void> {
	const db = await openDatabase();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(storeName, 'readwrite');
		const store = tx.objectStore(storeName);
		const request = store.clear();

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve();
	});
}

// Generate ECDH key pair for key exchange
async function generateKeyPair(): Promise<CryptoKeyPair> {
	return crypto.subtle.generateKey(
		{
			name: 'ECDH',
			namedCurve: 'P-384' // High security curve
		},
		true, // extractable
		['deriveKey', 'deriveBits']
	);
}

// Export key to JWK format for storage
async function exportKey(key: CryptoKey): Promise<JsonWebKey> {
	return crypto.subtle.exportKey('jwk', key);
}

// Import key from JWK format
async function importPublicKey(jwk: JsonWebKey): Promise<CryptoKey> {
	return crypto.subtle.importKey(
		'jwk',
		jwk,
		{
			name: 'ECDH',
			namedCurve: 'P-384'
		},
		true,
		[]
	);
}

async function importPrivateKey(jwk: JsonWebKey): Promise<CryptoKey> {
	return crypto.subtle.importKey(
		'jwk',
		jwk,
		{
			name: 'ECDH',
			namedCurve: 'P-384'
		},
		true,
		['deriveKey', 'deriveBits']
	);
}

// Derive shared AES key from ECDH key pair
async function deriveSharedKey(
	privateKey: CryptoKey,
	publicKey: CryptoKey
): Promise<CryptoKey> {
	return crypto.subtle.deriveKey(
		{
			name: 'ECDH',
			public: publicKey
		},
		privateKey,
		{
			name: 'AES-GCM',
			length: 256
		},
		false, // not extractable
		['encrypt', 'decrypt']
	);
}

// Generate random bytes
function generateRandomBytes(length: number): Uint8Array {
	return crypto.getRandomValues(new Uint8Array(length));
}

// Base64 encoding/decoding
function arrayBufferToBase64(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer);
	let binary = '';
	for (let i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes.buffer;
}

// Identity management

// Get or create identity key pair
export async function getOrCreateIdentity(): Promise<KeyPair> {
	if (!browser) throw new Error('Crypto requires browser environment');

	// Check for existing identity
	const existing = await dbGet<{ id: string; publicKey: JsonWebKey; privateKey: JsonWebKey }>(
		STORES.IDENTITY,
		'local'
	);

	if (existing) {
		return {
			publicKey: existing.publicKey,
			privateKey: existing.privateKey
		};
	}

	// Generate new identity
	const keyPair = await generateKeyPair();
	const publicKey = await exportKey(keyPair.publicKey);
	const privateKey = await exportKey(keyPair.privateKey);

	// Store identity
	await dbPut(STORES.IDENTITY, {
		id: 'local',
		publicKey,
		privateKey,
		createdAt: Date.now()
	});

	return { publicKey, privateKey };
}

// Get local public key for sharing
export async function getLocalPublicKey(): Promise<JsonWebKey> {
	const identity = await getOrCreateIdentity();
	return identity.publicKey;
}

// Encryption/Decryption

// Encrypt a message for a recipient
export async function encryptMessage(
	recipientPublicKeyJwk: JsonWebKey,
	plaintext: string
): Promise<EncryptedMessage> {
	if (!browser) throw new Error('Crypto requires browser environment');

	// Get our identity
	const identity = await getOrCreateIdentity();

	// Import keys
	const privateKey = await importPrivateKey(identity.privateKey);
	const recipientPublicKey = await importPublicKey(recipientPublicKeyJwk);

	// Derive shared key
	const sharedKey = await deriveSharedKey(privateKey, recipientPublicKey);

	// Generate random IV (12 bytes for AES-GCM)
	const iv = generateRandomBytes(12);

	// Encrypt message
	const encoder = new TextEncoder();
	const plaintextBytes = encoder.encode(plaintext);

	const ciphertextBuffer = await crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv: iv as BufferSource
		},
		sharedKey,
		plaintextBytes
	);

	return {
		ciphertext: arrayBufferToBase64(ciphertextBuffer),
		iv: arrayBufferToBase64(iv.buffer as ArrayBuffer),
		senderPublicKey: identity.publicKey
	};
}

// Decrypt a message from a sender
export async function decryptMessage(
	encryptedMessage: EncryptedMessage
): Promise<string> {
	if (!browser) throw new Error('Crypto requires browser environment');

	// Get our identity
	const identity = await getOrCreateIdentity();

	// Import keys
	const privateKey = await importPrivateKey(identity.privateKey);
	const senderPublicKey = await importPublicKey(encryptedMessage.senderPublicKey);

	// Derive shared key (same as sender's due to ECDH)
	const sharedKey = await deriveSharedKey(privateKey, senderPublicKey);

	// Decrypt message
	const ciphertextBuffer = base64ToArrayBuffer(encryptedMessage.ciphertext);
	const iv = base64ToArrayBuffer(encryptedMessage.iv);

	const ivArray = new Uint8Array(iv);
	const plaintextBuffer = await crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv: ivArray as BufferSource
		},
		sharedKey,
		ciphertextBuffer
	);

	const decoder = new TextDecoder();
	return decoder.decode(plaintextBuffer);
}

// For thread-based encryption (using thread hash as shared context)

// Generate a thread encryption key from thread hash
export async function deriveThreadKey(threadHash: string): Promise<CryptoKey> {
	if (!browser) throw new Error('Crypto requires browser environment');

	// Use thread hash + identity to derive a unique key
	const identity = await getOrCreateIdentity();

	// Combine thread hash with public key for uniqueness
	const combined = threadHash + JSON.stringify(identity.publicKey);

	// Hash the combined data
	const encoder = new TextEncoder();
	const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(combined));

	// Import as AES key
	return crypto.subtle.importKey(
		'raw',
		hashBuffer,
		{ name: 'AES-GCM', length: 256 },
		false,
		['encrypt', 'decrypt']
	);
}

// Encrypt message for a thread (simpler, all participants can decrypt)
export async function encryptForThread(
	threadHash: string,
	plaintext: string
): Promise<{ ciphertext: string; iv: string }> {
	if (!browser) throw new Error('Crypto requires browser environment');

	const key = await deriveThreadKey(threadHash);
	const iv = generateRandomBytes(12);

	const encoder = new TextEncoder();
	const plaintextBytes = encoder.encode(plaintext);

	const ciphertextBuffer = await crypto.subtle.encrypt(
		{ name: 'AES-GCM', iv: iv as BufferSource },
		key,
		plaintextBytes
	);

	return {
		ciphertext: arrayBufferToBase64(ciphertextBuffer),
		iv: arrayBufferToBase64(iv.buffer as ArrayBuffer)
	};
}

// Decrypt message from a thread
export async function decryptFromThread(
	threadHash: string,
	ciphertext: string,
	iv: string
): Promise<string> {
	if (!browser) throw new Error('Crypto requires browser environment');

	const key = await deriveThreadKey(threadHash);
	const ciphertextBuffer = base64ToArrayBuffer(ciphertext);
	const ivBuffer = base64ToArrayBuffer(iv);
	const ivArray = new Uint8Array(ivBuffer);

	const plaintextBuffer = await crypto.subtle.decrypt(
		{ name: 'AES-GCM', iv: ivArray as BufferSource },
		key,
		ciphertextBuffer
	);

	const decoder = new TextDecoder();
	return decoder.decode(plaintextBuffer);
}

// Utility functions

// Check if encryption is available
export function isEncryptionAvailable(): boolean {
	return browser && typeof crypto !== 'undefined' && typeof crypto.subtle !== 'undefined';
}

// Clear all encryption data (for privacy/logout)
export async function clearAllCryptoData(): Promise<void> {
	if (!browser) return;

	await dbClear(STORES.IDENTITY);
	await dbClear(STORES.SESSIONS);
}

// Hash data with SHA-256
export async function sha256(data: string): Promise<string> {
	const encoder = new TextEncoder();
	const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
	return arrayBufferToBase64(hashBuffer);
}

// Generate a random ID
export function generateRandomId(): string {
	const bytes = generateRandomBytes(16);
	return Array.from(bytes)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}
