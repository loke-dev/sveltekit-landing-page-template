import { browser } from '$app/environment';

interface FadeInOptions {
	delay?: number;
	threshold?: number;
}

export function fadeIn(node: HTMLElement, { delay = 0, threshold = 0.1 }: FadeInOptions = {}) {
	if (!browser) return {};

	// Skip animation entirely for users who prefer reduced motion
	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced) {
		return {};
	}

	// Set initial invisible state only when JS is running (progressive enhancement)
	node.style.opacity = '0';
	node.style.transform = 'translateY(24px)';

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
				node.style.opacity = '1';
				node.style.transform = 'translateY(0)';
				observer.disconnect();
			}
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
