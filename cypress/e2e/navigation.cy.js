/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should navigate the site via the menu bar', () => {
    cy.get('[data-cy=menu-container]').contains('About').click()
    cy.location('pathname').should('include', 'about')
    cy.get('[data-cy=menu-container]').contains('Contact').click()
    cy.location('pathname').should('include', 'contact')
    cy.get('[data-cy=menu-container]').contains('Gallery').click()
    cy.location('pathname').should('include', 'gallery')
    cy.get('[data-cy=logo]').click()
    cy.location('pathname').should('include', '')
  })

  // it('cy.go() - go back or forward in the browser\'s history', () => {
  //   // https://on.cypress.io/go

  //   cy.location('pathname').should('include', 'navigation')

  //   cy.go('back')
  //   cy.location('pathname').should('not.include', 'navigation')

  //   cy.go('forward')
  //   cy.location('pathname').should('include', 'navigation')

  //   // clicking back
  //   cy.go(-1)
  //   cy.location('pathname').should('not.include', 'navigation')

  //   // clicking forward
  //   cy.go(1)
  //   cy.location('pathname').should('include', 'navigation')
  // })

  // it('cy.reload() - reload the page', () => {
  //   // https://on.cypress.io/reload
  //   cy.reload()

  //   // reload the page without using the cache
  //   cy.reload(true)
  // })

  // it('cy.visit() - visit a remote url', () => {
  //   // https://on.cypress.io/visit

  //   // Visit any sub-domain of your current domain

  //   // Pass options to the visit
  //   cy.visit('https://example.cypress.io/commands/navigation', {
  //     timeout: 50000, // increase total time for the visit to resolve
  //     onBeforeLoad (contentWindow) {
  //       // contentWindow is the remote page's window object
  //       expect(typeof contentWindow === 'object').to.be.true
  //     },
  //     onLoad (contentWindow) {
  //       // contentWindow is the remote page's window object
  //       expect(typeof contentWindow === 'object').to.be.true
  //     },
  //   })
  //   })
})
