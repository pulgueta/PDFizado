import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {},
	env: {
		BASE_URL: 'http://localhost:3000',
	},
});
