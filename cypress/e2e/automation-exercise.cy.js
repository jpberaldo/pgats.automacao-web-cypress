/// <reference types="cypress" />
/// <reference types="@cypress/xpath" />

import userData from '../fixtures/validUserData.json';
import { getRandomEmail, getRandomName } from '../support/helpers';

describe('Automation Exercise', () => {

    const discardUsername = 'user-discard';
    const validLoginEmail = 'jp-test-qa@test.com';
    const validLoginPassword = '123456';

    beforeEach(() => {
        cy.visit('https://automationexercise.com/');

    });


    it.only('Test Case 1: Register User', () => {

        const username = getRandomName();
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="signup-name"]').type(username);
        cy.get('[data-qa="signup-email"]').type(getRandomEmail());
        cy.contains('button', 'Signup').click();

        //1 forma de interagir com radio button
        cy.get('#id_gender1').check();

        //2 forma de interagir com radio button
        //cy.get('[type="radio"]').check('Mr');

        cy.get('input#password').type('123456', { log: false });

        cy.get('[data-qa="days"]').select('19');
        cy.get('[data-qa="months"]').select('August');
        cy.get('[data-qa="years"]').select('1998');

        cy.get('input[type="checkbox"]#newsletter').click();
        cy.get('input[type="checkbox"]#optin').click();

        cy.get('input#first_name').type('test');
        cy.get('input#last_name').type('qa');
        cy.get('input#company').type('cypress');
        cy.get('input#address1').type('cypress zone');
        cy.get('input#address2').type('cypress zone 2');
        cy.get('select#country').select('Canada');
        cy.get('input#state').type('Canada');
        cy.get('input#city').type('Vancouver');
        cy.get('[data-qa="zipcode"]').type('XXXXXX-XXX');
        cy.get('[data-qa="mobile_number"]').type('XXXX-XXXXX');
        cy.contains('button', 'Create Account').click();

        cy.url().should('includes', 'account_created');
        cy.contains('[data-qa="account-created"]', 'Account Created!');
        cy.get('b').should('be.visible').and('have.text', 'Account Created!');

        cy.get('[data-qa="continue-button"]').click();
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${username}`);
        cy.get('a[href="/delete_account"]').click();
        cy.get('h2.title.text-center').should('be.visible').and('have.text', 'Account Deleted!');
        cy.get('[data-qa="continue-button"]').click();

    });

    it('Test Case 2: Login User with correct email and password', () => {

        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="login-email"]').type(validLoginEmail);
        cy.get('[data-qa="login-password"]').type(validLoginPassword, { log: false });
        cy.contains('button', 'Login').click();

        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${discardUsername}`);

    });

    it('Test Case 3: Login User with incorrect email and password', () => {

        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="login-email"]').type('incorrectEmail@test.com');
        cy.get('[data-qa="login-password"]').type('incorrectPassword');
        cy.contains('button', 'Login').click();
        cy.get('div.login-form>form>p').should('be.visible').and('have.text', 'Your email or password is incorrect!');
    });

    it('Test Case 4: Logout User', () => {

        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="login-email"]').type(validLoginEmail);
        cy.get('[data-qa="login-password"]').type(validLoginPassword, { log: false });
        cy.contains('button', 'Login').click();
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${discardUsername}`);
        cy.get('a[href="/logout"]').click();
        cy.url().should('includes', 'login');

    });

    it('Test Case 5: Register User with existing email', () => {

        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="signup-name"]').type(discardUsername);
        cy.get('[data-qa="signup-email"]').type(validLoginEmail);
        cy.contains('button', 'Signup').click();
        cy.xpath('//p[text()="Email Address already exist!"]').should('be.visible').and('have.text', 'Email Address already exist!');

    });

    it('Test Case 6: Contact Us Form', () => {

        cy.get('i.fa.fa-envelope').parent().click(); // ou a[href*=contact] para buscar por uma palavra
        cy.get('[data-qa="name"]').type(discardUsername);
        cy.get('[data-qa="email"]').type(validLoginEmail);
        cy.get('[data-qa="subject"]').type('Testes upload');
        cy.get('#message').type('Lore Ipsum');
        cy.fixture('livro-teste.jpg', null).as('imagem');
        cy.get('input[type="file"]').selectFile('@imagem');
        cy.get('[data-qa="submit-button"]').click();
        cy.get('div.status.alert.alert-success').should('be.visible').and('have.text', 'Success! Your details have been submitted successfully.');

    });

});

