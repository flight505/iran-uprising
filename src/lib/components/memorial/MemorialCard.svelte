<script lang="ts">
	import { Flame, Heart, Calendar, MapPin } from 'lucide-svelte';
	import { t, isRTL } from '$lib/i18n';
	import type { Memorial } from '$lib/api';

	interface Props {
		memorial: Memorial;
		onLightCandle?: (hash: string) => void;
		onLeaveFlower?: (hash: string) => void;
		compact?: boolean;
	}

	let { memorial, onLightCandle, onLeaveFlower, compact = false }: Props = $props();

	// Format date for display
	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('fa-IR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Handle candle click
	function handleCandle() {
		onLightCandle?.(memorial.hash);
	}

	// Handle flower click
	function handleFlower() {
		onLeaveFlower?.(memorial.hash);
	}
</script>

<article
	class="memorial-card group relative overflow-hidden rounded-xl bg-surface-raised transition-all hover:bg-surface-raised/80"
	class:compact
>
	<!-- Photo with black ribbon overlay -->
	<a href="/memorial/{memorial.hash}" class="block">
		<div class="relative aspect-[3/4] overflow-hidden">
			<img
				src="/api/photo/{memorial.photo_hash}"
				alt={memorial.name_persian}
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				loading="lazy"
			/>
			<!-- Black ribbon overlay (always visible) -->
			<div class="absolute right-0 top-0 h-20 w-20 overflow-hidden">
				<div
					class="absolute right-[-35px] top-[10px] w-[120px] rotate-45 bg-black py-1 text-center text-xs text-white/80"
				>
					یادبود
				</div>
			</div>
			<!-- Gradient overlay for text readability -->
			<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
			</div>
		</div>
	</a>

	<!-- Memorial info -->
	<div class="absolute inset-x-0 bottom-0 p-4">
		<!-- Name -->
		<a href="/memorial/{memorial.hash}" class="block">
			<h3 class="mb-1 text-lg font-bold text-white drop-shadow-lg">
				{memorial.name_persian}
			</h3>
			{#if memorial.name_latin}
				<p class="mb-2 text-sm text-text-secondary font-latin">{memorial.name_latin}</p>
			{/if}
		</a>

		<!-- Meta info -->
		{#if !compact}
			<div class="mb-3 flex flex-wrap gap-3 text-xs text-text-muted">
				{#if memorial.age}
					<span class="ltr-numbers">{memorial.age} ساله</span>
				{/if}
				<span class="flex items-center gap-1">
					<Calendar class="h-3 w-3" />
					<span class="ltr-numbers">{formatDate(memorial.date_death)}</span>
				</span>
				<span class="flex items-center gap-1">
					<MapPin class="h-3 w-3" />
					{memorial.location}
				</span>
			</div>
		{/if}

		<!-- Interaction buttons -->
		<div class="flex items-center gap-4">
			<button
				onclick={handleCandle}
				class="flex items-center gap-1.5 rounded-full bg-amber-glow/20 px-3 py-1.5 text-sm text-amber-glow transition-all hover:bg-amber-glow/30 active:scale-95"
				aria-label={$t.memorial.lightCandle}
			>
				<Flame class="h-4 w-4" />
				<span class="ltr-numbers">{memorial.candle_count}</span>
			</button>
			<button
				onclick={handleFlower}
				class="flex items-center gap-1.5 rounded-full bg-blood-red/20 px-3 py-1.5 text-sm text-blood-red transition-all hover:bg-blood-red/30 active:scale-95"
				aria-label={$t.memorial.leaveFlower}
			>
				<Heart class="h-4 w-4" />
				<span class="ltr-numbers">{memorial.flower_count}</span>
			</button>
		</div>
	</div>
</article>

<style>
	.memorial-card {
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.3),
			0 2px 4px -2px rgba(0, 0, 0, 0.2);
	}

	.memorial-card:hover {
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.4),
			0 4px 6px -4px rgba(0, 0, 0, 0.3);
	}

	.memorial-card.compact {
		aspect-ratio: 1;
	}

	.memorial-card.compact h3 {
		font-size: 0.875rem;
	}
</style>
