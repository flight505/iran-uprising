// Network status tracking and sync management
// Handles offline-first functionality and background sync

import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { getPendingActions, clearPendingAction } from './db.js';

// Online/Offline status store
function createNetworkStore() {
	const { subscribe, set } = writable(browser ? navigator.onLine : true);

	if (browser) {
		window.addEventListener('online', () => set(true));
		window.addEventListener('offline', () => set(false));
	}

	return { subscribe };
}

export const isOnline = createNetworkStore();

// Sync status
export const isSyncing = writable(false);
export const lastSyncTime = writable<Date | null>(null);
export const syncError = writable<string | null>(null);

// Pending action count
export const pendingCount = writable(0);

// Update pending count
export async function updatePendingCount(): Promise<void> {
	if (!browser) return;
	try {
		const actions = await getPendingActions();
		pendingCount.set(actions.length);
	} catch {
		// Silently fail - not critical
	}
}

// Sync pending actions with server
export async function syncPendingActions(apiEndpoint: string): Promise<void> {
	if (!browser || !get(isOnline)) return;

	const actions = await getPendingActions();
	if (actions.length === 0) return;

	isSyncing.set(true);
	syncError.set(null);

	try {
		for (const action of actions) {
			const response = await fetch(apiEndpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					action: action.type === 'candle' ? 'light_candle' : 'leave_flower',
					hash: action.memorial_hash
				})
			});

			if (response.ok) {
				await clearPendingAction(action.id);
			}
		}

		await updatePendingCount();
		lastSyncTime.set(new Date());
	} catch (err) {
		syncError.set(err instanceof Error ? err.message : 'Sync failed');
	} finally {
		isSyncing.set(false);
	}
}

// Auto-sync when coming back online
export function setupAutoSync(apiEndpoint: string): () => void {
	if (!browser) return () => {};

	const unsubscribe = isOnline.subscribe(async (online) => {
		if (online) {
			await syncPendingActions(apiEndpoint);
		}
	});

	// Initial sync
	syncPendingActions(apiEndpoint);
	updatePendingCount();

	return unsubscribe;
}

// Background sync registration (if supported)
export async function registerBackgroundSync(): Promise<boolean> {
	if (!browser || !('serviceWorker' in navigator)) return false;

	try {
		const registration = await navigator.serviceWorker.ready;

		if ('sync' in registration) {
			// @ts-expect-error - Background Sync API not in all TS defs
			await registration.sync.register('sync-pending-actions');
			return true;
		}
	} catch {
		// Background sync not supported
	}

	return false;
}
