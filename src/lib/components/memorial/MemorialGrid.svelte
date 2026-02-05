<script lang="ts">
	import MemorialCard from './MemorialCard.svelte';
	import { t } from '$lib/i18n';
	import type { Memorial } from '$lib/api';

	interface Props {
		memorials: Memorial[];
		loading?: boolean;
		onLightCandle?: (hash: string) => void;
		onLeaveFlower?: (hash: string) => void;
		compact?: boolean;
	}

	let {
		memorials,
		loading = false,
		onLightCandle,
		onLeaveFlower,
		compact = false
	}: Props = $props();
</script>

{#if loading}
	<div class="flex items-center justify-center py-12">
		<div class="candle-flicker h-12 w-12 rounded-full bg-amber-glow/50"></div>
		<span class="ml-4 text-text-secondary">{$t.common.loading}</span>
	</div>
{:else if memorials.length === 0}
	<div class="py-12 text-center">
		<p class="text-text-muted">{$t.wall.noResults}</p>
	</div>
{:else}
	<div
		class="memorial-grid grid gap-4"
		class:compact
		class:grid-cols-2={compact}
		class:sm:grid-cols-3={compact}
		class:md:grid-cols-4={compact}
		class:lg:grid-cols-5={compact}
		class:grid-cols-1={!compact}
		class:sm:grid-cols-2={!compact}
		class:md:grid-cols-3={!compact}
		class:lg:grid-cols-4={!compact}
	>
		{#each memorials as memorial (memorial.hash)}
			<MemorialCard {memorial} {onLightCandle} {onLeaveFlower} {compact} />
		{/each}
	</div>
{/if}

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
