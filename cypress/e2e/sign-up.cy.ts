/// <reference types="cypress" />

describe('Sign-up page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/sign-up')
    cy.intercept('POST', '/auth/signup').as('signUp')
  })
  it('success flow', () => {
    const newEmail = `${Date.now()}-user@gmail.com`

    cy.get('[data-cy="name"').type('New User')
    cy.get('[data-cy="email"').type(newEmail)
    cy.get('[data-cy="password"').type('qwerty123')
    cy.get('[data-cy="radio-button-female"').click()
    cy.get('[data-cy="sign-up-submit"').click()

    cy.location('pathname').should('eq', '/')
  })

  it('error flow', () => {
    cy.get('[data-cy="sign-up-submit"').click()

    cy.wait('@signUp')

    cy.contains('name should not be empty').should('be.visible')
    cy.contains('please enter correct email').should('be.visible')
    cy.contains('password must be longer than or equal to 6 characters').should('be.visible')
    cy.get('[data-cy="sign-up-submit"').should('be.disabled')

    cy.get('[data-cy="name"').type('New User')
    cy.contains('name should not be empty').should('not.exist')

    cy.get('[data-cy="email"').type('qwe@gmail.com')
    cy.contains('please enter correct email').should('not.exist')

    cy.get('[data-cy="password"').type('qwerty123')
    cy.contains('password must be longer than or equal to 6 characters').should('not.exist')

    cy.get('[data-cy="sign-up-submit"').should('not.be.disabled')
  })

  it('redirect to sign-in', () => {
    cy.get('[data-cy="sign-in-redirect"').should('be.visible').click()
    cy.location('pathname').should('eq', '/auth/sign-in')
  })
})
