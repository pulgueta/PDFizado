const viewports = ['macbook-15', 'ipad-2', [450, 932]];

describe('Landing page', () => {
	viewports.forEach((viewport) => {
		it(`Visit the landing page in ${viewport} size screen and check for the first page content`, () => {
			if (Cypress._.isArray(viewport)) {
				cy.viewport(viewport[0], viewport[1]);
			} else {
				cy.viewport(viewport as Cypress.ViewportPreset);
			}

			cy.visit(Cypress.env('BASE_URL'));

			cy.get('#landing-title').should('contain.text', 'PDFizado');
			cy.get('#landing-description').should(
				'contain.text',
				'Haz tu estudio más fácil interactuando con la Inteligencia Artificial mediante un chat para extraer la información más relevante de tus archivos PDF.'
			);
			cy.get('#landing-explanation').should(
				'contain.text',
				'¡Solamente arrastra tu archivo y puedes empezar a preguntar lo que necesites!'
			);
		});
	});
});
