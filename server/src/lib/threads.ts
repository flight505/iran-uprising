import { getDatabase, contentHash, getCurrentDay } from '../db/index.js';
import { z } from 'zod';

// Thread types
export type ThreadType = 'open' | 'private' | 'memorial';

// Thread validation schema
export const ThreadSchema = z.object({
	type: z.enum(['open', 'private', 'memorial']),
	memorial_hash: z.string().length(64).optional(),
	title: z.string().max(200).optional()
});

export type ThreadInput = z.infer<typeof ThreadSchema>;

export interface Thread {
	hash: string;
	type: ThreadType;
	memorial_hash: string | null;
	title: string | null;
	message_count: number;
	created_day: string;
	expires_at: string | null;
}

// Create a new thread
export function createThread(input: ThreadInput): Thread {
	const db = getDatabase();
	const validated = ThreadSchema.parse(input);

	// Generate hash from type + timestamp + random
	const hashInput = `${validated.type}|${Date.now()}|${Math.random()}`;
	const hash = contentHash(hashInput);

	const now = getCurrentDay();

	// Calculate expiration (30 days for open threads, never for memorial threads)
	let expiresAt: string | null = null;
	if (validated.type === 'open' || validated.type === 'private') {
		const expires = new Date();
		expires.setDate(expires.getDate() + 30);
		expiresAt = expires.toISOString().split('T')[0];
	}

	const stmt = db.prepare(`
		INSERT INTO threads (hash, type, memorial_hash, title, message_count, created_day, expires_at)
		VALUES (?, ?, ?, ?, 0, ?, ?)
	`);

	stmt.run(
		hash,
		validated.type,
		validated.memorial_hash || null,
		validated.title || null,
		now,
		expiresAt
	);

	return getThread(hash)!;
}

// Get a single thread by hash
export function getThread(hash: string): Thread | null {
	const db = getDatabase();
	const stmt = db.prepare('SELECT * FROM threads WHERE hash = ?');
	return stmt.get(hash) as Thread | null;
}

// List threads with optional filtering
export function listThreads(options: {
	type?: ThreadType;
	memorial_hash?: string;
	limit?: number;
	offset?: number;
}): { threads: Thread[]; total: number } {
	const db = getDatabase();
	const { type, memorial_hash, limit = 20, offset = 0 } = options;

	let whereClause = '1=1';
	const params: (string | number)[] = [];

	if (type) {
		whereClause += ' AND type = ?';
		params.push(type);
	}

	if (memorial_hash) {
		whereClause += ' AND memorial_hash = ?';
		params.push(memorial_hash);
	}

	// Exclude expired threads
	whereClause += ' AND (expires_at IS NULL OR expires_at >= ?)';
	params.push(getCurrentDay());

	// Get total count
	const countStmt = db.prepare(`SELECT COUNT(*) as count FROM threads WHERE ${whereClause}`);
	const { count } = countStmt.get(...params) as { count: number };

	// Get paginated results
	const listStmt = db.prepare(`
		SELECT * FROM threads
		WHERE ${whereClause}
		ORDER BY created_day DESC
		LIMIT ? OFFSET ?
	`);

	const threads = listStmt.all(...params, limit, offset) as Thread[];

	return { threads, total: count };
}

// Get threads for a memorial
export function getMemorialThreads(memorialHash: string): Thread[] {
	const db = getDatabase();
	const stmt = db.prepare(`
		SELECT * FROM threads
		WHERE memorial_hash = ?
		ORDER BY created_day DESC
	`);
	return stmt.all(memorialHash) as Thread[];
}

// Update thread message count
export function updateThreadMessageCount(hash: string): void {
	const db = getDatabase();
	db.prepare(`
		UPDATE threads SET message_count = (
			SELECT COUNT(*) FROM messages WHERE thread_hash = ?
		) WHERE hash = ?
	`).run(hash, hash);
}

// Delete expired threads
export function cleanupExpiredThreads(): number {
	const db = getDatabase();
	const result = db.prepare(`
		DELETE FROM threads WHERE expires_at < ?
	`).run(getCurrentDay());
	return result.changes;
}
