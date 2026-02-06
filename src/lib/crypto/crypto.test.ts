// Tests for crypto module
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { isEncryptionAvailable, generateRandomId } from './webcrypto-e2e';

describe('crypto module', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('isEncryptionAvailable', () => {
		it('returns true when WebCrypto is available', () => {
			expect(isEncryptionAvailable()).toBe(true);
		});
	});

	describe('generateRandomId', () => {
		it('generates a 32-character hex string', () => {
			const id = generateRandomId();
			expect(id).toHaveLength(32);
			expect(id).toMatch(/^[0-9a-f]+$/);
		});

		it('generates unique IDs', () => {
			const id1 = generateRandomId();
			const id2 = generateRandomId();
			expect(id1).not.toBe(id2);
		});
	});
});
