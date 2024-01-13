import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://127.0.0.1:3000',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'], isMobile: false },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'], isMobile: false },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'], isMobile: false },
		},
		{
			name: 'Mobile Chrome',
			use: {
				...devices['Pixel 2'],
				isMobile: true,
				viewport: { height: 732, width: 412 },
			},
		},
		{
			name: 'Mobile Safari',
			use: {
				...devices['iPhone X'],
				isMobile: true,
				viewport: { height: 812, width: 375 },
			},
		},
		{
			name: 'Microsoft Edge',
			use: {
				...devices['Desktop Edge'],
				isMobile: false,
				channel: 'msedge',
			},
		},
	],

	webServer: {
		command: 'npm run start',
		url: 'http://127.0.0.1:3000',
		reuseExistingServer: !process.env.CI,
	},
});
