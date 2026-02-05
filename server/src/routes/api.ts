import type { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import crypto from 'crypto';

// Request padding target: 4KB
const REQUEST_SIZE = 4096;
// Response padding target: 8KB
const RESPONSE_SIZE = 8192;

// API request schema
const ApiRequestSchema = z.object({
	nonce: z.string().length(64), // 32 bytes hex
	action: z.string(),
	payload: z.record(z.unknown()).optional(),
	padding: z.string().optional()
});

type ApiRequest = z.infer<typeof ApiRequestSchema>;

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
const actions: Record<
	string,
	(payload: Record<string, unknown>) => Promise<unknown>
> = {
	// Health check
	ping: async () => ({ pong: true, timestamp_day: new Date().toISOString().split('T')[0] }),

	// Memorial actions (to be implemented)
	get_memorials: async (payload) => {
		const limit = Number(payload.limit) || 20;
		const offset = Number(payload.offset) || 0;
		// TODO: Fetch from database
		return { memorials: [], total: 0, limit, offset };
	},

	get_memorial: async (payload) => {
		const hash = String(payload.hash || '');
		// TODO: Fetch from database
		return { memorial: null };
	},

	create_memorial: async (payload) => {
		// TODO: Validate proof-of-work, create memorial
		return { hash: null, error: 'Not implemented' };
	},

	light_candle: async (payload) => {
		const hash = String(payload.hash || '');
		// TODO: Increment candle count
		return { success: true, hash };
	},

	leave_flower: async (payload) => {
		const hash = String(payload.hash || '');
		// TODO: Increment flower count
		return { success: true, hash };
	},

	search: async (payload) => {
		const query = String(payload.query || '');
		// TODO: Search memorials
		return { results: [], query };
	},

	// Thread actions (to be implemented)
	get_threads: async (payload) => {
		const type = String(payload.type || 'open');
		// TODO: Fetch threads
		return { threads: [], type };
	},

	get_thread: async (payload) => {
		const hash = String(payload.hash || '');
		// TODO: Fetch thread with messages
		return { thread: null, messages: [] };
	},

	create_thread: async (payload) => {
		// TODO: Validate proof-of-work, create thread
		return { hash: null, error: 'Not implemented' };
	},

	post_message: async (payload) => {
		// TODO: Validate proof-of-work, post message
		return { hash: null, error: 'Not implemented' };
	},

	flag_content: async (payload) => {
		const hash = String(payload.hash || '');
		const reason = String(payload.reason || '');
		// TODO: Record flag (anonymously)
		return { success: true, hash, reason };
	},

	// Statistics
	get_stats: async () => {
		// TODO: Fetch aggregate stats
		return {
			total_memorials: 0,
			total_candles: 0,
			total_flowers: 0,
			by_location: {},
			by_month: {}
		};
	}
};

export async function handleApiRequest(
	request: FastifyRequest,
	reply: FastifyReply
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
