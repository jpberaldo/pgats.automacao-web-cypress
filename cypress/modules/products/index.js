export function clickOnViewProduct(product) {
    cy.get('.fa.fa-plus-square').eq(product).click();
};

export function searchForProduct(product) {
    cy.get('input[name="search"]').type(product);
    cy.get('button[id="submit_search"]').click();
};

export function addProductOnCart(product) {
    cy.get(`a[data-product-id="${product}"]`).eq(0).click();
    cy.get('#cartModal a[href="/view_cart"]').click();

};