import { getDatabase, getCurrentDay } from '../db/index.js';
import { z } from 'zod';

// Content types that can be flagged
export type ContentType = 'memorial' | 'thread' | 'message';

// Flag reasons
export const FLAG_REASONS = [
	'inappropriate',
	'misinformation',
	'spam',
	'duplicate',
	'offensive',
	'other'
] as const;

export type FlagReason = (typeof FLAG_REASONS)[number];

// Flag validation schema
export const FlagSchema = z.object({
	content_hash: z.string().length(64),
	content_type: z.enum(['memorial', 'thread', 'message']),
	reason: z.enum(FLAG_REASONS)
});

export type FlagInput = z.infer<typeof FlagSchema>;

export interface Flag {
	id: number;
	content_hash: string;
	content_type: ContentType;
	reason: FlagReason;
	created_day: string;
}

// Create a flag (anonymous reporting)
export function createFlag(input: FlagInput): Flag {
	const db = getDatabase();
	const validated = FlagSchema.parse(input);

	const stmt = db.prepare(`
		INSERT INTO flags (content_hash, content_type, reason, created_day)
		VALUES (?, ?, ?, ?)
	`);

	const result = stmt.run(
		validated.content_hash,
		validated.content_type,
		validated.reason,
		getCurrentDay()
	);

	return {
		id: result.lastInsertRowid as number,
		...validated,
		created_day: getCurrentDay()
	};
}

// Get flags for content (for moderation)
export function getFlagsForContent(contentHash: string): Flag[] {
	const db = getDatabase();
	const stmt = db.prepare('SELECT * FROM flags WHERE content_hash = ? ORDER BY id DESC');
	return stmt.all(contentHash) as Flag[];
}

// Get flag count for content
export function getFlagCount(contentHash: string): number {
	const db = getDatabase();
	const stmt = db.prepare('SELECT COUNT(*) as count FROM flags WHERE content_hash = ?');
	const result = stmt.get(contentHash) as { count: number };
	return result.count;
}

// Get all flagged content (for moderation dashboard)
export function getFlaggedContent(options: {
	contentType?: ContentType;
	limit?: number;
	offset?: number;
}): { content_hash: string; content_type: ContentType; flag_count: number }[] {
	const db = getDatabase();
	const { contentType, limit = 50, offset = 0 } = options;

	let query = `
		SELECT content_hash, content_type, COUNT(*) as flag_count
		FROM flags
	`;

	const params: (string | number)[] = [];

	if (contentType) {
		query += ' WHERE content_type = ?';
		params.push(contentType);
	}

	query += `
		GROUP BY content_hash, content_type
		ORDER BY flag_count DESC
		LIMIT ? OFFSET ?
	`;

	params.push(limit, offset);

	return db.prepare(query).all(...params) as {
		content_hash: string;
		content_type: ContentType;
		flag_count: number;
	}[];
}
