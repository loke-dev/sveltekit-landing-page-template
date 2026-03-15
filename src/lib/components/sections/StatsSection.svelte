<script lang="ts">
	import { fadeIn } from '$utils/fadeIn';

	const stats = [
		{ value: '100',   label: 'Lighthouse Score',   sublabel: 'Performance',      color: '#d91e53' },
		{ value: '<50ms', label: 'TTFB',               sublabel: 'Time to First Byte', color: '#ffba02' },
		{ value: '★',     label: 'GitHub Stars',       sublabel: 'And growing',       color: '#4ade80' },
		{ value: 'MIT',   label: 'License',            sublabel: 'Free forever',      color: '#60a5fa' },
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
		border-top: 1px solid rgba(255,255,255,0.04);
		border-bottom: 1px solid rgba(255,255,255,0.04);
	}

	.stats-eyebrow {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.3);
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
		.stats-grid { grid-template-columns: repeat(4, 1fr); }
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
		color: rgba(255,255,255,0.35);
	}
</style>
