describe('app works correctly with routes', function() {
    before(function() {
        cy.visit('http://localhost:3000');
    });

    it('should open constructor by default', function() {
        cy.contains('Соберите бургер');
    });

    it('should open ingredient details after click on it', function() {
        cy.get('[class^=burger-ingredients_item-link__]').first().click();
        cy.contains('Детали ингредиента');
        cy.get('[class^=ingredient-details_name__]').should('not.to.match', ':empty');
        cy.get('[class^=ingredient-details_image__]').should('not.to.match', ':empty');
        cy.get('[class^=ingredient-details_energy-item__]').find('.text_type_digits-default').should('not.to.match', ':empty');
        cy.get('[class^=modal_close__]').click();
        cy.contains('Детали ингредиента').should('not.exist');
    });

    it('should login user', function() {
        cy.visit('http://localhost:3000/login');
        cy.get('[name=email]').type('admin@findpets.ru');
        cy.get('[name=password]').type('123123');
        cy.contains('Войти').click();
        cy.contains('Некорректный пароль').should('not.exist');
    });

    it('should drag items to cart', function() {
        cy.get('#bun').find('[class^=burger-ingredients_item__]').first().as('bun');
        cy.get('.bunTarget').first().as('bunTarget');
        cy.get('@bun').drag('@bunTarget');
        cy.get('#sauce').find('[class^=burger-ingredients_item__]').first().as('sauce');
        cy.get('@sauce').drag('[class^=burger-constructor_content__]');
        cy.get('#main').find('[class^=burger-ingredients_item__]').first().as('main');
        cy.get('@main').drag('[class^=burger-constructor_content__]');
    });

    it('should open order details after button click', function() {
        cy.contains('Оформить заказ').click();
        cy.contains('идентификатор заказа');
        cy.get('[class^=order-details_number__]').should('not.to.match', ':empty');
        cy.get('[class^=modal_close__]').click();
        cy.contains('идентификатор заказа').should('not.exist');
    });
});