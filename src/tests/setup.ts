// Vitest setup file
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
	length: 0,
	key: vi.fn()
};

Object.defineProperty(global, 'localStorage', {
	value: localStorageMock,
	writable: true
});

// Mock sessionStorage
Object.defineProperty(global, 'sessionStorage', {
	value: localStorageMock,
	writable: true
});

// Mock crypto
Object.defineProperty(global, 'crypto', {
	value: {
		getRandomValues: (arr: Uint8Array) => {
			for (let i = 0; i < arr.length; i++) {
				arr[i] = Math.floor(Math.random() * 256);
			}
			return arr;
		},
		subtle: {
			generateKey: vi.fn(),
			exportKey: vi.fn(),
			importKey: vi.fn(),
			deriveKey: vi.fn(),
			encrypt: vi.fn(),
			decrypt: vi.fn(),
			digest: vi.fn()
		},
		randomUUID: () => 'test-uuid-' + Math.random().toString(36).slice(2)
	}
});

// Mock IndexedDB
const indexedDBMock = {
	open: vi.fn(),
	deleteDatabase: vi.fn(),
	databases: vi.fn(() => Promise.resolve([]))
};

Object.defineProperty(global, 'indexedDB', {
	value: indexedDBMock,
	writable: true
});

// Mock navigator
Object.defineProperty(global, 'navigator', {
	value: {
		...global.navigator,
		onLine: true,
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
		serviceWorker: {
			ready: Promise.resolve({
				update: vi.fn(),
				addEventListener: vi.fn()
			}),
			getRegistrations: vi.fn(() => Promise.resolve([])),
			addEventListener: vi.fn()
		},
		storage: {
			estimate: vi.fn(() => Promise.resolve({ usage: 0, quota: 1000000 })),
			persist: vi.fn(() => Promise.resolve(true))
		},
		share: vi.fn()
	},
	writable: true
});

// Mock matchMedia
Object.defineProperty(global, 'matchMedia', {
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	})),
	writable: true
});

// Mock caches
Object.defineProperty(global, 'caches', {
	value: {
		keys: vi.fn(() => Promise.resolve([])),
		delete: vi.fn(() => Promise.resolve(true)),
		open: vi.fn(() =>
			Promise.resolve({
				put: vi.fn(),
				match: vi.fn(),
				delete: vi.fn()
			})
		)
	},
	writable: true
});

// Mock fetch
global.fetch = vi.fn();
