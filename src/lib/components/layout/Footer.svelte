<footer class="footer">
	<div class="footer-border" aria-hidden="true"></div>
	<div class="footer-inner">
		<p class="footer-left">
			Built with
			<a href="https://kit.svelte.dev" target="_blank" rel="noopener noreferrer">SvelteKit</a>
			·
			<a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">Tailwind</a>
			·
			<a href="https://mdsvex.pngwn.io" target="_blank" rel="noopener noreferrer">MDsveX</a>
		</p>
		<p class="footer-right">
			© {new Date().getFullYear()} · MIT License
		</p>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		background: var(--color-background);
	}

	.footer-border {
		height: 2px;
		background: linear-gradient(90deg, transparent, #d91e53, #ffba02, #4b2ec6, transparent);
		background-size: 200% 100%;
		animation: gradient-shift 8s ease infinite;
	}

	.footer-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1.25rem 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.footer-left,
	.footer-right {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.35);
		margin: 0;
	}

	.footer-left a {
		color: rgba(255, 255, 255, 0.5);
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-left a:hover {
		color: rgba(255, 255, 255, 0.8);
	}

	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
</style>
