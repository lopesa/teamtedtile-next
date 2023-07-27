/// <reference types="cypress" />

const SUCESS_MESSAGE = "Your message was sent. Thanks for your interest! I'll contact you asap.";
const FAILURE_MESSAGE = "Our server had a problem sending your message.";
const TEST_EMAIL = "tony@lopesdesign.com";

context('Send Email', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/contact')
    })
  
    it('should successfully send an email and show a success message toast after doing so', () => {
        cy.get('[data-cy=email-input]').type(TEST_EMAIL)
        cy.get('[data-cy=message-input]').type('This is a test message for the Cypress E2E test')
        cy.get('[data-cy=submit-button]').click()
        cy.wait(1500)
        cy.get('[data-cy=toast-message]').should('contain', SUCESS_MESSAGE)
    })
    
    it('should show a failure message toast after failing to send an email', () => {
      cy.get('[data-cy=email-input]').type(TEST_EMAIL)
      cy.get('[data-cy=message-input]').type('This is a test message for the Cypress E2E test')

      // stub a failure response from the send-mail endpoint
      cy.intercept({
        method: 'POST',
        url: '**/send-mail',
      }, {
        statusCode: 404,
        headers: { 'access-control-allow-origin': '*' },
        delayMs: 500,
      }).as('postMail')

      cy.get('[data-cy=submit-button]').click()
      cy.wait('@postMail')
      cy.get('[data-cy=toast-message]').should('contain', FAILURE_MESSAGE)
    })

})