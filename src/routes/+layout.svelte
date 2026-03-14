<script lang="ts">
	import '../lib/styles/app.css';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<a href="#main" class="skip-link">Skip to main content</a>

<!-- NavBar placeholder — will be replaced in Task 8 -->
<header style="height:64px;"></header>

<main id="main" style="padding-top:64px;">
	{@render children()}
</main>

<!-- Footer placeholder — will be replaced in Task 9 -->
<footer></footer>
