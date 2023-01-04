describe('empty spec', () => {
    // beforeEach() 
    const url = "https://iconhealthco.com/qa-appointment"

    it('1. valid entry', () => {
        cy.visit(url)
        cy.get('input[name=email]').type('123@email.com')
  
        cy.get('input[name=phone-area-code]').type('212')
        cy.get('input[name=phone-local-prefix]').type('555')
        cy.get('input[name=phone-local-suffix]').type('1234')
  
        cy.wait(500)
        cy.get("#formSubmitBtn").click();
        cy.wait(500)
        cy.get(".field.first-name .field-error").should('not.exist')
        cy.get(".field.last-name .field-error").should('not.exist')
        cy.get(".field.email .field-error").should('not.exist')
        cy.get(".fields.phone .field-error").should('not.exist')
        cy.get(".fields.date .field-error").should('not.exist')
        cy.get(".field.zipcode .field-error").should('not.exist')
        cy.get(".field.checkbox .field-error").should('not.exist')
        cy.wait(3000)
        cy.get('.myc-available-time:not(.unavailable)').first().click({force: true})
        cy.get("#formSubmitBtn").click();
        cy.wait(3000)
        cy.url().should('include', 'result=success') 
    })
})