<script lang="ts">
	import Badge from '$components/ui/Badge.svelte';
	import SectionLabel from '$components/ui/SectionLabel.svelte';
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

<section class="section cv-section" aria-label="Built With">
	<div class="section-container">
		<div class="stack-inner" use:fadeIn>
			<SectionLabel text="Built With" color="var(--color-text-subtle, #8d9bb3)" />
			<div class="stack-badges" role="list">
				{#each stack as tech (tech.label)}
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

	.stack-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		justify-content: center;
	}
</style>
