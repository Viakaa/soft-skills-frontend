describe('mobile-tests', () => {
    beforeEach(() => {
        cy.viewport(700, 800);
    })

    it('passes', () => {
        cy.visit('http://localhost:3000/registration');
    })
})

describe('Registration Form Inputs', () => {
    it('Allows a user to register account', () => {
      cy.visit('http://localhost:3000/registration');
      
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="email"]').type('john.doe@example.com');
      cy.get('input[name="password"]').type('Password123');
      cy.get('input[name="confirmPassword"]').type('Password123');
      cy.get('select[name="sex"]').select('Male');
      cy.get('select[name="course"]').select('2023');
      cy.get('select[name="direction"]').select('Web-Programming');
      
      cy.get('button[type="submit"]').click();
    });
  });