describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/registration')
    cy.contains('Create Your Account').should('exist');
  })
})

describe('Registration Form Inputs', () => {
  it('allows a user to register account', () => {
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

describe('Password Match Validation', () => {
  it('shows an error if passwords do not match', () => {
    cy.visit('http://localhost:3000/registration');
    
    cy.get('input[name="password"]').type('Password123');
    cy.get('input[name="confirmPassword"]').type('Password321');
    
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Passwords don't match.`);
    });
  });
});

describe('All fields are not empty', () => {
  it('allows a user to register an account', () => {
    cy.visit('http://localhost:3000/registration');
    
    cy.get('input[name="firstName"]').type('John').should('have.value', 'John');
    cy.get('input[name="lastName"]').type('Doe').should('have.value', 'Doe');
    cy.get('input[name="email"]').type('john.doe@example.com').should('have.value', 'john.doe@example.com');
    cy.get('input[name="password"]').type('Password123').should('have.value', 'Password123');
    cy.get('input[name="confirmPassword"]').type('Password123').should('have.value', 'Password123');
    
    cy.get('select[name="sex"]').select('Male').should('have.value', 'Male');
    cy.get('select[name="course"]').select('2023').should('have.value', '2023');
    cy.get('select[name="direction"]').select('Web-Programming').should('have.value', 'Web-Programming');
    
    cy.get('button[type="submit"]').click();
  });
});


// describe('Successful Registration', () => {
//   it('displays success toast after form submission', () => {
//     cy.visit('http://localhost:3000/registration');

//     cy.get('input[name="firstName"]').type('John');
//     cy.get('input[name="lastName"]').type('Doe');
//     cy.get('input[name="email"]').type('john.doe@example.com');
//     cy.get('input[name="password"]').type('Password123');
//     cy.get('input[name="confirmPassword"]').type('Password123');
//     cy.get('select[name="sex"]').select('Male');
//     cy.get('select[name="course"]').select('2023');
//     cy.get('select[name="direction"]').select('Web-Programming');
    
//     cy.get('button[type="submit"]').click();
    
//     cy.get('.toast-body').should('contain', 'User successfully registered!');
//   });
// });
