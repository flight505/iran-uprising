// Signal Protocol Client
// Handles key generation, session establishment, and message encryption/decryption

import { browser } from '$app/environment';
import { SignalProtocolStore, clearSignalData } from './signal-store.js';

// Types for Signal Protocol
interface KeyPair {
	pubKey: ArrayBuffer;
	privKey: ArrayBuffer;
}

interface SignedKeyPair extends KeyPair {
	signature: ArrayBuffer;
	keyId: number;
}

interface PreKeyBundle {
	registrationId: number;
	identityKey: ArrayBuffer;
	signedPreKey: {
		keyId: number;
		publicKey: ArrayBuffer;
		signature: ArrayBuffer;
	};
	preKey?: {
		keyId: number;
		publicKey: ArrayBuffer;
	};
}

interface EncryptedMessage {
	type: number; // 1 = PreKeyWhisperMessage, 3 = WhisperMessage
	body: string;
	registrationId: number;
}

// Signal Protocol library (loaded dynamically)
let libsignal: typeof import('libsignal-protocol') | null = null;

// Initialize the Signal Protocol library
async function getLibsignal() {
	if (libsignal) return libsignal;
	if (!browser) throw new Error('Signal Protocol requires browser environment');

	// Dynamic import for browser-only loading
	libsignal = await import('libsignal-protocol');
	return libsignal;
}

// Store instance
const store = new SignalProtocolStore();

// Generate a new identity (registration)
export async function generateIdentity(): Promise<{
	registrationId: number;
	identityKeyPair: KeyPair;
}> {
	const signal = await getLibsignal();

	// Generate registration ID (random 14-bit number)
	const registrationId = signal.KeyHelper.generateRegistrationId();

	// Generate identity key pair
	const identityKeyPair = await signal.KeyHelper.generateIdentityKeyPair();

	// Store locally
	await store.saveLocalRegistrationId(registrationId);
	await store.saveIdentityKeyPair(identityKeyPair);

	return { registrationId, identityKeyPair };
}

// Generate pre-keys for key exchange
export async function generatePreKeys(
	startId: number,
	count: number
): Promise<Array<{ keyId: number; keyPair: KeyPair }>> {
	const signal = await getLibsignal();
	const preKeys: Array<{ keyId: number; keyPair: KeyPair }> = [];

	for (let i = 0; i < count; i++) {
		const keyId = startId + i;
		const keyPair = await signal.KeyHelper.generatePreKey(keyId);
		await store.storePreKey(keyId, keyPair.keyPair);
		preKeys.push({ keyId, keyPair: keyPair.keyPair });
	}

	return preKeys;
}

// Generate signed pre-key
export async function generateSignedPreKey(
	identityKeyPair: KeyPair,
	signedKeyId: number
): Promise<SignedKeyPair> {
	const signal = await getLibsignal();

	const signedPreKey = await signal.KeyHelper.generateSignedPreKey(identityKeyPair, signedKeyId);
	await store.storeSignedPreKey(signedKeyId, signedPreKey.keyPair);

	return {
		...signedPreKey.keyPair,
		signature: signedPreKey.signature,
		keyId: signedKeyId
	};
}

// Get local key bundle for sharing with others
export async function getLocalKeyBundle(): Promise<PreKeyBundle | null> {
	const registrationId = await store.getLocalRegistrationId();
	const identityKeyPair = await store.getIdentityKeyPair();

	if (!registrationId || !identityKeyPair) {
		return null;
	}

	// Get the latest signed pre-key (assuming keyId 1)
	const signedPreKey = await store.loadSignedPreKey(1);
	if (!signedPreKey) {
		return null;
	}

	// Get a one-time pre-key (assuming keyId 1)
	const preKey = await store.loadPreKey(1);

	return {
		registrationId,
		identityKey: identityKeyPair.pubKey,
		signedPreKey: {
			keyId: 1,
			publicKey: signedPreKey.pubKey,
			signature: new ArrayBuffer(64) // Would be the actual signature
		},
		preKey: preKey
			? {
					keyId: 1,
					publicKey: preKey.pubKey
				}
			: undefined
	};
}

// Establish a session with another user using their key bundle
export async function establishSession(
	recipientId: string,
	recipientBundle: PreKeyBundle
): Promise<void> {
	const signal = await getLibsignal();

	const address = new signal.SignalProtocolAddress(recipientId, 1);
	const sessionBuilder = new signal.SessionBuilder(store, address);

	await sessionBuilder.processPreKey({
		registrationId: recipientBundle.registrationId,
		identityKey: recipientBundle.identityKey,
		signedPreKey: {
			keyId: recipientBundle.signedPreKey.keyId,
			publicKey: recipientBundle.signedPreKey.publicKey,
			signature: recipientBundle.signedPreKey.signature
		},
		preKey: recipientBundle.preKey
	});
}

// Encrypt a message for a recipient
export async function encryptMessage(
	recipientId: string,
	plaintext: string
): Promise<EncryptedMessage> {
	const signal = await getLibsignal();

	const address = new signal.SignalProtocolAddress(recipientId, 1);
	const sessionCipher = new signal.SessionCipher(store, address);

	// Convert plaintext to ArrayBuffer
	const encoder = new TextEncoder();
	const plaintextBuffer = encoder.encode(plaintext);

	// Encrypt
	const ciphertext = await sessionCipher.encrypt(plaintextBuffer.buffer);

	const registrationId = (await store.getLocalRegistrationId()) || 0;

	return {
		type: ciphertext.type,
		body: ciphertext.body,
		registrationId
	};
}

// Decrypt a message from a sender
export async function decryptMessage(
	senderId: string,
	encryptedMessage: EncryptedMessage
): Promise<string> {
	const signal = await getLibsignal();

	const address = new signal.SignalProtocolAddress(senderId, 1);
	const sessionCipher = new signal.SessionCipher(store, address);

	let plaintextBuffer: ArrayBuffer;

	if (encryptedMessage.type === 3) {
		// PreKeyWhisperMessage (first message in a new session)
		plaintextBuffer = await sessionCipher.decryptPreKeyWhisperMessage(
			encryptedMessage.body,
			'binary'
		);
	} else {
		// WhisperMessage (subsequent messages)
		plaintextBuffer = await sessionCipher.decryptWhisperMessage(encryptedMessage.body, 'binary');
	}

	// Convert ArrayBuffer to string
	const decoder = new TextDecoder();
	return decoder.decode(plaintextBuffer);
}

// Check if we have an active session with a user
export async function hasSession(userId: string): Promise<boolean> {
	const session = await store.loadSession(`${userId}.1`);
	return session !== undefined;
}

// Initialize or load existing identity
export async function initializeSignalProtocol(): Promise<{
	isNew: boolean;
	registrationId: number;
}> {
	// Check if we already have an identity
	const existingId = await store.getLocalRegistrationId();
	const existingKey = await store.getIdentityKeyPair();

	if (existingId && existingKey) {
		return { isNew: false, registrationId: existingId };
	}

	// Generate new identity
	const { registrationId, identityKeyPair } = await generateIdentity();

	// Generate initial pre-keys
	await generatePreKeys(1, 100);

	// Generate signed pre-key
	await generateSignedPreKey(identityKeyPair, 1);

	return { isNew: true, registrationId };
}

// Clear all encryption data (for privacy/logout)
export { clearSignalData };

// Utility: Convert ArrayBuffer to base64
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer);
	let binary = '';
	for (let i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

// Utility: Convert base64 to ArrayBuffer
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes.buffer;
}
