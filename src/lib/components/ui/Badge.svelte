<script lang="ts">
	interface Props {
		label: string;
		bgColor?: string;
		textColor?: string;
		borderColor?: string;
	}

	const {
		label,
		bgColor = 'rgba(217,30,83,0.1)',
		textColor = '#d91e53',
		borderColor = 'rgba(217,30,83,0.25)'
	}: Props = $props();
</script>

<span class="badge" style="background:{bgColor};color:{textColor};border-color:{borderColor}">
	{label}
</span>

<style>
	.badge {
		display: inline-block;
		padding: 0.3rem 0.8rem;
		border-radius: 0.375rem;
		border-width: 1px;
		border-style: solid;
		font-size: 0.82rem;
		font-weight: 600;
		font-family: var(--font-sans);
		letter-spacing: 0.01em;
	}
</style>
