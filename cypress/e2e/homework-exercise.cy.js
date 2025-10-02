/// <reference types="cypress" />
/// <reference types="@cypress/xpath" />


describe('Cadastrar entradas e saídas com bugs', () => {

  it('Cadastrar uma nova transação de entrada - falha 1', () => {

    cy.visit("https://devfinance-agilizei.netlify.app");

    cy.contains("Nova Transação").click();
    cy.get("#description").type("Mesada");
    cy.get("#amount").type(100);
    cy.get("#date").type("2023-02-01");
    cy.contains("Salvar").click();

    cy.get('td.description').should('be.visible').and('have.text', 'Mesada');
    cy.get('td.date').should('be.visible').and('have.text', '01/02/2023');
    cy.get('td.income').should('be.visible').and('contain.text', '100,00');
    cy.get('td.income').should('be.visible').and('have.text', 'R$ 100,00'); // com &nbsp; QUE CONTÉM O TRATAMENTO PARA O ESPAÇO INVISIVEL

  });

  it('Cadastrar uma nova transação de entrada - falha 2', () => {

    cy.visit("https://devfinance-agilizei.netlify.app");

    cy.contains("Nova Transação").click();
    cy.get("#description").type("Mesada");
    cy.get("#amount").type(100);
    cy.get("#date").type("2023-02-01");
    cy.contains("Salvar").click();

    cy.get("tbody tr").should("have.length", 1);

  });

  it('Cadastrar uma nova transação de entrada - falha 3', () => {

    cy.visit("https://devfinance-agilizei.netlify.app");

    cy.contains("Nova Transação").click();
    cy.get("#description").type("Mesada");
    cy.get("#amount").type(100);
    cy.get("#date").type("2023-02-01");
    cy.contains("Salvar").click();

    cy.get("tbody tr").should("have.length", 1);

  });

  it('Cadastrar uma nova transação de entrada - falha 4', () => {

    cy.visit("https://devfinance-agilizei.netlify.app");

    cy.contains("Nova Transação").click();
    cy.get("#amount").type(100);
    cy.get("#description").type("Mesada");
    cy.get("#date").type("2023-02-01");
    cy.contains("Salvar").click();

    cy.get("tbody tr").should("have.length", 1)

  });

  it('Cadastrar uma nova transação de entrada - falha 5', () => {

    cy.visit("https://devfinance-agilizei.netlify.app");

    cy.contains("Nova Transação").click();
    cy.get("#description").type("Mesada");
    cy.get("#amount").type(100);
    cy.get("#date").type("2023-02-01");
    cy.contains("Salvar").click();

    cy.get(".alert").should("not.exist");

  });

  it('Cadastrar uma nova transação de entrada - falha 6', () => {

    cy.visit("https://devfinance-agilizei.netlify.app");
    cy.contains("Nova Transação").click();
    cy.get("#description").type("Mesada");
    cy.get("#amount").type(100);
    cy.get("#date").type("2023-02-01");
    cy.contains("Salvar").click();

    cy.get("tbody tr").should("have.length", 1);

  });

});