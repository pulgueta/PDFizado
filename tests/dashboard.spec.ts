import { test, expect } from '@playwright/test';

test('Logs into an existing account', async ({ page, isMobile }) => {
	await page.goto('/');

	if (isMobile) {
		await page.getByLabel('Mobile navbar menu button').click();
		await page.getByRole('link', { name: 'Iniciar sesión' }).click();
	} else {
		await expect(page.getByLabel('Iniciar sesión')).toBeVisible();
		await expect(page.getByLabel('Iniciar sesión')).toContainText(
			'Iniciar sesión'
		);
		await page.getByLabel('Iniciar sesión').click();
	}

	await expect(
		page.getByRole('heading', { name: 'Iniciar sesión' })
	).toBeVisible();

	await expect(page.getByText('Accede a tu cuenta para')).toBeVisible();

	await expect(page.getByPlaceholder('Tu correo registrado')).toBeVisible();

	await page.getByPlaceholder('Tu correo registrado').click();

	await page
		.getByPlaceholder('Tu correo registrado')
		.fill('retardix456@gmail.com');

	await expect(page.getByPlaceholder('Tu contraseña')).toBeVisible();

	await page.getByPlaceholder('Tu contraseña').click();

	await page.getByPlaceholder('Tu contraseña').fill('cypress123');

	await expect(
		page.getByRole('button', { name: 'Iniciar sesión' })
	).toBeVisible();

	await page.getByRole('button', { name: 'Iniciar sesión' }).click();

	await expect(page.locator('#dashboard-title')).toContainText(
		'Dashboard de Andres'
	);

	await expect(page.getByText('Bienvenido a tu dashboard,')).toBeVisible();

	await expect(page.getByRole('button', { name: 'Subir PDF' })).toBeVisible();

	await expect(
		page.getByRole('heading', { name: 'Tus PDFs:' })
	).toBeVisible();

	await expect(
		page.locator('div').filter({ hasText: /^No tienes PDFs$/ })
	).toBeVisible();

	await page.getByRole('button', { name: 'Toggle theme' }).click();
	await page.getByRole('menuitem', { name: 'Claro' }).click();
	await page.getByRole('button', { name: 'Toggle theme' }).click();
	await page.getByRole('menuitem', { name: 'Oscuro' }).click();
	await page.getByRole('button', { name: 'Toggle theme' }).click();
	await page.getByRole('menuitem', { name: 'Sistema' }).click();
});
