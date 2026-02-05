<script lang="ts">
	import { Flame, Heart, Users } from 'lucide-svelte';

	// Parallax scroll state
	let scrollY = $state(0);

	// Stats (will be dynamic later)
	const stats = {
		memorials: 34400,
		candles: 128750,
		visitors: 45200
	};
</script>

<svelte:window bind:scrollY />

<!-- Hero Section with Parallax -->
<section class="relative min-h-screen overflow-hidden">
	<!-- Parallax Background Layers -->
	<div class="absolute inset-0">
		<!-- Layer 1: Deep sky (slowest) -->
		<div
			class="absolute inset-0 bg-cover bg-center"
			style="
				background-image: url('/images/parallax/sky.png');
				transform: translateY({scrollY * 0.1}px);
			"
		></div>

		<!-- Layer 2: Hajleh hero -->
		<div
			class="absolute inset-0 bg-cover bg-center bg-no-repeat"
			style="
				background-image: url('/images/source/hajleh-hero-4k.png');
				transform: translateY({scrollY * 0.3}px);
			"
		></div>

		<!-- Layer 3: Dust particles -->
		<div
			class="blend-screen absolute inset-0 bg-cover bg-center opacity-40"
			style="
				background-image: url('/images/parallax/particles-dust.png');
				transform: translateY({scrollY * 0.5}px);
			"
		></div>

		<!-- Layer 4: Warm glow overlay -->
		<div
			class="blend-screen absolute inset-0 bg-cover bg-center opacity-30"
			style="
				background-image: url('/images/parallax/glow-overlay-warm.png');
				transform: translateY({scrollY * 0.7}px);
			"
		></div>

		<!-- Gradient overlay for text readability -->
		<div
			class="absolute inset-0 bg-gradient-to-t from-night-sky via-night-sky/60 to-transparent"
		></div>
	</div>

	<!-- Hero Content -->
	<div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
		<!-- Persian Title -->
		<h1 class="mb-4 text-5xl font-bold text-white drop-shadow-lg md:text-7xl lg:text-8xl">
			زن، زندگی، آزادی
		</h1>

		<!-- English Subtitle -->
		<p class="font-latin mb-8 text-xl text-text-secondary md:text-2xl">
			Woman, Life, Freedom
		</p>

		<!-- Memorial Count -->
		<div class="candle-glow mb-12 rounded-2xl bg-surface/80 px-8 py-6 backdrop-blur-sm">
			<p class="text-lg text-text-secondary">In memory of</p>
			<p class="ltr-numbers text-5xl font-bold text-amber-glow md:text-6xl">
				{stats.memorials.toLocaleString()}+
			</p>
			<p class="mt-2 text-lg text-text-secondary">souls lost in the uprising</p>
		</div>

		<!-- CTA Buttons -->
		<div class="flex flex-col gap-4 sm:flex-row">
			<a href="/wall" class="btn-primary">
				<Flame class="ml-2 h-5 w-5" />
				Light a Candle
			</a>
			<a href="/memorial" class="btn-secondary">
				<Heart class="ml-2 h-5 w-5" />
				View Memorial Wall
			</a>
		</div>

		<!-- Scroll indicator -->
		<div class="absolute bottom-8 animate-bounce">
			<div class="h-10 w-6 rounded-full border-2 border-white/30 p-1">
				<div class="mx-auto h-2 w-1 rounded-full bg-white/50"></div>
			</div>
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="bg-surface py-16">
	<div class="mx-auto max-w-6xl px-4">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Memorials -->
			<div class="memorial-hover rounded-xl bg-surface-raised p-8 text-center transition-all">
				<Heart class="mx-auto mb-4 h-12 w-12 text-blood-red" />
				<p class="ltr-numbers text-4xl font-bold text-white">
					{stats.memorials.toLocaleString()}+
				</p>
				<p class="mt-2 text-text-secondary">Lives Remembered</p>
			</div>

			<!-- Candles -->
			<div class="memorial-hover rounded-xl bg-surface-raised p-8 text-center transition-all">
				<Flame class="mx-auto mb-4 h-12 w-12 text-amber-glow" />
				<p class="ltr-numbers text-4xl font-bold text-white">
					{stats.candles.toLocaleString()}+
				</p>
				<p class="mt-2 text-text-secondary">Candles Lit</p>
			</div>

			<!-- Visitors -->
			<div class="memorial-hover rounded-xl bg-surface-raised p-8 text-center transition-all">
				<Users class="mx-auto mb-4 h-12 w-12 text-islam-green" />
				<p class="ltr-numbers text-4xl font-bold text-white">
					{stats.visitors.toLocaleString()}+
				</p>
				<p class="mt-2 text-text-secondary">Global Visitors</p>
			</div>
		</div>
	</div>
</section>

<!-- About Section -->
<section class="bg-night-sky py-20">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="mb-6 text-3xl font-bold text-white md:text-4xl">دیوار دیجیتال</h2>
		<p class="font-latin mb-4 text-xl text-islam-green">Digital Divar</p>
		<p class="text-lg leading-relaxed text-text-secondary">
			A secure, anonymous memorial platform honoring those who gave their lives for freedom.
			Like the walls of Tehran that carry messages of resistance, this digital wall preserves
			their memory forever. Light a candle. Share a story. Never forget.
		</p>
	</div>
</section>

<!-- Footer -->
<footer class="border-t border-white/10 bg-deep-black py-8">
	<div class="mx-auto max-w-6xl px-4 text-center">
		<p class="text-text-muted">
			<span class="font-latin">Built with love for Iran</span> ·
			ساخته شده با عشق برای ایران
		</p>
		<p class="mt-2 text-sm text-text-muted">
			This platform protects your anonymity. No tracking. No logs. Your voice matters.
		</p>
	</div>
</footer>
