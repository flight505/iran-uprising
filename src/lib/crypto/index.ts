// Cryptography module exports
// WebCrypto-based E2E encryption for messaging

export {
	getOrCreateIdentity,
	getLocalPublicKey,
	encryptMessage,
	decryptMessage,
	encryptForThread,
	decryptFromThread,
	deriveThreadKey,
	isEncryptionAvailable,
	clearAllCryptoData,
	sha256,
	generateRandomId,
	type KeyPair,
	type EncryptedMessage,
	type DecryptedMessage
} from './webcrypto-e2e.js';
