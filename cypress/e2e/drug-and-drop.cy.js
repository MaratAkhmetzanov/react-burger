describe('Ingredient drag and drop', function() {
  before(function() {
    cy.visit('http://localhost:3001/react-burger');
  });

  it('DnD bun', function() {
    cy.get('[class^=ingredient-card_router_link__]').first().as('card');
    cy.get('[class^=bun-element_bun_dropzone__]').first().as('dropzone');

    let card = '';
    cy.get('@card').then(($element) => {
      card = $element.text();
    });

    cy.get('@card').trigger('dragstart').trigger('dragleave');
    cy.get('[class^=bun-element_bun_dropzone__]').first().trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
    // cy.get('@dropzone').contains(card);
  });
});