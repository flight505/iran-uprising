<script lang="ts">
	import { goto } from '$app/navigation';
	import { Check, AlertCircle } from 'lucide-svelte';
	import { t, isRTL } from '$lib/i18n';
	import { PhotoUpload } from '$lib/components/memorial';
	import { uploadPhoto, createMemorial } from '$lib/api';

	// Form state
	let photoHash = $state<string | null>(null);
	let namePersian = $state('');
	let nameLatin = $state('');
	let age = $state<number | undefined>(undefined);
	let dateOfDeath = $state('');
	let location = $state('');
	let circumstances = $state('');

	// UI state
	let submitting = $state(false);
	let error = $state<string | null>(null);
	let success = $state(false);

	// Validation
	let isValid = $derived(
		photoHash !== null && namePersian.trim().length > 0 && dateOfDeath.length > 0 && location.trim().length > 0
	);

	// Handle photo upload
	async function handlePhotoUpload(data: string, mimeType: string) {
		try {
			const result = await uploadPhoto(data, mimeType);
			photoHash = result.hash;
		} catch (err) {
			error = 'Failed to upload photo';
			console.error(err);
		}
	}

	// Handle form submission
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!isValid || !photoHash) return;

		submitting = true;
		error = null;

		try {
			const result = await createMemorial({
				photo_hash: photoHash,
				name_persian: namePersian.trim(),
				name_latin: nameLatin.trim() || undefined,
				age: age || undefined,
				date_death: dateOfDeath,
				location: location.trim(),
				circumstances: circumstances.trim() || undefined
			});

			success = true;

			// Redirect to the new memorial after a brief delay
			setTimeout(() => {
				goto(`/memorial/${result.hash}`);
			}, 2000);
		} catch (err) {
			error = 'Failed to create memorial. Please try again.';
			console.error(err);
		} finally {
			submitting = false;
		}
	}

	// Iranian cities for autocomplete
	const iranianCities = [
		'تهران',
		'مشهد',
		'اصفهان',
		'شیراز',
		'تبریز',
		'کرج',
		'اهواز',
		'قم',
		'کرمانشاه',
		'ارومیه',
		'رشت',
		'زاهدان',
		'همدان',
		'کرمان',
		'یزد',
		'اردبیل',
		'بندرعباس',
		'اراک',
		'سنندج',
		'قزوین',
		'زنجان',
		'خرم‌آباد',
		'گرگان',
		'ساری',
		'ایلام',
		'بجنورد',
		'بیرجند',
		'بوشهر',
		'سمنان',
		'شهرکرد',
		'یاسوج'
	];
</script>

<svelte:head>
	<title>{$t.create.title} | Iran Uprising</title>
</svelte:head>

<div class="min-h-screen bg-night-sky pb-20 pt-20">
	<div class="mx-auto max-w-2xl px-4">
		<h1 class="mb-8 text-3xl font-bold text-white">{$t.create.title}</h1>

		{#if success}
			<!-- Success message -->
			<div class="rounded-xl bg-islam-green/20 p-8 text-center">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-islam-green">
					<Check class="h-8 w-8 text-white" />
				</div>
				<h2 class="mb-2 text-2xl font-bold text-white">{$t.create.success}</h2>
				<p class="text-text-secondary">Redirecting to memorial...</p>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-6">
				<!-- Photo upload -->
				<div>
					<label class="mb-2 block text-sm font-medium text-text-secondary">
						{$t.create.photoLabel} <span class="text-blood-red">*</span>
					</label>
					<div class="max-w-xs">
						<PhotoUpload onUpload={handlePhotoUpload} disabled={submitting} />
					</div>
					{#if photoHash}
						<p class="mt-2 text-sm text-islam-green">✓ Photo uploaded</p>
					{/if}
				</div>

				<!-- Name (Persian) -->
				<div>
					<label for="namePersian" class="mb-2 block text-sm font-medium text-text-secondary">
						{$t.create.namePersian} <span class="text-blood-red">*</span>
					</label>
					<input
						id="namePersian"
						type="text"
						bind:value={namePersian}
						required
						disabled={submitting}
						placeholder="نام کامل"
						class="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-white placeholder-text-muted focus:border-amber-glow/50 focus:outline-none focus:ring-1 focus:ring-amber-glow/50 disabled:opacity-50"
						dir="rtl"
					/>
				</div>

				<!-- Name (Latin) -->
				<div>
					<label for="nameLatin" class="mb-2 block text-sm font-medium text-text-secondary">
						{$t.create.nameLatin}
					</label>
					<input
						id="nameLatin"
						type="text"
						bind:value={nameLatin}
						disabled={submitting}
						placeholder="Full name in English"
						class="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-white placeholder-text-muted font-latin focus:border-amber-glow/50 focus:outline-none focus:ring-1 focus:ring-amber-glow/50 disabled:opacity-50"
						dir="ltr"
					/>
				</div>

				<!-- Age and Date row -->
				<div class="grid gap-4 sm:grid-cols-2">
					<!-- Age -->
					<div>
						<label for="age" class="mb-2 block text-sm font-medium text-text-secondary">
							{$t.create.age}
						</label>
						<input
							id="age"
							type="number"
							bind:value={age}
							min="0"
							max="150"
							disabled={submitting}
							placeholder="سن"
							class="ltr-numbers w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-white placeholder-text-muted focus:border-amber-glow/50 focus:outline-none focus:ring-1 focus:ring-amber-glow/50 disabled:opacity-50"
						/>
					</div>

					<!-- Date of Death -->
					<div>
						<label for="dateOfDeath" class="mb-2 block text-sm font-medium text-text-secondary">
							{$t.create.dateOfDeath} <span class="text-blood-red">*</span>
						</label>
						<input
							id="dateOfDeath"
							type="date"
							bind:value={dateOfDeath}
							required
							disabled={submitting}
							class="ltr-numbers w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-white focus:border-amber-glow/50 focus:outline-none focus:ring-1 focus:ring-amber-glow/50 disabled:opacity-50"
						/>
					</div>
				</div>

				<!-- Location -->
				<div>
					<label for="location" class="mb-2 block text-sm font-medium text-text-secondary">
						{$t.create.location} <span class="text-blood-red">*</span>
					</label>
					<input
						id="location"
						type="text"
						bind:value={location}
						required
						disabled={submitting}
						list="cities"
						placeholder="شهر یا استان"
						class="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-white placeholder-text-muted focus:border-amber-glow/50 focus:outline-none focus:ring-1 focus:ring-amber-glow/50 disabled:opacity-50"
						dir="rtl"
					/>
					<datalist id="cities">
						{#each iranianCities as city}
							<option value={city}></option>
						{/each}
					</datalist>
				</div>

				<!-- Circumstances -->
				<div>
					<label for="circumstances" class="mb-2 block text-sm font-medium text-text-secondary">
						{$t.create.circumstances}
					</label>
					<textarea
						id="circumstances"
						bind:value={circumstances}
						disabled={submitting}
						rows="4"
						placeholder="شرح شرایط شهادت (اختیاری)"
						class="w-full resize-none rounded-xl border border-white/10 bg-surface px-4 py-3 text-white placeholder-text-muted focus:border-amber-glow/50 focus:outline-none focus:ring-1 focus:ring-amber-glow/50 disabled:opacity-50"
						dir="rtl"
					></textarea>
				</div>

				<!-- Error message -->
				{#if error}
					<div class="flex items-center gap-2 rounded-xl bg-blood-red/20 px-4 py-3 text-blood-red">
						<AlertCircle class="h-5 w-5 flex-shrink-0" />
						<span>{error}</span>
					</div>
				{/if}

				<!-- Submit button -->
				<button
					type="submit"
					disabled={!isValid || submitting}
					class="w-full rounded-xl bg-amber-glow px-6 py-4 text-lg font-semibold text-night-sky transition-all hover:bg-amber-glow/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if submitting}
						<span class="flex items-center justify-center gap-2">
							<span class="h-5 w-5 animate-spin rounded-full border-2 border-night-sky border-t-transparent">
							</span>
							{$t.create.submitting}
						</span>
					{:else}
						{$t.create.submit}
					{/if}
				</button>

				<!-- Privacy notice -->
				<p class="text-center text-sm text-text-muted">
					{$t.footer.noTracking}
				</p>
			</form>
		{/if}
	</div>
</div>
