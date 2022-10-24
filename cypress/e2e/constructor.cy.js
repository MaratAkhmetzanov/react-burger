describe('Ingredient drugs and drops', function() {
  before(function() {
    cy.visit('http://localhost:3001/react-burger');
  });

  it('DnD bun', function() {
    cy.get('[class^=ingredient-card_router_link__]').first().as('drag-target');
    cy.get('[class^=bun-element_bun_dropzone__]').first().as('drop-target');
    
    cy.get('@drag-target').trigger('dragstart').trigger('dragleave');
    cy.get('[class^=bun-element_bun_dropzone__]').first().trigger('dragenter').trigger('dragover').trigger('drop');
    
    cy.get('@drag-target').find('[class^=ingredient-card_card_name__]').then(($element) => {
      cy.get('@drop-target').contains($element.text());
    });
    cy.get('@drag-target').find('[class^=counter_counter__]').contains('2');
  });

  it('DnD ingredient', function() {
    cy.get('[class^=ingredient-card_router_link__]').eq('3').as('drag-target');
    cy.get('[class^=burger-constructor_ingredients_dropzone__]').first().as('drop-target');
    
    cy.get('@drag-target').trigger('dragstart').trigger('dragleave');
    cy.get('@drop-target').trigger('dragenter').trigger('dragover').trigger('drop');
    
    cy.get('@drag-target').find('[class^=ingredient-card_card_name__]').then(($element) => {
      cy.get('[class^=constructor-item_drag_element__]').first().contains($element.text());
    });
    cy.get('@drag-target').find('[class^=counter_counter__]').contains('1');
  });

  it('DnD second ingredient', function() {
    cy.get('[class^=ingredient-card_router_link__]').eq('4').as('drag-target');
    cy.get('[class^=burger-constructor_catalog__]').first().as('drop-target');
    
    cy.get('@drag-target').trigger('dragstart').trigger('dragleave');
    cy.get('@drop-target').trigger('dragenter').trigger('dragover').trigger('drop');
    
    cy.get('@drag-target').find('[class^=ingredient-card_card_name__]').then(($element) => {
      cy.get('[class^=constructor-item_drag_element__]').eq('1').contains($element.text());
    });
    cy.get('@drag-target').find('[class^=counter_counter__]').contains('1');
  });
  
  it('Move ingredient inside constroctor', function() {
    cy.get('[class^=constructor-item_drag_element__]').eq('0').as('drag-target');
    cy.get('[class^=constructor-item_drag_element__]').eq('1').as('drop-target');

    cy.get('@drag-target').trigger('dragstart').trigger('dragleave');
    cy.get('@drop-target').trigger('dragenter').trigger('dragover').trigger('drop');

    cy.get('@drag-target').find('[class^=constructor-element__text]').then(($element) => {
      cy.get('[class^=constructor-item_drag_element__]').eq('1').find('[class^=constructor-element__text]').contains($element.text());
    });
    cy.get('@drop-target').find('[class^=constructor-element__text]').then(($element) => {
      cy.get('[class^=constructor-item_drag_element__]').eq('0').find('[class^=constructor-element__text]').contains($element.text());
    });
  });

  it('Remove ingredient from constructor', function() {
    cy.get('[class^=constructor-item_drag_element__]').eq('0').as('element-to-remove');

    cy.get('[class^=constructor-item_drag_element__]').should('have.length', 2);
    cy.get('@element-to-remove').find('[class^=constructor-element__action]').click();
    cy.get('[class^=constructor-item_drag_element__]').should('have.length', 1);
  });
});