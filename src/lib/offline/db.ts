// IndexedDB wrapper for offline memorial storage
// Privacy-first: stores only public memorial data for offline viewing

const DB_NAME = 'iran-memorial-offline';
const DB_VERSION = 1;

interface Memorial {
	hash: string;
	photo_hash: string;
	name_persian: string;
	name_latin?: string;
	age?: number;
	date_death: string;
	location: string;
	circumstances?: string;
	candle_count: number;
	flower_count: number;
}

interface PendingAction {
	id: string;
	type: 'candle' | 'flower';
	memorial_hash: string;
	timestamp: number;
}

let dbInstance: IDBDatabase | null = null;

function openDB(): Promise<IDBDatabase> {
	if (dbInstance) return Promise.resolve(dbInstance);

	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => {
			dbInstance = request.result;
			resolve(dbInstance);
		};

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;

			// Store for cached memorials
			if (!db.objectStoreNames.contains('memorials')) {
				const memorialStore = db.createObjectStore('memorials', { keyPath: 'hash' });
				memorialStore.createIndex('location', 'location', { unique: false });
				memorialStore.createIndex('date_death', 'date_death', { unique: false });
			}

			// Store for pending actions (sync when online)
			if (!db.objectStoreNames.contains('pending_actions')) {
				const actionStore = db.createObjectStore('pending_actions', { keyPath: 'id' });
				actionStore.createIndex('type', 'type', { unique: false });
				actionStore.createIndex('timestamp', 'timestamp', { unique: false });
			}

			// Store for photo blobs
			if (!db.objectStoreNames.contains('photos')) {
				db.createObjectStore('photos', { keyPath: 'hash' });
			}
		};
	});
}

// Memorial operations
export async function saveMemorial(memorial: Memorial): Promise<void> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction('memorials', 'readwrite');
		const store = tx.objectStore('memorials');
		const request = store.put(memorial);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve();
	});
}

export async function saveMemorials(memorials: Memorial[]): Promise<void> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction('memorials', 'readwrite');
		const store = tx.objectStore('memorials');
		for (const memorial of memorials) {
			store.put(memorial);
		}
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
}

export async function getMemorial(hash: string): Promise<Memorial | undefined> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction('memorials', 'readonly');
		const store = tx.objectStore('memorials');
		const request = store.get(hash);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
	});
}

export async function getAllMemorials(): Promise<Memorial[]> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction('memorials', 'readonly');
		const store = tx.objectStore('memorials');
		const request = store.getAll();
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
	});
}

export async function searchMemorialsByLocation(location: string): Promise<Memorial[]> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction('memorials', 'readonly');
		const store = tx.objectStore('memorials');
		const index = store.index('location');
		const request = index.getAll(location);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
	});
}

// Pending actions (for offline-first interactions)
export async function queueAction(type: 'candle' | 'flower', memorialHash: string): Promise<void> {
	const db = await openDB();
	const action: PendingAction = {
		id: crypto.randomUUID(),
		type,
		memorial_hash: memorialHash,
		timestamp: Date.now()
	};

	return new Promise((resolve, reject) => {
		const tx = db.transaction('pending_actions', 'readwrite');
		const store = tx.objectStore('pending_actions');
		const request = store.add(action);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve();
	});
}

export async function getPendingActions(): Promise<PendingAction[]> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction('pending_actions', 'readonly');
		const store = tx.objectStore('pending_actions');
		const request = store.getAll();
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
	});
}

export async function clearPendingAction(id: string): Promise<void> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction('pending_actions', 'readwrite');
		const store = tx.objectStore('pending_actions');
		const request = store.delete(id);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve();
	});
}

// Photo blob storage
export async function savePhoto(hash: string, blob: Blob): Promise<void> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction('photos', 'readwrite');
		const store = tx.objectStore('photos');
		const request = store.put({ hash, blob });
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve();
	});
}

export async function getPhoto(hash: string): Promise<Blob | undefined> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction('photos', 'readonly');
		const store = tx.objectStore('photos');
		const request = store.get(hash);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result?.blob);
	});
}

// Storage statistics (for debugging/monitoring)
export async function getStorageStats(): Promise<{
	memorialCount: number;
	pendingActionCount: number;
	photoCount: number;
}> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(['memorials', 'pending_actions', 'photos'], 'readonly');

		let memorialCount = 0;
		let pendingActionCount = 0;
		let photoCount = 0;

		const memorialReq = tx.objectStore('memorials').count();
		memorialReq.onsuccess = () => (memorialCount = memorialReq.result);

		const actionReq = tx.objectStore('pending_actions').count();
		actionReq.onsuccess = () => (pendingActionCount = actionReq.result);

		const photoReq = tx.objectStore('photos').count();
		photoReq.onsuccess = () => (photoCount = photoReq.result);

		tx.oncomplete = () => resolve({ memorialCount, pendingActionCount, photoCount });
		tx.onerror = () => reject(tx.error);
	});
}

// Clear all offline data (privacy feature)
export async function clearAllData(): Promise<void> {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(['memorials', 'pending_actions', 'photos'], 'readwrite');
		tx.objectStore('memorials').clear();
		tx.objectStore('pending_actions').clear();
		tx.objectStore('photos').clear();
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
}
