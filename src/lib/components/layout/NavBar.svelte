<script lang="ts">
	import Button from '$components/ui/Button.svelte';
	import { GITHUB_URL } from '$lib/config';

	let menuOpen = $state(false);
	let scrollY = $state(0);

	$effect(() => {
		function onScroll() {
			scrollY = window.scrollY;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	$effect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && menuOpen) menuOpen = false;
	}

	const navLinks = [
		{ label: 'Features', href: '#features' },
		{ label: 'Get Started', href: '#how-to-use' },
		{ label: 'GitHub', href: GITHUB_URL, external: true }
	];
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="nav" class:scrolled={scrollY > 20}>
	<div class="nav-border" aria-hidden="true"></div>

	<nav class="nav-inner" aria-label="Main navigation">
		<a href="/" class="nav-logo" aria-label="Home — SvelteKit Landing Page Template">
			<div class="logo-mark" aria-hidden="true"></div>
			<span class="logo-text">svelte-lp</span>
		</a>

		<!-- Desktop links -->
		<ul class="nav-links desktop-only" role="list">
			{#each navLinks as link (link.label)}
				<li>
					{#if link.external}
						<a href={link.href} class="nav-link" target="_blank" rel="noopener noreferrer"
							>{link.label}</a
						>
					{:else}
						<a href={link.href} class="nav-link">{link.label}</a>
					{/if}
				</li>
			{/each}
		</ul>

		<Button
			href={GITHUB_URL}
			target="_blank"
			rel="noopener noreferrer"
			class="nav-cta desktop-only"
		>
			Use Template →
		</Button>

		<!-- Mobile hamburger -->
		<button
			class="hamburger mobile-only"
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
			aria-controls="mobile-menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span class="hbar" class:top-open={menuOpen}></span>
			<span class="hbar" class:mid-open={menuOpen}></span>
			<span class="hbar" class:bot-open={menuOpen}></span>
		</button>
	</nav>

	<!-- Mobile menu -->
	<div
		id="mobile-menu"
		class="mobile-menu"
		class:open={menuOpen}
		aria-hidden={!menuOpen}
		inert={!menuOpen}
	>
		<ul role="list">
			{#each navLinks as link (link.label)}
				<li>
					{#if link.external}
						<a
							href={link.href}
							class="mobile-link"
							target="_blank"
							rel="noopener noreferrer"
							onclick={() => (menuOpen = false)}>{link.label}</a
						>
					{:else}
						<a href={link.href} class="mobile-link" onclick={() => (menuOpen = false)}
							>{link.label}</a
						>
					{/if}
				</li>
			{/each}
			<li style="margin-top:1rem;">
				<Button href={GITHUB_URL} target="_blank" rel="noopener noreferrer" class="w-full">
					Use Template →
				</Button>
			</li>
		</ul>
	</div>
</header>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		transition:
			background 0.3s,
			backdrop-filter 0.3s;
	}

	.nav.scrolled {
		background: rgba(3, 14, 41, 0.9);
		backdrop-filter: blur(16px);
	}

	.nav-border {
		height: 2px;
		background: linear-gradient(90deg, transparent, #d91e53, #ffba02, #4b2ec6, transparent);
		background-size: 200% 100%;
		animation: gradient-shift 8s ease infinite;
	}

	.nav-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
		height: 4rem;
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.nav-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		margin-right: auto;
	}

	.logo-mark {
		width: 26px;
		height: 26px;
		background: linear-gradient(135deg, #d91e53, #9b1c3a);
		border-radius: 6px;
		flex-shrink: 0;
	}

	.logo-text {
		font-weight: 700;
		font-size: 1rem;
		color: white;
	}

	.nav-links {
		display: flex;
		list-style: none;
		gap: 1.5rem;
		margin: 0;
		padding: 0;
	}

	.nav-link {
		color: var(--color-text-secondary, #b8c4d8);
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.2s;
	}

	.nav-link:hover {
		color: white;
	}

	.hamburger {
		display: flex;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
		margin-left: auto;
	}

	.hbar {
		display: block;
		width: 22px;
		height: 2px;
		background: white;
		border-radius: 2px;
		transition:
			transform 0.25s,
			opacity 0.25s;
	}

	.top-open {
		transform: translateY(7px) rotate(45deg);
	}
	.mid-open {
		opacity: 0;
	}
	.bot-open {
		transform: translateY(-7px) rotate(-45deg);
	}

	.mobile-menu {
		overflow: hidden;
		max-height: 0;
		transition: max-height 0.3s ease;
		background: rgba(3, 14, 41, 0.97);
		backdrop-filter: blur(16px);
	}

	.mobile-menu.open {
		max-height: 420px;
	}

	.mobile-menu ul {
		list-style: none;
		margin: 0;
		padding: 1rem 1.5rem 1.5rem;
	}

	.mobile-link {
		display: block;
		padding: 0.85rem 0;
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		font-size: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		transition: color 0.2s;
	}

	.mobile-link:hover {
		color: white;
	}

	.desktop-only {
		display: none;
	}

	@media (min-width: 768px) {
		.desktop-only {
			display: flex;
		}
		.mobile-only {
			display: none;
		}
		.mobile-menu {
			display: none;
		}
	}

	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
</style>
