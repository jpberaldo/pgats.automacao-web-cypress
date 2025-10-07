import userData from '../../fixtures/validUserData.json';
import { faker } from '@faker-js/faker';

export function submitPreRegistrationFormWithValidData() {

    cy.get('#id_gender1').check(); //2 forma de interagir com radio button // cy.get('[type="radio"]').check('Mr');
    cy.get('input#password').type(userData.password, { log: false });
    cy.get('[data-qa="days"]').select('19');
    cy.get('[data-qa="months"]').select('August');
    cy.get('[data-qa="years"]').select('1998');
    cy.get('input[type="checkbox"]#newsletter').click();
    cy.get('input[type="checkbox"]#optin').click();
    cy.get('input#first_name').type(faker.person.firstName());
    cy.get('input#last_name').type(faker.person.lastName());
    cy.get('input#company').type(faker.company.name());
    cy.get('input#address1').type(faker.location.street());
    cy.get('input#address2').type(faker.location.buildingNumber());
    cy.get('select#country').select('Canada');
    cy.get('input#state').type(faker.location.state());
    cy.get('input#city').type(faker.location.city());
    cy.get('[data-qa="zipcode"]').type('XXXXXX-XXX');
    cy.get('[data-qa="mobile_number"]').type('XXXX-XXXXX');
    cy.contains('button', 'Create Account').click();
};