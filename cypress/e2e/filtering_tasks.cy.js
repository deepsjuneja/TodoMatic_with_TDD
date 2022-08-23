describe('Filtering tasks', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it('Showing all tasks by default', () => {
        cy.get('.todo-list').find('li').should('have.length', 4);
    });

    it('Showing completed tasks with Completed filter', () => {
        cy.contains("Completed").click();

        cy.get('.todo-list').find('li').should('have.length', 1);
    });

    it('Showing remaining tasks with Active filter', () => {
        cy.contains("Active").click();
        
        cy.get('.todo-list').find('li').should('have.length', 3);
    });

    it('Showing all tasks with All filter', () => {
        cy.contains("All").click();
        
        cy.get('.todo-list').find('li').should('have.length', 4);
    });

});