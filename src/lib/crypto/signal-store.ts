// Signal Protocol Key Store Implementation
// Stores keys in IndexedDB for persistence

import { browser } from '$app/environment';

const DB_NAME = 'signal-protocol-store';
const DB_VERSION = 1;

// Store names
const STORES = {
	IDENTITY_KEY: 'identityKey',
	PREKEYS: 'preKeys',
	SIGNED_PREKEYS: 'signedPreKeys',
	SESSIONS: 'sessions'
} as const;

let dbInstance: IDBDatabase | null = null;

// Open the IndexedDB database
function openDB(): Promise<IDBDatabase> {
	if (dbInstance) return Promise.resolve(dbInstance);
	if (!browser) return Promise.reject(new Error('IndexedDB not available'));

	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => {
			dbInstance = request.result;
			resolve(dbInstance);
		};

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;

			// Identity key pair store
			if (!db.objectStoreNames.contains(STORES.IDENTITY_KEY)) {
				db.createObjectStore(STORES.IDENTITY_KEY);
			}

			// Pre-keys store
			if (!db.objectStoreNames.contains(STORES.PREKEYS)) {
				db.createObjectStore(STORES.PREKEYS);
			}

			// Signed pre-keys store
			if (!db.objectStoreNames.contains(STORES.SIGNED_PREKEYS)) {
				db.createObjectStore(STORES.SIGNED_PREKEYS);
			}

			// Sessions store
			if (!db.objectStoreNames.contains(STORES.SESSIONS)) {
				db.createObjectStore(STORES.SESSIONS);
			}
		};
	});
}

// Generic get/put/remove helpers
async function dbGet<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(storeName, 'readonly');
		const store = tx.objectStore(storeName);
		const request = store.get(key);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
	});
}

async function dbPut(storeName: string, key: IDBValidKey, value: unknown): Promise<void> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(storeName, 'readwrite');
		const store = tx.objectStore(storeName);
		const request = store.put(value, key);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve();
	});
}

async function dbRemove(storeName: string, key: IDBValidKey): Promise<void> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(storeName, 'readwrite');
		const store = tx.objectStore(storeName);
		const request = store.delete(key);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve();
	});
}

// Direction enum for sessions
type Direction = 1 | 2; // 1 = sending, 2 = receiving

// Signal Protocol Store Interface Implementation
export class SignalProtocolStore {
	// Identity Key Pair
	async getIdentityKeyPair(): Promise<{ pubKey: ArrayBuffer; privKey: ArrayBuffer } | undefined> {
		return dbGet(STORES.IDENTITY_KEY, 'identityKey');
	}

	async saveIdentityKeyPair(keyPair: { pubKey: ArrayBuffer; privKey: ArrayBuffer }): Promise<void> {
		await dbPut(STORES.IDENTITY_KEY, 'identityKey', keyPair);
	}

	// Local Registration ID
	async getLocalRegistrationId(): Promise<number | undefined> {
		return dbGet(STORES.IDENTITY_KEY, 'registrationId');
	}

	async saveLocalRegistrationId(registrationId: number): Promise<void> {
		await dbPut(STORES.IDENTITY_KEY, 'registrationId', registrationId);
	}

	// Trusted Identity Keys
	async isTrustedIdentity(
		identifier: string,
		identityKey: ArrayBuffer,
		_direction: Direction
	): Promise<boolean> {
		if (!identifier) return false;

		const trusted = await dbGet<ArrayBuffer>(STORES.IDENTITY_KEY, `trusted:${identifier}`);
		if (!trusted) {
			// First contact - trust on first use (TOFU)
			return true;
		}

		// Compare the keys
		return this.arrayBufferEqual(identityKey, trusted);
	}

	async saveIdentity(identifier: string, identityKey: ArrayBuffer): Promise<boolean> {
		const existing = await dbGet<ArrayBuffer>(STORES.IDENTITY_KEY, `trusted:${identifier}`);
		await dbPut(STORES.IDENTITY_KEY, `trusted:${identifier}`, identityKey);
		return existing !== undefined && !this.arrayBufferEqual(identityKey, existing);
	}

	// Pre-Keys
	async loadPreKey(keyId: number): Promise<{ pubKey: ArrayBuffer; privKey: ArrayBuffer } | undefined> {
		return dbGet(STORES.PREKEYS, keyId);
	}

	async storePreKey(keyId: number, keyPair: { pubKey: ArrayBuffer; privKey: ArrayBuffer }): Promise<void> {
		await dbPut(STORES.PREKEYS, keyId, keyPair);
	}

	async removePreKey(keyId: number): Promise<void> {
		await dbRemove(STORES.PREKEYS, keyId);
	}

	// Signed Pre-Keys
	async loadSignedPreKey(keyId: number): Promise<{ pubKey: ArrayBuffer; privKey: ArrayBuffer } | undefined> {
		return dbGet(STORES.SIGNED_PREKEYS, keyId);
	}

	async storeSignedPreKey(keyId: number, keyPair: { pubKey: ArrayBuffer; privKey: ArrayBuffer }): Promise<void> {
		await dbPut(STORES.SIGNED_PREKEYS, keyId, keyPair);
	}

	async removeSignedPreKey(keyId: number): Promise<void> {
		await dbRemove(STORES.SIGNED_PREKEYS, keyId);
	}

	// Sessions
	async loadSession(identifier: string): Promise<string | undefined> {
		return dbGet(STORES.SESSIONS, identifier);
	}

	async storeSession(identifier: string, record: string): Promise<void> {
		await dbPut(STORES.SESSIONS, identifier, record);
	}

	async removeSession(identifier: string): Promise<void> {
		await dbRemove(STORES.SESSIONS, identifier);
	}

	async removeAllSessions(identifier: string): Promise<void> {
		// In a full implementation, this would remove all sessions for a given identifier
		await this.removeSession(identifier);
	}

	// Helper: Compare ArrayBuffers
	private arrayBufferEqual(a: ArrayBuffer, b: ArrayBuffer): boolean {
		if (a.byteLength !== b.byteLength) return false;
		const viewA = new Uint8Array(a);
		const viewB = new Uint8Array(b);
		for (let i = 0; i < viewA.length; i++) {
			if (viewA[i] !== viewB[i]) return false;
		}
		return true;
	}
}

// Clear all Signal Protocol data (privacy feature)
export async function clearSignalData(): Promise<void> {
	if (!browser) return;

	return new Promise((resolve, reject) => {
		const request = indexedDB.deleteDatabase(DB_NAME);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => {
			dbInstance = null;
			resolve();
		};
	});
}
