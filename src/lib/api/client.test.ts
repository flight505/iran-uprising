// Tests for API client
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
	getMemorials,
	getMemorial,
	createMemorial,
	lightCandle,
	leaveFlower,
	searchMemorials,
	uploadPhoto,
	getPhoto,
	getStats,
	flagContent,
	ping,
	type Memorial,
	type MemorialInput,
	type Stats
} from './client';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock $lib/offline/index.js
vi.mock('$lib/offline/index.js', () => ({
	queueAction: vi.fn(),
	saveMemorials: vi.fn()
}));

describe('API client', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		mockFetch.mockReset();
	});

	// Helper to mock successful API response
	const mockApiResponse = <T>(data: T) => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ success: true, data, padding: '0'.repeat(100) })
		});
	};

	// Helper to mock error API response
	const mockApiError = (error: string) => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ success: false, error, padding: '0'.repeat(100) })
		});
	};

	// Helper to mock network failure
	const mockNetworkError = () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			status: 500
		});
	};

	describe('getMemorials', () => {
		it('fetches memorials successfully', async () => {
			const mockData = {
				memorials: [
					{
						hash: 'abc123',
						photo_hash: 'photo1',
						name_persian: 'نام',
						date_death: '2022-09-16',
						location: 'Tehran',
						candle_count: 10,
						flower_count: 5,
						created_day: '2022-09-17',
						updated_day: '2022-09-17'
					}
				] as Memorial[],
				total: 1
			};
			mockApiResponse(mockData);

			const result = await getMemorials();

			expect(result.memorials).toHaveLength(1);
			expect(result.total).toBe(1);
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it('passes options to API request', async () => {
			const mockData = { memorials: [], total: 0 };
			mockApiResponse(mockData);

			await getMemorials({ limit: 10, offset: 20, location: 'Tehran' });

			const [, options] = mockFetch.mock.calls[0];
			const body = JSON.parse(options.body);
			expect(body.action).toBe('get_memorials');
			expect(body.payload).toEqual({ limit: 10, offset: 20, location: 'Tehran' });
		});
	});

	describe('getMemorial', () => {
		it('fetches single memorial', async () => {
			const mockMemorial: Memorial = {
				hash: 'abc123',
				photo_hash: 'photo1',
				name_persian: 'نام',
				date_death: '2022-09-16',
				location: 'Tehran',
				candle_count: 10,
				flower_count: 5,
				created_day: '2022-09-17',
				updated_day: '2022-09-17'
			};
			mockApiResponse({ memorial: mockMemorial });

			const result = await getMemorial('abc123');

			expect(result).toEqual(mockMemorial);
		});

		it('returns null for non-existent memorial', async () => {
			mockApiResponse({ memorial: null });

			const result = await getMemorial('nonexistent');

			expect(result).toBeNull();
		});
	});

	describe('createMemorial', () => {
		it('creates a new memorial', async () => {
			mockApiResponse({ hash: 'newhash123' });

			const input: MemorialInput = {
				photo_hash: 'photo1',
				name_persian: 'نام جدید',
				date_death: '2022-09-16',
				location: 'Tehran'
			};

			const result = await createMemorial(input);

			expect(result.hash).toBe('newhash123');
		});
	});

	describe('lightCandle', () => {
		it('lights a candle successfully', async () => {
			mockApiResponse({});

			await expect(lightCandle('abc123')).resolves.not.toThrow();
		});

		it('queues action and throws offline message on failure', async () => {
			mockNetworkError();

			await expect(lightCandle('abc123')).rejects.toThrow('Offline - candle will be lit when back online');
		});
	});

	describe('leaveFlower', () => {
		it('leaves a flower successfully', async () => {
			mockApiResponse({});

			await expect(leaveFlower('abc123')).resolves.not.toThrow();
		});
	});

	describe('searchMemorials', () => {
		it('searches memorials', async () => {
			const mockResults = [
				{
					hash: 'abc123',
					photo_hash: 'photo1',
					name_persian: 'نام',
					date_death: '2022-09-16',
					location: 'Tehran',
					candle_count: 10,
					flower_count: 5,
					created_day: '2022-09-17',
					updated_day: '2022-09-17'
				}
			] as Memorial[];
			mockApiResponse({ results: mockResults });

			const result = await searchMemorials('نام');

			expect(result.results).toHaveLength(1);
		});

		it('passes limit parameter', async () => {
			mockApiResponse({ results: [] });

			await searchMemorials('query', 5);

			const [, options] = mockFetch.mock.calls[0];
			const body = JSON.parse(options.body);
			expect(body.payload.limit).toBe(5);
		});
	});

	describe('uploadPhoto', () => {
		it('uploads a photo', async () => {
			mockApiResponse({ hash: 'photohash123' });

			const result = await uploadPhoto('base64data', 'image/jpeg');

			expect(result.hash).toBe('photohash123');
		});
	});

	describe('getPhoto', () => {
		it('retrieves a photo', async () => {
			mockApiResponse({ data: 'base64data', mime_type: 'image/jpeg' });

			const result = await getPhoto('photohash');

			expect(result).toEqual({ data: 'base64data', mimeType: 'image/jpeg' });
		});

		it('returns null for missing photo', async () => {
			mockApiResponse({ data: null, mime_type: '' });

			const result = await getPhoto('nonexistent');

			expect(result).toBeNull();
		});

		it('returns null on error', async () => {
			mockNetworkError();

			const result = await getPhoto('error');

			expect(result).toBeNull();
		});
	});

	describe('getStats', () => {
		it('fetches statistics', async () => {
			const mockStats: Stats = {
				total_memorials: 100,
				total_candles: 5000,
				total_flowers: 3000,
				by_location: { Tehran: 50, Shiraz: 30 },
				by_month: { '2022-09': 80, '2022-10': 20 }
			};
			mockApiResponse(mockStats);

			const result = await getStats();

			expect(result.total_memorials).toBe(100);
			expect(result.by_location.Tehran).toBe(50);
		});
	});

	describe('flagContent', () => {
		it('flags content with reason', async () => {
			mockApiResponse({});

			await expect(flagContent('abc123', 'memorial', 'inappropriate')).resolves.not.toThrow();

			const [, options] = mockFetch.mock.calls[0];
			const body = JSON.parse(options.body);
			expect(body.action).toBe('flag_content');
			expect(body.payload).toEqual({ hash: 'abc123', type: 'memorial', reason: 'inappropriate' });
		});
	});

	describe('ping', () => {
		it('returns true when API is reachable', async () => {
			mockApiResponse({});

			const result = await ping();

			expect(result).toBe(true);
		});

		it('returns false when API is unreachable', async () => {
			mockNetworkError();

			const result = await ping();

			expect(result).toBe(false);
		});
	});

	describe('request structure', () => {
		it('includes nonce in requests', async () => {
			mockApiResponse({});

			await ping();

			const [, options] = mockFetch.mock.calls[0];
			const body = JSON.parse(options.body);
			expect(body.nonce).toBeDefined();
			expect(body.nonce).toHaveLength(64);
		});

		it('includes padding in requests', async () => {
			mockApiResponse({});

			await ping();

			const [, options] = mockFetch.mock.calls[0];
			const body = JSON.parse(options.body);
			expect(body.padding).toBeDefined();
		});

		it('sends requests to correct endpoint', async () => {
			mockApiResponse({});

			await ping();

			const [url] = mockFetch.mock.calls[0];
			expect(url).toContain('/api');
		});

		it('uses POST method with JSON content type', async () => {
			mockApiResponse({});

			await ping();

			const [, options] = mockFetch.mock.calls[0];
			expect(options.method).toBe('POST');
			expect(options.headers['Content-Type']).toBe('application/json');
		});
	});

	describe('error handling', () => {
		it('throws on API error response', async () => {
			mockApiError('Something went wrong');

			await expect(getMemorials()).rejects.toThrow('Something went wrong');
		});

		it('throws on network error', async () => {
			mockNetworkError();

			await expect(getMemorials()).rejects.toThrow('API request failed: 500');
		});
	});
});
