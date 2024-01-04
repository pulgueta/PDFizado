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
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] },
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] },
		},
		{
			name: 'Microsoft Edge',
			use: { ...devices['Desktop Edge'], channel: 'msedge' },
		},
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
