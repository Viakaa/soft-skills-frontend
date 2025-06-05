describe('Main Page', () => {
  it('Login, complete Belbin test with smooth scrolls and navigate to comment', () => {
    // Перед заходом на страницу логина — пауза
    cy.wait(500);
    cy.visit('http://localhost:3000/login');

    // Перед вводом email — пауза
    cy.wait(300);
    cy.get('input[name="email"]').type('john.doe@example.com');

    // Перед вводом пароля — пауза
    cy.wait(300);
    cy.get('input[name="password"]')
      .invoke('attr', 'autocomplete', 'new-password')
      .clear()
      .type('Password123', { delay: 150 });

    // Перед нажатием кнопки логина — пауза
    cy.wait(300);
    cy.get('button[type="submit"]').click();

    // Перед проверкой URL — пауза
    cy.wait(300);
    cy.url().should('include', '/profile');

    // Перед переходом на главную страницу — пауза
    cy.wait(500);
    cy.visit('http://localhost:3000/main');

    // Перед проверкой URL главной — пауза
    cy.wait(300);
    cy.url().should('include', '/main');

    // Плавный скрол до карточки с тестом (оставляем без изменений)
    cy.get('.firstCard').contains('РОЛІ В КОМАНДІ(Тест Белбіна)').scrollIntoView({ duration: 800 });

    // Перед нажатием кнопки "Почати" в карточке теста — пауза
    cy.wait(300);
    cy.get('.firstCard').contains('РОЛІ В КОМАНДІ(Тест Белбіна)').parents('.firstCard')
      .within(() => {
        cy.contains('button', 'Почати').click();
      });

    // Перед нажатием кнопки "Почати тест" — пауза
    cy.wait(300);
    cy.contains('button', 'Почати тест').scrollIntoView({ duration: 500 }).should('be.visible').click();

    const valuesToEnter = [4, 3, 3];

    // Заполнение теста с прокрутками и задержками (оставляем как есть)
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

    // Проверка баллов
    cy.contains('Бали за всі блоки питань: 70 / 70').should('be.visible');

    // Перед нажатием кнопки "Завершити тест" — пауза
    cy.wait(300);
    cy.get('button.submit-button').scrollIntoView({ duration: 500 }).should('be.visible').click();

    // Перед проверкой URL результатов — пауза
    cy.wait(300);
    cy.url().should('include', '/belbinresult');

    // Даем время на загрузку страницы результатов
    cy.wait(1000);

    // Задержка перед скроллом к DIPLOMAT
    cy.wait(700);

    // Скролл к DIPLOMAT и клик (оставляем как есть)
    cy.contains('DIPLOMAT').scrollIntoView({ duration: 600 }).should('be.visible').click();

    // Задержка перед скроллом к Bob Lee
    cy.wait(500);

    // Скролл к Bob Lee и проверка видимости (оставляем как есть)
    cy.contains('Bob Lee')
      .scrollIntoView({ duration: 1000 })
      .should('be.visible');

    // Финальная задержка
    cy.wait(1000);
  });
});




