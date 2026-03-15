<script lang="ts">
	import Button from '$components/ui/Button.svelte';
	import SectionLabel from '$components/ui/SectionLabel.svelte';
	import { GITHUB_URL } from '$lib/config';

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
	<div class="hero-border" aria-hidden="true"></div>
	<div class="hero-grid" aria-hidden="true"></div>
	<div class="hero-glow" aria-hidden="true"></div>

	{#each particles as p (p.content)}
		<span
			class="particle"
			aria-hidden="true"
			style="position:absolute;{p.pos};color:{p.color};opacity:{p.opacity};transform:rotate({p.rot});animation-delay:{p.delay};"
			>{p.content}</span
		>
	{/each}

	<div class="hero-content">
		<SectionLabel color="var(--color-secondary)" text="✦ Open Source Template ✦" />

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

	<dl class="hero-stats">
		{#each stats as stat (stat.label)}
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

	.hero-headline {
		font-size: clamp(2.4rem, 6vw, 5rem);
		font-weight: 900;
		color: white;
		line-height: 1.1;
		letter-spacing: -0.025em;
		margin: 0;
	}

	.hero-gradient {
		color: #ffc14d;
		background: linear-gradient(135deg, #f04b7a, #ffc14d);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtext {
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		color: var(--color-text-secondary, #b8c4d8);
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
		color: var(--color-text-subtle, #8d9bb3);
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
