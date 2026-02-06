<script lang="ts">
	import {
		ArrowLeft,
		Heart,
		Shield,
		Lock,
		Eye,
		EyeOff,
		Wifi,
		WifiOff,
		Ban,
		Bot,
		MessageCircle,
		Flower2
	} from 'lucide-svelte';
	import { t, language } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t.about.title} | Iran Uprising</title>
</svelte:head>

<div class="min-h-screen bg-night-sky pb-20 pt-20">
	<div class="mx-auto max-w-2xl px-4">
		<!-- Back link -->
		<a
			href="/"
			class="mb-6 inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-white"
		>
			<ArrowLeft class="h-5 w-5" />
			<span>{$language === 'fa' ? 'بازگشت' : 'Back'}</span>
		</a>

		<!-- Title with heart -->
		<div class="mb-8 text-center">
			<div class="mb-4 inline-flex items-center justify-center gap-3">
				<Flower2 class="h-8 w-8 text-blood-red" />
				<h1 class="text-3xl font-bold text-white">{$t.about.title}</h1>
				<Flower2 class="h-8 w-8 text-blood-red" />
			</div>
		</div>

		<div class="space-y-8">
			<!-- Why This Site -->
			<section class="rounded-xl bg-surface p-6">
				<div class="mb-4 flex items-start gap-3">
					<span class="rounded-lg bg-amber-glow/20 p-2">
						<Heart class="h-6 w-6 text-amber-glow" />
					</span>
					<h2 class="text-xl font-semibold text-white">{$t.about.whyThisSite}</h2>
				</div>
				<p class="leading-relaxed text-text-secondary">
					{$t.about.whyThisSiteText}
				</p>
			</section>

			<!-- Protecting Dignity -->
			<section class="rounded-xl bg-surface p-6">
				<div class="mb-4 flex items-start gap-3">
					<span class="rounded-lg bg-islam-green/20 p-2">
						<Shield class="h-6 w-6 text-islam-green" />
					</span>
					<h2 class="text-xl font-semibold text-white">{$t.about.protectingDignity}</h2>
				</div>
				<p class="leading-relaxed text-text-secondary">
					{$t.about.protectingDignityText}
				</p>
			</section>

			<!-- What Happens Elsewhere -->
			<section class="rounded-xl border-2 border-blood-red/30 bg-blood-red/5 p-6">
				<div class="mb-4 flex items-start gap-3">
					<span class="rounded-lg bg-blood-red/20 p-2">
						<Ban class="h-6 w-6 text-blood-red" />
					</span>
					<h2 class="text-xl font-semibold text-white">{$t.about.whatHappensElsewhere}</h2>
				</div>
				<p class="leading-relaxed text-text-secondary">
					{$t.about.whatHappensElsewhereText}
				</p>
			</section>

			<!-- How We Are Different -->
			<section class="rounded-xl border-2 border-islam-green/30 bg-islam-green/5 p-6">
				<div class="mb-4 flex items-start gap-3">
					<span class="rounded-lg bg-islam-green/20 p-2">
						<Lock class="h-6 w-6 text-islam-green" />
					</span>
					<h2 class="text-xl font-semibold text-white">{$t.about.howWeAreDifferent}</h2>
				</div>
				<p class="leading-relaxed text-text-secondary">
					{$t.about.howWeAreDifferentText}
				</p>
			</section>

			<!-- Privacy Features -->
			<section class="rounded-xl bg-surface p-6">
				<div class="mb-6 flex items-start gap-3">
					<span class="rounded-lg bg-amber-glow/20 p-2">
						<Eye class="h-6 w-6 text-amber-glow" />
					</span>
					<h2 class="text-xl font-semibold text-white">{$t.about.privacyFeatures}</h2>
				</div>

				<div class="space-y-4">
					<!-- No Tracking -->
					<div class="flex items-start gap-4 rounded-lg bg-surface-raised p-4">
						<span class="rounded-lg bg-islam-green/20 p-2">
							<EyeOff class="h-5 w-5 text-islam-green" />
						</span>
						<p class="text-text-secondary">{$t.about.featureNoTracking}</p>
					</div>

					<!-- No Ads -->
					<div class="flex items-start gap-4 rounded-lg bg-surface-raised p-4">
						<span class="rounded-lg bg-islam-green/20 p-2">
							<Ban class="h-5 w-5 text-islam-green" />
						</span>
						<p class="text-text-secondary">{$t.about.featureNoAds}</p>
					</div>

					<!-- No AI Training -->
					<div class="flex items-start gap-4 rounded-lg bg-surface-raised p-4">
						<span class="rounded-lg bg-islam-green/20 p-2">
							<Bot class="h-5 w-5 text-islam-green" />
						</span>
						<p class="text-text-secondary">{$t.about.featureNoAiTraining}</p>
					</div>

					<!-- Encrypted Messages -->
					<div class="flex items-start gap-4 rounded-lg bg-surface-raised p-4">
						<span class="rounded-lg bg-islam-green/20 p-2">
							<MessageCircle class="h-5 w-5 text-islam-green" />
						</span>
						<p class="text-text-secondary">{$t.about.featureEncrypted}</p>
					</div>

					<!-- Tor Support -->
					<div class="flex items-start gap-4 rounded-lg bg-surface-raised p-4">
						<span class="rounded-lg bg-islam-green/20 p-2">
							<Shield class="h-5 w-5 text-islam-green" />
						</span>
						<p class="text-text-secondary">{$t.about.featureTor}</p>
					</div>

					<!-- Offline -->
					<div class="flex items-start gap-4 rounded-lg bg-surface-raised p-4">
						<span class="rounded-lg bg-islam-green/20 p-2">
							<WifiOff class="h-5 w-5 text-islam-green" />
						</span>
						<p class="text-text-secondary">{$t.about.featureOffline}</p>
					</div>
				</div>
			</section>

			<!-- For Families -->
			<section class="rounded-xl bg-gradient-to-br from-amber-glow/10 to-blood-red/10 p-6">
				<div class="mb-4 flex items-start gap-3">
					<span class="rounded-lg bg-amber-glow/20 p-2">
						<Heart class="h-6 w-6 text-amber-glow" />
					</span>
					<h2 class="text-xl font-semibold text-white">{$t.about.forFamilies}</h2>
				</div>
				<p class="leading-relaxed text-text-secondary">
					{$t.about.forFamiliesText}
				</p>
			</section>

			<!-- In Their Memory -->
			<div class="py-8 text-center">
				<p class="text-lg font-medium text-amber-glow">{$t.about.inTheirMemory}</p>
				<div class="mt-4 flex justify-center gap-2">
					<span class="text-2xl">🕯️</span>
					<span class="text-2xl">🌷</span>
					<span class="text-2xl">🕯️</span>
				</div>
			</div>
		</div>
	</div>
</div>
