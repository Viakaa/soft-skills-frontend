describe('Logout functional', () => {
    afterEach(() => {
        cy.wait(1000); 
    });

    it('Redirects to profile page if login is successful', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('input[name="email"]').type('adminqa@gmail.com')
        cy.get('input[name="password"]').type('987654321')
        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/profile')
    })

    it('Redirects to login page after clicking logout button', () => {
        cy.visit('http://localhost:3000/profile')

        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/login')
    })
})


describe('Navigation functionality', () => {
    afterEach(() => {
        cy.wait(4000)
    })

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');

        // Log in before each test
        cy.get('input[name="email"]').type('adminqa@gmail.com');
        cy.get('input[name="password"]').type('987654321');
        cy.get('button[type="submit"]').click();

        // Ensure redirection to profile page
        cy.url().should('include', '/profile');
    });

    it('Redirects to the main page after clicking the Main button', () => {
        // Wait for the main link to appear and click
        cy.visit('http://localhost:3000/main');

        // Verify redirection to main page
        cy.url().should('include', '/main');

        cy.get('.navbar_link_end').click();
    });
});
