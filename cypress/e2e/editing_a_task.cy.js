describe('Editing a task', () => {
    it('Editing and renaming a task in the todo list', () => {
      cy.visit('http://localhost:3000');

      cy.contains("Code")
        .parent()
        .parent()
        .find('[data-testid="start-edit-button"]')
        .click();
  
      cy.get('[data-testid="edit-task-input"]')
        .type('Read a book');
  
      cy.get('[data-testid="submit-edit-button"]')
        .click();
  
      cy.get('[data-testid="new-todo-task-input"]')
        .should('have.value', '');
  
      cy.contains('Read a book');
    });

    it('Cancels editing a task in the todo list', () => {
      cy.visit('http://localhost:3000');

      cy.contains("Code")
        .parent()
        .parent()
        .find('[data-testid="start-edit-button"]')
        .click();
  
      cy.get('[data-testid="edit-task-input"]')
        .type('Read a book');
  
      cy.get('[data-testid="cancel-edit-button"]')
        .click();
  
      cy.get('[data-testid="new-todo-task-input"]')
        .should('have.value', '');
  
      cy.contains('Code');
    });
  });