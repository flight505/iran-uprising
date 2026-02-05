import { getDatabase, contentHash, getCurrentDay } from '../db/index.js';

// Allowed MIME types for photos
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Max photo size: 5MB
const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

export interface Photo {
	hash: string;
	mime_type: string;
	created_day: string;
}

// Store a photo and return its hash
export function savePhoto(data: Buffer, mimeType: string): string {
	if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
		throw new Error('Invalid image type. Allowed: JPEG, PNG, WebP');
	}

	if (data.length > MAX_PHOTO_SIZE) {
		throw new Error('Image too large. Maximum size: 5MB');
	}

	const db = getDatabase();
	const hash = contentHash(data);

	// Check if photo already exists (content-addressed)
	const existing = db.prepare('SELECT hash FROM photos WHERE hash = ?').get(hash);
	if (existing) {
		return hash; // Photo already stored
	}

	const stmt = db.prepare(`
		INSERT INTO photos (hash, data, mime_type, created_day)
		VALUES (?, ?, ?, ?)
	`);

	stmt.run(hash, data, mimeType, getCurrentDay());
	return hash;
}

// Get photo by hash
export function getPhoto(hash: string): { data: Buffer; mimeType: string } | null {
	const db = getDatabase();
	const stmt = db.prepare('SELECT data, mime_type FROM photos WHERE hash = ?');
	const result = stmt.get(hash) as { data: Buffer; mime_type: string } | undefined;

	if (!result) return null;

	return {
		data: result.data,
		mimeType: result.mime_type
	};
}

// Check if photo exists
export function photoExists(hash: string): boolean {
	const db = getDatabase();
	const stmt = db.prepare('SELECT 1 FROM photos WHERE hash = ?');
	return stmt.get(hash) !== undefined;
}

// Get photo metadata only (for listings)
export function getPhotoMeta(hash: string): Photo | null {
	const db = getDatabase();
	const stmt = db.prepare('SELECT hash, mime_type, created_day FROM photos WHERE hash = ?');
	return stmt.get(hash) as Photo | null;
}

// Apply black ribbon overlay (placeholder - actual implementation would use sharp or canvas)
export async function applyBlackRibbon(imageData: Buffer): Promise<Buffer> {
	// TODO: Implement black ribbon overlay using sharp library
	// For now, return the original image
	// In production, this would:
	// 1. Load the image with sharp
	// 2. Composite a semi-transparent black ribbon in corner
	// 3. Return the processed image
	return imageData;
}
