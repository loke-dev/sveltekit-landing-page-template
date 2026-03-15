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
			<ol class="steps" use:fadeIn={{ delay: 100 }}>
				{#each steps as step, i (step.title)}
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
		color: var(--color-text-subtle, #8d9bb3);
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
		color: var(--color-text-subtle, #8d9bb3);
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
