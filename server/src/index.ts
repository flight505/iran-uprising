import Fastify from 'fastify';
import cors from '@fastify/cors';
import { handleApiRequest } from './routes/api.js';

// Zero-logging Fastify server
const server = Fastify({
	logger: false, // No request logging
	disableRequestLogging: true,
	trustProxy: false // Don't trust X-Forwarded-For
});

// CORS for Vercel frontend
await server.register(cors, {
	origin: [
		'https://iran-uprising.com',
		'https://www.iran-uprising.com',
		'https://iran-uprising.vercel.app',
		'http://localhost:5173',
		'http://localhost:5174'
	],
	methods: ['POST', 'OPTIONS'],
	allowedHeaders: ['Content-Type']
});

// Security headers
server.addHook('onSend', async (request, reply) => {
	reply.header('X-Content-Type-Options', 'nosniff');
	reply.header('X-Frame-Options', 'DENY');
	reply.header('Referrer-Policy', 'no-referrer');
	reply.header(
		'Content-Security-Policy',
		"default-src 'self'; frame-ancestors 'none'"
	);
});

// Single API endpoint - all actions go through here
// This prevents traffic analysis based on URL patterns
server.post('/api', handleApiRequest);

// Health check (no logging)
server.get('/health', async () => ({ status: 'ok' }));

// Start server
const PORT = parseInt(process.env.PORT || '3000');
const HOST = process.env.HOST || '127.0.0.1';

try {
	await server.listen({ port: PORT, host: HOST });
	console.log(`Server running on http://${HOST}:${PORT}`);
	console.log('Zero-logging mode: ENABLED');
} catch (err) {
	console.error('Failed to start server:', err);
	process.exit(1);
}
