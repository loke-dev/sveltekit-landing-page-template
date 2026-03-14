import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	kit: {
		adapter: adapter({ runtime: 'nodejs22.x' }),
		alias: {
			$components: 'src/lib/components',
			$styles: 'src/lib/styles',
			$utils: 'src/lib/utils'
		}
	}
};

export default config;
