import Database from 'better-sqlite3';
import crypto from 'crypto';
import { SCHEMA, MIGRATIONS } from './schema.js';

// Database connection singleton
let db: Database.Database | null = null;

// Get encryption key from environment or generate ephemeral one
// In production, this should come from a secure key management system
function getEncryptionKey(): string {
	const key = process.env.DB_ENCRYPTION_KEY;
	if (!key) {
		console.warn('WARNING: No DB_ENCRYPTION_KEY set. Using ephemeral key (data will be lost on restart)');
		return crypto.randomBytes(32).toString('hex');
	}
	return key;
}

export function getDatabase(): Database.Database {
	if (db) return db;

	const dbPath = process.env.DB_PATH || './data/memorial.db';

	// Create database connection
	// Note: For true encryption, use better-sqlite3-sqlcipher package
	// For now, using standard better-sqlite3 (encryption to be added with SQLCipher)
	db = new Database(dbPath);

	// Enable WAL mode for better concurrency
	db.pragma('journal_mode = WAL');

	// Initialize schema
	db.exec(SCHEMA);

	// Set up automatic cleanup of expired messages
	scheduleCleanup();

	console.log(`Database initialized at ${dbPath}`);
	return db;
}

export function closeDatabase(): void {
	if (db) {
		db.close();
		db = null;
	}
}

// Cleanup expired messages (runs periodically)
function scheduleCleanup(): void {
	const cleanup = () => {
		if (!db) return;

		const today = new Date().toISOString().split('T')[0];

		// Delete expired messages
		const deletedMessages = db.prepare(
			'DELETE FROM messages WHERE expires_at < ?'
		).run(today);

		// Update thread message counts
		db.prepare(`
			UPDATE threads SET message_count = (
				SELECT COUNT(*) FROM messages WHERE thread_hash = threads.hash
			)
		`).run();

		if (deletedMessages.changes > 0) {
			console.log(`Cleaned up ${deletedMessages.changes} expired messages`);
		}
	};

	// Run cleanup every hour
	setInterval(cleanup, 60 * 60 * 1000);

	// Run once on startup
	cleanup();
}

// Helper to generate content-addressed hash
export function contentHash(data: string | Buffer): string {
	return crypto.createHash('sha256').update(data).digest('hex');
}

// Get current day (for day-level timestamps only)
export function getCurrentDay(): string {
	return new Date().toISOString().split('T')[0];
}
