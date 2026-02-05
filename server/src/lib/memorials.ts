import { getDatabase, contentHash, getCurrentDay } from '../db/index.js';
import { z } from 'zod';

// Memorial validation schema
export const MemorialSchema = z.object({
	photo_hash: z.string().length(64),
	name_persian: z.string().min(1).max(200),
	name_latin: z.string().max(200).optional(),
	age: z.number().int().min(0).max(150).optional(),
	date_death: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	location: z.string().min(1).max(200),
	circumstances: z.string().max(1000).optional()
});

export type MemorialInput = z.infer<typeof MemorialSchema>;

export interface Memorial extends MemorialInput {
	hash: string;
	candle_count: number;
	flower_count: number;
	created_day: string;
	updated_day: string;
}

// Create a new memorial
export function createMemorial(input: MemorialInput): Memorial {
	const db = getDatabase();
	const validated = MemorialSchema.parse(input);

	// Generate content-addressed hash from name + date + location
	const hashInput = `${validated.name_persian}|${validated.date_death}|${validated.location}`;
	const hash = contentHash(hashInput);

	const now = getCurrentDay();

	const stmt = db.prepare(`
		INSERT INTO memorials (
			hash, photo_hash, name_persian, name_latin, age,
			date_death, location, circumstances,
			candle_count, flower_count, created_day, updated_day
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?)
		ON CONFLICT(hash) DO UPDATE SET
			photo_hash = excluded.photo_hash,
			circumstances = excluded.circumstances,
			updated_day = excluded.updated_day
	`);

	stmt.run(
		hash,
		validated.photo_hash,
		validated.name_persian,
		validated.name_latin || null,
		validated.age || null,
		validated.date_death,
		validated.location,
		validated.circumstances || null,
		now,
		now
	);

	return getMemorial(hash)!;
}

// Get a single memorial by hash
export function getMemorial(hash: string): Memorial | null {
	const db = getDatabase();
	const stmt = db.prepare('SELECT * FROM memorials WHERE hash = ?');
	return stmt.get(hash) as Memorial | null;
}

// List memorials with pagination
export function listMemorials(options: {
	limit?: number;
	offset?: number;
	location?: string;
	search?: string;
}): { memorials: Memorial[]; total: number } {
	const db = getDatabase();
	const { limit = 20, offset = 0, location, search } = options;

	let whereClause = '1=1';
	const params: (string | number)[] = [];

	if (location) {
		whereClause += ' AND location = ?';
		params.push(location);
	}

	if (search) {
		whereClause += ' AND (name_persian LIKE ? OR name_latin LIKE ? OR location LIKE ?)';
		const searchPattern = `%${search}%`;
		params.push(searchPattern, searchPattern, searchPattern);
	}

	// Get total count
	const countStmt = db.prepare(`SELECT COUNT(*) as count FROM memorials WHERE ${whereClause}`);
	const { count } = countStmt.get(...params) as { count: number };

	// Get paginated results
	const listStmt = db.prepare(`
		SELECT * FROM memorials
		WHERE ${whereClause}
		ORDER BY created_day DESC, name_persian ASC
		LIMIT ? OFFSET ?
	`);

	const memorials = listStmt.all(...params, limit, offset) as Memorial[];

	return { memorials, total: count };
}

// Increment candle count
export function lightCandle(hash: string): boolean {
	const db = getDatabase();
	const stmt = db.prepare(`
		UPDATE memorials
		SET candle_count = candle_count + 1, updated_day = ?
		WHERE hash = ?
	`);
	const result = stmt.run(getCurrentDay(), hash);
	return result.changes > 0;
}

// Increment flower count
export function leaveFlower(hash: string): boolean {
	const db = getDatabase();
	const stmt = db.prepare(`
		UPDATE memorials
		SET flower_count = flower_count + 1, updated_day = ?
		WHERE hash = ?
	`);
	const result = stmt.run(getCurrentDay(), hash);
	return result.changes > 0;
}

// Get aggregate statistics
export function getStats(): {
	total_memorials: number;
	total_candles: number;
	total_flowers: number;
	by_location: Record<string, number>;
	by_month: Record<string, number>;
} {
	const db = getDatabase();

	// Total counts
	const totals = db.prepare(`
		SELECT
			COUNT(*) as total_memorials,
			SUM(candle_count) as total_candles,
			SUM(flower_count) as total_flowers
		FROM memorials
	`).get() as { total_memorials: number; total_candles: number; total_flowers: number };

	// By location
	const locationRows = db.prepare(`
		SELECT location, COUNT(*) as count
		FROM memorials
		GROUP BY location
		ORDER BY count DESC
	`).all() as { location: string; count: number }[];

	const by_location: Record<string, number> = {};
	for (const row of locationRows) {
		by_location[row.location] = row.count;
	}

	// By month
	const monthRows = db.prepare(`
		SELECT strftime('%Y-%m', date_death) as month, COUNT(*) as count
		FROM memorials
		GROUP BY month
		ORDER BY month DESC
	`).all() as { month: string; count: number }[];

	const by_month: Record<string, number> = {};
	for (const row of monthRows) {
		by_month[row.month] = row.count;
	}

	return {
		total_memorials: totals.total_memorials || 0,
		total_candles: totals.total_candles || 0,
		total_flowers: totals.total_flowers || 0,
		by_location,
		by_month
	};
}

// Search memorials (fuzzy matching)
export function searchMemorials(query: string, limit = 20): Memorial[] {
	const db = getDatabase();

	// Simple LIKE search (could be enhanced with FTS5 for better fuzzy matching)
	const searchPattern = `%${query}%`;

	const stmt = db.prepare(`
		SELECT * FROM memorials
		WHERE name_persian LIKE ?
		   OR name_latin LIKE ?
		   OR location LIKE ?
		   OR circumstances LIKE ?
		ORDER BY
			CASE
				WHEN name_persian LIKE ? THEN 1
				WHEN name_latin LIKE ? THEN 2
				ELSE 3
			END,
			candle_count DESC
		LIMIT ?
	`);

	const exactPattern = `${query}%`;
	return stmt.all(
		searchPattern, searchPattern, searchPattern, searchPattern,
		exactPattern, exactPattern,
		limit
	) as Memorial[];
}
