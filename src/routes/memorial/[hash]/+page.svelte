<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Flame, Heart, Calendar, MapPin, Share2, Flag, ArrowLeft } from 'lucide-svelte';
	import { t, isRTL } from '$lib/i18n';
	import { getMemorial, lightCandle, leaveFlower, type Memorial } from '$lib/api';

	// State
	let memorial = $state<Memorial | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let candleAnimating = $state(false);
	let flowerAnimating = $state(false);

	// Get hash from URL
	const hash = $derived($page.params.hash);

	// Format date for display
	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('fa-IR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Load memorial
	async function loadMemorial() {
		if (!hash) {
			error = 'Invalid memorial hash';
			loading = false;
			return;
		}

		loading = true;
		error = null;

		try {
			memorial = await getMemorial(hash);
			if (!memorial) {
				error = 'Memorial not found';
			}
		} catch (err) {
			error = 'Failed to load memorial';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	// Handle candle
	async function handleCandle() {
		if (!memorial || candleAnimating) return;

		candleAnimating = true;
		try {
			await lightCandle(memorial.hash);
			memorial = { ...memorial, candle_count: memorial.candle_count + 1 };
		} catch {
			// Queued for sync
		}
		setTimeout(() => (candleAnimating = false), 1000);
	}

	// Handle flower
	async function handleFlower() {
		if (!memorial || flowerAnimating) return;

		flowerAnimating = true;
		try {
			await leaveFlower(memorial.hash);
			memorial = { ...memorial, flower_count: memorial.flower_count + 1 };
		} catch {
			// Queued for sync
		}
		setTimeout(() => (flowerAnimating = false), 1000);
	}

	// Share memorial
	async function handleShare() {
		if (!memorial) return;

		const shareData = {
			title: memorial.name_persian,
			text: `In memory of ${memorial.name_persian} | ${memorial.name_latin || ''}`,
			url: window.location.href
		};

		if (navigator.share) {
			try {
				await navigator.share(shareData);
			} catch {
				// User cancelled
			}
		} else {
			// Fallback: copy to clipboard
			await navigator.clipboard.writeText(window.location.href);
			// Toast notification would go here
		}
	}

	onMount(() => {
		loadMemorial();
	});
</script>

<svelte:head>
	{#if memorial}
		<title>{memorial.name_persian} | Iran Uprising</title>
		<meta name="description" content="In memory of {memorial.name_persian}" />
	{:else}
		<title>Memorial | Iran Uprising</title>
	{/if}
</svelte:head>

<div class="min-h-screen bg-night-sky pb-20 pt-16">
	{#if loading}
		<!-- Loading State -->
		<div class="flex min-h-[60vh] items-center justify-center">
			<div class="text-center">
				<div class="mx-auto mb-4 h-16 w-16 animate-pulse rounded-full bg-amber-glow/30"></div>
				<p class="text-text-secondary">{$t.common.loading}</p>
			</div>
		</div>
	{:else if error || !memorial}
		<!-- Error State -->
		<div class="flex min-h-[60vh] flex-col items-center justify-center px-4">
			<p class="mb-4 text-xl text-blood-red">{error || 'Memorial not found'}</p>
			<a
				href="/wall"
				class="flex items-center gap-2 rounded-xl bg-surface px-6 py-3 text-white transition-colors hover:bg-surface-raised"
			>
				<ArrowLeft class="h-5 w-5" />
				{$t.wall.title}
			</a>
		</div>
	{:else}
		<!-- Memorial Content -->
		<article class="mx-auto max-w-4xl px-4">
			<!-- Back button -->
			<a
				href="/wall"
				class="mb-6 inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-white"
			>
				<ArrowLeft class="h-5 w-5" />
				<span>{$t.wall.title}</span>
			</a>

			<div class="grid gap-8 md:grid-cols-2">
				<!-- Photo Section -->
				<div class="relative">
					<div class="relative aspect-[3/4] overflow-hidden rounded-2xl">
						<img
							src="/api/photo/{memorial.photo_hash}"
							alt={memorial.name_persian}
							class="h-full w-full object-cover"
						/>
						<!-- Black ribbon -->
						<div class="absolute right-0 top-0 h-24 w-24 overflow-hidden">
							<div
								class="absolute right-[-45px] top-[15px] w-[150px] rotate-45 bg-black py-2 text-center text-sm text-white/80"
							>
								یادبود
							</div>
						</div>
					</div>

					<!-- Candle visualization -->
					<div class="absolute -bottom-4 left-1/2 -translate-x-1/2">
						<div class="relative">
							<div
								class="h-16 w-8 rounded-t-full bg-gradient-to-t from-amber-700 to-amber-500"
							></div>
							<div
								class="candle-flame absolute -top-4 left-1/2 h-6 w-4 -translate-x-1/2 rounded-full bg-amber-glow"
								class:animate-pulse={candleAnimating}
							></div>
						</div>
					</div>
				</div>

				<!-- Info Section -->
				<div class="flex flex-col">
					<!-- Name -->
					<h1 class="mb-2 text-4xl font-bold text-white">{memorial.name_persian}</h1>
					{#if memorial.name_latin}
						<p class="mb-6 text-xl text-text-secondary font-latin">{memorial.name_latin}</p>
					{/if}

					<!-- Meta info -->
					<div class="mb-6 space-y-3">
						{#if memorial.age}
							<div class="flex items-center gap-3 text-text-secondary">
								<span class="rounded-lg bg-surface p-2">
									<span class="text-lg">🕯️</span>
								</span>
								<span>
									<span class="ltr-numbers">{memorial.age}</span>
									ساله
								</span>
							</div>
						{/if}

						<div class="flex items-center gap-3 text-text-secondary">
							<span class="rounded-lg bg-surface p-2">
								<Calendar class="h-5 w-5" />
							</span>
							<span class="ltr-numbers">{formatDate(memorial.date_death)}</span>
						</div>

						<div class="flex items-center gap-3 text-text-secondary">
							<span class="rounded-lg bg-surface p-2">
								<MapPin class="h-5 w-5" />
							</span>
							<span>{memorial.location}</span>
						</div>
					</div>

					<!-- Circumstances -->
					{#if memorial.circumstances}
						<div class="mb-6">
							<h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-text-muted">
								{$t.memorial.circumstances}
							</h2>
							<p class="leading-relaxed text-text-secondary">{memorial.circumstances}</p>
						</div>
					{/if}

					<!-- Stats -->
					<div class="mb-6 flex gap-6">
						<div class="text-center">
							<p class="ltr-numbers text-3xl font-bold text-amber-glow">
								{memorial.candle_count.toLocaleString()}
							</p>
							<p class="text-sm text-text-muted">{$t.memorial.candles}</p>
						</div>
						<div class="text-center">
							<p class="ltr-numbers text-3xl font-bold text-blood-red">
								{memorial.flower_count.toLocaleString()}
							</p>
							<p class="text-sm text-text-muted">{$t.memorial.flowers}</p>
						</div>
					</div>

					<!-- Action buttons -->
					<div class="mt-auto flex flex-wrap gap-3">
						<button
							onclick={handleCandle}
							disabled={candleAnimating}
							class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-glow/20 px-6 py-4 text-amber-glow transition-all hover:bg-amber-glow/30 active:scale-95 disabled:opacity-50"
						>
							<span class:animate-bounce={candleAnimating}><Flame class="h-6 w-6" /></span>
							<span>{$t.memorial.lightCandle}</span>
						</button>

						<button
							onclick={handleFlower}
							disabled={flowerAnimating}
							class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blood-red/20 px-6 py-4 text-blood-red transition-all hover:bg-blood-red/30 active:scale-95 disabled:opacity-50"
						>
							<span class:animate-bounce={flowerAnimating}><Heart class="h-6 w-6" /></span>
							<span>{$t.memorial.leaveFlower}</span>
						</button>
					</div>

					<!-- Secondary actions -->
					<div class="mt-4 flex gap-3">
						<button
							onclick={handleShare}
							class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-text-secondary transition-colors hover:bg-surface"
						>
							<Share2 class="h-5 w-5" />
							<span>{$t.memorial.share}</span>
						</button>

						<a
							href="/flag/{memorial.hash}"
							class="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-text-muted transition-colors hover:bg-surface hover:text-blood-red"
						>
							<Flag class="h-5 w-5" />
						</a>
					</div>
				</div>
			</div>
		</article>
	{/if}
</div>

<style>
	.candle-flame {
		box-shadow:
			0 0 20px 10px rgba(251, 191, 36, 0.3),
			0 0 40px 20px rgba(251, 191, 36, 0.2),
			0 0 60px 30px rgba(251, 191, 36, 0.1);
		animation: flicker 0.5s ease-in-out infinite alternate;
	}

	@keyframes flicker {
		0%,
		100% {
			opacity: 0.8;
			transform: translateX(-50%) scale(1);
		}
		50% {
			opacity: 1;
			transform: translateX(-50%) scale(1.1);
		}
	}
</style>
