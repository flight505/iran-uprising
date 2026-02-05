import type { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import crypto from 'crypto';
import {
	createMemorial,
	getMemorial,
	listMemorials,
	searchMemorials,
	lightCandle,
	leaveFlower,
	getStats,
	MemorialSchema
} from '../lib/memorials.js';
import { savePhoto, getPhoto, photoExists } from '../lib/photos.js';
import { createFlag, FlagSchema } from '../lib/flags.js';
import { createThread, getThread, listThreads, ThreadSchema } from '../lib/threads.js';
import { createMessage, getThreadMessages, MessageSchema } from '../lib/messages.js';

// Response padding target: 8KB
const RESPONSE_SIZE = 8192;

// API request schema
const ApiRequestSchema = z.object({
	nonce: z.string().length(64), // 32 bytes hex
	action: z.string(),
	payload: z.record(z.unknown()).optional(),
	padding: z.string().optional()
});


// API response type
interface ApiResponse {
	success: boolean;
	data?: unknown;
	error?: string;
	padding: string;
}

// Generate random padding to reach target size
function generatePadding(currentSize: number, targetSize: number): string {
	const paddingNeeded = Math.max(0, targetSize - currentSize);
	return crypto.randomBytes(Math.floor(paddingNeeded / 2)).toString('hex');
}

// Action handlers
const actions: Record<string, (payload: Record<string, unknown>) => Promise<unknown>> = {
	// Health check
	ping: async () => ({
		pong: true,
		timestamp_day: new Date().toISOString().split('T')[0]
	}),

	// Memorial actions
	get_memorials: async (payload) => {
		const limit = Math.min(Math.max(Number(payload.limit) || 20, 1), 100);
		const offset = Math.max(Number(payload.offset) || 0, 0);
		const location = payload.location ? String(payload.location) : undefined;
		const search = payload.search ? String(payload.search) : undefined;

		const result = listMemorials({ limit, offset, location, search });
		return {
			memorials: result.memorials,
			total: result.total,
			limit,
			offset
		};
	},

	get_memorial: async (payload) => {
		const hash = String(payload.hash || '');
		if (hash.length !== 64) {
			return { memorial: null, error: 'Invalid hash' };
		}

		const memorial = getMemorial(hash);
		return { memorial };
	},

	create_memorial: async (payload) => {
		try {
			// Validate memorial data
			const memorialData = MemorialSchema.parse(payload);

			// Verify photo exists
			if (!photoExists(memorialData.photo_hash)) {
				return { hash: null, error: 'Photo not found. Upload photo first.' };
			}

			// Create memorial
			const memorial = createMemorial(memorialData);
			return { hash: memorial.hash, memorial };
		} catch (err) {
			if (err instanceof z.ZodError) {
				return { hash: null, error: 'Invalid memorial data' };
			}
			throw err;
		}
	},

	light_candle: async (payload) => {
		const hash = String(payload.hash || '');
		if (hash.length !== 64) {
			return { success: false, error: 'Invalid hash' };
		}

		const success = lightCandle(hash);
		if (!success) {
			return { success: false, error: 'Memorial not found' };
		}

		return { success: true, hash };
	},

	leave_flower: async (payload) => {
		const hash = String(payload.hash || '');
		if (hash.length !== 64) {
			return { success: false, error: 'Invalid hash' };
		}

		const success = leaveFlower(hash);
		if (!success) {
			return { success: false, error: 'Memorial not found' };
		}

		return { success: true, hash };
	},

	search: async (payload) => {
		const query = String(payload.query || '').trim();
		if (query.length < 2) {
			return { results: [], query, error: 'Query too short' };
		}

		const limit = Math.min(Math.max(Number(payload.limit) || 20, 1), 50);
		const results = searchMemorials(query, limit);
		return { results, query };
	},

	// Photo upload
	upload_photo: async (payload) => {
		const base64Data = String(payload.data || '');
		const mimeType = String(payload.mime_type || 'image/jpeg');

		if (!base64Data) {
			return { hash: null, error: 'No image data provided' };
		}

		try {
			const buffer = Buffer.from(base64Data, 'base64');
			const hash = savePhoto(buffer, mimeType);
			return { hash };
		} catch (err) {
			if (err instanceof Error) {
				return { hash: null, error: err.message };
			}
			throw err;
		}
	},

	get_photo: async (payload) => {
		const hash = String(payload.hash || '');
		if (hash.length !== 64) {
			return { data: null, error: 'Invalid hash' };
		}

		const photo = getPhoto(hash);
		if (!photo) {
			return { data: null, error: 'Photo not found' };
		}

		return {
			data: photo.data.toString('base64'),
			mime_type: photo.mimeType
		};
	},

	// Content flagging
	flag_content: async (payload) => {
		try {
			const flagData = FlagSchema.parse({
				content_hash: payload.hash,
				content_type: payload.type,
				reason: payload.reason
			});

			const flag = createFlag(flagData);
			return { success: true, id: flag.id };
		} catch (err) {
			if (err instanceof z.ZodError) {
				return { success: false, error: 'Invalid flag data' };
			}
			throw err;
		}
	},

	// Statistics
	get_stats: async () => {
		const stats = getStats();
		return stats;
	},

	// Thread actions
	get_threads: async (payload) => {
		const type = payload.type ? String(payload.type) : undefined;
		const memorialHash = payload.memorial_hash ? String(payload.memorial_hash) : undefined;
		const limit = Math.min(Math.max(Number(payload.limit) || 20, 1), 100);
		const offset = Math.max(Number(payload.offset) || 0, 0);

		const validTypes = ['open', 'private', 'memorial'];
		const threadType = type && validTypes.includes(type) ? (type as 'open' | 'private' | 'memorial') : undefined;

		const result = listThreads({ type: threadType, memorial_hash: memorialHash, limit, offset });
		return { threads: result.threads, total: result.total };
	},

	get_thread: async (payload) => {
		const hash = String(payload.hash || '');
		if (hash.length !== 64) {
			return { thread: null, messages: [], error: 'Invalid hash' };
		}

		const thread = getThread(hash);
		if (!thread) {
			return { thread: null, messages: [], error: 'Thread not found' };
		}

		const limit = Math.min(Math.max(Number(payload.limit) || 50, 1), 100);
		const offset = Math.max(Number(payload.offset) || 0, 0);
		const { messages, total } = getThreadMessages(hash, { limit, offset });

		return { thread, messages, total };
	},

	create_thread: async (payload) => {
		try {
			const threadData = ThreadSchema.parse(payload);
			const thread = createThread(threadData);
			return { hash: thread.hash, thread };
		} catch (err) {
			if (err instanceof z.ZodError) {
				return { hash: null, error: 'Invalid thread data' };
			}
			throw err;
		}
	},

	post_message: async (payload) => {
		try {
			const messageData = MessageSchema.parse({
				thread_hash: payload.thread_hash,
				ciphertext: payload.ciphertext,
				expires_at: payload.expires_at
			});

			// Verify thread exists
			const thread = getThread(messageData.thread_hash);
			if (!thread) {
				return { hash: null, error: 'Thread not found' };
			}

			const message = createMessage(messageData);
			return { hash: message.hash, message };
		} catch (err) {
			if (err instanceof z.ZodError) {
				return { hash: null, error: 'Invalid message data' };
			}
			throw err;
		}
	},

	get_messages: async (payload) => {
		const threadHash = String(payload.thread_hash || '');
		if (threadHash.length !== 64) {
			return { messages: [], error: 'Invalid thread hash' };
		}

		const limit = Math.min(Math.max(Number(payload.limit) || 50, 1), 100);
		const offset = Math.max(Number(payload.offset) || 0, 0);

		const { messages, total } = getThreadMessages(threadHash, { limit, offset });
		return { messages, total };
	}
};

export async function handleApiRequest(
	request: FastifyRequest,
	_reply: FastifyReply
): Promise<ApiResponse> {
	try {
		// Parse and validate request
		const body = ApiRequestSchema.parse(request.body);

		// Verify nonce is present (prevents replay without tracking)
		if (!body.nonce || body.nonce.length !== 64) {
			return padResponse({ success: false, error: 'Invalid nonce' });
		}

		// Get action handler
		const handler = actions[body.action];
		if (!handler) {
			return padResponse({ success: false, error: 'Unknown action' });
		}

		// Execute action
		const data = await handler(body.payload || {});

		return padResponse({ success: true, data });
	} catch (err) {
		// Generic error - no details that could leak information
		return padResponse({ success: false, error: 'Request failed' });
	}
}

function padResponse(response: Omit<ApiResponse, 'padding'>): ApiResponse {
	const withoutPadding = JSON.stringify(response);
	const padding = generatePadding(withoutPadding.length, RESPONSE_SIZE);
	return { ...response, padding };
}
