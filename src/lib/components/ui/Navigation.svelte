<script lang="ts">
	import { page } from '$app/stores';
	import { t, language, isRTL } from '$lib/i18n';
	import { Home, Layers, PlusCircle, MessageCircle, Settings, Info, Globe } from 'lucide-svelte';

	// Navigation items
	const navItems = [
		{ href: '/', icon: Home, labelKey: 'home' as const },
		{ href: '/wall', icon: Layers, labelKey: 'wall' as const },
		{ href: '/create', icon: PlusCircle, labelKey: 'create' as const },
		{ href: '/threads', icon: MessageCircle, labelKey: 'threads' as const }
	];

	const secondaryItems = [
		{ href: '/settings', icon: Settings, labelKey: 'settings' as const },
		{ href: '/about', icon: Info, labelKey: 'about' as const }
	];

	let mobileMenuOpen = $state(false);

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<!-- Desktop Navigation -->
<nav class="hidden md:block fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-white/10">
	<div class="max-w-6xl mx-auto px-4">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2 text-white font-bold text-lg">
				<span class="text-islam-green">یادبود</span>
				<span class="text-sm text-text-secondary font-normal">Digital Divar</span>
			</a>

			<!-- Main Nav -->
			<div class="flex items-center gap-1">
				{#each navItems as item}
					<a
						href={item.href}
						class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
							{$page.url.pathname === item.href
								? 'bg-islam-green/20 text-islam-green'
								: 'text-text-secondary hover:text-white hover:bg-white/5'}"
					>
						<item.icon class="w-5 h-5" />
						<span>{$t.nav[item.labelKey]}</span>
					</a>
				{/each}
			</div>

			<!-- Right Side -->
			<div class="flex items-center gap-2">
				<!-- Language Toggle -->
				<button
					onclick={() => language.toggle()}
					class="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
					aria-label="Toggle language"
				>
					<Globe class="w-5 h-5" />
					<span class="text-sm">{$language === 'fa' ? 'EN' : 'فا'}</span>
				</button>

				<!-- Secondary Nav -->
				{#each secondaryItems as item}
					<a
						href={item.href}
						class="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
						aria-label={$t.nav[item.labelKey]}
					>
						<item.icon class="w-5 h-5" />
					</a>
				{/each}
			</div>
		</div>
	</div>
</nav>

<!-- Mobile Bottom Navigation -->
<nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-sm border-t border-white/10 safe-area-bottom">
	<div class="flex items-center justify-around h-16 px-2">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg min-w-[64px] transition-colors
					{$page.url.pathname === item.href
						? 'text-islam-green'
						: 'text-text-secondary'}"
			>
				<item.icon class="w-6 h-6" />
				<span class="text-xs">{$t.nav[item.labelKey]}</span>
			</a>
		{/each}

		<!-- More button for secondary items -->
		<button
			onclick={toggleMenu}
			class="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg min-w-[64px] text-text-secondary transition-colors"
			aria-label="More options"
			aria-expanded={mobileMenuOpen}
		>
			<Settings class="w-6 h-6" />
			<span class="text-xs">{$t.nav.settings}</span>
		</button>
	</div>
</nav>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
	<div
		class="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
		onclick={closeMenu}
		onkeydown={(e) => e.key === 'Escape' && closeMenu()}
		role="button"
		tabindex="0"
		aria-label="Close menu"
	></div>

	<div class="md:hidden fixed bottom-20 left-4 right-4 z-50 bg-surface rounded-2xl border border-white/10 p-4 safe-area-bottom">
		<div class="flex flex-col gap-2">
			<!-- Language Toggle -->
			<button
				onclick={() => { language.toggle(); closeMenu(); }}
				class="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
			>
				<Globe class="w-5 h-5" />
				<span>{$language === 'fa' ? 'English' : 'فارسی'}</span>
			</button>

			{#each secondaryItems as item}
				<a
					href={item.href}
					onclick={closeMenu}
					class="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
				>
					<item.icon class="w-5 h-5" />
					<span>{$t.nav[item.labelKey]}</span>
				</a>
			{/each}
		</div>
	</div>
{/if}

<!-- Spacer for fixed navigation -->
<div class="hidden md:block h-16"></div>
<div class="md:hidden h-16"></div>

<style>
	/* Safe area for devices with home indicator */
	.safe-area-bottom {
		padding-bottom: env(safe-area-inset-bottom, 0);
	}
</style>
