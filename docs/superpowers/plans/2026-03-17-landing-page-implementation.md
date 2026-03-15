# SvelteKit MDsveX Landing Page Template — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready SvelteKit landing page template — single page, dark-tech aesthetic, immersive hero, 7 content sections, fully SSG, deployed to a private GitHub repository.

**Architecture:** Component-per-section using Svelte 5 runes. `+page.svelte` is a thin orchestrator. All design tokens in `app.css` via Tailwind v4 `@theme` block. No server-side data fetching — fully static.

**Tech Stack:** SvelteKit 2, Svelte 5 (runes), Tailwind CSS v4 + `@tailwindcss/vite`, MDsveX, TypeScript 5, Vite 6, `adapter-vercel`, Playwright (e2e), pnpm

**Spec:** `docs/superpowers/specs/2026-03-17-sveltekit-landing-page-design.md`

**Project root:** `/Users/loke.carlsson/Code/sveltekit-mdsvex-landing-page-template`

---

## File Map

| File                                                    | Purpose                                           |
| ------------------------------------------------------- | ------------------------------------------------- |
| `package.json`                                          | Project deps and scripts                          |
| `svelte.config.js`                                      | Adapter, MDsveX preprocessor, path aliases        |
| `vite.config.ts`                                        | Tailwind v4 Vite plugin                           |
| `mdsvex.config.js`                                      | MDsveX extensions + rehype-slug                   |
| `playwright.config.ts`                                  | Playwright baseURL = localhost:4173 (preview)     |
| `src/app.html`                                          | Font preloads, `body class="bg-background"`       |
| `src/lib/styles/app.css`                                | `@theme` tokens, keyframes, base/component layers |
| `src/routes/+layout.ts`                                 | `export const prerender = true`                   |
| `src/routes/+layout.svelte`                             | Skip link → NavBar → `<main>` → Footer            |
| `src/routes/+page.svelte`                               | SEO meta + all section components                 |
| `src/lib/components/layout/NavBar.svelte`               | Fixed nav, scroll backdrop, mobile hamburger      |
| `src/lib/components/layout/Footer.svelte`               | Minimal footer, gradient border                   |
| `src/lib/components/ui/Button.svelte`                   | Polymorphic `<a>`/`<button>`, primary/outline     |
| `src/lib/components/ui/Badge.svelte`                    | Tech stack badge pill                             |
| `src/lib/components/ui/SectionLabel.svelte`             | Uppercase monospace eyebrow                       |
| `src/lib/utils/fadeIn.ts`                               | Svelte action: Intersection Observer scroll fade  |
| `src/lib/components/sections/HeroSection.svelte`        | Particles, radial glow, gradient headline, stats  |
| `src/lib/components/sections/FeaturesSection.svelte`    | 6-card feature grid                               |
| `src/lib/components/sections/TechStackSection.svelte`   | Badge row                                         |
| `src/lib/components/sections/HowToUseSection.svelte`    | 3-step + terminal mockup                          |
| `src/lib/components/sections/DemoPreviewSection.svelte` | Browser chrome mockup                             |
| `src/lib/components/sections/StatsSection.svelte`       | 4-column stat grid                                |
| `src/lib/components/sections/FinalCtaSection.svelte`    | CTA banner                                        |
| `static/favicon.svg`                                    | SVG favicon (orange-to-red gradient square)       |
| `static/robots.txt`                                     | Allow all, sitemap reference                      |
| `static/sitemap.xml`                                    | Single-page sitemap                               |
| `tests/landing.test.ts`                                 | Playwright e2e: render, nav, a11y                 |

---

## Task 1: Scaffold the SvelteKit project

**Files:** `package.json`, `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `playwright.config.ts`, `src/app.html`, `src/app.d.ts`, `src/routes/+page.svelte`, `src/routes/+layout.svelte`, `.gitignore`

- [ ] **Step 1: Run the SvelteKit scaffolder in the project directory**

```bash
cd /Users/loke.carlsson/Code/sveltekit-mdsvex-landing-page-template
pnpm dlx sv create .
```

When prompted interactively:

- Which template? → **SvelteKit minimal**
- Add type checking? → **Yes, using TypeScript syntax**
- Additional options? → **ESLint, Prettier, Playwright, Vitest** (select all four)
- Package manager? → **pnpm**

If asked "Directory not empty, continue?" → **Yes**

- [ ] **Step 2: Verify the dev server starts**

```bash
pnpm dev
```

Expected: `Local: http://localhost:5173` — open in browser, see the Svelte welcome page. `Ctrl+C` to stop.

- [ ] **Step 3: Add `.superpowers/` to .gitignore**

Append to `.gitignore`:

```
.superpowers/
```

- [ ] **Step 4: Commit the scaffold**

```bash
git add -A
git commit -m "chore: scaffold SvelteKit project"
```

---

## Task 2: Install and configure Tailwind CSS v4

**Files:** `vite.config.ts`, `src/lib/styles/app.css` (initial), `src/routes/+layout.svelte` (initial)

- [ ] **Step 1: Install Tailwind v4 and its Vite plugin**

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 2: Replace `vite.config.ts` content**

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});
```

- [ ] **Step 3: Create `src/lib/styles/app.css` with a minimal Tailwind import**

```css
@import 'tailwindcss';
```

- [ ] **Step 4: Import the stylesheet in the layout so Tailwind is active**

Edit `src/routes/+layout.svelte` — add the import at the top of the `<script>` block:

```svelte
<script lang="ts">
	import '../lib/styles/app.css';
	import type { Snippet } from 'svelte';
	const { children }: { children: Snippet } = $props();
</script>

<slot />
```

> Note: `<slot />` is the Svelte 5 backward-compat form. We will replace this with `{@render children()}` in Task 6.

- [ ] **Step 5: Verify Tailwind works**

In `src/routes/+page.svelte`, add `class="text-red-500"` to any element, run `pnpm dev`, confirm it turns red. Then revert.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: configure Tailwind CSS v4 with Vite plugin"
```

---

## Task 3: Configure MDsveX and update svelte.config.js

**Files:** `mdsvex.config.js`, `svelte.config.js`

- [ ] **Step 1: Install MDsveX and rehype-slug**

```bash
pnpm add -D mdsvex rehype-slug
```

- [ ] **Step 2: Create `mdsvex.config.js`**

```javascript
import { defineMDSveXConfig as define } from 'mdsvex';
import rehypeSlug from 'rehype-slug';

export default define({
	extensions: ['.svelte.md', '.md', '.svx'],
	rehypePlugins: [rehypeSlug],
	smartypants: { dashes: 'oldschool' }
});
```

- [ ] **Step 3: Replace `svelte.config.js`**

```javascript
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	kit: {
		adapter: adapter({ runtime: 'nodejs22.x' }),
		alias: {
			$components: 'src/lib/components',
			$styles: 'src/lib/styles',
			$utils: 'src/lib/utils'
		}
	}
};

export default config;
```

- [ ] **Step 4: Install the Vercel adapter**

```bash
pnpm add -D @sveltejs/adapter-vercel
```

- [ ] **Step 5: Verify build compiles**

```bash
pnpm build
```

Expected: build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: configure MDsveX, adapter-vercel, and path aliases"
```

---

## Task 4: Set up `app.html` with font preloads

**Files:** `src/app.html`

- [ ] **Step 1: Replace `src/app.html`**

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.svg" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
		<link
			rel="preload"
			as="style"
			href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
			onload="this.onload=null;this.rel='stylesheet'"
		/>
		<noscript>
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
			/>
		</noscript>
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/app.html
git commit -m "chore: add font preloads to app.html"
```

---

## Task 5: Build `app.css` — design tokens, keyframes, global styles

**Files:** `src/lib/styles/app.css`

- [ ] **Step 1: Replace `src/lib/styles/app.css` with full design system**

```css
@import 'tailwindcss';

/* ─── Design Tokens ─────────────────────────────── */
@theme {
	/* Colors */
	--color-primary: #d91e53;
	--color-secondary: #ffba02;
	--color-tertiary: #4b2ec6;
	--color-background: #030e29;
	--color-background-faded: #101254;
	--color-background-code: #001445;

	/* Typography */
	--font-sans: 'Inter', system-ui, sans-serif;
	--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

	/* Animations */
	--animate-gradient-shift: gradient-shift 8s ease infinite;
	--animate-float-code: float-code 15s ease-in-out infinite;
	--animate-fade-in: fade-in 0.6s ease-out forwards;
}

/* ─── Keyframes ──────────────────────────────────── */
@keyframes gradient-shift {
	0%,
	100% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
}

@keyframes float-code {
	0%,
	100% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-18px);
	}
}

@keyframes fade-in {
	from {
		opacity: 0;
		transform: translateY(24px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* ─── Base Layer ─────────────────────────────────── */
@layer base {
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	html {
		scroll-behavior: smooth;
	}

	body {
		background-color: var(--color-background);
		color: white;
		font-family: var(--font-sans);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
		border-radius: 2px;
	}
}

/* ─── Component Layer ────────────────────────────── */
@layer components {
	.skip-link {
		position: absolute;
		top: -100%;
		left: 1rem;
		z-index: 100;
		background: var(--color-primary);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0 0 0.5rem 0.5rem;
		font-weight: 600;
		transition: top 0.2s;
		text-decoration: none;
	}

	.skip-link:focus {
		top: 0;
	}

	.glass-card {
		background: rgba(255, 255, 255, 0.04);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 0.75rem;
	}

	.gradient-border-top::before {
		content: '';
		display: block;
		height: 2px;
		background: linear-gradient(
			90deg,
			transparent,
			var(--color-primary),
			var(--color-secondary),
			var(--color-tertiary),
			transparent
		);
		background-size: 200% 100%;
		animation: gradient-shift 8s ease infinite;
	}

	.section {
		padding: 5rem 1.5rem;
	}

	.section-container {
		max-width: 1100px;
		margin: 0 auto;
	}

	.section-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.section-title {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 800;
		color: white;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}
}

/* ─── Reduced Motion ─────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
```

- [ ] **Step 2: Verify tokens work**

Run `pnpm dev`. In `src/routes/+page.svelte`, add `class="bg-background text-primary"` to a test element — it should use the dark background color and pink text. Revert.

- [ ] **Step 3: Commit**

```bash
git add src/lib/styles/app.css
git commit -m "feat: add design tokens and keyframes to app.css"
```

---

## Task 6: Root layout components (`+layout.ts`, `+layout.svelte`)

**Files:** `src/routes/+layout.ts`, `src/routes/+layout.svelte`

- [ ] **Step 1: Create `src/routes/+layout.ts`**

```typescript
export const prerender = true;
```

- [ ] **Step 2: Replace `src/routes/+layout.svelte`**

NavBar and Footer are stubs for now — they will be real components after Tasks 7 and 8. Use simple `<header>` and `<footer>` placeholders:

```svelte
<script lang="ts">
	import '../lib/styles/app.css';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<a href="#main" class="skip-link">Skip to main content</a>

<!-- NavBar placeholder — replaced in Task 7 -->
<header style="height:64px;"></header>

<main id="main">
	{@render children()}
</main>

<!-- Footer placeholder — replaced in Task 8 -->
<footer></footer>
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/+layout.ts src/routes/+layout.svelte
git commit -m "feat: add prerender config and root layout shell"
```

---

## Task 7: UI primitives — Button, Badge, SectionLabel

**Files:** `src/lib/components/ui/Button.svelte`, `src/lib/components/ui/Badge.svelte`, `src/lib/components/ui/SectionLabel.svelte`

- [ ] **Step 1: Write the Playwright test first**

```typescript
// tests/landing.test.ts
import { test, expect } from '@playwright/test';

test('page loads without errors', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', (err) => errors.push(err.message));
	await page.goto('/');
	expect(errors).toHaveLength(0);
	await expect(page.locator('body')).toBeVisible();
});
```

- [ ] **Step 2: Run test to confirm it passes (page exists)**

```bash
pnpm build && pnpm preview &
sleep 2
pnpm test:e2e -- --grep "page loads"
```

Expected: PASS (the scaffold renders a page)

- [ ] **Step 3: Create `src/lib/components/ui/Button.svelte`**

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		variant?: 'primary' | 'outline';
		class?: string;
		onclick?: (e: MouseEvent) => void;
		target?: string;
		rel?: string;
		children: Snippet;
	}

	const {
		href,
		variant = 'primary',
		class: className = '',
		onclick,
		target,
		rel,
		children
	}: Props = $props();
</script>

{#if href}
	<a {href} {target} {rel} class="btn btn-{variant} {className}">
		{@render children()}
	</a>
{:else}
	<button {onclick} class="btn btn-{variant} {className}">
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		font-weight: 600;
		font-size: 0.95rem;
		border-radius: 0.5rem;
		padding: 0.7rem 1.5rem;
		transition:
			transform 0.2s,
			box-shadow 0.2s,
			border-color 0.2s,
			color 0.2s;
		text-decoration: none;
		cursor: pointer;
		border: none;
		font-family: inherit;
		white-space: nowrap;
	}

	.btn:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--color-primary), #9b1c3a);
		color: white;
		box-shadow: 0 0 20px rgba(217, 30, 83, 0.3);
	}

	.btn-primary:hover {
		transform: scale(1.03);
		box-shadow: 0 0 32px rgba(217, 30, 83, 0.5);
	}

	.btn-outline {
		background: transparent;
		color: rgba(255, 255, 255, 0.75);
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(4px);
	}

	.btn-outline:hover {
		border-color: rgba(255, 255, 255, 0.4);
		color: white;
	}
</style>
```

- [ ] **Step 4: Create `src/lib/components/ui/Badge.svelte`**

```svelte
<script lang="ts">
	interface Props {
		label: string;
		bgColor?: string;
		textColor?: string;
		borderColor?: string;
	}

	const {
		label,
		bgColor = 'rgba(217,30,83,0.1)',
		textColor = '#d91e53',
		borderColor = 'rgba(217,30,83,0.25)'
	}: Props = $props();
</script>

<span class="badge" style="background:{bgColor};color:{textColor};border-color:{borderColor}">
	{label}
</span>

<style>
	.badge {
		display: inline-block;
		padding: 0.3rem 0.8rem;
		border-radius: 0.375rem;
		border-width: 1px;
		border-style: solid;
		font-size: 0.82rem;
		font-weight: 600;
		font-family: var(--font-sans);
		letter-spacing: 0.01em;
	}
</style>
```

- [ ] **Step 5: Create `src/lib/components/ui/SectionLabel.svelte`**

```svelte
<script lang="ts">
	interface Props {
		text: string;
		color?: string;
	}

	const { text, color = 'var(--color-primary)' }: Props = $props();
</script>

<p class="label" style="color:{color}">{text}</p>

<style>
	.label {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		margin-bottom: 0.6rem;
	}
</style>
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/components/ui/
git commit -m "feat: add Button, Badge, SectionLabel UI primitives"
```

---

## Task 8: NavBar

**Files:** `src/lib/components/layout/NavBar.svelte`, `src/routes/+layout.svelte` (update)

- [ ] **Step 1: Write the failing test**

Add to `tests/landing.test.ts`:

```typescript
test('navbar has Use Template link', async ({ page }) => {
	await page.goto('/');
	const cta = page.getByRole('link', { name: /use template/i }).first();
	await expect(cta).toBeVisible();
	await expect(cta).toHaveAttribute('href', /github\.com/);
});

test('mobile hamburger opens and closes menu', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('/');
	const hamburger = page.getByRole('button', { name: /open menu/i });
	await hamburger.click();
	await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible();
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
pnpm build && pnpm preview &
sleep 2
pnpm test:e2e -- --grep "navbar|hamburger"
```

Expected: FAIL — no NavBar present yet.

- [ ] **Step 3: Create `src/lib/components/layout/NavBar.svelte`**

```svelte
<script lang="ts">
	import Button from '$components/ui/Button.svelte';

	const GITHUB_URL = 'https://github.com/YOUR_USERNAME/sveltekit-mdsvex-landing-page-template';

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
			{#each navLinks as link}
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
	<div id="mobile-menu" class="mobile-menu" class:open={menuOpen} aria-hidden={!menuOpen}>
		<ul role="list">
			{#each navLinks as link}
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
		color: rgba(255, 255, 255, 0.65);
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.2s;
	}

	.nav-link:hover {
		color: white;
	}

	/* Hamburger */
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

	/* Mobile menu */
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

	/* Responsive visibility */
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
```

- [ ] **Step 4: Update `src/routes/+layout.svelte` to use the real NavBar**

```svelte
<script lang="ts">
	import '../lib/styles/app.css';
	import NavBar from '$components/layout/NavBar.svelte';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<a href="#main" class="skip-link">Skip to main content</a>

<NavBar />

<main id="main" style="padding-top:64px;">
	{@render children()}
</main>

<!-- Footer placeholder — will be replaced in Task 9 -->
<footer></footer>
```

- [ ] **Step 5: Build, run tests**

```bash
pnpm build && pnpm preview &
sleep 2
pnpm test:e2e -- --grep "navbar|hamburger"
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/lib/components/layout/NavBar.svelte src/routes/+layout.svelte
git commit -m "feat: add NavBar with scroll backdrop and mobile hamburger"
```

---

## Task 9: Footer

**Files:** `src/lib/components/layout/Footer.svelte`, `src/routes/+layout.svelte` (update)

- [ ] **Step 1: Create `src/lib/components/layout/Footer.svelte`**

```svelte
<footer class="footer">
	<div class="footer-border" aria-hidden="true"></div>
	<div class="footer-inner">
		<p class="footer-left">
			Built with
			<a href="https://kit.svelte.dev" target="_blank" rel="noopener noreferrer">SvelteKit</a>
			·
			<a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">Tailwind</a>
			·
			<a href="https://mdsvex.pngwn.io" target="_blank" rel="noopener noreferrer">MDsveX</a>
		</p>
		<p class="footer-right">
			© {new Date().getFullYear()} · MIT License
		</p>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		background: var(--color-background);
	}

	.footer-border {
		height: 2px;
		background: linear-gradient(90deg, transparent, #d91e53, #ffba02, #4b2ec6, transparent);
		background-size: 200% 100%;
		animation: gradient-shift 8s ease infinite;
	}

	.footer-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1.25rem 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.footer-left,
	.footer-right {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.35);
		margin: 0;
	}

	.footer-left a {
		color: rgba(255, 255, 255, 0.5);
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-left a:hover {
		color: rgba(255, 255, 255, 0.8);
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
```

- [ ] **Step 2: Update `src/routes/+layout.svelte` to use Footer**

```svelte
<script lang="ts">
	import '../lib/styles/app.css';
	import NavBar from '$components/layout/NavBar.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<a href="#main" class="skip-link">Skip to main content</a>

<NavBar />

<main id="main" style="padding-top:64px;">
	{@render children()}
</main>

<Footer />
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/layout/Footer.svelte src/routes/+layout.svelte
git commit -m "feat: add Footer with gradient border"
```

---

## Task 10: `fadeIn` Svelte action

**Files:** `src/lib/utils/fadeIn.ts`

- [ ] **Step 1: Create `src/lib/utils/fadeIn.ts`**

```typescript
import { browser } from '$app/environment';

interface FadeInOptions {
	delay?: number;
	threshold?: number;
}

export function fadeIn(node: HTMLElement, { delay = 0, threshold = 0.1 }: FadeInOptions = {}) {
	if (!browser) return {};

	// Set initial invisible state only when JS is running
	node.style.opacity = '0';
	node.style.transform = 'translateY(24px)';

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
				node.style.opacity = '1';
				node.style.transform = 'translateY(0)';
				observer.disconnect();
			}
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/utils/fadeIn.ts
git commit -m "feat: add fadeIn Svelte action with IntersectionObserver"
```

---

## Task 11: HeroSection

**Files:** `src/lib/components/sections/HeroSection.svelte`

- [ ] **Step 1: Write the failing test**

Add to `tests/landing.test.ts`:

```typescript
test('hero renders headline and CTA', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	await expect(page.getByText(/last landing page template/i)).toBeVisible();
	await expect(page.getByText(/ever need/i)).toBeVisible();
	// Stats bar
	await expect(page.getByText('100')).toBeVisible();
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
pnpm build && pnpm preview &
sleep 2
pnpm test:e2e -- --grep "hero"
```

Expected: FAIL — no hero yet.

- [ ] **Step 3: Create `src/lib/components/sections/HeroSection.svelte`**

```svelte
<script lang="ts">
	import Button from '$components/ui/Button.svelte';

	const GITHUB_URL = 'https://github.com/YOUR_USERNAME/sveltekit-mdsvex-landing-page-template';

	// Positioned floating code keywords — (content, top/left/right/bottom, delay, rotation, opacity, color)
	const particles = [
		{
			content: 'const',
			pos: 'top:14%;left:7%',
			delay: '0s',
			rot: '-13deg',
			opacity: 0.55,
			color: 'rgba(217,30,83,0.65)'
		},
		{
			content: 'async',
			pos: 'top:22%;right:9%',
			delay: '2.2s',
			rot: '9deg',
			opacity: 0.45,
			color: 'rgba(255,186,2,0.55)'
		},
		{
			content: 'export',
			pos: 'bottom:28%;left:11%',
			delay: '4s',
			rot: '6deg',
			opacity: 0.45,
			color: 'rgba(75,46,198,0.6)'
		},
		{
			content: '() =>',
			pos: 'top:42%;right:14%',
			delay: '1.1s',
			rot: '-5deg',
			opacity: 0.4,
			color: 'rgba(96,165,250,0.55)'
		},
		{
			content: 'return',
			pos: 'bottom:18%;right:7%',
			delay: '3.1s',
			rot: '11deg',
			opacity: 0.38,
			color: 'rgba(74,222,128,0.5)'
		},
		{
			content: 'import',
			pos: 'top:8%;left:28%',
			delay: '5s',
			rot: '-9deg',
			opacity: 0.3,
			color: 'rgba(217,30,83,0.4)'
		},
		{
			content: 'await',
			pos: 'bottom:38%;right:22%',
			delay: '2.6s',
			rot: '7deg',
			opacity: 0.4,
			color: 'rgba(255,186,2,0.45)'
		},
		{
			content: 'type',
			pos: 'top:58%;left:4%',
			delay: '1.5s',
			rot: '-4deg',
			opacity: 0.35,
			color: 'rgba(167,139,250,0.5)'
		},
		{
			content: 'function',
			pos: 'bottom:50%;left:18%',
			delay: '6s',
			rot: '3deg',
			opacity: 0.28,
			color: 'rgba(96,165,250,0.4)'
		},
		{
			content: '$state',
			pos: 'top:32%;left:3%',
			delay: '3.7s',
			rot: '-7deg',
			opacity: 0.35,
			color: 'rgba(255,186,2,0.4)'
		}
	] as const;

	const stats = [
		{ value: '100', label: 'Perf Score', color: '#d91e53' },
		{ value: '<1s', label: 'Load Time', color: '#ffba02' },
		{ value: 'Free', label: 'Open Source', color: '#4ade80' },
		{ value: 'SSG', label: 'Pre-rendered', color: '#60a5fa' }
	];
</script>

<section class="hero" aria-label="Hero">
	<!-- Animated top border -->
	<div class="hero-border" aria-hidden="true"></div>

	<!-- Grid texture -->
	<div class="hero-grid" aria-hidden="true"></div>

	<!-- Radial glow -->
	<div class="hero-glow" aria-hidden="true"></div>

	<!-- Floating code particles -->
	{#each particles as p}
		<span
			class="particle"
			aria-hidden="true"
			style="position:absolute;{p.pos};color:{p.color};opacity:{p.opacity};
			       transform:rotate({p.rot});animation-delay:{p.delay};">{p.content}</span
		>
	{/each}

	<!-- Main hero content -->
	<div class="hero-content">
		<p class="hero-eyebrow" aria-label="Open Source Template">✦ Open Source Template ✦</p>

		<h1 class="hero-headline">
			The last landing page template<br />
			you'll <span class="hero-gradient">ever need</span>
		</h1>

		<p class="hero-subtext">
			Production-ready SvelteKit + Tailwind v4. Deploy in minutes. Score 100 on Lighthouse. Free
			forever.
		</p>

		<div class="hero-cta">
			<Button href={GITHUB_URL} target="_blank" rel="noopener noreferrer">Use Template →</Button>
			<Button href="#features" variant="outline">See Features</Button>
		</div>
	</div>

	<!-- Stats bar -->
	<dl class="hero-stats">
		{#each stats as stat}
			<div class="stat">
				<dt class="stat-label">{stat.label}</dt>
				<dd class="stat-value" style="color:{stat.color}">{stat.value}</dd>
			</div>
		{/each}
	</dl>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: linear-gradient(160deg, #030e29 0%, #0d1c4a 50%, #030e29 100%);
		padding: 5rem 1.5rem 3rem;
		gap: 2rem;
	}

	.hero-border {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, #d91e53, #ffba02, #4b2ec6, transparent);
		background-size: 200% 100%;
		animation: gradient-shift 8s ease infinite;
	}

	.hero-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
		background-size: 32px 32px;
		pointer-events: none;
	}

	.hero-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -60%);
		width: 700px;
		height: 700px;
		background: radial-gradient(circle, rgba(217, 30, 83, 0.1) 0%, transparent 65%);
		pointer-events: none;
	}

	.particle {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		pointer-events: none;
		user-select: none;
		animation: float-code 15s ease-in-out infinite;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1.25rem;
		max-width: 820px;
	}

	.hero-eyebrow {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		color: #ffba02;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		margin: 0;
	}

	.hero-headline {
		font-size: clamp(2.4rem, 6vw, 5rem);
		font-weight: 900;
		color: white;
		line-height: 1.1;
		letter-spacing: -0.025em;
		margin: 0;
	}

	.hero-gradient {
		background: linear-gradient(135deg, #d91e53, #ffba02);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtext {
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		color: rgba(255, 255, 255, 0.55);
		max-width: 520px;
		line-height: 1.65;
		margin: 0;
	}

	.hero-cta {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 0.5rem;
	}

	.hero-stats {
		position: relative;
		z-index: 1;
		display: flex;
		gap: 2.5rem;
		flex-wrap: wrap;
		justify-content: center;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.07);
		width: 100%;
		max-width: 560px;
		margin: 0;
	}

	.stat {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		gap: 0.15rem;
	}

	.stat-value {
		font-size: 1.6rem;
		font-weight: 900;
		line-height: 1;
		margin: 0;
	}

	.stat-label {
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.45);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	@keyframes float-code {
		0%,
		100% {
			translate: 0 0px;
		}
		50% {
			translate: 0 -18px;
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
```

- [ ] **Step 4: Add HeroSection to `+page.svelte` temporarily to test**

```svelte
<script lang="ts">
	import HeroSection from '$components/sections/HeroSection.svelte';
</script>

<HeroSection />
```

- [ ] **Step 5: Build and run tests**

```bash
pnpm build && pnpm preview &
sleep 2
pnpm test:e2e -- --grep "hero"
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/lib/components/sections/HeroSection.svelte src/routes/+page.svelte
git commit -m "feat: add immersive HeroSection with particles and stats bar"
```

---

## Task 12: FeaturesSection

**Files:** `src/lib/components/sections/FeaturesSection.svelte`

- [ ] **Step 1: Write the failing test**

Add to `tests/landing.test.ts`:

```typescript
test('features section has 6 feature cards', async ({ page }) => {
	await page.goto('/');
	await page.locator('#features').scrollIntoViewIfNeeded();
	await expect(page.getByRole('heading', { name: /everything you need/i })).toBeVisible();
	const cards = page.locator('.feature-card');
	await expect(cards).toHaveCount(6);
});
```

- [ ] **Step 2: Create `src/lib/components/sections/FeaturesSection.svelte`**

```svelte
<script lang="ts">
	import SectionLabel from '$components/ui/SectionLabel.svelte';
	import { fadeIn } from '$utils/fadeIn';

	const features = [
		{
			icon: '⚡',
			title: 'Blazing Fast',
			desc: 'SSG + Vite 6. 100 Lighthouse performance score out of the box.',
			bg: 'rgba(217,30,83,0.06)',
			border: 'rgba(217,30,83,0.18)'
		},
		{
			icon: '🎨',
			title: 'Tailwind v4',
			desc: 'Latest utility-first CSS. Design tokens in @theme — zero config file needed.',
			bg: 'rgba(255,186,2,0.06)',
			border: 'rgba(255,186,2,0.18)'
		},
		{
			icon: '🔷',
			title: 'TypeScript',
			desc: 'Fully typed throughout. Svelte 5 runes syntax — clean and modern.',
			bg: 'rgba(96,165,250,0.06)',
			border: 'rgba(96,165,250,0.18)'
		},
		{
			icon: '📝',
			title: 'MDsveX Ready',
			desc: 'Markdown + Svelte magic, pre-configured. Add a blog in minutes.',
			bg: 'rgba(74,222,128,0.06)',
			border: 'rgba(74,222,128,0.18)'
		},
		{
			icon: '🌐',
			title: 'SEO Optimised',
			desc: 'Open Graph tags, sitemap.xml, and JSON-LD structured data built in.',
			bg: 'rgba(167,139,250,0.06)',
			border: 'rgba(167,139,250,0.18)'
		},
		{
			icon: '🚀',
			title: 'Deploy Ready',
			desc: 'Vercel adapter included. Push to GitHub — live in 30 seconds.',
			bg: 'rgba(251,146,60,0.06)',
			border: 'rgba(251,146,60,0.18)'
		}
	];
</script>

<section id="features" class="section" aria-labelledby="features-heading">
	<div class="section-container">
		<div class="section-header" use:fadeIn>
			<SectionLabel text="Why This Template" />
			<h2 id="features-heading" class="section-title">
				Everything you need.<br />Nothing you don't.
			</h2>
		</div>

		<div class="features-grid">
			{#each features as feature, i}
				<article
					class="feature-card"
					style="background:{feature.bg};border-color:{feature.border};"
					use:fadeIn={{ delay: i * 70 }}
				>
					<span class="feature-icon" aria-hidden="true">{feature.icon}</span>
					<h3 class="feature-title">{feature.title}</h3>
					<p class="feature-desc">{feature.desc}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.features-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.features-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.feature-card {
		border-width: 1px;
		border-style: solid;
		border-radius: 0.75rem;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.feature-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}

	.feature-icon {
		font-size: 1.75rem;
		line-height: 1;
	}

	.feature-title {
		font-size: 1rem;
		font-weight: 700;
		color: white;
		margin: 0;
	}

	.feature-desc {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.55);
		line-height: 1.6;
		margin: 0;
	}
</style>
```

- [ ] **Step 3: Add to `+page.svelte`**

```svelte
<script lang="ts">
	import HeroSection from '$components/sections/HeroSection.svelte';
	import FeaturesSection from '$components/sections/FeaturesSection.svelte';
</script>

<HeroSection />
<FeaturesSection />
```

- [ ] **Step 4: Build and run tests**

```bash
pnpm build && pnpm preview & sleep 2
pnpm test:e2e -- --grep "features"
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/sections/FeaturesSection.svelte src/routes/+page.svelte
git commit -m "feat: add FeaturesSection with 6-card responsive grid"
```

---

## Task 13: TechStackSection

**Files:** `src/lib/components/sections/TechStackSection.svelte`

- [ ] **Step 1: Create `src/lib/components/sections/TechStackSection.svelte`**

```svelte
<script lang="ts">
	import Badge from '$components/ui/Badge.svelte';
	import { fadeIn } from '$utils/fadeIn';

	const stack = [
		{
			label: 'SvelteKit 2',
			bg: 'rgba(255,70,0,0.1)',
			text: '#ff7a45',
			border: 'rgba(255,70,0,0.25)'
		},
		{ label: 'Svelte 5', bg: 'rgba(255,70,0,0.08)', text: '#ff9060', border: 'rgba(255,70,0,0.2)' },
		{
			label: 'Tailwind v4',
			bg: 'rgba(56,189,248,0.1)',
			text: '#38bdf8',
			border: 'rgba(56,189,248,0.25)'
		},
		{
			label: 'TypeScript',
			bg: 'rgba(96,165,250,0.1)',
			text: '#60a5fa',
			border: 'rgba(96,165,250,0.25)'
		},
		{
			label: 'MDsveX',
			bg: 'rgba(74,222,128,0.1)',
			text: '#4ade80',
			border: 'rgba(74,222,128,0.25)'
		},
		{
			label: 'Vite 6',
			bg: 'rgba(251,191,36,0.1)',
			text: '#fbbf24',
			border: 'rgba(251,191,36,0.25)'
		},
		{
			label: 'Vercel',
			bg: 'rgba(255,255,255,0.05)',
			text: '#ccc',
			border: 'rgba(255,255,255,0.15)'
		}
	];
</script>

<section class="section" aria-labelledby="stack-heading">
	<div class="section-container">
		<div class="stack-inner" use:fadeIn>
			<p class="stack-label" id="stack-heading">Built With</p>
			<div class="stack-badges" role="list">
				{#each stack as tech}
					<span role="listitem">
						<Badge
							label={tech.label}
							bgColor={tech.bg}
							textColor={tech.text}
							borderColor={tech.border}
						/>
					</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.stack-inner {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	.stack-label {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.35);
		margin: 0;
	}

	.stack-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		justify-content: center;
	}
</style>
```

- [ ] **Step 2: Add to `+page.svelte` and commit**

```bash
git add src/lib/components/sections/TechStackSection.svelte src/routes/+page.svelte
git commit -m "feat: add TechStackSection with badge row"
```

---

## Task 14: HowToUseSection

**Files:** `src/lib/components/sections/HowToUseSection.svelte`

- [ ] **Step 1: Write failing test**

Add to `tests/landing.test.ts`:

```typescript
test('how to use section has 3 steps', async ({ page }) => {
	await page.goto('/');
	await page.locator('#how-to-use').scrollIntoViewIfNeeded();
	await expect(page.getByRole('heading', { name: /60 seconds/i })).toBeVisible();
});
```

- [ ] **Step 2: Create `src/lib/components/sections/HowToUseSection.svelte`**

```svelte
<script lang="ts">
	import SectionLabel from '$components/ui/SectionLabel.svelte';
	import { fadeIn } from '$utils/fadeIn';

	const steps = [
		{
			n: '1',
			title: 'Use this template',
			desc: 'Click "Use Template" on GitHub to fork it to your account in one click.'
		},
		{
			n: '2',
			title: 'Install & run',
			desc: 'Clone your repo, run <code>pnpm install</code> then <code>pnpm dev</code>.'
		},
		{
			n: '3',
			title: 'Customise & deploy',
			desc: 'Edit the content, push to Vercel — live in 30 seconds.'
		}
	];
</script>

<section id="how-to-use" class="section" aria-labelledby="howto-heading">
	<div class="section-container">
		<div class="section-header" use:fadeIn>
			<SectionLabel text="Get Started" />
			<h2 id="howto-heading" class="section-title">Up and running in 60 seconds.</h2>
		</div>

		<div class="howto-grid">
			<!-- Steps -->
			<ol class="steps" use:fadeIn={{ delay: 100 }}>
				{#each steps as step, i}
					<li class="step">
						<span class="step-number" class:active={i === 0}>{step.n}</span>
						<div>
							<h3 class="step-title">{step.title}</h3>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							<p class="step-desc">{@html step.desc}</p>
						</div>
					</li>
				{/each}
			</ol>

			<!-- Terminal mockup -->
			<div
				class="terminal"
				use:fadeIn={{ delay: 200 }}
				role="img"
				aria-label="Terminal showing installation commands"
			>
				<div class="terminal-header" aria-hidden="true">
					<span class="dot red"></span>
					<span class="dot yellow"></span>
					<span class="dot green"></span>
					<span class="terminal-title">bash</span>
				</div>
				<div class="terminal-body">
					<p><span class="prompt">$</span> <span class="cmd">git clone</span> your-repo</p>
					<p><span class="prompt">$</span> <span class="cmd">pnpm install</span></p>
					<p><span class="prompt">$</span> <span class="cmd">pnpm dev</span></p>
					<p class="success">✓ http://localhost:5173</p>
					<p class="info">✓ Ready. Go build something.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.howto-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		align-items: start;
	}

	@media (min-width: 768px) {
		.howto-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.steps {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.step {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.step-number {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.85rem;
		font-weight: 800;
		flex-shrink: 0;
		background: rgba(217, 30, 83, 0.12);
		border: 1px solid rgba(217, 30, 83, 0.3);
		color: var(--color-primary);
	}

	.step-number.active {
		background: linear-gradient(135deg, #d91e53, #9b1c3a);
		color: white;
		border-color: transparent;
	}

	.step-title {
		font-size: 0.95rem;
		font-weight: 700;
		color: white;
		margin: 0 0 0.2rem;
	}

	.step-desc {
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.55);
		line-height: 1.5;
		margin: 0;
	}

	.step-desc :global(code) {
		font-family: var(--font-mono);
		background: rgba(255, 255, 255, 0.07);
		padding: 0.1rem 0.3rem;
		border-radius: 0.2rem;
		font-size: 0.8rem;
	}

	/* Terminal */
	.terminal {
		background: var(--color-background-code);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.terminal-header {
		background: rgba(255, 255, 255, 0.04);
		padding: 0.65rem 1rem;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.dot.red {
		background: #ff5f56;
	}
	.dot.yellow {
		background: #ffbd2e;
	}
	.dot.green {
		background: #27c93f;
	}

	.terminal-title {
		margin-left: 0.5rem;
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.35);
		font-family: var(--font-mono);
	}

	.terminal-body {
		padding: 1.25rem 1.5rem;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		line-height: 2;
		display: flex;
		flex-direction: column;
	}

	.terminal-body p {
		margin: 0;
	}

	.prompt {
		color: rgba(255, 255, 255, 0.3);
		margin-right: 0.5rem;
	}

	.cmd {
		color: #ffba02;
	}

	.success {
		color: #4ade80;
		margin-top: 0.5rem;
	}

	.info {
		color: #60a5fa;
	}
</style>
```

- [ ] **Step 3: Add to `+page.svelte`, build, run test**

```bash
pnpm build && pnpm preview & sleep 2
pnpm test:e2e -- --grep "how to use"
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/sections/HowToUseSection.svelte src/routes/+page.svelte
git commit -m "feat: add HowToUseSection with steps and terminal mockup"
```

---

## Task 15: DemoPreviewSection

**Files:** `src/lib/components/sections/DemoPreviewSection.svelte`

- [ ] **Step 1: Create `src/lib/components/sections/DemoPreviewSection.svelte`**

Static HTML/CSS recreation of a mini hero inside a browser chrome mockup.

```svelte
<script lang="ts">
	import { fadeIn } from '$utils/fadeIn';
</script>

<section class="section" aria-labelledby="preview-heading">
	<div class="section-container">
		<div class="section-header" use:fadeIn>
			<p class="preview-label">Live Preview</p>
			<h2 id="preview-heading" class="section-title">See what you're getting.</h2>
		</div>

		<div
			class="browser"
			use:fadeIn={{ delay: 150 }}
			role="img"
			aria-label="Browser preview of the landing page template"
		>
			<!-- Browser chrome -->
			<div class="browser-chrome" aria-hidden="true">
				<div class="browser-dots">
					<span class="dot red"></span>
					<span class="dot yellow"></span>
					<span class="dot green"></span>
				</div>
				<div class="browser-url">your-site.vercel.app</div>
			</div>

			<!-- Mini hero recreation -->
			<div class="browser-body" aria-hidden="true">
				<div class="mini-hero">
					<div class="mini-grid"></div>
					<div class="mini-glow"></div>
					<!-- particles -->
					<span
						class="mini-particle"
						style="top:12%;left:8%;color:rgba(217,30,83,0.5);animation-delay:0s;">const</span
					>
					<span
						class="mini-particle"
						style="top:20%;right:10%;color:rgba(255,186,2,0.4);animation-delay:2s;">async</span
					>
					<span
						class="mini-particle"
						style="bottom:22%;left:10%;color:rgba(75,46,198,0.5);animation-delay:4s;">export</span
					>
					<div class="mini-content">
						<p class="mini-eyebrow">✦ Open Source Template ✦</p>
						<h3 class="mini-headline">
							The last landing page template you'll <span class="mini-gradient">ever need</span>
						</h3>
						<div class="mini-cta">
							<span class="mini-btn">Use Template →</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.preview-label {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-primary);
		margin-bottom: 0.6rem;
		margin-top: 0;
	}

	.browser {
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.75rem;
		overflow: hidden;
		background: var(--color-background-code);
		max-width: 900px;
		margin: 0 auto;
	}

	.browser-chrome {
		background: rgba(255, 255, 255, 0.04);
		padding: 0.65rem 1rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
	}

	.browser-dots {
		display: flex;
		gap: 5px;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.dot.red {
		background: #ff5f56;
	}
	.dot.yellow {
		background: #ffbd2e;
	}
	.dot.green {
		background: #27c93f;
	}

	.browser-url {
		flex: 1;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 4px;
		padding: 0.2rem 0.75rem;
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.35);
		font-family: var(--font-mono);
	}

	/* Mini hero inside browser */
	.browser-body {
		padding: 0;
	}

	.mini-hero {
		position: relative;
		min-height: 260px;
		background: linear-gradient(160deg, #030e29 0%, #0d1c4a 50%, #030e29 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.mini-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
		background-size: 24px 24px;
	}

	.mini-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(217, 30, 83, 0.1) 0%, transparent 65%);
	}

	.mini-particle {
		position: absolute;
		font-family: var(--font-mono);
		font-size: 0.6rem;
		pointer-events: none;
		user-select: none;
		animation: float-code 15s ease-in-out infinite;
	}

	.mini-content {
		position: relative;
		z-index: 1;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 2rem;
	}

	.mini-eyebrow {
		font-family: var(--font-mono);
		font-size: 0.55rem;
		color: #ffba02;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		margin: 0;
	}

	.mini-headline {
		font-size: clamp(1rem, 3vw, 1.5rem);
		font-weight: 900;
		color: white;
		line-height: 1.2;
		margin: 0;
		max-width: 500px;
	}

	.mini-gradient {
		background: linear-gradient(135deg, #d91e53, #ffba02);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.mini-cta {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.mini-btn {
		background: linear-gradient(135deg, #d91e53, #9b1c3a);
		color: white;
		padding: 0.4rem 1rem;
		border-radius: 0.4rem;
		font-size: 0.75rem;
		font-weight: 700;
		box-shadow: 0 0 16px rgba(217, 30, 83, 0.3);
	}

	@keyframes float-code {
		0%,
		100% {
			translate: 0 0px;
		}
		50% {
			translate: 0 -10px;
		}
	}
</style>
```

- [ ] **Step 2: Add to `+page.svelte` and commit**

```bash
git add src/lib/components/sections/DemoPreviewSection.svelte src/routes/+page.svelte
git commit -m "feat: add DemoPreviewSection with browser chrome mockup"
```

---

## Task 16: StatsSection

**Files:** `src/lib/components/sections/StatsSection.svelte`

- [ ] **Step 1: Create `src/lib/components/sections/StatsSection.svelte`**

```svelte
<script lang="ts">
	import { fadeIn } from '$utils/fadeIn';

	const stats = [
		{ value: '100', label: 'Lighthouse Score', sublabel: 'Performance', color: '#d91e53' },
		{ value: '<50ms', label: 'TTFB', sublabel: 'Time to First Byte', color: '#ffba02' },
		{ value: '★', label: 'GitHub Stars', sublabel: 'And growing', color: '#4ade80' },
		{ value: 'MIT', label: 'License', sublabel: 'Free forever', color: '#60a5fa' }
	];
</script>

<section class="section stats-section" aria-labelledby="stats-heading">
	<div class="section-container">
		<p class="stats-eyebrow" id="stats-heading">By the Numbers</p>
		<dl class="stats-grid" use:fadeIn>
			{#each stats as stat}
				<div class="stat-item">
					<dd class="stat-value" style="color:{stat.color}">{stat.value}</dd>
					<dt class="stat-name">{stat.label}</dt>
					<span class="stat-sub">{stat.sublabel}</span>
				</div>
			{/each}
		</dl>
	</div>
</section>

<style>
	.stats-section {
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		border-bottom: 1px solid rgba(255, 255, 255, 0.04);
	}

	.stats-eyebrow {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.3);
		text-align: center;
		margin: 0 0 2.5rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		max-width: 700px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		.stats-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.stat-item {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
	}

	.stat-value {
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		font-weight: 900;
		line-height: 1;
		margin: 0;
	}

	.stat-name {
		font-size: 0.82rem;
		color: white;
		font-weight: 600;
	}

	.stat-sub {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.35);
	}
</style>
```

- [ ] **Step 2: Add to `+page.svelte` and commit**

```bash
git add src/lib/components/sections/StatsSection.svelte src/routes/+page.svelte
git commit -m "feat: add StatsSection with 4-column metrics"
```

---

## Task 17: FinalCtaSection

**Files:** `src/lib/components/sections/FinalCtaSection.svelte`

- [ ] **Step 1: Write failing test**

Add to `tests/landing.test.ts`:

```typescript
test('final CTA section has deploy button', async ({ page }) => {
	await page.goto('/');
	// Scroll to bottom
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await expect(page.getByRole('link', { name: /use template on github/i })).toBeVisible();
});
```

- [ ] **Step 2: Create `src/lib/components/sections/FinalCtaSection.svelte`**

```svelte
<script lang="ts">
	import Button from '$components/ui/Button.svelte';
	import { fadeIn } from '$utils/fadeIn';

	const GITHUB_URL = 'https://github.com/YOUR_USERNAME/sveltekit-mdsvex-landing-page-template';
	const VERCEL_DEPLOY_URL = `https://vercel.com/new/clone?repository-url=${encodeURIComponent(GITHUB_URL)}`;
</script>

<section class="cta-section" aria-labelledby="cta-heading" use:fadeIn>
	<div class="cta-border" aria-hidden="true"></div>
	<div class="cta-inner">
		<h2 id="cta-heading" class="cta-headline">Ready to ship something beautiful?</h2>
		<p class="cta-subtext">Clone it. Customise it. Make it yours.</p>
		<div class="cta-buttons">
			<Button href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
				Use Template on GitHub →
			</Button>
			<Button href={VERCEL_DEPLOY_URL} target="_blank" rel="noopener noreferrer" variant="outline">
				Deploy to Vercel
			</Button>
		</div>
	</div>
</section>

<style>
	.cta-section {
		position: relative;
		background: linear-gradient(135deg, rgba(217, 30, 83, 0.08), rgba(75, 46, 198, 0.08));
		border-top: 1px solid rgba(217, 30, 83, 0.15);
		padding: 5rem 1.5rem;
		overflow: hidden;
	}

	.cta-border {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, #d91e53, #ffba02, #4b2ec6, transparent);
		background-size: 200% 100%;
		animation: gradient-shift 8s ease infinite;
	}

	.cta-inner {
		max-width: 700px;
		margin: 0 auto;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.cta-headline {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 900;
		color: white;
		line-height: 1.2;
		margin: 0;
		letter-spacing: -0.02em;
	}

	.cta-subtext {
		color: rgba(255, 255, 255, 0.5);
		font-size: 1rem;
		margin: 0;
	}

	.cta-buttons {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 0.5rem;
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
```

- [ ] **Step 3: Add to `+page.svelte`, build, run tests**

```bash
pnpm build && pnpm preview & sleep 2
pnpm test:e2e -- --grep "final CTA"
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/sections/FinalCtaSection.svelte src/routes/+page.svelte
git commit -m "feat: add FinalCtaSection with GitHub and Vercel deploy buttons"
```

---

## Task 18: Final `+page.svelte` — compose all sections + SEO metadata

**Files:** `src/routes/+page.svelte`

- [ ] **Step 1: Replace `src/routes/+page.svelte` with full composition and SEO**

```svelte
<script lang="ts">
	import HeroSection from '$components/sections/HeroSection.svelte';
	import FeaturesSection from '$components/sections/FeaturesSection.svelte';
	import TechStackSection from '$components/sections/TechStackSection.svelte';
	import HowToUseSection from '$components/sections/HowToUseSection.svelte';
	import DemoPreviewSection from '$components/sections/DemoPreviewSection.svelte';
	import StatsSection from '$components/sections/StatsSection.svelte';
	import FinalCtaSection from '$components/sections/FinalCtaSection.svelte';

	const SITE_URL = 'https://YOUR-SITE.vercel.app';
	const TITLE = 'SvelteKit Landing Page Template — Fast, Beautiful, Free';
	const DESCRIPTION =
		'A production-ready SvelteKit + Tailwind v4 landing page template. 100 Lighthouse score, MDsveX ready, one-click Vercel deploy.';
	const OG_IMAGE = `${SITE_URL}/og-image.png`;
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:image" content={OG_IMAGE} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
	<meta name="twitter:image" content={OG_IMAGE} />

	<!-- JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'SvelteKit Landing Page Template',
		url: SITE_URL,
		description: DESCRIPTION
	})}</script>`}
</svelte:head>

<HeroSection />
<FeaturesSection />
<TechStackSection />
<HowToUseSection />
<DemoPreviewSection />
<StatsSection />
<FinalCtaSection />
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat: compose full page with SEO metadata"
```

---

## Task 19: Static files — favicon, robots.txt, sitemap.xml

**Files:** `static/favicon.svg`, `static/robots.txt`, `static/sitemap.xml`

- [ ] **Step 1: Create `static/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d91e53"/>
      <stop offset="100%" stop-color="#9b1c3a"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="url(#g)"/>
  <text x="7" y="23" font-family="monospace" font-size="18" font-weight="bold" fill="white">&lt;/&gt;</text>
</svg>
```

- [ ] **Step 2: Create `static/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://YOUR-SITE.vercel.app/sitemap.xml
```

- [ ] **Step 3: Create `static/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://YOUR-SITE.vercel.app/</loc>
    <lastmod>2026-03-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Commit**

```bash
git add static/
git commit -m "feat: add favicon, robots.txt, and sitemap.xml"
```

---

## Task 20: Playwright e2e test suite

**Files:** `tests/landing.test.ts` (complete), `playwright.config.ts` (verify)

- [ ] **Step 1: Verify `playwright.config.ts` points at the preview server**

In `playwright.config.ts`, ensure:

```typescript
webServer: {
  command: 'pnpm build && pnpm preview',
  port: 4173,
  reuseExistingServer: !process.env.CI
},
use: {
  baseURL: 'http://localhost:4173'
}
```

- [ ] **Step 2: Replace `tests/landing.test.ts` with the complete test suite**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Landing page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('has correct page title', async ({ page }) => {
		await expect(page).toHaveTitle(/SvelteKit Landing Page Template/);
	});

	test('page loads without console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (err) => errors.push(err.message));
		await page.goto('/');
		expect(errors).toHaveLength(0);
	});

	test('hero renders headline and stats', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(page.getByText(/ever need/i)).toBeVisible();
		await expect(page.getByText('100')).toBeVisible();
	});

	test('features section has 6 cards', async ({ page }) => {
		await page.locator('#features').scrollIntoViewIfNeeded();
		await expect(page.getByRole('heading', { name: /everything you need/i })).toBeVisible();
		await expect(page.locator('.feature-card')).toHaveCount(6);
	});

	test('how-to-use section renders', async ({ page }) => {
		await page.locator('#how-to-use').scrollIntoViewIfNeeded();
		await expect(page.getByRole('heading', { name: /60 seconds/i })).toBeVisible();
	});

	test('final CTA section has GitHub link', async ({ page }) => {
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		await expect(page.getByRole('link', { name: /use template on github/i })).toBeVisible();
	});

	test('navbar Use Template link points to GitHub', async ({ page }) => {
		const cta = page.getByRole('link', { name: /use template/i }).first();
		await expect(cta).toHaveAttribute('href', /github\.com/);
	});

	test('skip to main content link is accessible', async ({ page }) => {
		await page.keyboard.press('Tab');
		await expect(page.getByText('Skip to main content')).toBeFocused();
	});

	test('mobile hamburger toggles menu', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.reload();
		const hamburger = page.getByRole('button', { name: /open menu/i });
		await hamburger.click();
		await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible();
	});

	test('features anchor link scrolls to section', async ({ page }) => {
		await page.getByRole('link', { name: 'Features' }).first().click();
		await expect(page.locator('#features')).toBeInViewport();
	});
});
```

- [ ] **Step 3: Run the full test suite**

```bash
pnpm build && pnpm preview &
sleep 3
pnpm test:e2e
```

Expected: All tests PASS. If any fail, diagnose — do not skip.

- [ ] **Step 4: Commit**

```bash
pkill -f "pnpm preview" 2>/dev/null || true
git add tests/ playwright.config.ts
git commit -m "test: add full Playwright e2e suite for landing page"
```

---

## Task 21: Create GitHub repo and push

- [ ] **Step 1: Authenticate with GitHub CLI (if not already)**

```bash
gh auth status
```

If not authenticated: `gh auth login` — choose GitHub.com, HTTPS, browser.

- [ ] **Step 2: Create the private GitHub repository**

```bash
cd /Users/loke.carlsson/Code/sveltekit-mdsvex-landing-page-template
gh repo create sveltekit-mdsvex-landing-page-template \
  --private \
  --description "A production-ready SvelteKit + Tailwind v4 landing page template" \
  --source=. \
  --remote=origin \
  --push
```

- [ ] **Step 3: Verify the push succeeded**

```bash
gh repo view --web
```

Expected: opens the new private GitHub repo in the browser.

- [ ] **Step 4: Update the GitHub URL placeholder in the codebase**

Replace `YOUR_USERNAME` in all source files with the real GitHub username:

```bash
GITHUB_USERNAME=$(gh api user --jq .login)

# Files that contain YOUR_USERNAME:
LC_ALL=C sed -i '' "s|YOUR_USERNAME|${GITHUB_USERNAME}|g" \
  src/lib/components/layout/NavBar.svelte \
  src/lib/components/sections/HeroSection.svelte \
  src/lib/components/sections/FinalCtaSection.svelte

# Verify no placeholders remain:
grep -r "YOUR_USERNAME" src/ && echo "FOUND — fix before continuing" || echo "OK — all replaced"
```

> **Note:** `YOUR-SITE.vercel.app` in `static/robots.txt`, `static/sitemap.xml`, and `src/routes/+page.svelte` **cannot** be replaced yet — the Vercel URL is only known after the first deploy. Leave these as-is. After deploying to Vercel, run:
>
> ```bash
> VERCEL_URL="https://your-actual-site.vercel.app"
> LC_ALL=C sed -i '' "s|https://YOUR-SITE.vercel.app|${VERCEL_URL}|g" \
>   static/robots.txt static/sitemap.xml src/routes/+page.svelte
> git add -A && git commit -m "chore: update Vercel URL" && git push
> ```

- [ ] **Step 5: Commit URL updates and push**

```bash
git add -A
git commit -m "chore: update GitHub username and repo URLs"
git push
```

---

## Done

All tasks complete. The project is:

- Built and passing all e2e tests
- Pushed to a private GitHub repo at `github.com/YOUR_USERNAME/sveltekit-mdsvex-landing-page-template`
- Ready to deploy: connect to Vercel, select the repo, deploy — zero config needed
