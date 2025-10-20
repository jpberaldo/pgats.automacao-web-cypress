export function proceedToCheckout() {
    cy.get('a.btn.btn-default.check_out').click();
};