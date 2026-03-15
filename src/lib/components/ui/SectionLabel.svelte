<script lang="ts">
	interface Props {
		text: string;
		color?: string;
	}

	const { text, color = 'var(--color-primary)' }: Props = $props();
</script>

<p class="label" style="color:{color}">{text}</p>

<style>
	.label {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		margin-bottom: 0.6rem;
		margin-top: 0;
	}
</style>
