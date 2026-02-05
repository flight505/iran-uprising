<script lang="ts">
	import { onMount } from 'svelte';
	import { Search } from 'lucide-svelte';
	import { t, isRTL } from '$lib/i18n';
	import { MemorialGrid } from '$lib/components/memorial';
	import { getMemorials, lightCandle, leaveFlower, type Memorial } from '$lib/api';

	// State
	let memorials = $state<Memorial[]>([]);
	let total = $state(0);
	let loading = $state(true);
	let loadingMore = $state(false);
	let searchQuery = $state('');
	let searchTimeout: ReturnType<typeof setTimeout>;

	// Pagination
	const PAGE_SIZE = 20;
	let offset = $state(0);
	let hasMore = $derived(offset + memorials.length < total);

	// Load memorials
	async function loadMemorials(reset = false) {
		if (reset) {
			offset = 0;
			loading = true;
		} else {
			loadingMore = true;
		}

		try {
			const result = await getMemorials({
				limit: PAGE_SIZE,
				offset: reset ? 0 : offset,
				search: searchQuery || undefined
			});

			if (reset) {
				memorials = result.memorials;
			} else {
				memorials = [...memorials, ...result.memorials];
			}
			total = result.total;
			offset = reset ? PAGE_SIZE : offset + PAGE_SIZE;
		} catch (err) {
			console.error('Failed to load memorials:', err);
		} finally {
			loading = false;
			loadingMore = false;
		}
	}

	// Handle search with debounce
	function handleSearch(event: Event) {
		const input = event.target as HTMLInputElement;
		searchQuery = input.value;

		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			loadMemorials(true);
		}, 300);
	}

	// Handle candle
	async function handleCandle(hash: string) {
		try {
			await lightCandle(hash);
			// Update local count
			memorials = memorials.map((m) =>
				m.hash === hash ? { ...m, candle_count: m.candle_count + 1 } : m
			);
		} catch (err) {
			// Toast notification would go here
			console.log('Candle queued for sync');
		}
	}

	// Handle flower
	async function handleFlower(hash: string) {
		try {
			await leaveFlower(hash);
			// Update local count
			memorials = memorials.map((m) =>
				m.hash === hash ? { ...m, flower_count: m.flower_count + 1 } : m
			);
		} catch (err) {
			// Toast notification would go here
			console.log('Flower queued for sync');
		}
	}

	// Infinite scroll observer
	let loadMoreTrigger: HTMLDivElement;

	onMount(() => {
		loadMemorials(true);

		// Set up intersection observer for infinite scroll
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loadingMore) {
					loadMemorials();
				}
			},
			{ threshold: 0.1 }
		);

		if (loadMoreTrigger) {
			observer.observe(loadMoreTrigger);
		}

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>{$t.wall.title} | Iran Uprising</title>
</svelte:head>

<div class="min-h-screen bg-night-sky pb-20 pt-20">
	<div class="mx-auto max-w-7xl px-4">
		<!-- Header -->
		<header class="mb-8">
			<h1 class="mb-4 text-3xl font-bold text-white md:text-4xl">{$t.wall.title}</h1>

			<!-- Search -->
			<div class="relative max-w-md">
				<input
					type="search"
					value={searchQuery}
					oninput={handleSearch}
					placeholder={$t.wall.searchPlaceholder}
					class="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-white placeholder-text-muted focus:border-amber-glow/50 focus:outline-none focus:ring-1 focus:ring-amber-glow/50"
					class:pr-10={!$isRTL}
					class:pl-10={$isRTL}
				/>
				<span
					class="pointer-events-none absolute top-1/2 -translate-y-1/2 text-text-muted"
					class:right-3={!$isRTL}
					class:left-3={$isRTL}
				>
					<Search class="h-5 w-5" />
				</span>
			</div>

			<!-- Results count -->
			{#if !loading && total > 0}
				<p class="mt-3 text-sm text-text-muted">
					<span class="ltr-numbers">{total.toLocaleString()}</span>
					{$t.wall.livesRemembered}
				</p>
			{/if}
		</header>

		<!-- Memorial Grid -->
		<MemorialGrid
			{memorials}
			{loading}
			onLightCandle={handleCandle}
			onLeaveFlower={handleFlower}
		/>

		<!-- Load more trigger -->
		<div bind:this={loadMoreTrigger} class="h-20">
			{#if loadingMore}
				<div class="flex items-center justify-center py-8">
					<div class="candle-flicker h-8 w-8 rounded-full bg-amber-glow/50"></div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.candle-flicker {
		animation: flicker 1.5s ease-in-out infinite alternate;
	}

	@keyframes flicker {
		0%,
		100% {
			opacity: 0.5;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.1);
		}
	}
</style>
