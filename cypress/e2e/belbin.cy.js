describe('Main Page', () => {
  it('Login, complete Belbin test with smooth scrolls and navigate to comment', () => {
    cy.wait(500);
    cy.visit('http://localhost:3000/login');

    cy.wait(300);
    cy.get('input[name="email"]').type('john.doe@example.com');

    cy.wait(300);
    cy.get('input[name="password"]')
      .invoke('attr', 'autocomplete', 'new-password')
      .clear()
      .type('Password123', { delay: 150 });

    cy.wait(300);
    cy.get('button[type="submit"]').click();

    cy.wait(300);
    cy.url().should('include', '/profile');

    cy.wait(500);
    cy.visit('http://localhost:3000/main');

    cy.wait(300);
    cy.url().should('include', '/main');

    cy.get('.firstCard').contains('РОЛІ В КОМАНДІ(Тест Белбіна)').scrollIntoView({ duration: 800 });

    cy.wait(300);
    cy.get('.firstCard').contains('РОЛІ В КОМАНДІ(Тест Белбіна)').parents('.firstCard')
      .within(() => {
        cy.contains('button', 'Почати').click();
      });

    cy.wait(300);
    cy.contains('button', 'Почати тест').scrollIntoView({ duration: 500 }).should('be.visible').click();

    const valuesToEnter = [4, 3, 3];

    cy.get('.question-block').each(($block) => {
      cy.wrap($block).scrollIntoView({ duration: 500 });
      cy.wrap($block).find('.sub-question').each(($subQ, index) => {
        if (index < valuesToEnter.length) {
          const value = valuesToEnter[index];
          cy.wrap($subQ).find('input[type="number"]').then($input => {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            nativeInputValueSetter.call($input[0], value);
            $input[0].dispatchEvent(new Event('input', { bubbles: true }));
            $input[0].dispatchEvent(new Event('change', { bubbles: true }));
            cy.wrap($input).should('have.value', value);
          });
          cy.wait(200);
        }
      });
      cy.wait(300);
    });

    cy.contains('Бали за всі блоки питань: 70 / 70').should('be.visible');

    cy.wait(300);
    cy.get('button.submit-button').scrollIntoView({ duration: 500 }).should('be.visible').click();

    cy.wait(300);
    cy.url().should('include', '/belbinresult');

    cy.wait(1000);
    cy.wait(700);

    cy.contains('DIPLOMAT').scrollIntoView({ duration: 600 }).should('be.visible').click();

    cy.wait(500);

    cy.contains('Bob Lee')
      .scrollIntoView({ duration: 1000 })
      .should('be.visible');

    cy.wait(1000);
  });
});




