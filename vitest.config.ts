import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/tests/setup.ts'],
		coverage: {
			reporter: ['text', 'json', 'html'],
			exclude: ['node_modules/', 'src/tests/']
		},
		alias: {
			$lib: '/src/lib',
			'$app/environment': '/src/tests/mocks/app-environment.ts',
			'$app/stores': '/src/tests/mocks/app-stores.ts',
			'$app/navigation': '/src/tests/mocks/app-navigation.ts'
		}
	}
});
