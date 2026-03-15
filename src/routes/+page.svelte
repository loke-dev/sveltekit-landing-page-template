<script lang="ts">
	import HeroSection from '$components/sections/HeroSection.svelte';
	import FeaturesSection from '$components/sections/FeaturesSection.svelte';
	import TechStackSection from '$components/sections/TechStackSection.svelte';
	import HowToUseSection from '$components/sections/HowToUseSection.svelte';
	import DemoPreviewSection from '$components/sections/DemoPreviewSection.svelte';
	import StatsSection from '$components/sections/StatsSection.svelte';
	import FinalCtaSection from '$components/sections/FinalCtaSection.svelte';
	import { SITE_URL } from '$lib/config';

	const OG_IMAGE = `${SITE_URL}/og-image.png`;

	const TITLE = 'SvelteKit Landing Page Template — Fast, Beautiful, Free';
	const DESCRIPTION =
		'A production-ready SvelteKit + Tailwind v4 landing page template. 100 Lighthouse score, MDsveX ready, one-click Vercel deploy.';
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
	<!-- eslint-disable svelte/no-at-html-tags, no-useless-escape -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'SvelteKit Landing Page Template',
		url: SITE_URL,
		description: DESCRIPTION
	})}<\/script>`}
	<!-- eslint-enable svelte/no-at-html-tags, no-useless-escape -->
</svelte:head>

<HeroSection />
<FeaturesSection />
<TechStackSection />
<HowToUseSection />
<DemoPreviewSection />
<StatsSection />
<FinalCtaSection />
