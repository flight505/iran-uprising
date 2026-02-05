// Secure Messaging module exports
export {
	initializeMessaging,
	fetchKeyBundle,
	establishSecureSession,
	sendSecureMessage,
	receiveMessages,
	createThread,
	getThreads,
	type SecureMessage,
	type DecryptedMessage,
	type KeyBundle
} from './service.js';
