describe('All fields are not empty', () => {
  it('Allows a user to register an account', () => {
    cy.visit('http://localhost:3000/registration');
    cy.wait(1000);
    
    cy.get('input[name="firstName"]').type('John').should('have.value', 'John');
    cy.wait(1000);
    cy.get('input[name="lastName"]').type('Doe').should('have.value', 'Doe');
    cy.wait(1000);
    cy.get('input[name="email"]').type('john.doe@example.com').should('have.value', 'john.doe@example.com');
    cy.wait(1000);
    cy.get('input[name="password"]').type('Password123').should('have.value', 'Password123');
    cy.wait(1000);
    cy.get('input[name="confirmPassword"]').type('Password123').should('have.value', 'Password123');
    cy.wait(1000);
    
    cy.get('select[name="sex"]').select('Male').should('have.value', 'Male');
    cy.wait(1000);
    cy.get('select[name="course"]').select('2023').should('have.value', '3');
    cy.wait(1000);
    cy.get('select[name="direction"]').select('Web-Programming').should('have.value', 'Web-programming');
    cy.wait(1000);
    
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
  });
});


describe('Password Match Validation', () => {
  it('Shows an error if passwords do not match', () => {
    cy.visit('http://localhost:3000/registration');
    cy.wait(1000);
    
    cy.get('input[name="password"]').type('Password123');
    cy.wait(1000);
    cy.get('input[name="confirmPassword"]').type('Password321');
    cy.wait(1000);
    
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Passwords don't match.`);
    });
  });
});

describe('Registration Form Inputs', () => {
  it('Allows a user to register account', () => {
    cy.visit('http://localhost:3000/registration');
    cy.wait(1000);
    
    cy.get('input[name="firstName"]').type('John');
    cy.wait(1000);
    cy.get('input[name="lastName"]').type('Doe');
    cy.wait(1000);
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.wait(1000);
    cy.get('input[name="password"]').type('Password123');
    cy.wait(1000);
    cy.get('input[name="confirmPassword"]').type('Password123');
    cy.wait(1000);
    cy.get('select[name="sex"]').select('Male');
    cy.wait(1000);
    cy.get('select[name="course"]').select('2023');
    cy.wait(1000); 
    cy.get('select[name="direction"]').select('Web-Programming');
    cy.wait(1000); 
    
    cy.get('button[type="submit"]').click();
    cy.wait(2000); 
  });
});


describe('Email already registered test', () => {
  it('Displays error if email is already registered', () => {
    cy.visit('http://localhost:3000/registration');
    cy.wait(1000); 
  
    cy.get('input[name="firstName"]').type('John');
    cy.wait(1000); 
    cy.get('input[name="lastName"]').type('Doe');
    cy.wait(1000); 
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.wait(1000); 
    cy.get('input[name="password"]').type('Password123');
    cy.wait(1000); 
    cy.get('input[name="confirmPassword"]').type('Password123');
    cy.wait(1000); 
    cy.get('select[name="sex"]').select('Male');
    cy.wait(1000); 
    cy.get('select[name="course"]').select('2023');
    cy.wait(1000); 
    cy.get('select[name="direction"]').select('Web-Programming');
    cy.wait(1000); 
    
    cy.get('button[type="submit"]').click();
    cy.wait(2000); 
  });
});
