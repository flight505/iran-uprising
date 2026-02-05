// Privacy-preserving API client
// All requests go through a single endpoint with padding

import { browser } from '$app/environment';
import { queueAction, saveMemorials } from '$lib/offline/index.js';

// API endpoint - will be configurable
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Generate a random nonce (32 bytes hex)
function generateNonce(): string {
	if (browser && crypto.getRandomValues) {
		const bytes = new Uint8Array(32);
		crypto.getRandomValues(bytes);
		return Array.from(bytes)
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('');
	}
	// Fallback for SSR
	return '0'.repeat(64);
}

// Generate padding to reach target size
function generatePadding(currentSize: number, targetSize: number = 4096): string {
	const paddingNeeded = Math.max(0, targetSize - currentSize);
	if (browser && crypto.getRandomValues) {
		const bytes = new Uint8Array(Math.floor(paddingNeeded / 2));
		crypto.getRandomValues(bytes);
		return Array.from(bytes)
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('');
	}
	return '0'.repeat(paddingNeeded);
}

// API request interface
interface ApiRequest {
	nonce: string;
	action: string;
	payload?: Record<string, unknown>;
	padding?: string;
}

// API response interface
interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: string;
	padding: string;
}

// Make an API request
async function apiRequest<T>(action: string, payload?: Record<string, unknown>): Promise<T> {
	const request: ApiRequest = {
		nonce: generateNonce(),
		action,
		payload
	};

	// Add padding to reach target size
	const requestJson = JSON.stringify(request);
	request.padding = generatePadding(requestJson.length);

	const response = await fetch(`${API_BASE}/api`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(request)
	});

	if (!response.ok) {
		throw new Error(`API request failed: ${response.status}`);
	}

	const data: ApiResponse<T> = await response.json();

	if (!data.success) {
		throw new Error(data.error || 'Request failed');
	}

	return data.data as T;
}

// Memorial types
export interface Memorial {
	hash: string;
	photo_hash: string;
	name_persian: string;
	name_latin?: string;
	age?: number;
	date_death: string;
	location: string;
	circumstances?: string;
	candle_count: number;
	flower_count: number;
	created_day: string;
	updated_day: string;
}

export interface MemorialInput {
	photo_hash: string;
	name_persian: string;
	name_latin?: string;
	age?: number;
	date_death: string;
	location: string;
	circumstances?: string;
}

// Memorial API functions
export async function getMemorials(options?: {
	limit?: number;
	offset?: number;
	location?: string;
	search?: string;
}): Promise<{ memorials: Memorial[]; total: number }> {
	const result = await apiRequest<{ memorials: Memorial[]; total: number }>(
		'get_memorials',
		options
	);

	// Cache memorials for offline use
	if (browser && result.memorials.length > 0) {
		try {
			await saveMemorials(result.memorials);
		} catch {
			// Silently fail - offline caching is optional
		}
	}

	return result;
}

export async function getMemorial(hash: string): Promise<Memorial | null> {
	const result = await apiRequest<{ memorial: Memorial | null }>('get_memorial', { hash });
	return result.memorial;
}

export async function createMemorial(input: MemorialInput): Promise<{ hash: string }> {
	return apiRequest<{ hash: string }>('create_memorial', { ...input });
}

export async function lightCandle(hash: string): Promise<void> {
	try {
		await apiRequest('light_candle', { hash });
	} catch {
		// Queue for later sync if offline
		if (browser) {
			await queueAction('candle', hash);
		}
		throw new Error('Offline - candle will be lit when back online');
	}
}

export async function leaveFlower(hash: string): Promise<void> {
	try {
		await apiRequest('leave_flower', { hash });
	} catch {
		// Queue for later sync if offline
		if (browser) {
			await queueAction('flower', hash);
		}
		throw new Error('Offline - flower will be left when back online');
	}
}

export async function searchMemorials(
	query: string,
	limit?: number
): Promise<{ results: Memorial[] }> {
	return apiRequest<{ results: Memorial[] }>('search', { query, limit });
}

// Photo API functions
export async function uploadPhoto(
	data: string,
	mimeType: string = 'image/jpeg'
): Promise<{ hash: string }> {
	return apiRequest<{ hash: string }>('upload_photo', { data, mime_type: mimeType });
}

export async function getPhoto(hash: string): Promise<{ data: string; mimeType: string } | null> {
	try {
		const result = await apiRequest<{ data: string | null; mime_type: string }>('get_photo', {
			hash
		});
		if (!result.data) return null;
		return { data: result.data, mimeType: result.mime_type };
	} catch {
		return null;
	}
}

// Statistics
export interface Stats {
	total_memorials: number;
	total_candles: number;
	total_flowers: number;
	by_location: Record<string, number>;
	by_month: Record<string, number>;
}

export async function getStats(): Promise<Stats> {
	return apiRequest<Stats>('get_stats');
}

// Content flagging
export type FlagReason =
	| 'inappropriate'
	| 'misinformation'
	| 'spam'
	| 'duplicate'
	| 'offensive'
	| 'other';

export async function flagContent(
	hash: string,
	type: 'memorial' | 'thread' | 'message',
	reason: FlagReason
): Promise<void> {
	await apiRequest('flag_content', { hash, type, reason });
}

// Health check
export async function ping(): Promise<boolean> {
	try {
		await apiRequest('ping');
		return true;
	} catch {
		return false;
	}
}
