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
  });
  
  it('Close btn click → close ingredient details', function() {
    cy.get('[class^=modal_close__]').first().click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
}); 