<script lang="ts">
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { language, t } from '$lib/i18n';
	import { preferences, reducedMotion, triggerPanic } from '$lib/stores';
	import { initPWA } from '$lib/pwa';
	import { setupAutoSync } from '$lib/offline';
	import Navigation from '$lib/components/ui/Navigation.svelte';
	import { UpdateNotification, InstallPrompt, OfflineIndicator } from '$lib/components/pwa';

	let { children } = $props();
	let unsubscribeSync: (() => void) | null = null;

	// Handle keyboard shortcuts
	function handleKeydown(event: KeyboardEvent) {
		// Panic button: Ctrl+Shift+Q (or Cmd+Shift+Q on Mac)
		if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'Q') {
			event.preventDefault();
			triggerPanic();
		}
	}

	// Initialize stores and services on mount
	onMount(() => {
		// Initialize language and preferences
		language.init();
		preferences.init();

		// Initialize PWA features
		initPWA();

		// Setup auto-sync for offline actions
		const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
		unsubscribeSync = setupAutoSync(`${apiUrl}/api`);

		// Add keyboard listener
		if (browser) {
			document.addEventListener('keydown', handleKeydown);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('keydown', handleKeydown);
		}
		if (unsubscribeSync) {
			unsubscribeSync();
		}
	});
</script>

<svelte:head>
	<title>{$t.hero.title} | Iran Uprising</title>
	<link rel="manifest" href="/manifest.json" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="theme-color" content="#0a0a0f" />
</svelte:head>

<!-- Apply reduced motion class to body based on preference -->
<svelte:body class:reduced-motion={$reducedMotion} />

<!-- PWA Components -->
<OfflineIndicator />
<UpdateNotification />
<InstallPrompt />

<!-- Navigation -->
<Navigation />

<!-- Main Content -->
<main>
	{@render children()}
</main>

<style>
	:global(body.reduced-motion),
	:global(body.reduced-motion *) {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
</style>
