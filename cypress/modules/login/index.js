
export function submitPreRegistrationForm(username, email) {

    cy.get('[data-qa="signup-name"]').type(username);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.contains('button', 'Signup').click();

};

export function submitLoginForm(email, password) {
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password, { log: false });
    cy.contains('button', 'Login').click();
};