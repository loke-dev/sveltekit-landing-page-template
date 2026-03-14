# SvelteKit MDsveX Landing Page Template — Design Spec

**Date:** 2026-03-17
**Status:** Approved

---

## Overview

A production-ready SvelteKit landing page template. Single-page, no blog or multi-route navigation. The page showcases itself — example content demonstrates the template's own features, tech stack, and quality. Bold product-launch tone. Intended to be cloned, customised, and deployed in under 60 seconds.

---

## Visual Style

**Dark Tech** — derived from `sveltekit-mdsvex-blog-template` design tokens:

- **Background:** `#030e29` (near-black dark blue)
- **Primary accent:** `#d91e53` (hot pink/red)
- **Secondary accent:** `#ffba02` (amber/gold)
- **Tertiary:** `#4b2ec6` (deep purple)
- **Code background:** `#001445`
- **Body text:** warm off-white `#efebe9`
- **Font stack:** Inter (sans), JetBrains Mono (mono)
- **Tailwind CSS v4** — utility-first; custom design tokens (colors, animations, shadows) defined via `@theme` block in `app.css`, not in a config file. No `tailwind.config.js`.
- Glassmorphism cards, animated gradient borders, radial glow effects, floating code particles

**Copy tone:** Bold, confident product-launch voice ("The last landing page template you'll ever need.")

---

## Architecture

**Approach: Component-per-section**

Each page section is its own focused Svelte component. `+page.svelte` is a thin orchestrator that imports and composes them. No data-driven abstraction — content lives directly in the components, making it trivially easy for template users to edit.

**Svelte 5 patterns:**
- All components use runes syntax: `const { href, variant = 'primary' } = $props()` instead of `export let`
- Event handling: callback props (`onclick`, `onkeydown`) passed via `$props()` instead of `createEventDispatcher` or `on:` directives
- Slot content: `{@render children()}` with `const { children } = $props()` instead of `<slot>`
- No `on:click` forwarding — components accept `onclick` prop directly

**Data loading:**
- `+layout.ts`: `export const prerender = true`
- No `+page.server.ts` needed (all content is static)
- GitHub Stars stat is hard-coded; no server load function required
- `adapter-vercel` is appropriate — it respects `prerender = true` and outputs static files, compatible with any CDN

**Section `id` attributes for anchor navigation:**
- `<section id="features">` — FeaturesSection
- `<section id="how-to-use">` — HowToUseSection
- Other sections have no anchor IDs (not linked from nav)

### Stack

| Layer | Technology |
|-------|-----------|
| Framework | SvelteKit 2 + Svelte 5 (runes syntax) |
| Styling | Tailwind CSS v4 + PostCSS |
| Content | MDsveX (configured, not used on homepage — ready for blog extension) |
| Build | Vite 6 |
| Deployment | Vercel (adapter-vercel), pre-rendering enabled |
| Language | TypeScript 5 |
| Package manager | pnpm |
| Linting | ESLint 9 + Prettier |

---

## File Structure

```
src/
  routes/
    +layout.svelte          # Minimal — NavBar + slot + Footer
    +layout.ts              # prerender: true
    +page.svelte            # Composes all section components
  lib/
    components/
      layout/
        NavBar.svelte       # Fixed top nav: logo + links + CTA button
        Footer.svelte       # Minimal: attribution + license + links
      sections/
        HeroSection.svelte
        FeaturesSection.svelte
        TechStackSection.svelte
        HowToUseSection.svelte
        DemoPreviewSection.svelte
        StatsSection.svelte
        FinalCtaSection.svelte
      ui/
        Button.svelte       # Polymorphic (a or button), variants: primary/outline
        Badge.svelte        # Tech stack badge pill
        SectionLabel.svelte # Small uppercase eyebrow label
    styles/
      app.css               # @theme block (colors, animations, shadows), Tailwind layers
static/
  favicon.svg
  robots.txt
  sitemap.xml
svelte.config.js
vite.config.js
mdsvex.config.js
tsconfig.json
package.json
.gitignore
```

---

## Page Sections (top to bottom)

### 1. NavBar (layout)
Fixed top bar. Logo mark + site name left. Nav links + primary CTA button ("Use Template →") right. Collapses to hamburger on mobile. Animated gradient top border (matching hero).

Nav links and their targets:
- **Features** — in-page anchor `#features` (smooth scroll)
- **Get Started** — in-page anchor `#how-to-use` (smooth scroll)
- **GitHub** — external link to repo URL (placeholder: `https://github.com/YOUR_USERNAME/sveltekit-mdsvex-landing-page-template`, `target="_blank" rel="noopener noreferrer"`)

### 2. Hero Section
Full-viewport-height immersive hero:
- Animated gradient top border (pink → amber → purple)
- Radial glow centred behind headline
- Subtle grid background texture
- Floating code particle keywords (const, async, export, () =>, return…) — same system as blog template
- Eyebrow label: "✦ Open Source Template ✦" in amber monospace
- Large gradient headline: "The last landing page template you'll **ever need**" (pink/amber gradient on key words)
- Subtext: one sentence value proposition
- Two CTAs: "Use Template →" (primary, pink gradient with glow shadow) + "View Demo" (outline)
- Inline stats bar below CTAs: Perf Score 100 / Load Time <1s / Free / SSG — separated by subtle divider

### 3. Features Section
- Eyebrow: "Why This Template"
- Headline: "Everything you need. Nothing you don't."
- 3×2 grid of feature cards (6 total), each with:
  - Emoji icon
  - Feature name (bold white)
  - One-line description
  - Distinct accent colour per card border
- Features: Blazing Fast, Tailwind v4, TypeScript, MDsveX Ready, SEO Optimised, Deploy Ready

### 4. Tech Stack Section
- Eyebrow: "Built With"
- Horizontal wrapping row of coloured badge pills
- Badges: SvelteKit 2, Svelte 5, Tailwind v4, TypeScript, MDsveX, Vite 6, Vercel
- Each badge styled with matching ecosystem colour (Svelte orange, Tailwind sky, etc.)

### 5. How to Use Section
- Eyebrow: "Get Started"
- Headline: "Up and running in 60 seconds."
- Left column: numbered 3-step list (Use Template → Install → Customise & Deploy)
- Right column: macOS terminal window mockup with clone/install/dev commands and green success output
- Grid layout (1-col mobile, 2-col desktop)

### 6. Demo Preview Section
- Eyebrow: "Live Preview"
- Headline: "See what you're getting."
- Browser chrome mockup (traffic light dots + URL bar) wrapping a **static HTML/CSS recreation** of a mini hero — self-referential, the template previewing itself
- Implementation: pure Svelte/CSS within `DemoPreviewSection.svelte`. No iframe (avoids recursive embed and CSP issues). No screenshot image (avoids stale asset). Scaled-down version of the hero visuals rendered inline.

### 7. Stats Section
- Eyebrow: "By the Numbers"
- 4-column stat grid: Lighthouse Score (100), TTFB (<50ms), GitHub Stars (static value — hard-coded, e.g. "★ 0" initially; users update manually), MIT License
- No server-side fetch for stars; keeps the page fully static and avoids GitHub API rate limits
- Large bold numbers in accent colours

### 8. Final CTA Section
- Full-width banner with gradient border top, gradient background tint
- Headline: "Ready to ship something beautiful?"
- Subtext: "Clone it. Customise it. Make it yours."
- Two buttons: "Use Template on GitHub →" (primary) + "Deploy to Vercel" (outline)

### 9. Footer (layout)
- Minimal single row: "Built with SvelteKit · Tailwind · MDsveX" left, copyright + MIT right
- Animated gradient top border

---

## Animations & Effects

- **Gradient border:** `linear-gradient` animated via `background-position` — NavBar and Footer top border, Hero top border, Final CTA top border
- **Floating particles:** `@keyframes float-code` — position, opacity, rotation varying per particle (20 instances in hero)
- **Radial glow:** static CSS radial-gradient centred behind hero headline
- **FadeIn:** `@keyframes fadeIn` on section entry (opacity + translateY) — sections below the fold
- **Intersection Observer:** trigger fadeIn when sections scroll into view. Must be guarded with `import { browser } from '$app/environment'` — only run in the browser, not during SSR/prerender. Server-side render state: sections visible by default (no `opacity: 0` without JS).
- **Hover states:** scale transform + glow shadow on feature cards and buttons
- Performance note: all animations use `transform` and `opacity` only (GPU-composited, no layout thrash)

---

## SEO & Meta

- Full Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card meta
- JSON-LD `WebSite` schema
- `sitemap.xml` and `robots.txt` in `/static`
- Semantic HTML: `<main>`, `<section>`, `<nav>`, `<footer>`, `<h1>`–`<h3>` hierarchy

---

## Accessibility

- Skip-to-main-content link
- All interactive elements have visible focus states
- Colour contrast ≥ 4.5:1 on all text
- ARIA labels on icon-only buttons
- Keyboard-navigable hamburger menu (ESC to close)
- Reduced motion: animations wrapped in `@media (prefers-reduced-motion: no-preference)`

---

## Performance Targets

- Lighthouse Performance: 100
- Lighthouse Accessibility: 100
- TTFB: < 50ms (SSG + CDN)
- LCP: < 1s
- No render-blocking resources
- Fonts: preconnect + preload links for Inter and JetBrains Mono from Google Fonts — placed in `app.html` `<head>` as static `<link rel="preconnect">` and `<link rel="preload">` tags (not in a Svelte component, to ensure they are present before any JS runs)

---

## What's Intentionally Excluded

- No blog / journal routes (MDsveX is configured but unused on the landing page)
- No dark/light mode toggle (dark-only)
- No analytics integration (users add their own)
- No contact form
- No i18n
- No service worker / PWA (not needed for a landing page template)

---

## Reference

- Source template: `~/code/sveltekit-mdsvex-blog-template`
- Reuse: design tokens, animation keyframes, Button component pattern, NavBar/Footer patterns, GridBackground, floating particle system
- Improve over reference: Svelte 5 runes syntax throughout, simpler file structure (single page), no Vercel Analytics baked in, reduced motion support
