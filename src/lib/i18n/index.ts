import { writable, derived, get } from 'svelte/store';
import { translations, type Language, type Translations } from './translations.js';

// Language store
function createLanguageStore() {
	const { subscribe, set, update } = writable<Language>('fa');

	return {
		subscribe,
		set: (lang: Language) => {
			set(lang);
			if (typeof window !== 'undefined') {
				localStorage.setItem('language', lang);
				document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
				document.documentElement.lang = lang;
			}
		},
		toggle: () => {
			update((lang) => {
				const newLang = lang === 'fa' ? 'en' : 'fa';
				if (typeof window !== 'undefined') {
					localStorage.setItem('language', newLang);
					document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
					document.documentElement.lang = newLang;
				}
				return newLang;
			});
		},
		init: () => {
			if (typeof window !== 'undefined') {
				const stored = localStorage.getItem('language') as Language | null;
				if (stored && (stored === 'fa' || stored === 'en')) {
					set(stored);
					document.documentElement.dir = stored === 'fa' ? 'rtl' : 'ltr';
					document.documentElement.lang = stored;
				}
			}
		}
	};
}

export const language = createLanguageStore();

// Derived translation store
export const t = derived(language, ($language) => translations[$language]);

// Derived RTL check
export const isRTL = derived(language, ($language) => $language === 'fa');

// Helper to get current translations (for use outside reactive contexts)
export function getTranslations(): Translations {
	return translations[get(language)];
}

// Re-export types
export type { Language, Translations };
