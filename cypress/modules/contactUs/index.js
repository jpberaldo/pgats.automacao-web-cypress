import validUserData from '../../fixtures/validUserData.json';
import { faker } from '@faker-js/faker';

export function submitContactUsForm() {

    cy.get('[data-qa="name"]').type(validUserData.username);
    cy.get('[data-qa="email"]').type(validUserData.email);
    cy.get('[data-qa="subject"]').type(faker.word.words());
    cy.get('#message').type(faker.word.words());
    cy.fixture('livro-teste.jpg', null).as('imagem');
    cy.get('input[type="file"]').selectFile('@imagem');
    cy.get('[data-qa="submit-button"]').click();
};