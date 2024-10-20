describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
  })
})

describe('Email already registered test', () => {
  it('displays error if email is already registered', () => {
    cy.visit('http://localhost:3000/login')
  
    cy.get('input[name="email"]').type('already_registered@example.com')
    cy.get('input[name="password"]').type('123')
  
    cy.get('button[type="submit"]').click()
  })
})
  