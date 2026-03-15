import { test, expect } from '@playwright/test';

test.describe('Landing page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('has correct page title', async ({ page }) => {
		await expect(page).toHaveTitle(/SvelteKit Landing Page Template/);
	});

	test('page loads without console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (err) => errors.push(err.message));
		await page.goto('/');
		expect(errors).toHaveLength(0);
	});

	test('hero renders headline and stats', async ({ page }) => {
		const hero = page.getByRole('region', { name: /hero/i });
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(hero.getByText(/ever need/i)).toBeVisible();
		await expect(hero.getByText('100', { exact: true })).toBeVisible();
	});

	test('features section has 6 cards', async ({ page }) => {
		await page.locator('#features').scrollIntoViewIfNeeded();
		await expect(page.getByRole('heading', { name: /everything you need/i })).toBeVisible();
		await expect(page.locator('.feature-card')).toHaveCount(6);
	});

	test('how-to-use section renders', async ({ page }) => {
		await page.locator('#how-to-use').scrollIntoViewIfNeeded();
		await expect(page.getByRole('heading', { name: /60 seconds/i })).toBeVisible();
	});

	test('final CTA section has GitHub link', async ({ page }) => {
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		await expect(page.getByRole('link', { name: /use template on github/i })).toBeVisible();
	});

	test('navbar Use Template link points to GitHub', async ({ page }) => {
		const cta = page.getByRole('link', { name: /use template/i }).first();
		await expect(cta).toHaveAttribute('href', /github\.com/);
	});

	test('skip to main content link is accessible', async ({ page }) => {
		await page.keyboard.press('Tab');
		await expect(page.getByText('Skip to main content')).toBeFocused();
	});

	test('mobile hamburger toggles menu', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.reload();
		const hamburger = page.getByRole('button', { name: /open menu/i });
		await hamburger.click();
		await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible();
	});

	test('features anchor link scrolls to section', async ({ page }) => {
		await page.getByRole('link', { name: 'Features' }).first().click();
		await expect(page.locator('#features')).toBeInViewport();
	});
});
