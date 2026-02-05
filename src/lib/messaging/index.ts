// Secure Messaging module exports
export {
	initializeMessaging,
	sendSecureMessage,
	receiveMessages,
	createThread,
	getThreads,
	getThread,
	clearMessagingData,
	isEncryptionAvailable,
	type SecureMessage,
	type DecryptedMessage,
	type Thread
} from './service.js';
