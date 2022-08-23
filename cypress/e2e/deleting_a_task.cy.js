describe('Deleting a task', () => {
    it('Removing a completed task from the todo list', () => {
      cy.visit('http://localhost:3000');

      cy.contains("Repeat")
        .parent()
        .find('[data-testid="done-checkbox"]')
        .should('be.checked');

      cy.contains("Repeat")
        .parent()
        .parent()
        .find('[data-testid="delete-button"]')
        .click();
  
      cy.contains('Repeat').should('not.exist');
    });

    it('Does not remove an incomplete task from the todo list', () => {
        cy.visit('http://localhost:3000');
  
        cy.contains("Code")
          .parent()
          .find('[data-testid="done-checkbox"]')
          .should('be.checked');
  
        cy.contains("Code")
          .parent()
          .parent()
          .find('[data-testid="delete-button"]')
          .click();
    
        cy.contains('Repeat').should('not.exist');
      });
  });