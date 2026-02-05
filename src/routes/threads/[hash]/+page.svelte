<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { ArrowLeft, Send, Lock, Shield } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import { initializeMessaging, sendSecureMessage, receiveMessages, type DecryptedMessage } from '$lib/messaging';

	// State
	let messages = $state<DecryptedMessage[]>([]);
	let newMessage = $state('');
	let loading = $state(true);
	let sending = $state(false);
	let error = $state<string | null>(null);
	let initialized = $state(false);
	let messagesContainer: HTMLDivElement;

	// Get hash from URL
	const hash = $derived($page.params.hash);

	// Initialize encryption and load messages
	async function initialize() {
		if (!hash) return;

		try {
			// Initialize Signal Protocol
			await initializeMessaging();
			initialized = true;

			// Load messages
			await loadMessages();
		} catch (err) {
			error = 'Failed to initialize secure messaging';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	// Load messages
	async function loadMessages() {
		if (!hash) return;

		try {
			messages = await receiveMessages(hash);
			scrollToBottom();
		} catch (err) {
			console.error('Failed to load messages:', err);
		}
	}

	// Send message
	async function handleSend() {
		if (!newMessage.trim() || !hash || sending) return;

		sending = true;
		error = null;

		try {
			// For now, send to the thread (in a real app, we'd have recipient selection)
			await sendSecureMessage(hash, hash, newMessage.trim());
			newMessage = '';
			await loadMessages();
		} catch (err) {
			error = 'Failed to send message';
			console.error(err);
		} finally {
			sending = false;
		}
	}

	// Handle Enter key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSend();
		}
	}

	// Scroll to bottom of messages
	function scrollToBottom() {
		if (messagesContainer) {
			setTimeout(() => {
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			}, 100);
		}
	}

	// Format time
	function formatTime(dateStr: string): string {
		return new Date(dateStr).toLocaleTimeString('fa-IR', {
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	// Polling for new messages
	let pollInterval: ReturnType<typeof setInterval>;

	onMount(() => {
		initialize();

		// Poll for new messages every 10 seconds
		pollInterval = setInterval(loadMessages, 10000);
	});

	onDestroy(() => {
		if (pollInterval) clearInterval(pollInterval);
	});
</script>

<svelte:head>
	<title>گفتگو | Iran Uprising</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-night-sky pt-16">
	<!-- Header -->
	<header class="border-b border-white/10 bg-surface px-4 py-3">
		<div class="mx-auto flex max-w-2xl items-center gap-3">
			<a href="/threads" class="rounded-lg p-2 transition-colors hover:bg-surface-raised">
				<ArrowLeft class="h-5 w-5 text-text-secondary" />
			</a>
			<div class="flex-1">
				<h1 class="font-medium text-white">گفتگوی امن</h1>
				<div class="flex items-center gap-1 text-xs text-islam-green">
					<Shield class="h-3 w-3" />
					<span>رمزنگاری سرتاسری</span>
				</div>
			</div>
			<div class="rounded-lg bg-islam-green/20 p-2">
				<Lock class="h-5 w-5 text-islam-green" />
			</div>
		</div>
	</header>

	<!-- Messages -->
	<div
		bind:this={messagesContainer}
		class="flex-1 overflow-y-auto px-4 py-4"
		style="max-height: calc(100vh - 180px);"
	>
		<div class="mx-auto max-w-2xl space-y-4">
			{#if loading}
				<div class="flex items-center justify-center py-12">
					<div
						class="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-amber-glow"
					></div>
				</div>
			{:else if !initialized}
				<div class="rounded-xl bg-blood-red/20 p-4 text-center text-blood-red">
					<p>{error || 'Failed to initialize encryption'}</p>
				</div>
			{:else if messages.length === 0}
				<div class="rounded-xl bg-surface p-8 text-center">
					<Lock class="mx-auto mb-4 h-12 w-12 text-text-muted" />
					<p class="text-text-secondary">هنوز پیامی ارسال نشده است</p>
					<p class="mt-2 text-sm text-text-muted">
						پیام‌های شما با رمزنگاری سرتاسری محافظت می‌شوند
					</p>
				</div>
			{:else}
				{#each messages as msg (msg.id)}
					<div class="rounded-xl bg-surface p-4">
						<p class="text-white">{msg.plaintext}</p>
						<div class="mt-2 flex items-center justify-between text-xs text-text-muted">
							<span class="flex items-center gap-1">
								<Shield class="h-3 w-3 text-islam-green" />
								<span>رمزنگاری شده</span>
							</span>
							<span class="ltr-numbers">{formatTime(msg.timestamp)}</span>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<!-- Input -->
	<div class="border-t border-white/10 bg-surface p-4 pb-20 md:pb-4">
		<div class="mx-auto max-w-2xl">
			{#if error}
				<div class="mb-3 rounded-lg bg-blood-red/20 px-3 py-2 text-sm text-blood-red">
					{error}
				</div>
			{/if}

			<div class="flex gap-3">
				<textarea
					bind:value={newMessage}
					onkeydown={handleKeydown}
					placeholder="پیام خود را بنویسید..."
					rows="1"
					disabled={!initialized || sending}
					class="flex-1 resize-none rounded-xl border border-white/10 bg-surface-raised px-4 py-3 text-white placeholder-text-muted focus:border-amber-glow/50 focus:outline-none focus:ring-1 focus:ring-amber-glow/50 disabled:opacity-50"
					dir="rtl"
				></textarea>
				<button
					onclick={handleSend}
					disabled={!newMessage.trim() || !initialized || sending}
					class="flex items-center justify-center rounded-xl bg-amber-glow px-4 text-night-sky transition-all hover:bg-amber-glow/90 active:scale-95 disabled:opacity-50"
				>
					{#if sending}
						<div
							class="h-5 w-5 animate-spin rounded-full border-2 border-night-sky border-t-transparent"
						></div>
					{:else}
						<Send class="h-5 w-5" />
					{/if}
				</button>
			</div>

			<p class="mt-2 text-center text-xs text-text-muted">
				<Shield class="inline h-3 w-3" />
				پیام‌ها با پروتکل Signal رمزنگاری می‌شوند
			</p>
		</div>
	</div>
</div>
