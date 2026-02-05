// Secure Messaging Service
// E2E encrypted messaging using WebCrypto (ECDH + AES-GCM)

import { browser } from '$app/environment';
import {
	getOrCreateIdentity,
	encryptForThread,
	decryptFromThread,
	isEncryptionAvailable,
	clearAllCryptoData
} from '$lib/crypto/index.js';

// Message types
export interface SecureMessage {
	hash: string;
	threadHash: string;
	ciphertext: string;
	iv: string;
	timestampDay: string;
	expiresAt: string;
}

export interface DecryptedMessage {
	id: string;
	threadHash: string;
	plaintext: string;
	timestamp: string;
	expiresAt: string;
}

export interface Thread {
	hash: string;
	type: 'open' | 'private' | 'memorial';
	title?: string;
	messageCount: number;
	createdDay: string;
	expiresAt: string;
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

	if (!isEncryptionAvailable()) {
		throw new Error('WebCrypto not available');
	}

	// Get or create identity (generates keys if needed)
	const identity = await getOrCreateIdentity();

	// Check if this is a new identity by looking at the created timestamp
	// For simplicity, we'll just return false - identity is created once
	return { isNew: identity.publicKey !== null };
}

// Send an encrypted message to a thread
export async function sendSecureMessage(
	threadHash: string,
	_recipientHash: string, // Kept for API compatibility but using thread-based encryption
	plaintext: string,
	expiresInDays: number = 30
): Promise<string> {
	if (!browser) throw new Error('Messaging requires browser');

	// Encrypt the message for the thread
	const encrypted = await encryptForThread(threadHash, plaintext);

	// Calculate expiration
	const expiresAt = new Date();
	expiresAt.setDate(expiresAt.getDate() + expiresInDays);

	// Send to server
	const result = await apiRequest<{ hash: string }>('post_message', {
		thread_hash: threadHash,
		ciphertext: JSON.stringify({
			ct: encrypted.ciphertext,
			iv: encrypted.iv
		}),
		expires_at: expiresAt.toISOString().split('T')[0]
	});

	return result.hash;
}

// Receive and decrypt messages from a thread
export async function receiveMessages(threadHash: string): Promise<DecryptedMessage[]> {
	const result = await apiRequest<{
		messages: Array<{
			hash: string;
			thread_hash: string;
			ciphertext: string;
			timestamp_day: string;
			expires_at: string;
		}>;
	}>('get_messages', {
		thread_hash: threadHash
	});

	const decrypted: DecryptedMessage[] = [];

	for (const msg of result.messages) {
		try {
			// Parse the encrypted payload
			let ciphertext: string;
			let iv: string;

			try {
				const parsed = JSON.parse(msg.ciphertext);
				ciphertext = parsed.ct;
				iv = parsed.iv;
			} catch {
				// If not JSON, skip (old format or invalid)
				console.warn('Skipping message with invalid format');
				continue;
			}

			// Decrypt the message
			const plaintext = await decryptFromThread(threadHash, ciphertext, iv);

			decrypted.push({
				id: msg.hash,
				threadHash: msg.thread_hash,
				plaintext,
				timestamp: msg.timestamp_day,
				expiresAt: msg.expires_at
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
	const result = await apiRequest<{ hash: string }>('create_thread', {
		type: options.type,
		title: options.title,
		memorial_hash: options.memorialHash
	});
	return result.hash;
}

// Get threads
export async function getThreads(options?: {
	type?: 'open' | 'private' | 'memorial';
	memorialHash?: string;
}): Promise<Thread[]> {
	const result = await apiRequest<{
		threads: Array<{
			hash: string;
			type: 'open' | 'private' | 'memorial';
			title?: string;
			message_count: number;
			created_day: string;
			expires_at: string;
		}>;
	}>('get_threads', {
		type: options?.type,
		memorial_hash: options?.memorialHash
	});

	return result.threads.map((t) => ({
		hash: t.hash,
		type: t.type,
		title: t.title,
		messageCount: t.message_count,
		createdDay: t.created_day,
		expiresAt: t.expires_at
	}));
}

// Get a single thread
export async function getThread(hash: string): Promise<Thread | null> {
	try {
		const result = await apiRequest<{
			thread: {
				hash: string;
				type: 'open' | 'private' | 'memorial';
				title?: string;
				message_count: number;
				created_day: string;
				expires_at: string;
			} | null;
		}>('get_thread', { hash });

		if (!result.thread) return null;

		return {
			hash: result.thread.hash,
			type: result.thread.type,
			title: result.thread.title,
			messageCount: result.thread.message_count,
			createdDay: result.thread.created_day,
			expiresAt: result.thread.expires_at
		};
	} catch {
		return null;
	}
}

// Clear all messaging data (for privacy)
export async function clearMessagingData(): Promise<void> {
	await clearAllCryptoData();
}

// Check if encryption is available
export { isEncryptionAvailable };
