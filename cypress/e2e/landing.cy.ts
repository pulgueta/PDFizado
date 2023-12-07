describe('Landing page', () => {
	it('Visits the Landing Page and verifies the content matches the test', () => {
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
