<script lang="ts">
	import SectionLabel from '$components/ui/SectionLabel.svelte';
	import { fadeIn } from '$utils/fadeIn';
</script>

<section class="section cv-section cv-section--tall" aria-labelledby="preview-heading">
	<div class="section-container">
		<div class="section-header" use:fadeIn>
			<SectionLabel color="var(--color-secondary)" text="Live Preview" />
			<h2 id="preview-heading" class="section-title">See what you're getting.</h2>
		</div>

		<div
			class="browser"
			use:fadeIn={{ delay: 150 }}
			role="img"
			aria-label="Browser preview of the landing page template"
		>
			<div class="browser-chrome" aria-hidden="true">
				<div class="browser-dots">
					<span class="dot red"></span>
					<span class="dot yellow"></span>
					<span class="dot green"></span>
				</div>
				<div class="browser-url">your-site.vercel.app</div>
			</div>

			<div class="browser-body" aria-hidden="true">
				<div class="mini-hero">
					<div class="mini-grid"></div>
					<div class="mini-glow"></div>
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
						<SectionLabel color="var(--color-primary)" text="✦ Open Source Template ✦" />
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
		color: var(--color-text-subtle, #8d9bb3);
		font-family: var(--font-mono);
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
