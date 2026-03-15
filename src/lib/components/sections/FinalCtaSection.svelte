<script lang="ts">
	import Button from '$components/ui/Button.svelte';
	import { fadeIn } from '$utils/fadeIn';

	const GITHUB_URL =
		'https://github.com/loke-dev/sveltekit-mdsvex-landing-page-template';
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
		background: linear-gradient(135deg, rgba(217,30,83,0.08), rgba(75,46,198,0.08));
		border-top: 1px solid rgba(217,30,83,0.15);
		padding: 5rem 1.5rem;
		overflow: hidden;
	}

	.cta-border {
		position: absolute;
		top: 0; left: 0; right: 0;
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
		color: rgba(255,255,255,0.5);
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
		0%, 100% { background-position: 0% 50%; }
		50%       { background-position: 100% 50%; }
	}
</style>
