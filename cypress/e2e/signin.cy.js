describe('All fields are not empty', () => {
  it('Check if all fields are not empty', () => {
    cy.visit('http://localhost:3000/login');
    cy.wait(1000);
    
    cy.get('input[name="email"]').type('john.doe@example.com').should('have.value', 'john.doe@example.com');
    cy.wait(1000);
    cy.get('input[name="password"]').type('Password123').should('have.value', 'Password123');

    cy.get('button[type="submit"]').click();
    cy.wait(1000);
  });
});

describe('Check if user email and password', () => {
  it('Displays error if email or password is wrong', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.wait(1000);
    cy.get('input[name="password"]').type('ghvghv');
    cy.wait(1000);

    cy.get('button[type="submit"]').click();
    cy.wait(2000);
  });
});

describe('Check if user email and password', () => {
  it('Redirect to profile page if email and password is correct', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.wait(1000);
    cy.get('input[name="password"]').type('Password123');
    cy.wait(1000);

    cy.get('button[type="submit"]').click();
    cy.wait(2000);
  });
});

