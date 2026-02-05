// User Preferences Store
// Manages mode (inside/outside Iran), security settings, and panic button

import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';

// Types
export type Mode = 'inside' | 'outside';

export interface UserPreferences {
	mode: Mode;
	panicUrl: string;
	reducedMotion: boolean;
	torPreferred: boolean;
	initialized: boolean;
}

// Default preferences
const defaultPreferences: UserPreferences = {
	mode: 'outside',
	panicUrl: 'https://www.bbc.com/persian',
	reducedMotion: false,
	torPreferred: false,
	initialized: false
};

// Storage key
const STORAGE_KEY = 'user-preferences';

// Create the store
function createPreferencesStore() {
	const { subscribe, set, update } = writable<UserPreferences>(defaultPreferences);

	return {
		subscribe,

		// Initialize from localStorage
		init() {
			if (!browser) return;

			try {
				const stored = localStorage.getItem(STORAGE_KEY);
				if (stored) {
					const parsed = JSON.parse(stored) as Partial<UserPreferences>;
					set({
						...defaultPreferences,
						...parsed,
						initialized: true
					});
				} else {
					// Check if user prefers reduced motion
					const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

					set({
						...defaultPreferences,
						reducedMotion: prefersReducedMotion,
						initialized: true
					});
				}
			} catch {
				set({ ...defaultPreferences, initialized: true });
			}
		},

		// Set mode (inside/outside Iran)
		setMode(mode: Mode) {
			update((prefs) => {
				const newPrefs = {
					...prefs,
					mode,
					// Auto-enable Tor preference for inside mode
					torPreferred: mode === 'inside' ? true : prefs.torPreferred,
					// Auto-enable reduced motion for inside mode (less visual noise)
					reducedMotion: mode === 'inside' ? true : prefs.reducedMotion
				};
				this.persist(newPrefs);
				return newPrefs;
			});
		},

		// Toggle mode
		toggleMode() {
			const current = get({ subscribe });
			this.setMode(current.mode === 'inside' ? 'outside' : 'inside');
		},

		// Set panic URL
		setPanicUrl(url: string) {
			update((prefs) => {
				const newPrefs = { ...prefs, panicUrl: url };
				this.persist(newPrefs);
				return newPrefs;
			});
		},

		// Set reduced motion preference
		setReducedMotion(enabled: boolean) {
			update((prefs) => {
				const newPrefs = { ...prefs, reducedMotion: enabled };
				this.persist(newPrefs);
				return newPrefs;
			});
		},

		// Set Tor preference
		setTorPreferred(enabled: boolean) {
			update((prefs) => {
				const newPrefs = { ...prefs, torPreferred: enabled };
				this.persist(newPrefs);
				return newPrefs;
			});
		},

		// Persist to localStorage
		persist(prefs: UserPreferences) {
			if (!browser) return;
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
			} catch {
				// Storage might be full or disabled
			}
		},

		// Clear all preferences (for panic button)
		clear() {
			if (!browser) return;
			try {
				localStorage.removeItem(STORAGE_KEY);
			} catch {
				// Ignore errors
			}
			set(defaultPreferences);
		}
	};
}

// Export the store
export const preferences = createPreferencesStore();

// Derived stores for convenience
export const mode = derived(preferences, ($prefs) => $prefs.mode);
export const isInsideMode = derived(preferences, ($prefs) => $prefs.mode === 'inside');
export const isOutsideMode = derived(preferences, ($prefs) => $prefs.mode === 'outside');
export const reducedMotion = derived(preferences, ($prefs) => $prefs.reducedMotion);
export const torPreferred = derived(preferences, ($prefs) => $prefs.torPreferred);

// Panic button function - clears all app data
export async function triggerPanic(): Promise<void> {
	if (!browser) return;

	const prefs = get(preferences);
	const panicUrl = prefs.panicUrl || 'https://www.bbc.com/persian';

	// 1. Clear localStorage
	try {
		localStorage.clear();
	} catch {
		// Ignore
	}

	// 2. Clear sessionStorage
	try {
		sessionStorage.clear();
	} catch {
		// Ignore
	}

	// 3. Clear IndexedDB databases
	try {
		const databases = await indexedDB.databases();
		for (const db of databases) {
			if (db.name) {
				indexedDB.deleteDatabase(db.name);
			}
		}
	} catch {
		// Some browsers don't support databases()
		// Try to delete known databases
		const knownDbs = ['iran-uprising-offline', 'iran-uprising-crypto'];
		for (const dbName of knownDbs) {
			try {
				indexedDB.deleteDatabase(dbName);
			} catch {
				// Ignore
			}
		}
	}

	// 4. Unregister service workers
	try {
		const registrations = await navigator.serviceWorker.getRegistrations();
		for (const registration of registrations) {
			await registration.unregister();
		}
	} catch {
		// Ignore
	}

	// 5. Clear caches
	try {
		const cacheNames = await caches.keys();
		for (const cacheName of cacheNames) {
			await caches.delete(cacheName);
		}
	} catch {
		// Ignore
	}

	// 6. Navigate to safe URL
	window.location.replace(panicUrl);
}

// Check if likely connected from Iran (basic check)
export function checkIranIP(): Promise<boolean> {
	// This would need to be implemented with a server-side IP check
	// For now, return false (cannot detect client-side)
	return Promise.resolve(false);
}

// Check if connected via Tor (basic heuristic)
export function checkTorConnection(): boolean {
	if (!browser) return false;

	// Check if accessing via .onion domain
	if (window.location.hostname.endsWith('.onion')) {
		return true;
	}

	// Other heuristics could include:
	// - Checking specific headers via API
	// - Detecting Tor Browser user agent patterns
	// For now, we can't reliably detect Tor client-side

	return false;
}
