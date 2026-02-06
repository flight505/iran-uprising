// Tests for PWA service
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
	updateAvailable,
	installable,
	isStandalone,
	checkStandalone,
	formatBytes,
	canShare,
	detectOrbot
} from './service';

describe('PWA service', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('stores', () => {
		it('updateAvailable defaults to false', () => {
			expect(get(updateAvailable)).toBe(false);
		});

		it('installable defaults to false', () => {
			expect(get(installable)).toBe(false);
		});

		it('isStandalone defaults to false', () => {
			expect(get(isStandalone)).toBe(false);
		});
	});

	describe('checkStandalone', () => {
		it('returns false when not in standalone mode', () => {
			expect(checkStandalone()).toBe(false);
		});
	});

	describe('formatBytes', () => {
		it('formats 0 bytes', () => {
			expect(formatBytes(0)).toBe('0 B');
		});

		it('formats bytes', () => {
			expect(formatBytes(500)).toBe('500 B');
		});

		it('formats kilobytes', () => {
			expect(formatBytes(1024)).toBe('1 KB');
			expect(formatBytes(1536)).toBe('1.5 KB');
		});

		it('formats megabytes', () => {
			expect(formatBytes(1024 * 1024)).toBe('1 MB');
			expect(formatBytes(1.5 * 1024 * 1024)).toBe('1.5 MB');
		});

		it('formats gigabytes', () => {
			expect(formatBytes(1024 * 1024 * 1024)).toBe('1 GB');
		});
	});

	describe('canShare', () => {
		it('returns true when navigator.share is available', () => {
			// Navigator mock includes share
			expect(canShare()).toBe(true);
		});
	});

	describe('detectOrbot', () => {
		it('returns false for regular user agents', () => {
			expect(detectOrbot()).toBe(false);
		});
	});
});
