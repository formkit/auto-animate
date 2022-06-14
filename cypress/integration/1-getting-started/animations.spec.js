/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("the documentation site", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5555")
  })

  it("displays the tagline", () => {
    cy.get("h1").hasText("Add motion to your apps with a single line of code.")
  })

  it("takes some time to transition code editor", () => {
    cy.get("#hero .frameworks > li:nth-child(2)").click()
    cy.wait(50)
    cy.hasAnimations(2)
    cy.wait(250 * 1.5)
    cy.hasAnimations(0)
  })

  it("animates the dropdown example", () => {
    cy.get(".dropdown").click()
    cy.get(".dropdown").children().should("have.length", 2)
    cy.get(".dropdown > p:nth-child(2)").isEntering()
  })

  it("animates the react example", () => {
    cy.get(".react-example button").click()
    cy.hasAnimations(5)
  })

  it("animates the vue example", () => {
    cy.get(".vue-example li:first-child").click()
    cy.hasAnimations(23)
    cy.wait(250)
    cy.get(".vue-example li:last-child").click()
    cy.hasAnimations(23)
    cy.wait(250)
    cy.get(".vue-example li:first-child").click()
    cy.hasAnimations(22)
  })

  it("animates the angular example", () => {
    cy.get(".angular-example button").click()
    cy.hasAnimations(5)
  })

  it("animates the card example", () => {
    cy.get(".card-example button:first-child").click()
    cy.hasAnimations(3)
    cy.wait(250)
    cy.get(".card-example .formkit-input.button").click()
    cy.get(".card-example .card:first-child()").isEntering()
    cy.hasAnimations(4)
  })

  it("animates the list example", () => {
    cy.get(".list-example li:first-child button").click()
    cy.hasAnimations(3)
    cy.get(".list-example .button--add").click()
    cy.hasAnimations(4)
    cy.get(".list-example li:last-child button").click()
    cy.hasAnimations(4)
  })

  it("animates the boxes example", () => {
    cy.get(".boxes-example button").click()
    cy.hasAnimations(51)
  })

  it("animates the accordion example", () => {
    cy.get(".accordion-example .accordion-item:nth-child(2) .question").click()
    cy.hasAnimations(5)
    cy.get(".accordion-example .accordion-item:nth-child(1) .question").click()
    cy.hasAnimations(6)
    cy.get(".accordion-example .accordion-item:nth-child(3) .question").click()
    cy.hasAnimations(6)
  })

  it("animates the FormKit example", () => {
    cy.get(".formkit-example button[type='submit']").click()
    cy.hasAnimations(13)
    cy.get(".formkit-example input[name='text_2']").type("FormKit1")
    cy.hasAnimations(4)
  })
})
