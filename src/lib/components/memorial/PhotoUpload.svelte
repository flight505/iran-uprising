<script lang="ts">
	import { Camera, Upload, X, RotateCcw } from 'lucide-svelte';
	import { t } from '$lib/i18n';

	interface Props {
		onUpload: (data: string, mimeType: string) => void;
		disabled?: boolean;
	}

	let { onUpload, disabled = false }: Props = $props();

	// State
	let fileInput: HTMLInputElement;
	let canvas: HTMLCanvasElement;
	let previewUrl = $state<string | null>(null);
	let processing = $state(false);
	let error = $state<string | null>(null);

	// Handle file selection
	async function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (!file) return;

		// Validate file type
		if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
			error = 'Please upload a JPEG, PNG, or WebP image';
			return;
		}

		// Validate file size (5MB max)
		if (file.size > 5 * 1024 * 1024) {
			error = 'Image must be smaller than 5MB';
			return;
		}

		error = null;
		processing = true;

		try {
			const processedImage = await processImage(file);
			previewUrl = processedImage.dataUrl;
		} catch (err) {
			error = 'Failed to process image';
			console.error(err);
		} finally {
			processing = false;
		}
	}

	// Process image: resize, add black ribbon
	async function processImage(
		file: File
	): Promise<{ dataUrl: string; base64: string; mimeType: string }> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			const reader = new FileReader();

			reader.onload = () => {
				img.src = reader.result as string;
			};

			img.onload = () => {
				const ctx = canvas.getContext('2d');
				if (!ctx) {
					reject(new Error('Canvas not supported'));
					return;
				}

				// Calculate dimensions (max 1200px, maintain aspect ratio)
				const maxSize = 1200;
				let width = img.width;
				let height = img.height;

				if (width > maxSize || height > maxSize) {
					if (width > height) {
						height = (height / width) * maxSize;
						width = maxSize;
					} else {
						width = (width / height) * maxSize;
						height = maxSize;
					}
				}

				// Set canvas size
				canvas.width = width;
				canvas.height = height;

				// Draw image
				ctx.drawImage(img, 0, 0, width, height);

				// Draw black ribbon in top-right corner
				drawBlackRibbon(ctx, width, height);

				// Get data URL
				const mimeType = 'image/jpeg';
				const dataUrl = canvas.toDataURL(mimeType, 0.85);
				const base64 = dataUrl.split(',')[1];

				resolve({ dataUrl, base64, mimeType });
			};

			img.onerror = () => reject(new Error('Failed to load image'));
			reader.onerror = () => reject(new Error('Failed to read file'));
			reader.readAsDataURL(file);
		});
	}

	// Draw black ribbon overlay
	function drawBlackRibbon(ctx: CanvasRenderingContext2D, width: number, height: number) {
		const ribbonWidth = Math.min(width, height) * 0.15;
		const ribbonLength = ribbonWidth * 3;

		// Save context
		ctx.save();

		// Position at top-right corner
		ctx.translate(width, 0);
		ctx.rotate((45 * Math.PI) / 180);

		// Draw ribbon shadow
		ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
		ctx.fillRect(-ribbonLength / 2 + 3, 3, ribbonLength, ribbonWidth);

		// Draw ribbon
		ctx.fillStyle = '#000000';
		ctx.fillRect(-ribbonLength / 2, 0, ribbonLength, ribbonWidth);

		// Add subtle highlight
		const gradient = ctx.createLinearGradient(
			-ribbonLength / 2,
			0,
			-ribbonLength / 2,
			ribbonWidth
		);
		gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
		gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
		gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
		ctx.fillStyle = gradient;
		ctx.fillRect(-ribbonLength / 2, 0, ribbonLength, ribbonWidth);

		// Add text
		ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
		ctx.font = `${ribbonWidth * 0.3}px sans-serif`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('یادبود', 0, ribbonWidth / 2);

		// Restore context
		ctx.restore();
	}

	// Confirm and upload
	function confirmUpload() {
		if (!previewUrl) return;

		const base64 = previewUrl.split(',')[1];
		onUpload(base64, 'image/jpeg');
	}

	// Reset
	function reset() {
		previewUrl = null;
		error = null;
		if (fileInput) {
			fileInput.value = '';
		}
	}

	// Trigger file input
	function openFilePicker() {
		fileInput?.click();
	}
</script>

<!-- Hidden canvas for processing -->
<canvas bind:this={canvas} class="hidden"></canvas>

<!-- Hidden file input -->
<input
	bind:this={fileInput}
	type="file"
	accept="image/jpeg,image/png,image/webp"
	onchange={handleFileSelect}
	class="hidden"
	{disabled}
/>

<div class="photo-upload">
	{#if previewUrl}
		<!-- Preview -->
		<div class="relative">
			<div class="aspect-[3/4] overflow-hidden rounded-xl">
				<img src={previewUrl} alt="Preview" class="h-full w-full object-cover" />
			</div>

			<!-- Actions -->
			<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
				<button
					onclick={reset}
					class="flex items-center gap-2 rounded-lg bg-surface/90 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-surface"
				>
					<RotateCcw class="h-4 w-4" />
					<span>تغییر</span>
				</button>
				<button
					onclick={confirmUpload}
					disabled={disabled || processing}
					class="flex items-center gap-2 rounded-lg bg-islam-green/90 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-islam-green disabled:opacity-50"
				>
					<Upload class="h-4 w-4" />
					<span>تأیید</span>
				</button>
			</div>
		</div>
	{:else}
		<!-- Upload area -->
		<button
			onclick={openFilePicker}
			disabled={disabled || processing}
			class="group flex aspect-[3/4] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-surface/50 transition-all hover:border-white/40 hover:bg-surface disabled:opacity-50"
		>
			{#if processing}
				<div class="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-amber-glow">
				</div>
				<p class="mt-4 text-text-secondary">{$t.common.loading}</p>
			{:else}
				<div
					class="rounded-full bg-surface-raised p-6 transition-transform group-hover:scale-110"
				>
					<Camera class="h-12 w-12 text-text-muted" />
				</div>
				<p class="mt-4 text-white">{$t.create.photoLabel}</p>
				<p class="mt-1 text-sm text-text-muted">{$t.create.photoHint}</p>
				<p class="mt-2 text-xs text-text-muted">JPEG, PNG, WebP • Max 5MB</p>
			{/if}
		</button>
	{/if}

	<!-- Error message -->
	{#if error}
		<div class="mt-3 flex items-center gap-2 rounded-lg bg-blood-red/20 px-4 py-2 text-sm text-blood-red">
			<X class="h-4 w-4" />
			<span>{error}</span>
		</div>
	{/if}
</div>
