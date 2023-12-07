import { User } from '~/cypress/types';

describe('Login | Logout', () => {
	it('Visits the landing page, logs in with valid credentials and then logs out', () => {
		cy.visit(Cypress.env('BASE_URL'));

		cy.get('#navbar-btn').click();
		cy.wait(1000);
		cy.get('#login').click({ force: true });
		cy.wait(1000);

		cy.fixture('user.json').then((user: User) => {
			cy.get('#email').type(user.email);
			cy.wait(1000);
			cy.get('#password').type(user.password);
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
});
