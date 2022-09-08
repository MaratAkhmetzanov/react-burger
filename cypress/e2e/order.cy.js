describe('Get order', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3001/react-burger');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');

    cy.setCookie('refreshToken', 'test-refreshToken');
    cy.setCookie('accessToken', 'test-accessToken');
  });

  it('Order created', function () {
    cy.get('[class^=ingredient-card_router_link__]').first().as('drag-target');
    cy.get('[class^=bun-element_bun_dropzone__]').first().as('drop-target');
    cy.get('@drag-target').trigger('dragstart').trigger('dragleave');
    cy.get('[class^=bun-element_bun_dropzone__]')
      .first()
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop');
    cy.get('[class^=total_total__]').find('button').click();
    cy.get('[class^=order-details_order_id]').contains('123').should('exist');
    cy.contains('Добавьте булку');
    cy.contains('Добавьте ингредиент');
  });

  it('Close btn click → close order details', function () {
    cy.get('[class^=ingredient-card_router_link__]').first().as('drag-target');
    cy.get('[class^=bun-element_bun_dropzone__]').first().as('drop-target');
    cy.get('@drag-target').trigger('dragstart').trigger('dragleave');
    cy.get('[class^=bun-element_bun_dropzone__]')
      .first()
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop');
    cy.get('[class^=total_total__]').find('button').click();
    cy.get('[class^=order-details_order_id]').contains('123').should('exist');
    cy.get('[class^=modal_close__]').first().click();
    cy.contains('идентификатор заказа').should('not.exist');
  });

  afterEach(function () {
    cy.clearCookies();
  });
});
