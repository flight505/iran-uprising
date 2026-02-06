// Tests for i18n module
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import { language, t, isRTL, getTranslations } from './index';

describe('i18n module', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
	});

	describe('language store', () => {
		it('defaults to Persian (fa)', () => {
			expect(get(language)).toBe('fa');
		});

		it('can be set to English', () => {
			language.set('en');
			expect(get(language)).toBe('en');
		});

		it('can be toggled between languages', () => {
			language.set('fa');
			language.toggle();
			expect(get(language)).toBe('en');
			language.toggle();
			expect(get(language)).toBe('fa');
		});
	});

	describe('t (translations) store', () => {
		it('provides Persian translations when language is fa', () => {
			language.set('fa');
			const translations = get(t);
			expect(translations.hero.title).toBe('زن، زندگی، آزادی');
		});

		it('provides English translations when language is en', () => {
			language.set('en');
			const translations = get(t);
			expect(translations.hero.title).toBe('Woman, Life, Freedom');
		});
	});

	describe('isRTL store', () => {
		it('returns true for Persian', () => {
			language.set('fa');
			expect(get(isRTL)).toBe(true);
		});

		it('returns false for English', () => {
			language.set('en');
			expect(get(isRTL)).toBe(false);
		});
	});

	describe('getTranslations function', () => {
		it('returns current translations object', () => {
			language.set('fa');
			const translations = getTranslations();
			expect(translations).toHaveProperty('nav');
			expect(translations).toHaveProperty('hero');
			expect(translations).toHaveProperty('memorial');
		});
	});
});
