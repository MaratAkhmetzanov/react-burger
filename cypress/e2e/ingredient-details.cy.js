describe('Ingredients catalog', function() {
  before(function() {
    cy.visit('http://localhost:3001/react-burger');
  });

  it('Burger constructor default', function() {
    cy.contains('Соберите бургер');
  });

  it('First card click → open ingredient details', function() {
    cy.get('[class^=ingredient-card_router_link__]').first().click();
    cy.contains('Детали ингредиента');
    cy.get('[class^=ingredient-card_router_link__]').first().find('[class^=ingredient-card_card_name__]').then(($element) => {
      cy.get('[class^=ingredient-details_details_wrapper__]').contains($element.text());
    })
  });
  
  it('Close btn click → close ingredient details', function() {
    cy.get('[class^=modal_close__]').first().click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
}); 