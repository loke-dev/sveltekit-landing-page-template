import { defineMDSveXConfig as define } from 'mdsvex';
import rehypeSlug from 'rehype-slug';

export default define({
	extensions: ['.svelte.md', '.md', '.svx'],
	rehypePlugins: [rehypeSlug],
	smartypants: { dashes: 'oldschool' }
});
