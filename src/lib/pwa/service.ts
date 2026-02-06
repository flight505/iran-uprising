// PWA Service
// Handles service worker updates, install prompts, and app lifecycle

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Types
interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Stores
export const updateAvailable = writable(false);
export const updateReady = writable(false);
export const installable = writable(false);
export const isStandalone = writable(false);

// Internal state
let deferredPrompt: BeforeInstallPromptEvent | null = null;
let registration: ServiceWorkerRegistration | null = null;

// Check if running as standalone PWA
export function checkStandalone(): boolean {
	if (!browser) return false;

	const isStandaloneMode =
		window.matchMedia('(display-mode: standalone)').matches ||
		// @ts-expect-error - iOS Safari standalone mode
		window.navigator.standalone === true ||
		document.referrer.includes('android-app://');

	isStandalone.set(isStandaloneMode);
	return isStandaloneMode;
}

// Initialize PWA features
export function initPWA(): void {
	if (!browser) return;

	// Check standalone mode
	checkStandalone();

	// Listen for install prompt
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
		deferredPrompt = e as BeforeInstallPromptEvent;
		installable.set(true);
	});

	// Listen for app installed
	window.addEventListener('appinstalled', () => {
		installable.set(false);
		deferredPrompt = null;
		isStandalone.set(true);
	});

	// Listen for display mode changes
	window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
		isStandalone.set(e.matches);
	});

	// Register service worker update handler
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready.then((reg) => {
			registration = reg;

			// Check for updates periodically (every 60 seconds)
			setInterval(() => {
				reg.update().catch(() => {
					// Silently fail - network might be unavailable
				});
			}, 60000);

			// Listen for controller change (new SW activated)
			navigator.serviceWorker.addEventListener('controllerchange', () => {
				// New service worker has taken control
				updateReady.set(true);
			});

			// Listen for new service worker
			reg.addEventListener('updatefound', () => {
				const newWorker = reg.installing;
				if (!newWorker) return;

				newWorker.addEventListener('statechange', () => {
					if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
						// New version available, waiting to activate
						updateAvailable.set(true);
					}
				});
			});
		});
	}
}

// Trigger install prompt
export async function promptInstall(): Promise<boolean> {
	if (!deferredPrompt) return false;

	try {
		await deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;

		if (outcome === 'accepted') {
			installable.set(false);
			deferredPrompt = null;
			return true;
		}
	} catch {
		// User dismissed or error
	}

	return false;
}

// Apply update (reload with new service worker)
export function applyUpdate(): void {
	if (!browser) return;

	// Skip waiting on the new service worker
	if (registration?.waiting) {
		registration.waiting.postMessage({ type: 'SKIP_WAITING' });
	}

	// Reload the page to use new version
	window.location.reload();
}

// Dismiss update notification
export function dismissUpdate(): void {
	updateAvailable.set(false);
}

// Get service worker registration
export function getRegistration(): ServiceWorkerRegistration | null {
	return registration;
}

// Check for Orbot (Android Tor proxy)
export function detectOrbot(): boolean {
	if (!browser) return false;

	// Check user agent for Orbot indicators
	const ua = navigator.userAgent.toLowerCase();

	// Orbot's built-in browser or Tor Browser for Android
	if (ua.includes('orbot') || ua.includes('orfox')) {
		return true;
	}

	// Check if using a SOCKS proxy (requires additional detection)
	// This is a heuristic and not foolproof

	return false;
}

// Request persistent storage (important for privacy-critical data)
export async function requestPersistentStorage(): Promise<boolean> {
	if (!browser || !navigator.storage?.persist) return false;

	try {
		const isPersisted = await navigator.storage.persist();
		return isPersisted;
	} catch {
		return false;
	}
}

// Get storage quota info
export async function getStorageQuota(): Promise<{
	usage: number;
	quota: number;
	percentUsed: number;
} | null> {
	if (!browser || !navigator.storage?.estimate) return null;

	try {
		const estimate = await navigator.storage.estimate();
		const usage = estimate.usage || 0;
		const quota = estimate.quota || 0;
		const percentUsed = quota > 0 ? (usage / quota) * 100 : 0;

		return { usage, quota, percentUsed };
	} catch {
		return null;
	}
}

// Format bytes to human-readable string
export function formatBytes(bytes: number): string {
	if (bytes === 0) return '0 B';

	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// Export memorial data for offline sharing
export async function exportMemorialBundle(): Promise<Blob | null> {
	if (!browser) return null;

	try {
		// Import dynamically to avoid circular deps
		const { getAllMemorials, getPendingActions } = await import('$lib/offline/db.js');

		const memorials = await getAllMemorials();
		const pendingActions = await getPendingActions();

		const bundle = {
			version: 1,
			exported: new Date().toISOString(),
			memorials,
			pendingActions
		};

		const json = JSON.stringify(bundle, null, 2);
		return new Blob([json], { type: 'application/json' });
	} catch {
		return null;
	}
}

// Import memorial bundle
export async function importMemorialBundle(file: File): Promise<boolean> {
	if (!browser) return false;

	try {
		const text = await file.text();
		const bundle = JSON.parse(text);

		if (bundle.version !== 1 || !Array.isArray(bundle.memorials)) {
			return false;
		}

		const { saveMemorials } = await import('$lib/offline/db.js');
		await saveMemorials(bundle.memorials);

		return true;
	} catch {
		return false;
	}
}

// Share content using Web Share API
export async function shareContent(data: {
	title?: string;
	text?: string;
	url?: string;
}): Promise<boolean> {
	if (!browser || !navigator.share) return false;

	try {
		await navigator.share(data);
		return true;
	} catch {
		// User cancelled or error
		return false;
	}
}

// Check if Web Share API is available
export function canShare(): boolean {
	return browser && 'share' in navigator;
}
