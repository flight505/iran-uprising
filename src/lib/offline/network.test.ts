// Tests for network module
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { isOnline, isSyncing, lastSyncTime, syncError, pendingCount } from './network';

// Mock $app/environment
vi.mock('$app/environment', () => ({
	browser: true
}));

// Mock ./db.js
vi.mock('./db.js', () => ({
	getPendingActions: vi.fn(() => Promise.resolve([])),
	clearPendingAction: vi.fn(() => Promise.resolve())
}));

describe('network module', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('isOnline store', () => {
		it('reflects navigator.onLine status', () => {
			// Navigator mock sets onLine to true
			expect(get(isOnline)).toBe(true);
		});
	});

	describe('isSyncing store', () => {
		it('defaults to false', () => {
			expect(get(isSyncing)).toBe(false);
		});

		it('can be updated', () => {
			isSyncing.set(true);
			expect(get(isSyncing)).toBe(true);
			isSyncing.set(false);
			expect(get(isSyncing)).toBe(false);
		});
	});

	describe('lastSyncTime store', () => {
		it('defaults to null', () => {
			expect(get(lastSyncTime)).toBe(null);
		});

		it('can be set to a date', () => {
			const now = new Date();
			lastSyncTime.set(now);
			expect(get(lastSyncTime)).toBe(now);
			lastSyncTime.set(null);
		});
	});

	describe('syncError store', () => {
		it('defaults to null', () => {
			expect(get(syncError)).toBe(null);
		});

		it('can store error message', () => {
			syncError.set('Connection failed');
			expect(get(syncError)).toBe('Connection failed');
			syncError.set(null);
		});
	});

	describe('pendingCount store', () => {
		it('defaults to 0', () => {
			expect(get(pendingCount)).toBe(0);
		});

		it('can be updated', () => {
			pendingCount.set(5);
			expect(get(pendingCount)).toBe(5);
			pendingCount.set(0);
		});
	});
});
