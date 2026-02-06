<script lang="ts">
	import { Download, X, Smartphone } from 'lucide-svelte';
	import { installable, isStandalone, promptInstall } from '$lib/pwa';
	import { language } from '$lib/i18n';

	let dismissed = $state(false);
	let installing = $state(false);

	async function handleInstall() {
		installing = true;
		const success = await promptInstall();
		installing = false;
		if (success) {
			dismissed = true;
		}
	}

	function dismiss() {
		dismissed = true;
		// Store dismissal in sessionStorage (not localStorage - privacy)
		try {
			sessionStorage.setItem('install-prompt-dismissed', 'true');
		} catch {
			// Ignore
		}
	}

	// Check if previously dismissed this session
	$effect(() => {
		try {
			if (sessionStorage.getItem('install-prompt-dismissed') === 'true') {
				dismissed = true;
			}
		} catch {
			// Ignore
		}
	});
</script>

{#if $installable && !$isStandalone && !dismissed}
	<div
		class="fixed bottom-20 left-4 right-4 z-40 md:bottom-4 md:left-auto md:right-4 md:w-80"
		role="dialog"
		aria-labelledby="install-title"
	>
		<div class="rounded-xl border border-amber-glow/30 bg-surface p-4 shadow-lg">
			<div class="flex items-start gap-3">
				<div class="rounded-lg bg-amber-glow/20 p-2">
					<Smartphone class="h-5 w-5 text-amber-glow" />
				</div>
				<div class="flex-1">
					<p id="install-title" class="font-medium text-white">
						{$language === 'fa' ? 'نصب برنامه' : 'Install App'}
					</p>
					<p class="mt-1 text-sm text-text-muted">
						{$language === 'fa'
							? 'برای دسترسی سریع‌تر و استفاده آفلاین نصب کنید.'
							: 'Install for quick access and offline use.'}
					</p>
					<div class="mt-3 flex gap-2">
						<button
							onclick={handleInstall}
							disabled={installing}
							class="flex items-center gap-1 rounded-lg bg-amber-glow px-3 py-1.5 text-sm font-medium text-night-sky transition-colors hover:bg-amber-glow/90 disabled:opacity-50"
						>
							{#if installing}
								<span class="h-4 w-4 animate-spin rounded-full border-2 border-night-sky border-t-transparent"></span>
							{:else}
								<Download class="h-4 w-4" />
							{/if}
							{$language === 'fa' ? 'نصب' : 'Install'}
						</button>
						<button
							onclick={dismiss}
							class="rounded-lg px-3 py-1.5 text-sm text-text-secondary transition-colors hover:text-white"
						>
							{$language === 'fa' ? 'بعداً' : 'Not now'}
						</button>
					</div>
				</div>
				<button
					onclick={dismiss}
					class="rounded-lg p-1 text-text-muted transition-colors hover:text-white"
					aria-label="Dismiss"
				>
					<X class="h-4 w-4" />
				</button>
			</div>
		</div>
	</div>
{/if}
