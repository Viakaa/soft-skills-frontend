describe('Admin Panel Access', () => {
    beforeEach(() => {
        // Log in as an admin user
        cy.visit('http://localhost:3000/login');

        cy.get('input[name="email"]').type('adminqa@gmail.com'); // Admin email
        cy.get('input[name="password"]').type('987654321'); // Admin password
        cy.get('button[type="submit"]').click();
    });

    it('Redirects to the Admin Panel when Admin Panel link is clicked', () => {
        // Click on the Admin dropdown to expand it
        cy.get('#navbarScrollingDropdown').click();
        cy.wait(1000); 

        // Wait for the Admin Panel link to appear and click it
        cy.get('#adminpanel').click();
        cy.wait(1000); 

        cy.get('.navitm').eq(1).click(); 
        cy.wait(2000); 

        cy.get('#add_characteristic').click();
        cy.wait(2000);

        cy.get('input[name="characteristic_input"]').type('Criticald');
        cy.wait(1000);
        
        cy.url().should('include', '/adminpanel');
    });

    it('Redirects to the Admin Panel when Admin Panel link is clicked', () => {
        // Click on the Admin dropdown to expand it
        cy.get('#navbarScrollingDropdown').click();

        // Wait for the Admin Panel link to appear and click it
        cy.get('#constructor').click();

        // Verify redirection to the Admin Panel page
        cy.url().should('include', '/test_constructor');
    });
});
