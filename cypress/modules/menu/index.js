export function navigateToLogin() {
    cy.get('a[href="/login"]').click();
};

export function navigateToDeleteAccount() {
    cy.get('a[href="/delete_account"]').click();
};

export function navigateToLogoutUser() {
    cy.get('a[href="/logout"]').click();
};

export function navigateToContactUs() {
    cy.get('i.fa.fa-envelope').parent().click(); // ou a[href*=contact] para buscar por uma palavra
};

export function navigateToProducts() {
    cy.get('a[href="/products"]').click();
};