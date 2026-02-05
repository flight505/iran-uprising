import Fastify from 'fastify';
import cors from '@fastify/cors';
import { handleApiRequest } from './routes/api.js';
import { getDatabase, closeDatabase } from './db/index.js';

// Zero-logging Fastify server
const server = Fastify({
	logger: false, // No request logging
	disableRequestLogging: true,
	trustProxy: false // Don't trust X-Forwarded-For
});

// Initialize database
getDatabase();

// CORS for Vercel frontend
await server.register(cors, {
	origin: [
		'https://iran-uprising.com',
		'https://www.iran-uprising.com',
		'https://iran-uprising.vercel.app',
		'http://localhost:5173',
		'http://localhost:5174',
		'http://localhost:5175',
		'http://localhost:5176',
		'http://localhost:5177'
	],
	methods: ['POST', 'OPTIONS'],
	allowedHeaders: ['Content-Type']
});

// Security headers
server.addHook('onSend', async (_request, reply) => {
	reply.header('X-Content-Type-Options', 'nosniff');
	reply.header('X-Frame-Options', 'DENY');
	reply.header('Referrer-Policy', 'no-referrer');
	reply.header(
		'Content-Security-Policy',
		"default-src 'self'; frame-ancestors 'none'"
	);
	// Prevent caching of API responses
	reply.header('Cache-Control', 'no-store, no-cache, must-revalidate');
	reply.header('Pragma', 'no-cache');
});

// Single API endpoint - all actions go through here
// This prevents traffic analysis based on URL patterns
server.post('/api', handleApiRequest);

// Health check (no logging)
server.get('/health', async () => ({ status: 'ok' }));

// Graceful shutdown
const shutdown = async () => {
	console.log('Shutting down...');
	await server.close();
	closeDatabase();
	process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start server
const PORT = parseInt(process.env.PORT || '3000');
const HOST = process.env.HOST || '127.0.0.1';

try {
	await server.listen({ port: PORT, host: HOST });
	console.log(`Server running on http://${HOST}:${PORT}`);
	console.log('Zero-logging mode: ENABLED');
	console.log('Database: INITIALIZED');
} catch (err) {
	console.error('Failed to start server:', err);
	process.exit(1);
}
