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
			desc: 'Latest utility-first CSS. Design tokens in @theme — zero config file.',
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
			{#each features as feature, i (feature.title)}
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
