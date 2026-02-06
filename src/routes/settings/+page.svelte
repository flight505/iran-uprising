<script lang="ts">
	import { onMount } from 'svelte';
	import {
		ArrowLeft,
		Globe,
		Shield,
		AlertTriangle,
		Trash2,
		Zap,
		Eye,
		EyeOff,
		ExternalLink,
		Download,
		Upload,
		Smartphone,
		HardDrive
	} from 'lucide-svelte';
	import { t, language } from '$lib/i18n';
	import {
		preferences,
		mode,
		isInsideMode,
		triggerPanic,
		checkTorConnection
	} from '$lib/stores';
	import {
		installable,
		isStandalone,
		promptInstall,
		exportMemorialBundle,
		formatBytes,
		getStorageQuota
	} from '$lib/pwa';

	// State
	let panicUrl = $state('');
	let isTorConnected = $state(false);
	let showPanicConfirm = $state(false);
	let cacheSize = $state<string | null>(null);
	let storageInfo = $state<{ usage: string; quota: string; percent: number } | null>(null);
	let exporting = $state(false);
	let importing = $state(false);
	let fileInput: HTMLInputElement;

	// Initialize
	onMount(() => {
		preferences.init();
		panicUrl = $preferences.panicUrl;
		isTorConnected = checkTorConnection();
		estimateCacheSize();
		loadStorageInfo();
	});

	// Load storage info
	async function loadStorageInfo() {
		const quota = await getStorageQuota();
		if (quota) {
			storageInfo = {
				usage: formatBytes(quota.usage),
				quota: formatBytes(quota.quota),
				percent: Math.round(quota.percentUsed)
			};
		}
	}

	// Install app
	async function handleInstall() {
		await promptInstall();
	}

	// Export data
	async function handleExport() {
		exporting = true;
		try {
			const blob = await exportMemorialBundle();
			if (blob) {
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `iran-uprising-backup-${new Date().toISOString().split('T')[0]}.json`;
				a.click();
				URL.revokeObjectURL(url);
			}
		} finally {
			exporting = false;
		}
	}

	// Import data
	async function handleImport(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		importing = true;
		try {
			const { importMemorialBundle } = await import('$lib/pwa');
			await importMemorialBundle(file);
			await loadStorageInfo();
		} finally {
			importing = false;
			input.value = '';
		}
	}

	// Update panic URL
	function updatePanicUrl() {
		if (panicUrl.trim()) {
			// Ensure URL has protocol
			let url = panicUrl.trim();
			if (!url.startsWith('http://') && !url.startsWith('https://')) {
				url = 'https://' + url;
			}
			preferences.setPanicUrl(url);
		}
	}

	// Estimate cache size
	async function estimateCacheSize() {
		if ('storage' in navigator && 'estimate' in navigator.storage) {
			try {
				const estimate = await navigator.storage.estimate();
				if (estimate.usage) {
					const mb = (estimate.usage / (1024 * 1024)).toFixed(2);
					cacheSize = `${mb} MB`;
				}
			} catch {
				cacheSize = null;
			}
		}
	}

	// Clear cache
	async function clearCache() {
		try {
			// Clear caches
			const cacheNames = await caches.keys();
			for (const cacheName of cacheNames) {
				await caches.delete(cacheName);
			}
			cacheSize = '0 MB';
		} catch {
			// Ignore errors
		}
	}

	// Handle panic button
	function handlePanic() {
		if (showPanicConfirm) {
			triggerPanic();
		} else {
			showPanicConfirm = true;
			// Auto-hide confirmation after 5 seconds
			setTimeout(() => {
				showPanicConfirm = false;
			}, 5000);
		}
	}

	// Test panic URL
	function testPanicUrl() {
		window.open(panicUrl || 'https://www.bbc.com/persian', '_blank');
	}
</script>

<svelte:head>
	<title>{$t.settings.title} | Iran Uprising</title>
</svelte:head>

<div class="min-h-screen bg-night-sky pb-20 pt-20">
	<div class="mx-auto max-w-md px-4">
		<!-- Back link -->
		<a
			href="/"
			class="mb-6 inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-white"
		>
			<ArrowLeft class="h-5 w-5" />
			<span>{$language === 'fa' ? 'بازگشت' : 'Back'}</span>
		</a>

		<h1 class="mb-6 text-2xl font-bold text-white">{$t.settings.title}</h1>

		<div class="space-y-6">
			<!-- Mode Selection -->
			<div class="rounded-xl bg-surface p-4">
				<div class="mb-4 flex items-center gap-3">
					<span class="rounded-lg bg-surface-raised p-2">
						<Shield class="h-5 w-5 text-islam-green" />
					</span>
					<div>
						<h2 class="font-medium text-white">{$t.settings.mode}</h2>
						<p class="text-sm text-text-muted">
							{$language === 'fa'
								? 'تنظیمات امنیتی بر اساس موقعیت'
								: 'Security settings based on location'}
						</p>
					</div>
				</div>

				<div class="grid grid-cols-2 gap-3">
					<button
						onclick={() => preferences.setMode('inside')}
						class="rounded-xl border-2 p-4 text-center transition-all {$mode === 'inside'
							? 'border-blood-red bg-blood-red/10'
							: 'border-white/10 bg-surface-raised'}"
					>
						<span
							class="mx-auto mb-2 flex justify-center {$mode === 'inside'
								? 'text-blood-red'
								: 'text-text-muted'}"
						>
							<EyeOff class="h-8 w-8" />
						</span>
						<p class="font-medium {$mode === 'inside' ? 'text-white' : 'text-text-secondary'}">
							{$t.settings.modeInside}
						</p>
						<p class="mt-1 text-xs text-text-muted">
							{$language === 'fa' ? 'حداکثر امنیت' : 'Maximum security'}
						</p>
					</button>

					<button
						onclick={() => preferences.setMode('outside')}
						class="rounded-xl border-2 p-4 text-center transition-all {$mode === 'outside'
							? 'border-amber-glow bg-amber-glow/10'
							: 'border-white/10 bg-surface-raised'}"
					>
						<span
							class="mx-auto mb-2 flex justify-center {$mode === 'outside'
								? 'text-amber-glow'
								: 'text-text-muted'}"
						>
							<Eye class="h-8 w-8" />
						</span>
						<p class="font-medium {$mode === 'outside' ? 'text-white' : 'text-text-secondary'}">
							{$t.settings.modeOutside}
						</p>
						<p class="mt-1 text-xs text-text-muted">
							{$language === 'fa' ? 'عملکرد بهتر' : 'Better performance'}
						</p>
					</button>
				</div>

				{#if $isInsideMode}
					<div class="mt-4 rounded-lg bg-blood-red/10 p-3">
						<p class="text-sm text-blood-red">
							{$language === 'fa'
								? '⚠️ حالت امن فعال است. پیشنهاد می‌شود از Tor استفاده کنید.'
								: '⚠️ Safe mode active. Using Tor is recommended.'}
						</p>
					</div>
				{/if}
			</div>

			<!-- Tor Status -->
			<div class="rounded-xl bg-surface p-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<span
							class="rounded-lg p-2 {isTorConnected
								? 'bg-islam-green/20'
								: 'bg-amber-glow/20'}"
						>
							<Shield class="h-5 w-5 {isTorConnected ? 'text-islam-green' : 'text-amber-glow'}" />
						</span>
						<div>
							<p class="font-medium text-white">Tor</p>
							<p class="text-sm {isTorConnected ? 'text-islam-green' : 'text-amber-glow'}">
								{isTorConnected ? $t.security.torConnected : $t.security.torDisconnected}
							</p>
						</div>
					</div>
					{#if !isTorConnected && $isInsideMode}
						<a
							href="https://www.torproject.org/download/"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-1 rounded-lg bg-islam-green/20 px-3 py-2 text-sm text-islam-green transition-colors hover:bg-islam-green/30"
						>
							{$t.security.useTor}
							<ExternalLink class="h-4 w-4" />
						</a>
					{/if}
				</div>
			</div>

			<!-- Panic Button -->
			<div class="rounded-xl bg-surface p-4">
				<div class="mb-4 flex items-center gap-3">
					<span class="rounded-lg bg-blood-red/20 p-2">
						<Zap class="h-5 w-5 text-blood-red" />
					</span>
					<div>
						<h2 class="font-medium text-white">{$t.settings.panicButton}</h2>
						<p class="text-sm text-text-muted">
							{$language === 'fa'
								? 'خروج سریع و پاک کردن همه داده‌ها'
								: 'Quick exit and clear all data'}
						</p>
					</div>
				</div>

				<!-- Safe URL Input -->
				<div class="mb-4">
					<label for="panic-url" class="mb-2 block text-sm text-text-secondary">
						{$t.settings.panicUrl}
					</label>
					<div class="flex gap-2">
						<input
							id="panic-url"
							type="url"
							bind:value={panicUrl}
							onblur={updatePanicUrl}
							placeholder="https://www.bbc.com/persian"
							class="flex-1 rounded-lg border border-white/10 bg-surface-raised px-3 py-2 text-sm text-white placeholder-text-muted focus:border-amber-glow/50 focus:outline-none"
							dir="ltr"
						/>
						<button
							onclick={testPanicUrl}
							class="rounded-lg bg-surface-raised px-3 py-2 text-text-secondary transition-colors hover:bg-white/10 hover:text-white"
							title={$language === 'fa' ? 'تست' : 'Test'}
						>
							<ExternalLink class="h-4 w-4" />
						</button>
					</div>
				</div>

				<!-- Panic Button -->
				<button
					onclick={handlePanic}
					class="w-full rounded-xl px-4 py-3 font-semibold transition-all {showPanicConfirm
						? 'animate-pulse bg-blood-red text-white'
						: 'bg-blood-red/20 text-blood-red hover:bg-blood-red/30'}"
				>
					{#if showPanicConfirm}
						{$language === 'fa' ? '⚠️ برای تأیید دوباره کلیک کنید' : '⚠️ Click again to confirm'}
					{:else}
						<span class="flex items-center justify-center gap-2">
							<AlertTriangle class="h-5 w-5" />
							{$t.security.panicTriggered}
						</span>
					{/if}
				</button>

				<p class="mt-2 text-center text-xs text-text-muted">
					{$language === 'fa'
						? 'میانبر: Ctrl+Shift+Q'
						: 'Keyboard shortcut: Ctrl+Shift+Q'}
				</p>
			</div>

			<!-- Language -->
			<div class="rounded-xl bg-surface p-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<span class="rounded-lg bg-surface-raised p-2">
							<Globe class="h-5 w-5 text-amber-glow" />
						</span>
						<div>
							<h2 class="font-medium text-white">{$t.settings.language}</h2>
						</div>
					</div>
					<div class="flex gap-2">
						<button
							onclick={() => language.set('fa')}
							class="rounded-lg px-3 py-2 text-sm transition-colors {$language === 'fa'
								? 'bg-amber-glow text-night-sky'
								: 'bg-surface-raised text-text-secondary hover:text-white'}"
						>
							فارسی
						</button>
						<button
							onclick={() => language.set('en')}
							class="rounded-lg px-3 py-2 text-sm transition-colors {$language === 'en'
								? 'bg-amber-glow text-night-sky'
								: 'bg-surface-raised text-text-secondary hover:text-white'}"
						>
							English
						</button>
					</div>
				</div>
			</div>

			<!-- Install App -->
			{#if $installable && !$isStandalone}
				<div class="rounded-xl bg-surface p-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<span class="rounded-lg bg-amber-glow/20 p-2">
								<Smartphone class="h-5 w-5 text-amber-glow" />
							</span>
							<div>
								<h2 class="font-medium text-white">
									{$language === 'fa' ? 'نصب برنامه' : 'Install App'}
								</h2>
								<p class="text-sm text-text-muted">
									{$language === 'fa' ? 'دسترسی سریع‌تر و استفاده آفلاین' : 'Quick access & offline use'}
								</p>
							</div>
						</div>
						<button
							onclick={handleInstall}
							class="flex items-center gap-2 rounded-lg bg-amber-glow px-4 py-2 text-sm font-medium text-night-sky transition-colors hover:bg-amber-glow/90"
						>
							<Download class="h-4 w-4" />
							{$language === 'fa' ? 'نصب' : 'Install'}
						</button>
					</div>
				</div>
			{/if}

			<!-- Storage -->
			<div class="rounded-xl bg-surface p-4">
				<div class="mb-4 flex items-center gap-3">
					<span class="rounded-lg bg-surface-raised p-2">
						<HardDrive class="h-5 w-5 text-text-muted" />
					</span>
					<div>
						<h2 class="font-medium text-white">
							{$language === 'fa' ? 'فضای ذخیره‌سازی' : 'Storage'}
						</h2>
						{#if storageInfo}
							<p class="text-sm text-text-muted">
								{storageInfo.usage} / {storageInfo.quota} ({storageInfo.percent}%)
							</p>
						{/if}
					</div>
				</div>

				{#if storageInfo}
					<div class="mb-4 h-2 overflow-hidden rounded-full bg-surface-raised">
						<div
							class="h-full rounded-full transition-all {storageInfo.percent > 80
								? 'bg-blood-red'
								: storageInfo.percent > 50
									? 'bg-amber-glow'
									: 'bg-islam-green'}"
							style="width: {storageInfo.percent}%"
						></div>
					</div>
				{/if}

				<div class="flex gap-2">
					<button
						onclick={clearCache}
						class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-surface-raised px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-white/10 hover:text-white"
					>
						<Trash2 class="h-4 w-4" />
						{$language === 'fa' ? 'پاک کردن' : 'Clear'}
					</button>
				</div>
			</div>

			<!-- Export/Import -->
			<div class="rounded-xl bg-surface p-4">
				<div class="mb-4 flex items-center gap-3">
					<span class="rounded-lg bg-surface-raised p-2">
						<Download class="h-5 w-5 text-text-muted" />
					</span>
					<div>
						<h2 class="font-medium text-white">
							{$language === 'fa' ? 'پشتیبان‌گیری' : 'Backup'}
						</h2>
						<p class="text-sm text-text-muted">
							{$language === 'fa' ? 'صادرات و واردات داده‌ها' : 'Export and import data'}
						</p>
					</div>
				</div>

				<div class="flex gap-2">
					<button
						onclick={handleExport}
						disabled={exporting}
						class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-surface-raised px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
					>
						{#if exporting}
							<span class="h-4 w-4 animate-spin rounded-full border-2 border-text-muted border-t-transparent"></span>
						{:else}
							<Download class="h-4 w-4" />
						{/if}
						{$language === 'fa' ? 'صادرات' : 'Export'}
					</button>
					<button
						onclick={() => fileInput.click()}
						disabled={importing}
						class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-surface-raised px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
					>
						{#if importing}
							<span class="h-4 w-4 animate-spin rounded-full border-2 border-text-muted border-t-transparent"></span>
						{:else}
							<Upload class="h-4 w-4" />
						{/if}
						{$language === 'fa' ? 'واردات' : 'Import'}
					</button>
					<input
						bind:this={fileInput}
						type="file"
						accept=".json"
						onchange={handleImport}
						class="hidden"
					/>
				</div>
			</div>

			<!-- Version -->
			<div class="text-center text-sm text-text-muted">
				{$t.settings.version}: 0.1.0
			</div>
		</div>
	</div>
</div>
