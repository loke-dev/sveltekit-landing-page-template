<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		variant?: 'primary' | 'outline';
		class?: string;
		onclick?: (e: MouseEvent) => void;
		target?: string;
		rel?: string;
		children: Snippet;
	}

	const {
		href,
		variant = 'primary',
		class: className = '',
		onclick,
		target,
		rel,
		children
	}: Props = $props();
</script>

{#if href}
	<a {href} {target} {rel} class="btn btn-{variant} {className}">
		{@render children()}
	</a>
{:else}
	<button {onclick} class="btn btn-{variant} {className}">
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		font-weight: 600;
		font-size: 0.95rem;
		border-radius: 0.5rem;
		padding: 0.7rem 1.5rem;
		transition:
			transform 0.2s,
			box-shadow 0.2s,
			border-color 0.2s,
			color 0.2s;
		text-decoration: none;
		cursor: pointer;
		border: none;
		font-family: inherit;
		white-space: nowrap;
	}

	.btn:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--color-primary), #9b1c3a);
		color: white;
		box-shadow: 0 0 20px rgba(217, 30, 83, 0.3);
	}

	.btn-primary:hover {
		transform: scale(1.03);
		box-shadow: 0 0 32px rgba(217, 30, 83, 0.5);
	}

	.btn-outline {
		background: transparent;
		color: rgba(255, 255, 255, 0.75);
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(4px);
	}

	.btn-outline:hover {
		border-color: rgba(255, 255, 255, 0.4);
		color: white;
	}
</style>
