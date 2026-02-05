<script lang="ts">
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { language, t } from '$lib/i18n';
	import { preferences, reducedMotion, triggerPanic } from '$lib/stores';
	import Navigation from '$lib/components/ui/Navigation.svelte';

	let { children } = $props();

	// Handle keyboard shortcuts
	function handleKeydown(event: KeyboardEvent) {
		// Panic button: Ctrl+Shift+Q (or Cmd+Shift+Q on Mac)
		if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'Q') {
			event.preventDefault();
			triggerPanic();
		}
	}

	// Initialize stores on mount
	onMount(() => {
		language.init();
		preferences.init();

		// Add keyboard listener
		if (browser) {
			document.addEventListener('keydown', handleKeydown);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<svelte:head>
	<title>{$t.hero.title} | Iran Uprising</title>
	<link rel="manifest" href="/manifest.json" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
</svelte:head>

<!-- Apply reduced motion class to body based on preference -->
<svelte:body class:reduced-motion={$reducedMotion} />

<Navigation />

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
