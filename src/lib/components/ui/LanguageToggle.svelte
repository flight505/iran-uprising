<script lang="ts">
	import { language } from '$lib/i18n';
	import { Globe } from 'lucide-svelte';
</script>

<button
	onclick={() => language.toggle()}
	class="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
	aria-label="Toggle language"
>
	<Globe class="w-5 h-5" />
	<span class="text-sm font-medium">
		{$language === 'fa' ? 'EN' : 'فا'}
	</span>
</button>
