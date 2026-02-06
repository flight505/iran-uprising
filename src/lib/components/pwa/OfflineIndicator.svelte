<script lang="ts">
	import { WifiOff, RefreshCw } from 'lucide-svelte';
	import { isOnline, isSyncing, pendingCount } from '$lib/offline';
	import { language } from '$lib/i18n';
</script>

{#if !$isOnline}
	<div
		class="fixed top-16 left-0 right-0 z-40 bg-amber-glow/90 px-4 py-2 text-center md:top-0"
		role="alert"
	>
		<div class="flex items-center justify-center gap-2 text-night-sky">
			<WifiOff class="h-4 w-4" />
			<span class="text-sm font-medium">
				{$language === 'fa' ? 'آفلاین هستید' : "You're offline"}
			</span>
			{#if $pendingCount > 0}
				<span class="rounded-full bg-night-sky/20 px-2 py-0.5 text-xs">
					{$pendingCount} {$language === 'fa' ? 'در انتظار' : 'pending'}
				</span>
			{/if}
		</div>
	</div>
{:else if $isSyncing}
	<div
		class="fixed top-16 left-0 right-0 z-40 bg-islam-green/90 px-4 py-2 text-center md:top-0"
		role="status"
	>
		<div class="flex items-center justify-center gap-2 text-white">
			<RefreshCw class="h-4 w-4 animate-spin" />
			<span class="text-sm font-medium">
				{$language === 'fa' ? 'در حال همگام‌سازی...' : 'Syncing...'}
			</span>
		</div>
	</div>
{/if}
