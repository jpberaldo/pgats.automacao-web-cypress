/// <reference types="cypress" />
/// <reference types="@cypress/xpath" />

import validUserData from '../fixtures/validUserData.json';
import invalidUserData from '../fixtures/invalidUserData.json';
import { getRandomEmail, getRandomName } from '../support/helpers.js';
import { navigateToLogin, navigateToDeleteAccount, navigateToLogoutUser, navigateToContactUs, navigateToProducts } from '../modules/menu/index.js';
import { submitPreRegistrationForm, submitLoginForm } from '../modules/login/index.js';
import { submitPreRegistrationFormWithValidData } from '../modules/register/index.js';
import { navigateToUserHomePage } from '../modules/accountCreated/index.js';
import { submitContinueButton } from '../modules/accountDelete/index.js';
import { submitContactUsForm } from '../modules/contactUs/index.js';

describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/');

    });


    it('Test Case 1: Register User', () => {

        //Arrange
        const username = getRandomName();
        const email = getRandomEmail();

        //Act
        navigateToLogin();
        submitPreRegistrationForm(username, email);
        submitPreRegistrationFormWithValidData();

        //Asserts   
        cy.url().should('includes', 'account_created');
        cy.contains('[data-qa="account-created"]', 'Account Created!');
        cy.get('b').should('be.visible').and('have.text', 'Account Created!');

        navigateToUserHomePage();
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${username}`);

        navigateToDeleteAccount();
        cy.get('h2.title.text-center').should('be.visible').and('have.text', 'Account Deleted!');

        submitContinueButton();

    });

    it('Test Case 2: Login User with correct email and password', () => {

        navigateToLogin();
        submitLoginForm(validUserData.email, validUserData.password);
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${validUserData.username}`);

    });

    it('Test Case 3: Login User with incorrect email and password', () => {

        navigateToLogin();
        submitLoginForm(invalidUserData.email, invalidUserData.password);
        cy.get('div.login-form>form>p').should('be.visible').and('have.text', 'Your email or password is incorrect!');

    });

    it('Test Case 4: Logout User', () => {

        navigateToLogin();
        submitLoginForm(validUserData.email, validUserData.password);
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${validUserData.username}`);

        navigateToLogoutUser();
        cy.url().should('includes', 'login');

    });

    it('Test Case 5: Register User with existing email', () => {

        navigateToLogin();
        submitPreRegistrationForm(validUserData.username, validUserData.email);
        cy.xpath('//p[text()="Email Address already exist!"]').should('be.visible').and('have.text', 'Email Address already exist!');

    });

    it('Test Case 6: Contact Us Form', () => {

        navigateToContactUs();
        submitContactUsForm();
        cy.get('div.status.alert.alert-success').should('be.visible').and('have.text', 'Success! Your details have been submitted successfully.');

    });

    it.only('Test Case 8: Verify All Products and product detail page', () => {

        navigateToProducts();
        cy.get('.product-image-wrapper').should('have.length', 34).and('be.visible');
        cy.get('.fa.fa-plus-square').eq(0).click();
        cy.xpath('//div[@class="product-information"]//h2').should('be.visible').and('have.text', 'Blue Top');
        cy.xpath('//div[@class="product-information"]//p').eq(0).should('be.visible').and('have.text', 'Category: Women > Tops');
        cy.xpath('//div[@class="product-information"]//span[contains(text(),"Rs.")]').should('be.visible').and('have.text', 'Rs. 500');
        cy.xpath('//div[@class="product-information"]//p[b[text()="Availability:"]]').should('be.visible').and('have.text', 'Availability: In Stock');
        cy.xpath('//div[@class="product-information"]//p[b[text()="Condition:"]]').should('be.visible').and('have.text', 'Condition: New');
        cy.xpath('//div[@class="product-information"]//p[b[text()="Brand:"]]').should('be.visible').and('have.text', 'Brand: Polo');

    });

});
