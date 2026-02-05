// Cryptography module exports
// Signal Protocol E2E encryption for messaging

export {
	initializeSignalProtocol,
	generateIdentity,
	generatePreKeys,
	generateSignedPreKey,
	getLocalKeyBundle,
	establishSession,
	encryptMessage,
	decryptMessage,
	hasSession,
	clearSignalData,
	arrayBufferToBase64,
	base64ToArrayBuffer
} from './signal-client.js';

export { SignalProtocolStore } from './signal-store.js';
