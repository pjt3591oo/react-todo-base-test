/* eslint-disable no-undef */
/// <reference types="cypress" />

const TEMP_TODOS = [
  {
    id: 0,
    text: 'todo1',
    isActive: 1
  }, {
    id: 1,
    text: 'todo2',
    isActive: 1
  }, {
    id: 2,
    text: 'todo3',
    isActive: 1
  }
]

describe('example to-do app', () => {
  beforeEach(() => {
    cy.intercept('GET', '/todos', {todos: TEMP_TODOS});
    cy.visit('/')
  })

  it('can input todo', () => {
    // cy.get('div').contains('todo');

    cy.get('[data-test=todo-input]').type('hello world');
    cy.get('[data-test=todo-input]').type('{enter}');
    cy.get('[data-test=todo-input]').should('have.value', '')
    cy.get('[data-test=todo-item]').should('have.length', 4);
    
    cy.get('[data-test=todo-input]').type('hello hello');
    cy.get('[data-test=todo-input]').type('{enter}');
    cy.get('[data-test=todo-input]').should('have.value', '')
    cy.get('[data-test=todo-item]').should('have.length', 5);
  })

  it('can cancel todo items', () => {
    cy.get('[data-test=todo-input]').type('hello world');
    cy.get('[data-test=todo-input]').type('{enter}');
    cy.get('[data-test=todo-input]').type('hello world');
    cy.get('[data-test=todo-input]').type('{enter}');
    cy.get('[data-test=todo-item]').should('have.length', 5);


    cy.get('[data-test=todo-cancel]').last().click();
    cy.get('[data-test=todo-item]').should('have.length', 4);
  })

})
