import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'pnpm build && pnpm preview --host 127.0.0.1',
		port: 4173
	},
	testMatch: '**/*.{e2e,test}.{ts,js}',
	use: {
		baseURL: 'http://127.0.0.1:4173'
	}
});
