describe('Adding a new task', () => {
    it('Adds a new task to the list of tasks', () => {
      cy.visit('http://localhost:3000');
  
      cy.get('[data-testid="new-todo-task-input"]')
        .type('Dance practice');
  
      cy.get('[data-testid="submitButton"]')
        .click();
  
      cy.get('[data-testid="new-todo-task-input"]')
        .should('have.value', '');
  
      cy.contains('Dance practice');
    });

    it('Should not add an empty task to the list of tasks', () => {
      cy.visit('http://localhost:3000');
  
      cy.get('[data-testid="new-todo-task-input"]')
        .type('  ');
  
      cy.get('[data-testid="submitButton"]')
        .click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains("Cannot add an empty task!!!");
      });

    });
  });