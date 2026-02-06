<script lang="ts">
	import { RefreshCw, X } from 'lucide-svelte';
	import { updateAvailable, applyUpdate, dismissUpdate } from '$lib/pwa';
	import { language } from '$lib/i18n';
</script>

{#if $updateAvailable}
	<div
		class="fixed bottom-20 left-4 right-4 z-50 md:bottom-4 md:left-auto md:right-4 md:w-80"
		role="alert"
	>
		<div class="rounded-xl border border-islam-green/30 bg-surface p-4 shadow-lg">
			<div class="flex items-start gap-3">
				<div class="rounded-lg bg-islam-green/20 p-2">
					<RefreshCw class="h-5 w-5 text-islam-green" />
				</div>
				<div class="flex-1">
					<p class="font-medium text-white">
						{$language === 'fa' ? 'نسخه جدید موجود است' : 'Update Available'}
					</p>
					<p class="mt-1 text-sm text-text-muted">
						{$language === 'fa'
							? 'برای دریافت آخرین امکانات، به‌روزرسانی کنید.'
							: 'Refresh to get the latest features.'}
					</p>
					<div class="mt-3 flex gap-2">
						<button
							onclick={applyUpdate}
							class="flex items-center gap-1 rounded-lg bg-islam-green px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-islam-green/90"
						>
							<RefreshCw class="h-4 w-4" />
							{$language === 'fa' ? 'به‌روزرسانی' : 'Update'}
						</button>
						<button
							onclick={dismissUpdate}
							class="rounded-lg px-3 py-1.5 text-sm text-text-secondary transition-colors hover:text-white"
						>
							{$language === 'fa' ? 'بعداً' : 'Later'}
						</button>
					</div>
				</div>
				<button
					onclick={dismissUpdate}
					class="rounded-lg p-1 text-text-muted transition-colors hover:text-white"
					aria-label="Dismiss"
				>
					<X class="h-4 w-4" />
				</button>
			</div>
		</div>
	</div>
{/if}
