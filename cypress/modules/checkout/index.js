export function inputTextOnPlaceOrderField() {
    cy.get('textarea.form-control').type('Random');
};

export function clickOnPlaceOrderButton() {
    cy.get('a.btn.btn-default.check_out').click();
};