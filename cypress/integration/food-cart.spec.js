describe('Food Cart', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('menu list is showing', () => {
    cy.get('h1').should('contain', 'Ordux');
  });
});
