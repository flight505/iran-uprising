<script lang="ts">
	import { onMount } from 'svelte';
	import { MessageSquare, Plus, Lock, Users, Heart } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import { getThreads } from '$lib/messaging';

	// Thread type
	interface Thread {
		hash: string;
		type: string;
		title?: string;
		messageCount: number;
		createdDay: string;
	}

	// State
	let threads = $state<Thread[]>([]);
	let loading = $state(true);
	let activeTab = $state<'open' | 'private'>('open');

	// Load threads
	async function loadThreads() {
		loading = true;
		try {
			threads = await getThreads({ type: activeTab });
		} catch (err) {
			console.error('Failed to load threads:', err);
		} finally {
			loading = false;
		}
	}

	// Format date
	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		const now = new Date();
		const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return 'امروز';
		if (diffDays === 1) return 'دیروز';
		if (diffDays < 7) return `${diffDays} روز پیش`;

		return date.toLocaleDateString('fa-IR');
	}

	// Get thread icon
	function getThreadIcon(type: string) {
		switch (type) {
			case 'private':
				return Lock;
			case 'memorial':
				return Heart;
			default:
				return Users;
		}
	}

	// Tab change
	function switchTab(tab: 'open' | 'private') {
		activeTab = tab;
		loadThreads();
	}

	onMount(() => {
		loadThreads();
	});
</script>

<svelte:head>
	<title>{$t.nav.threads} | Iran Uprising</title>
</svelte:head>

<div class="min-h-screen bg-night-sky pb-20 pt-20">
	<div class="mx-auto max-w-2xl px-4">
		<!-- Header -->
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-2xl font-bold text-white">{$t.nav.threads}</h1>
			<a
				href="/threads/new"
				class="flex items-center gap-2 rounded-xl bg-amber-glow px-4 py-2 text-sm font-medium text-night-sky transition-colors hover:bg-amber-glow/90"
			>
				<Plus class="h-4 w-4" />
				<span>گفتگوی جدید</span>
			</a>
		</div>

		<!-- Tabs -->
		<div class="mb-6 flex gap-2 rounded-xl bg-surface p-1">
			<button
				onclick={() => switchTab('open')}
				class="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors"
				class:bg-surface-raised={activeTab === 'open'}
				class:text-white={activeTab === 'open'}
				class:text-text-muted={activeTab !== 'open'}
			>
				<Users class="h-4 w-4" />
				<span>عمومی</span>
			</button>
			<button
				onclick={() => switchTab('private')}
				class="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors"
				class:bg-surface-raised={activeTab === 'private'}
				class:text-white={activeTab === 'private'}
				class:text-text-muted={activeTab !== 'private'}
			>
				<Lock class="h-4 w-4" />
				<span>خصوصی</span>
			</button>
		</div>

		<!-- Thread List -->
		{#if loading}
			<div class="flex items-center justify-center py-12">
				<div class="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-amber-glow">
				</div>
			</div>
		{:else if threads.length === 0}
			<div class="rounded-xl bg-surface p-8 text-center">
				<MessageSquare class="mx-auto mb-4 h-12 w-12 text-text-muted" />
				<p class="text-text-secondary">هنوز گفتگویی وجود ندارد</p>
				<a
					href="/threads/new"
					class="mt-4 inline-flex items-center gap-2 text-amber-glow hover:underline"
				>
					<Plus class="h-4 w-4" />
					<span>اولین گفتگو را شروع کنید</span>
				</a>
			</div>
		{:else}
			<div class="space-y-3">
				{#each threads as thread (thread.hash)}
					{@const Icon = getThreadIcon(thread.type)}
					<a
						href="/threads/{thread.hash}"
						class="block rounded-xl bg-surface p-4 transition-colors hover:bg-surface-raised"
					>
						<div class="flex items-start gap-3">
							<div class="rounded-lg bg-surface-raised p-2">
								<Icon class="h-5 w-5 text-text-muted" />
							</div>
							<div class="min-w-0 flex-1">
								<h3 class="truncate font-medium text-white">
									{thread.title || 'گفتگوی بدون عنوان'}
								</h3>
								<div class="mt-1 flex items-center gap-3 text-sm text-text-muted">
									<span class="ltr-numbers">{thread.messageCount} پیام</span>
									<span>•</span>
									<span>{formatDate(thread.createdDay)}</span>
								</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
