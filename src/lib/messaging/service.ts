// Secure Messaging Service
// E2E encrypted messaging using Signal Protocol

import { browser } from '$app/environment';
import {
	initializeSignalProtocol,
	getLocalKeyBundle,
	establishSession,
	encryptMessage,
	decryptMessage,
	hasSession,
	arrayBufferToBase64,
	base64ToArrayBuffer
} from '$lib/crypto/index.js';

// Message types
export interface SecureMessage {
	id: string;
	threadHash: string;
	senderHash: string;
	ciphertext: string;
	messageType: number;
	timestamp: string;
	expiresAt: string;
}

export interface DecryptedMessage {
	id: string;
	threadHash: string;
	senderHash: string;
	plaintext: string;
	timestamp: string;
	expiresAt: string;
}

export interface KeyBundle {
	registrationId: number;
	identityKey: string; // base64
	signedPreKey: {
		keyId: number;
		publicKey: string; // base64
		signature: string; // base64
	};
	preKey?: {
		keyId: number;
		publicKey: string; // base64
	};
}

// API base URL
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Generate nonce for API requests
function generateNonce(): string {
	if (browser && crypto.getRandomValues) {
		const bytes = new Uint8Array(32);
		crypto.getRandomValues(bytes);
		return Array.from(bytes)
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('');
	}
	return '0'.repeat(64);
}

// API request helper
async function apiRequest<T>(action: string, payload?: Record<string, unknown>): Promise<T> {
	const response = await fetch(`${API_BASE}/api`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			nonce: generateNonce(),
			action,
			payload
		})
	});

	if (!response.ok) {
		throw new Error(`API request failed: ${response.status}`);
	}

	const data = await response.json();
	if (!data.success) {
		throw new Error(data.error || 'Request failed');
	}

	return data.data as T;
}

// Initialize messaging (call on app start)
export async function initializeMessaging(): Promise<{ isNew: boolean }> {
	if (!browser) return { isNew: false };

	const result = await initializeSignalProtocol();

	if (result.isNew) {
		// Register our key bundle with the server
		const bundle = await getLocalKeyBundle();
		if (bundle) {
			await registerKeyBundle(bundle);
		}
	}

	return { isNew: result.isNew };
}

// Register our key bundle with the server
async function registerKeyBundle(bundle: {
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
}): Promise<void> {
	const keyBundle: KeyBundle = {
		registrationId: bundle.registrationId,
		identityKey: arrayBufferToBase64(bundle.identityKey),
		signedPreKey: {
			keyId: bundle.signedPreKey.keyId,
			publicKey: arrayBufferToBase64(bundle.signedPreKey.publicKey),
			signature: arrayBufferToBase64(bundle.signedPreKey.signature)
		}
	};

	if (bundle.preKey) {
		keyBundle.preKey = {
			keyId: bundle.preKey.keyId,
			publicKey: arrayBufferToBase64(bundle.preKey.publicKey)
		};
	}

	await apiRequest('register_keys', { bundle: keyBundle });
}

// Fetch another user's key bundle
export async function fetchKeyBundle(userHash: string): Promise<KeyBundle | null> {
	try {
		const result = await apiRequest<{ bundle: KeyBundle | null }>('get_keys', { hash: userHash });
		return result.bundle;
	} catch {
		return null;
	}
}

// Establish secure session with another user
export async function establishSecureSession(userHash: string): Promise<boolean> {
	// Check if we already have a session
	if (await hasSession(userHash)) {
		return true;
	}

	// Fetch their key bundle
	const bundle = await fetchKeyBundle(userHash);
	if (!bundle) {
		return false;
	}

	// Convert base64 keys back to ArrayBuffers
	const keyBundle = {
		registrationId: bundle.registrationId,
		identityKey: base64ToArrayBuffer(bundle.identityKey),
		signedPreKey: {
			keyId: bundle.signedPreKey.keyId,
			publicKey: base64ToArrayBuffer(bundle.signedPreKey.publicKey),
			signature: base64ToArrayBuffer(bundle.signedPreKey.signature)
		},
		preKey: bundle.preKey
			? {
					keyId: bundle.preKey.keyId,
					publicKey: base64ToArrayBuffer(bundle.preKey.publicKey)
				}
			: undefined
	};

	// Establish session
	await establishSession(userHash, keyBundle);
	return true;
}

// Send an encrypted message
export async function sendSecureMessage(
	threadHash: string,
	recipientHash: string,
	plaintext: string,
	expiresInDays: number = 30
): Promise<string> {
	// Ensure we have a session
	const hasActiveSession = await establishSecureSession(recipientHash);
	if (!hasActiveSession) {
		throw new Error('Could not establish secure session');
	}

	// Encrypt the message
	const encrypted = await encryptMessage(recipientHash, plaintext);

	// Calculate expiration
	const expiresAt = new Date();
	expiresAt.setDate(expiresAt.getDate() + expiresInDays);

	// Send to server
	const result = await apiRequest<{ hash: string }>('post_message', {
		thread_hash: threadHash,
		ciphertext: encrypted.body,
		message_type: encrypted.type,
		expires_at: expiresAt.toISOString().split('T')[0]
	});

	return result.hash;
}

// Receive and decrypt messages
export async function receiveMessages(threadHash: string): Promise<DecryptedMessage[]> {
	const result = await apiRequest<{ messages: SecureMessage[] }>('get_messages', {
		thread_hash: threadHash
	});

	const decrypted: DecryptedMessage[] = [];

	for (const msg of result.messages) {
		try {
			const plaintext = await decryptMessage(msg.senderHash, {
				type: msg.messageType,
				body: msg.ciphertext,
				registrationId: 0
			});

			decrypted.push({
				id: msg.id,
				threadHash: msg.threadHash,
				senderHash: msg.senderHash,
				plaintext,
				timestamp: msg.timestamp,
				expiresAt: msg.expiresAt
			});
		} catch (err) {
			console.error('Failed to decrypt message:', err);
			// Skip messages we can't decrypt
		}
	}

	return decrypted;
}

// Create a new thread
export async function createThread(options: {
	type: 'open' | 'private' | 'memorial';
	title?: string;
	memorialHash?: string;
}): Promise<string> {
	const result = await apiRequest<{ hash: string }>('create_thread', options);
	return result.hash;
}

// Get threads
export async function getThreads(options?: {
	type?: 'open' | 'private' | 'memorial';
	memorialHash?: string;
}): Promise<
	Array<{
		hash: string;
		type: string;
		title?: string;
		messageCount: number;
		createdDay: string;
	}>
> {
	const result = await apiRequest<{
		threads: Array<{
			hash: string;
			type: string;
			title?: string;
			message_count: number;
			created_day: string;
		}>;
	}>('get_threads', options);

	return result.threads.map((t) => ({
		hash: t.hash,
		type: t.type,
		title: t.title,
		messageCount: t.message_count,
		createdDay: t.created_day
	}));
}
