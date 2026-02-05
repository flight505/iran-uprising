<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { language, t } from '$lib/i18n';
	import Navigation from '$lib/components/ui/Navigation.svelte';

	let { children } = $props();

	// Initialize language from localStorage on mount
	onMount(() => {
		language.init();
	});
</script>

<svelte:head>
	<title>{$t.hero.title} | Iran Uprising</title>
	<link rel="manifest" href="/manifest.json" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
</svelte:head>

<Navigation />

<main>
	{@render children()}
</main>
