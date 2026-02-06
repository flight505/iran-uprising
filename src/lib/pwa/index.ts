// PWA module exports
export {
	// Stores
	updateAvailable,
	updateReady,
	installable,
	isStandalone,
	// Functions
	initPWA,
	checkStandalone,
	promptInstall,
	applyUpdate,
	dismissUpdate,
	getRegistration,
	detectOrbot,
	requestPersistentStorage,
	getStorageQuota,
	formatBytes,
	exportMemorialBundle,
	importMemorialBundle,
	shareContent,
	canShare
} from './service.js';
