describe('Auth', () => {
	it('Visit the Login page and login with valid credentials', () => {
		cy.visit(Cypress.env('BASE_URL'));

		cy.get('#navbar-btn').click();
		cy.wait(1000);
		cy.get('#login').click({ force: true });
		cy.wait(1000);
		cy.get('#email').type('retardix456@gmail.com');
		cy.wait(1000);
		cy.get('#password').type('olakase123');
		cy.wait(1000);
		cy.get('#submit-btn').click();
		cy.wait(1000);
		cy.get('#dashboard-title')
			.should('exist')
			.should('contain.text', 'Dashboard de');
	});
	it('Login and logout', () => {
		cy.visit(Cypress.env('BASE_URL'));

		cy.get('#navbar-btn').click();
		cy.wait(1000);
		cy.get('#login').click({ force: true });
		cy.wait(1000);
		cy.get('#email').type('retardix456@gmail.com');
		cy.wait(1000);
		cy.get('#password').type('olakase123');
		cy.wait(1000);
		cy.get('#submit-btn').click();
		cy.wait(1000);
		cy.get('#dashboard-title')
			.should('exist')
			.should('contain.text', 'Dashboard de');
		cy.wait(1000);
		cy.get('#navbar-btn').click();
		cy.wait(1000);
		cy.get('#logout-btn').click({ force: true });
		cy.wait(2000);
		cy.get('#branding').click({ force: true });
		cy.wait(1000);
		cy.get('#landing-title').should('contain.text', 'PDFizado');
	});
});
