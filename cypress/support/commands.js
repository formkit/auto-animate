// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("hasAnimations", (count) => {
  cy.document().then((doc) => {
    expect(doc.getAnimations()).to.have.length(count)
    cy.wait(100).then(() => {
      doc.getAnimations().forEach((animation) => {
        animation.finish()
      })
    })
  })
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("hasText", { prevSubject: "element" }, (element, text) => {
  expect(element.text().trim()).to.equal(text)
})

Cypress.Commands.add(
  "isEntering",
  { prevSubject: "element" },
  (element, text) => {
    cy.window().then((window) => {
      expect(
        Number(window.getComputedStyle(element[0]).opacity)
      ).to.be.lessThan(1)
      cy.wait(400).then(() => {
        expect(
          Number(window.getComputedStyle(element[0]).opacity)
        ).to.be.greaterThan(0)
      })
    })
  }
)
