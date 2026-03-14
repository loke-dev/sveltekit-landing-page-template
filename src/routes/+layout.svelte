<script lang="ts">
	import '../lib/styles/app.css';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<slot />
