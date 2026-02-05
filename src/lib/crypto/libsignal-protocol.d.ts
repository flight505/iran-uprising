// Type declarations for libsignal-protocol
// Based on the Signal Protocol JavaScript implementation

declare module 'libsignal-protocol' {
	export interface KeyPair {
		pubKey: ArrayBuffer;
		privKey: ArrayBuffer;
	}

	export interface PreKey {
		keyId: number;
		keyPair: KeyPair;
	}

	export interface SignedPreKey extends PreKey {
		signature: ArrayBuffer;
	}

	export interface PreKeyBundle {
		registrationId: number;
		identityKey: ArrayBuffer;
		signedPreKey: {
			keyId: number;
			publicKey: ArrayBuffer;
			signature: ArrayBuffer;
		};
		preKey?: {
			keyId: number;
			publicKey: ArrayBuffer;
		};
	}

	export interface CiphertextMessage {
		type: number;
		body: string;
		registrationId?: number;
	}

	export interface SignalProtocolStore {
		getIdentityKeyPair(): Promise<KeyPair | undefined>;
		getLocalRegistrationId(): Promise<number | undefined>;
		isTrustedIdentity(
			identifier: string,
			identityKey: ArrayBuffer,
			direction: number
		): Promise<boolean>;
		saveIdentity(identifier: string, identityKey: ArrayBuffer): Promise<boolean>;
		loadPreKey(keyId: number): Promise<KeyPair | undefined>;
		storePreKey(keyId: number, keyPair: KeyPair): Promise<void>;
		removePreKey(keyId: number): Promise<void>;
		loadSignedPreKey(keyId: number): Promise<KeyPair | undefined>;
		storeSignedPreKey(keyId: number, keyPair: KeyPair): Promise<void>;
		removeSignedPreKey(keyId: number): Promise<void>;
		loadSession(identifier: string): Promise<string | undefined>;
		storeSession(identifier: string, record: string): Promise<void>;
		removeSession(identifier: string): Promise<void>;
		removeAllSessions(identifier: string): Promise<void>;
	}

	export class SignalProtocolAddress {
		constructor(name: string, deviceId: number);
		getName(): string;
		getDeviceId(): number;
		toString(): string;
		equals(other: SignalProtocolAddress): boolean;
	}

	export class SessionBuilder {
		constructor(store: SignalProtocolStore, remoteAddress: SignalProtocolAddress);
		processPreKey(device: PreKeyBundle): Promise<void>;
	}

	export class SessionCipher {
		constructor(store: SignalProtocolStore, remoteAddress: SignalProtocolAddress);
		encrypt(buffer: ArrayBuffer): Promise<CiphertextMessage>;
		decryptPreKeyWhisperMessage(
			buffer: string | ArrayBuffer,
			encoding?: string
		): Promise<ArrayBuffer>;
		decryptWhisperMessage(buffer: string | ArrayBuffer, encoding?: string): Promise<ArrayBuffer>;
		hasOpenSession(): Promise<boolean>;
		closeOpenSessionForDevice(): Promise<void>;
	}

	export namespace KeyHelper {
		function generateIdentityKeyPair(): Promise<KeyPair>;
		function generateRegistrationId(): number;
		function generatePreKey(keyId: number): Promise<PreKey>;
		function generateSignedPreKey(identityKeyPair: KeyPair, signedKeyId: number): Promise<SignedPreKey>;
	}
}
