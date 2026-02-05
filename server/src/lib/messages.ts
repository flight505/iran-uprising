import { getDatabase, contentHash, getCurrentDay } from '../db/index.js';
import { z } from 'zod';
import { updateThreadMessageCount } from './threads.js';

// Message validation schema
export const MessageSchema = z.object({
	thread_hash: z.string().length(64),
	ciphertext: z.string().min(1), // Encrypted message content
	expires_at: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/)
		.optional()
});

export type MessageInput = z.infer<typeof MessageSchema>;

export interface Message {
	hash: string;
	thread_hash: string;
	ciphertext: string;
	timestamp_day: string;
	expires_at: string;
}

// Create a new message
export function createMessage(input: MessageInput): Message {
	const db = getDatabase();
	const validated = MessageSchema.parse(input);

	// Generate hash from thread + timestamp + random
	const hashInput = `${validated.thread_hash}|${Date.now()}|${Math.random()}`;
	const hash = contentHash(hashInput);

	const now = getCurrentDay();

	// Default expiration: 30 days
	const expiresAt =
		validated.expires_at ||
		(() => {
			const d = new Date();
			d.setDate(d.getDate() + 30);
			return d.toISOString().split('T')[0];
		})();

	const stmt = db.prepare(`
		INSERT INTO messages (hash, thread_hash, ciphertext, timestamp_day, expires_at)
		VALUES (?, ?, ?, ?, ?)
	`);

	stmt.run(hash, validated.thread_hash, validated.ciphertext, now, expiresAt);

	// Update thread message count
	updateThreadMessageCount(validated.thread_hash);

	return getMessage(hash)!;
}

// Get a single message by hash
export function getMessage(hash: string): Message | null {
	const db = getDatabase();
	const stmt = db.prepare('SELECT * FROM messages WHERE hash = ?');
	return stmt.get(hash) as Message | null;
}

// Get messages for a thread
export function getThreadMessages(
	threadHash: string,
	options?: { limit?: number; offset?: number; before?: string }
): { messages: Message[]; total: number } {
	const db = getDatabase();
	const { limit = 50, offset = 0, before } = options || {};

	let whereClause = 'thread_hash = ? AND expires_at >= ?';
	const params: (string | number)[] = [threadHash, getCurrentDay()];

	if (before) {
		whereClause += ' AND timestamp_day < ?';
		params.push(before);
	}

	// Get total count
	const countStmt = db.prepare(`SELECT COUNT(*) as count FROM messages WHERE ${whereClause}`);
	const { count } = countStmt.get(...params) as { count: number };

	// Get paginated messages (oldest first for chat display)
	const listStmt = db.prepare(`
		SELECT * FROM messages
		WHERE ${whereClause}
		ORDER BY timestamp_day ASC, hash ASC
		LIMIT ? OFFSET ?
	`);

	const messages = listStmt.all(...params, limit, offset) as Message[];

	return { messages, total: count };
}

// Delete a message (for moderation or user deletion)
export function deleteMessage(hash: string): boolean {
	const db = getDatabase();

	// Get thread hash first
	const msg = getMessage(hash);
	if (!msg) return false;

	const result = db.prepare('DELETE FROM messages WHERE hash = ?').run(hash);

	if (result.changes > 0) {
		updateThreadMessageCount(msg.thread_hash);
		return true;
	}

	return false;
}

// Delete all messages in a thread
export function deleteThreadMessages(threadHash: string): number {
	const db = getDatabase();
	const result = db.prepare('DELETE FROM messages WHERE thread_hash = ?').run(threadHash);
	updateThreadMessageCount(threadHash);
	return result.changes;
}

// Get recent messages count (for statistics)
export function getRecentMessageCount(days: number = 7): number {
	const db = getDatabase();
	const since = new Date();
	since.setDate(since.getDate() - days);
	const sinceDay = since.toISOString().split('T')[0];

	const stmt = db.prepare(`
		SELECT COUNT(*) as count FROM messages WHERE timestamp_day >= ?
	`);
	const { count } = stmt.get(sinceDay) as { count: number };
	return count;
}
