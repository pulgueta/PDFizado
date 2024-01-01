import { test, expect } from '@playwright/test';

test('Title', async ({ page }) => {
	await page.goto('/');

	expect(page.getByText(/PDFizado/)).toBeInViewport();
});
