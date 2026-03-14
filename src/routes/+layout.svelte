<script lang="ts">
	import '../lib/styles/app.css';
	import NavBar from '$components/layout/NavBar.svelte';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<a href="#main" class="skip-link">Skip to main content</a>

<NavBar />

<main id="main" style="padding-top:64px;">
	{@render children()}
</main>

<!-- Footer placeholder — replaced in Task 9 -->
<footer></footer>
