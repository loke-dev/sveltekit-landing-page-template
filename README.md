# SvelteKit Landing Page Template

A production-ready landing page template built with SvelteKit, Tailwind CSS v4, and MDsveX.

<img width="939" height="691" alt="Image" src="https://github.com/user-attachments/assets/8a2e3c04-3da9-4993-931f-0fbb0aad9a60" />

## Features

- **Blazing Fast** — SSG + Vite 8. 100 Lighthouse score out of the box
- **Tailwind v4** — Design tokens in `@theme`, zero config file
- **TypeScript** — Fully typed, Svelte 5 runes syntax throughout
- **MDsveX Ready** — Add a blog in minutes
- **SEO Optimised** — OG tags, sitemap, JSON-LD structured data
- **Deploy Ready** — Cloudflare Workers configuration included

## Stack

- [SvelteKit 2](https://kit.svelte.dev) + [Svelte 5](https://svelte.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [MDsveX](https://mdsvex.pngwn.io)
- [TypeScript](https://typescriptlang.org)
- [Vite 8](https://vite.dev)

## Get Started

```bash
git clone https://github.com/loke-dev/sveltekit-landing-page-template
cd sveltekit-landing-page-template
pnpm install
pnpm dev
```

Requires Node.js 22.12+ and pnpm 11.17.0.

## Customise

1. Update the GitHub URL in `src/lib/config.ts`
2. Update the site URL in `src/routes/+page.svelte`
3. Edit section content in `src/lib/components/sections/`
4. Add your own `og-image.png` to `static/` (1200×630px recommended)

## Deploy

[Live demo](https://sveltekit-landing-page.loke.dev)

```bash
pnpm ci-check
pnpm test:e2e
pnpm deploy:dry
pnpm deploy
```

TypeScript 6 is intentional: it is the newest release currently supported by
typescript-eslint.

## License

MIT
