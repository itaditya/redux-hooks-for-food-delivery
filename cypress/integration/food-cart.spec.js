describe('Food Cart', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('display menu & show price when items are added', () => {
    cy.get('h1').should('contain', 'Ordux');

    // show menu
    cy.findByText(/Sausage McMuffin/i).should('be.visible');
    cy.findByText(/Mushroom Pizza/i).should('be.visible');
    cy.findByRole('link', { name: /Pay for food/i }).should('not.be.visible');

    // add Sausage to cart once
    cy.findByRole('button', { name: /Add Sausage McMuffin to cart/i }).click();

    // check that the quantity of Sausage & cart price is shown.
    cy.findByRole('status').should('contain', 1);
    cy.findByRole('link', { name: /Pay for food/i }).should('contain', 'Pay for food ($12)');

    // add more items to cart
    cy.findByRole('button', { name: /Add Mushroom Pizza to cart/i }).click();
    cy.findByRole('button', { name: /Add Mushroom Pizza to cart/i }).click();

    // check the quantity of Pizza is shown & cart price is updated
    cy.findAllByRole('status').eq(1).should('contain', 2);
    cy.findByRole('link', { name: /Pay for food/i }).should('contain', 'Pay for food ($52)');

    // remove Pizza from cart
    cy.findByRole('button', { name: /Remove Mushroom Pizza from cart/i }).click();

    // on removing an item, show the updated quantities & price.
    cy.findAllByRole('status').eq(0).should('contain', 1);
    cy.findAllByRole('status').eq(1).should('contain', 1);
    cy.findByRole('link', { name: /Pay for food/i }).should('contain', 'Pay for food ($32)');
  });

  it('only show veg food when veg filter is applied', () => {
    // enable Veg Only filter
    cy.findByRole('checkbox', { name: /Veg Only/i }).click();

    cy.findByText(/Sausage McMuffin/i).should('not.be.visible');
    cy.findByText(/Mushroom Pizza/i).should('be.visible');

    // disable Veg Only filter
    cy.findByRole('checkbox', { name: /Veg Only/i }).click();

    cy.findByText(/Sausage McMuffin/i).should('be.visible');
    cy.findByText(/Mushroom Pizza/i).should('be.visible');
  });
});
