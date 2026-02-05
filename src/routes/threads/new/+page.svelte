<script lang="ts">
	import { goto } from '$app/navigation';
	import { ArrowLeft, Users, Lock, Shield } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import { createThread } from '$lib/messaging';

	// State
	let title = $state('');
	let threadType = $state<'open' | 'private'>('open');
	let creating = $state(false);
	let error = $state<string | null>(null);

	// Create thread
	async function handleCreate() {
		if (creating) return;

		creating = true;
		error = null;

		try {
			const hash = await createThread({
				type: threadType,
				title: title.trim() || undefined
			});

			// Navigate to the new thread
			goto(`/threads/${hash}`);
		} catch (err) {
			error = 'خطا در ایجاد گفتگو';
			console.error(err);
		} finally {
			creating = false;
		}
	}
</script>

<svelte:head>
	<title>گفتگوی جدید | Iran Uprising</title>
</svelte:head>

<div class="min-h-screen bg-night-sky pb-20 pt-20">
	<div class="mx-auto max-w-md px-4">
		<!-- Back link -->
		<a
			href="/threads"
			class="mb-6 inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-white"
		>
			<ArrowLeft class="h-5 w-5" />
			<span>بازگشت</span>
		</a>

		<h1 class="mb-6 text-2xl font-bold text-white">گفتگوی جدید</h1>

		<div class="space-y-6">
			<!-- Thread Type Selection -->
			<div>
				<label class="mb-3 block text-sm font-medium text-text-secondary"> نوع گفتگو </label>
				<div class="grid grid-cols-2 gap-3">
					<button
						onclick={() => (threadType = 'open')}
						class="rounded-xl border-2 p-4 text-center transition-all {threadType === 'open'
							? 'border-amber-glow bg-amber-glow/10'
							: 'border-white/10 bg-surface'}"
					>
						<span class="mx-auto mb-2 flex justify-center {threadType === 'open' ? 'text-amber-glow' : 'text-text-muted'}">
							<Users class="h-8 w-8" />
						</span>
						<p class="font-medium {threadType === 'open' ? 'text-white' : 'text-text-secondary'}">
							عمومی
						</p>
						<p class="mt-1 text-xs text-text-muted">همه می‌توانند ببینند</p>
					</button>

					<button
						onclick={() => (threadType = 'private')}
						class="rounded-xl border-2 p-4 text-center transition-all {threadType === 'private'
							? 'border-islam-green bg-islam-green/10'
							: 'border-white/10 bg-surface'}"
					>
						<span class="mx-auto mb-2 flex justify-center {threadType === 'private' ? 'text-islam-green' : 'text-text-muted'}">
							<Lock class="h-8 w-8" />
						</span>
						<p class="font-medium {threadType === 'private' ? 'text-white' : 'text-text-secondary'}">
							خصوصی
						</p>
						<p class="mt-1 text-xs text-text-muted">فقط دعوت‌شدگان</p>
					</button>
				</div>
			</div>

			<!-- Title -->
			<div>
				<label for="title" class="mb-2 block text-sm font-medium text-text-secondary">
					عنوان (اختیاری)
				</label>
				<input
					id="title"
					type="text"
					bind:value={title}
					placeholder="عنوان گفتگو..."
					disabled={creating}
					class="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-white placeholder-text-muted focus:border-amber-glow/50 focus:outline-none focus:ring-1 focus:ring-amber-glow/50 disabled:opacity-50"
					dir="rtl"
				/>
			</div>

			<!-- Encryption notice -->
			<div class="flex items-start gap-3 rounded-xl bg-islam-green/10 p-4">
				<Shield class="h-6 w-6 flex-shrink-0 text-islam-green" />
				<div>
					<p class="font-medium text-islam-green">رمزنگاری سرتاسری</p>
					<p class="mt-1 text-sm text-text-secondary">
						تمام پیام‌ها با پروتکل Signal رمزنگاری می‌شوند. حتی سرور هم نمی‌تواند پیام‌ها را بخواند.
					</p>
				</div>
			</div>

			<!-- Error -->
			{#if error}
				<div class="rounded-xl bg-blood-red/20 p-4 text-blood-red">
					{error}
				</div>
			{/if}

			<!-- Submit -->
			<button
				onclick={handleCreate}
				disabled={creating}
				class="w-full rounded-xl bg-amber-glow px-6 py-4 font-semibold text-night-sky transition-all hover:bg-amber-glow/90 active:scale-[0.98] disabled:opacity-50"
			>
				{#if creating}
					<span class="flex items-center justify-center gap-2">
						<span
							class="h-5 w-5 animate-spin rounded-full border-2 border-night-sky border-t-transparent"
						></span>
						در حال ایجاد...
					</span>
				{:else}
					ایجاد گفتگو
				{/if}
			</button>
		</div>
	</div>
</div>
