import { test, expect } from '@playwright/test';

test('Checks for landing page content and then goes to the login page.', async ({
	page,
	isMobile,
}) => {
	await page.goto('/');

	await page.locator('#branding').click();

	await expect(page.locator('#landing-title')).toContainText('PDFizado');

	await expect(page.locator('#landing-description')).toContainText(
		'Haz tu estudio más fácil interactuando con la Inteligencia Artificial mediante un chat para extraer la información más relevante de tus archivos PDF.'
	);

	await expect(page.locator('#landing-explanation')).toContainText(
		'¡Solamente arrastra tu archivo y puedes empezar a preguntar lo que necesites!'
	);

	await expect(page.getByRole('main')).toContainText('Interfaz y utilidad');

	await expect(page.getByRole('main')).toContainText(
		'Contamos con una interfaz sencilla de utilizar y fácil de entender para una accesibilidad con alcance total para todo tipo de usuarios.'
	);

	await expect(
		page.getByRole('img', { name: 'PDFizado - UI' })
	).toBeVisible();

	await expect(page.locator('body')).toContainText(
		'Tenemos 3 planes para que puedas utilizar PDFizado'
	);

	await expect(page.getByRole('link', { name: 'Registrarme' })).toBeVisible();

	if (isMobile) {
		await page.getByLabel('Mobile navbar menu button').click();

		await page.getByRole('link', { name: 'Iniciar sesión' }).click();
	} else {
		await page.getByRole('link', { name: 'Iniciar sesión' }).click();
	}

	expect(page.getByText('Iniciar sesión')).toBeDefined();

	await expect(
		page.getByText('Accede a tu cuenta para iniciar a interactuar.')
	).toBeVisible();

	await expect(
		page.getByRole('heading', { name: 'Iniciar sesión' })
	).toBeVisible();

	await expect(page.getByText('Accede a tu cuenta para')).toBeVisible();

	await expect(page.getByPlaceholder('Tu correo registrado')).toBeVisible();

	await expect(page.getByPlaceholder('Tu contraseña')).toBeVisible();

	await expect(
		page.getByRole('button', { name: 'Iniciar sesión' })
	).toBeVisible();
});
