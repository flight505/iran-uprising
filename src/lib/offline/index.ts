// Offline-first functionality exports
// Privacy-preserving local storage and sync

export {
	saveMemorial,
	saveMemorials,
	getMemorial,
	getAllMemorials,
	searchMemorialsByLocation,
	queueAction,
	getPendingActions,
	clearPendingAction,
	savePhoto,
	getPhoto,
	getStorageStats,
	clearAllData
} from './db.js';

export {
	isOnline,
	isSyncing,
	lastSyncTime,
	syncError,
	pendingCount,
	updatePendingCount,
	syncPendingActions,
	setupAutoSync,
	registerBackgroundSync
} from './network.js';
