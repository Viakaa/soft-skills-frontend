describe('Notifications', () => {
    it('Redirect to profile page if email and password is correct', () => {
        cy.visit('http://localhost:3000/login');
    
        cy.get('input[name="email"]').type('john.doe@example.com');
        cy.wait(1000);
        cy.get('input[name="password"]').type('Password123');
        cy.wait(1000);
    
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

        cy.visit('http://localhost:3000/main');

        cy.url().should('include', '/main')

        cy.get('#notification-icon').click(); 

        cy.get('.close-btn').click(); 
      });
  });