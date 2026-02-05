<script lang="ts">
	import { t } from '$lib/i18n';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		text?: string;
	}

	let { size = 'md', text }: Props = $props();

	const sizes = {
		sm: 'w-8 h-12',
		md: 'w-12 h-16',
		lg: 'w-16 h-24'
	};
</script>

<div class="flex flex-col items-center justify-center gap-3">
	<!-- Candle SVG with flickering flame -->
	<div class={sizes[size]}>
		<svg viewBox="0 0 40 60" class="w-full h-full">
			<!-- Candle body -->
			<rect x="12" y="30" width="16" height="28" rx="2" fill="#F5F5DC" />

			<!-- Wick -->
			<line x1="20" y1="30" x2="20" y2="22" stroke="#333" stroke-width="1.5" />

			<!-- Flame (animated) -->
			<ellipse cx="20" cy="18" rx="6" ry="10" class="flame">
				<animate
					attributeName="ry"
					values="10;8;10;9;10"
					dur="0.8s"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="rx"
					values="6;5;6;5.5;6"
					dur="0.6s"
					repeatCount="indefinite"
				/>
			</ellipse>

			<!-- Inner flame -->
			<ellipse cx="20" cy="20" rx="3" ry="5" class="flame-inner">
				<animate
					attributeName="ry"
					values="5;4;5;4.5;5"
					dur="0.7s"
					repeatCount="indefinite"
				/>
			</ellipse>

			<!-- Glow effect -->
			<ellipse cx="20" cy="18" rx="12" ry="14" class="glow">
				<animate
					attributeName="opacity"
					values="0.3;0.2;0.3;0.25;0.3"
					dur="1s"
					repeatCount="indefinite"
				/>
			</ellipse>
		</svg>
	</div>

	<!-- Loading text -->
	{#if text || $t}
		<p class="text-sm text-text-secondary animate-pulse">
			{text || $t.common.loading}
		</p>
	{/if}
</div>

<style>
	.flame {
		fill: url(#flameGradient);
		fill: #FFBF00;
		filter: blur(1px);
	}

	.flame-inner {
		fill: #FFF8DC;
	}

	.glow {
		fill: #FFBF00;
		opacity: 0.3;
		filter: blur(4px);
	}

	@media (prefers-reduced-motion: reduce) {
		.flame,
		.flame-inner,
		.glow {
			animation: none !important;
		}

		.flame animate,
		.flame-inner animate,
		.glow animate {
			display: none;
		}
	}
</style>
