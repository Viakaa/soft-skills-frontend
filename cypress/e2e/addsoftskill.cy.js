describe('Admin Panel Access', () => {
    beforeEach(() => {
        // Log in as an admin user
        cy.visit('http://localhost:3000/login');

        cy.get('input[name="email"]').type('adminqa@gmail.com'); // Admin email
        cy.get('input[name="password"]').type('987654321'); // Admin password
        cy.get('button[type="submit"]').click();

        // Ensure redirection to the main page
        cy.get('#main-link', { timeout: 10000 }).should('be.visible').click();
    });

    it('Redirects to the Admin Panel when Admin Panel link is clicked', () => {
        // Click on the Admin dropdown to expand it
        cy.get('#navbarScrollingDropdown').click();

        // Wait for the Admin Panel link to appear and click it
        cy.get('#admin-panel').should('be.visible').click();

        // Verify redirection to the Admin Panel page
        cy.url().should('include', '/adminpanel');
    });

    it('Redirects to add new soft skill', () => {
        cy.visit('http://localhost:3000/adminpanel')

        // cy.get('#manageTable__add').click()

        cy.url().should('include', '/login')
    })
});
