export function submitPaymentDataForm() {

    cy.get('input[data-qa="name-on-card"]').type('Mr. qa test');
    cy.get('input[data-qa="card-number"]').type('XXXXXXXXXXXXX');
    cy.get('input[data-qa="cvc"]').type('xxx');
    cy.get('input[data-qa="expiry-month"]').type('xx');
    cy.get('input[data-qa="expiry-year"]').type('2050');
    cy.get('button#submit').click();
    
};