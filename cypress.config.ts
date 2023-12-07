import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		env: {
			BASE_URL: process.env.BASE_URL ?? '',
			CY_EMAIL: process.env.CY_EMAIL ?? '',
			CY_PASSWORD: process.env.CY_PASSWORD ?? '',
		},
	},
	env: {
		BASE_URL: process.env.BASE_URL ?? '',
		CY_EMAIL: process.env.CY_EMAIL ?? '',
		CY_PASSWORD: process.env.CY_PASSWORD ?? '',
	},
	viewportHeight: 932,
	viewportWidth: 430,
});
