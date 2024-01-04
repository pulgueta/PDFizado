import { test, expect } from '@playwright/test';

test('Landing', async ({ page }) => {
	await page.goto('/');

	expect(page.getByTestId('landing-title')).toBeDefined();
	expect(page.getByTestId('landing-description')).toBeDefined();
	expect(page.getByRole('heading')).toBeDefined();
	expect(page.getByRole('paragraph')).toBeDefined();
	expect(page.getByRole('img')).toBeDefined();
});
