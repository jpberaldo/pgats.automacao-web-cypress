/// <reference types="cypress" />

import { menu, login, products, cart, register, common, contactUs, checkout, payment } from '../modules';
import { validUserData, invalidUserData } from '../modules';
import { getRandomEmail, getRandomName } from '../support/helpers.js';

describe('Automation Exercise', () => {

    const username = getRandomName();
    const email = getRandomEmail();

    beforeEach(() => {
        cy.visit('https://automationexercise.com/');

    });


    it('Test Case 1: Register User', () => {

        menu.navigateToLogin();
        login.submitPreRegistrationForm(username, email);
        register.submitPreRegistrationFormWithValidData();

        cy.url().should('includes', 'account_created');
        cy.contains('[data-qa="account-created"]', 'Account Created!');
        cy.get('b').should('be.visible').and('have.text', 'Account Created!');

        common.submitContinueButton();
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${username}`);

        menu.clickAndNavigateToDeleteAccount();
        cy.get('h2.title.text-center').should('be.visible').and('have.text', 'Account Deleted!');

        common.submitContinueButton();

    });

    it('Test Case 2: Login User with correct email and password', () => {

        menu.navigateToLogin();
        login.submitLoginForm(validUserData.email, validUserData.password);
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${validUserData.username}`);

    });

    it('Test Case 3: Login User with incorrect email and password', () => {

        menu.navigateToLogin();
        login.submitLoginForm(invalidUserData.email, invalidUserData.password);
        cy.get('div.login-form>form>p').should('be.visible').and('have.text', 'Your email or password is incorrect!');

    });

    it('Test Case 4: Logout User', () => {

        menu.navigateToLogin();
        login.submitLoginForm(validUserData.email, validUserData.password);
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${validUserData.username}`);

        menu.navigateToLogoutUser();
        cy.url().should('includes', 'login');

    });

    it('Test Case 5: Register User with existing email', () => {

        menu.navigateToLogin();
        login.submitPreRegistrationForm(validUserData.username, validUserData.email);
        cy.get('p[style*="color: red"]').should('be.visible').and('have.text', 'Email Address already exist!');

    });

    it('Test Case 6: Contact Us Form', () => {

        menu.navigateToContactUs();
        contactUs.submitContactUsForm();
        cy.get('div.status.alert.alert-success').should('be.visible').and('have.text', 'Success! Your details have been submitted successfully.');

    });

    it('Test Case 8: Verify All Products and product detail page', () => {

        menu.navigateToProducts();
        cy.url().should('includes', 'products');
        cy.get('.product-image-wrapper').should('have.length', 34).and('be.visible');

        products.clickOnViewProduct(0);
        cy.get('div.product-information h2').should('be.visible').and('have.text', 'Blue Top');
        cy.get('div.product-information p').eq(0).should('be.visible').and('have.text', 'Category: Women > Tops');
        cy.get('div.product-information span').contains('Rs.').should('be.visible').and('have.text', 'Rs. 500');
        cy.get('div.product-information p').eq(1).should('be.visible').and('have.text', 'Availability: In Stock');
        cy.get('div.product-information p').eq(2).should('be.visible').and('have.text', 'Condition: New');
        cy.get('div.product-information p').eq(3).should('be.visible').and('have.text', 'Brand: Polo');

    });

    it('Test Case 9: Search Product', () => {

        menu.navigateToProducts();
        cy.url().should('includes', 'products');
        cy.get('h2[class="title text-center"]').and('be.visible').and('have.text', 'All Products');

        products.searchForProduct('a');
        cy.get('h2[class="title text-center"]').and('be.visible').and('have.text', 'Searched Products');
        cy.get('.product-image-wrapper').should('have.length', 18).and('be.visible');

    });

    it('Test Case 10: Verify Subscription in home page', () => {

        cy.get('.item.active h1').should('be.visible').and('have.text', 'AutomationExercise');
        menu.submitSubscription(validUserData.email);
        cy.get('div.alert-success.alert').should('be.visible').and('have.text', 'You have been successfully subscribed!');

    });

    it('Test Case 15: Place Order: Register before Checkout', () => {

        menu.navigateToLogin();
        login.submitPreRegistrationForm(username, email);
        register.submitPreRegistrationFormWithValidData();
        common.submitContinueButton();
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${username}`);
        menu.navigateToProducts();
        products.addProductOnCart(1);
        cy.url().should('includes', 'view_cart');
        cart.proceedToCheckout();
        cy.get('h2.heading').eq(0).should('be.visible').and('have.text', 'Address Details');
        cy.get('h2.heading').eq(1).should('be.visible').and('have.text', 'Review Your Order');
        checkout.inputTextOnPlaceOrderField();
        checkout.clickOnPlaceOrderButton();
        payment.submitPaymentDataForm();
        cy.get('p[style="font-size: 20px; font-family: garamond;"]').should('be.visible').and('have.text', 'Congratulations! Your order has been confirmed!');
        menu.clickAndNavigateToDeleteAccount();
        cy.get('h2.title.text-center').should('be.visible').and('have.text', 'Account Deleted!');
        common.submitContinueButton();


    });

});
