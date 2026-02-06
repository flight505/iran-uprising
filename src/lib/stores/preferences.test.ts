// Tests for preferences store
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import {
	preferences,
	mode,
	isInsideMode,
	isOutsideMode,
	reducedMotion,
	torPreferred,
	checkTorConnection
} from './preferences';

describe('preferences store', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
		preferences.clear();
	});

	describe('mode selection', () => {
		it('defaults to outside mode', () => {
			expect(get(mode)).toBe('outside');
		});

		it('can be set to inside mode', () => {
			preferences.setMode('inside');
			expect(get(mode)).toBe('inside');
			expect(get(isInsideMode)).toBe(true);
			expect(get(isOutsideMode)).toBe(false);
		});

		it('can be toggled', () => {
			preferences.setMode('outside');
			preferences.toggleMode();
			expect(get(mode)).toBe('inside');
			preferences.toggleMode();
			expect(get(mode)).toBe('outside');
		});

		it('auto-enables Tor preference when switching to inside mode', () => {
			preferences.setMode('outside');
			preferences.setTorPreferred(false);
			preferences.setMode('inside');
			expect(get(torPreferred)).toBe(true);
		});

		it('auto-enables reduced motion when switching to inside mode', () => {
			preferences.setMode('outside');
			preferences.setReducedMotion(false);
			preferences.setMode('inside');
			expect(get(reducedMotion)).toBe(true);
		});
	});

	describe('panic URL', () => {
		it('defaults to BBC Persian', () => {
			const prefs = get(preferences);
			expect(prefs.panicUrl).toBe('https://www.bbc.com/persian');
		});

		it('can be updated', () => {
			preferences.setPanicUrl('https://google.com');
			const prefs = get(preferences);
			expect(prefs.panicUrl).toBe('https://google.com');
		});
	});

	describe('reduced motion', () => {
		it('can be toggled', () => {
			preferences.setReducedMotion(false);
			expect(get(reducedMotion)).toBe(false);
			preferences.setReducedMotion(true);
			expect(get(reducedMotion)).toBe(true);
		});
	});

	describe('Tor preference', () => {
		it('can be toggled', () => {
			preferences.setTorPreferred(false);
			expect(get(torPreferred)).toBe(false);
			preferences.setTorPreferred(true);
			expect(get(torPreferred)).toBe(true);
		});
	});

	describe('checkTorConnection', () => {
		it('returns false for non-.onion domains', () => {
			// Default location.hostname is 'localhost' in jsdom
			expect(checkTorConnection()).toBe(false);
		});
	});
});
