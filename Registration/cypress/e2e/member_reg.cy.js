describe('empty spec', () => {
  beforeEach() 
  const url = "https://iconhealthco.com/qa-registration"
  it('1. hit submit with no data entered', () => {
      cy.visit(url)
      cy.wait(500)
      cy.get("#formSubmitBtn").click();

      cy.get(".field.first-name .field-error").should(
          'have.text',
          "Firstname is required."
      )
      cy.get(".field.last-name .field-error").should(
          'have.text',
          "Lastname is required."
      )
      cy.get(".field.email .field-error").should(
          'have.text',
          "Email is not valid"
      )
      cy.get(".fields.date .field-error").should(
          'have.text',
          "Please enter a valid date of birth after 1900."
      )
      cy.get(".field.zipcode .field-error").should(
          'have.text',
          "Please enter a valid zipcode"
      )
  })

  it('2. invalid entry first name', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('123 name')
      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should(
          'contain.text',
          "Please Enter Valid Firstname"
      )
  })

  it('3. valid entry first name', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
  })

  it('4. invalid entry last name', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('123 Last Name')

      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should(
          'contain.text',
          "Please Enter Valid Lastname"
      )
  })

  it('5. valid entry name', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')

      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
  })

  it('6. invalid entry email (123.email.com)', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123.email.com')

      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('contain.text', "Email is not valid")
  })

  it('7. invalid entry email (123@email)', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email')

      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('contain.text', "Email is not valid")
  })

  it('8. invalid entry email (123.email)', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email.')

      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('contain.text', "Email is not valid")
  })

  it('9. invalid entry email (123.email.c)', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email.c')

      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('contain.text', "Email is not valid")
  })
  it('10. invalid entry phone (123-111-1234)s̄', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email.com')

      cy.get('input[name=phone-area-code]').type('123')
      cy.get('input[name=phone-local-prefix]').type('111')
      cy.get('input[name=phone-local-suffix]').type('1234')

      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('not.exist')
      cy.get(".fields.phone .field-error").should('contain.text', "Please enter a valid phone number")
  })

  it('11. invalid entry phone (212-111-1234)', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email.com')

      cy.get('input[name=phone-area-code]').type('212')
      cy.get('input[name=phone-local-prefix]').type('111')
      cy.get('input[name=phone-local-suffix]').type('1234')

      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('not.exist')
      cy.get(".fields.phone .field-error").should('contain.text', "Please enter a valid phone number")
  })
  it('12. valid entry phone (212-555-1234)', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
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
  })

  it('13. invalid entry no dob', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
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
      cy.get(".fields.date .field-error").should('contain.text', 'Please enter a valid date of birth after 1900.')
  })

  it('14. invalid entry no dob', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
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
      cy.get(".fields.date .field-error").should('contain.text', 'Please enter a valid date of birth after 1900.')
  })

  it('15. vallid entry no email', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')

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
      cy.get(".fields.date .field-error").should('contain.text', 'Please enter a valid date of birth after 1900.')
  })


  it('16. invallid entry dob', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email.com')

      cy.get('input[name=phone-area-code]').type('212')
      cy.get('input[name=phone-local-prefix]').type('555')
      cy.get('input[name=phone-local-suffix]').type('1234')

      cy.get('input[name=dob_d]').type('30')
      cy.get('input[name=dob_m]').type('02')
      cy.get('input[name=dob_y]').type('1954')

      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('not.exist')
      cy.get(".fields.phone .field-error").should('not.exist')
      cy.get(".fields.date .field-error").should('contain.text', 'Please enter a valid date of birth after 1900.')
  })


  it('17. invallid entry dob', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email.com')

      cy.get('input[name=phone-area-code]').type('212')
      cy.get('input[name=phone-local-prefix]').type('555')
      cy.get('input[name=phone-local-suffix]').type('1234')

      cy.get('input[name=dob_d]').type('29')
      cy.get('input[name=dob_m]').type('02')
      cy.get('input[name=dob_y]').type('1954')


      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('not.exist')
      cy.get(".fields.phone .field-error").should('not.exist')
      cy.get(".fields.date .field-error").should('contain.text', 'Please enter a valid date of birth after 1900.')
  })
  it('18. invallid entry dob', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email.com')

      cy.get('input[name=phone-area-code]').type('212')
      cy.get('input[name=phone-local-prefix]').type('555')
      cy.get('input[name=phone-local-suffix]').type('1234')

      cy.get('input[name=dob_d]').type('29')
      cy.get('input[name=dob_m]').type('02')
      cy.get('input[name=dob_y]').type('19')


      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('not.exist')
      cy.get(".fields.phone .field-error").should('not.exist')
      cy.get(".fields.date .field-error").should('contain.text', 'Please enter a valid date of birth after 1900.')
  })

  it('19. vallid entry dob', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email.com')

      cy.get('input[name=phone-area-code]').type('212')
      cy.get('input[name=phone-local-prefix]').type('555')
      cy.get('input[name=phone-local-suffix]').type('1234')

      cy.get('input[name=dob_d]').type('29')
      cy.get('input[name=dob_m]').type('02')
      cy.get('input[name=dob_y]').type('1956')


      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('not.exist')
      cy.get(".fields.phone .field-error").should('not.exist')
      cy.get(".fields.date .field-error").should('not.exist')
  })


  it('20. invallid entry no zipcode', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email.com')

      cy.get('input[name=phone-area-code]').type('212')
      cy.get('input[name=phone-local-prefix]').type('555')
      cy.get('input[name=phone-local-suffix]').type('1234')

      cy.get('input[name=dob_d]').type('29')
      cy.get('input[name=dob_m]').type('02')
      cy.get('input[name=dob_y]').type('1956')

      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('not.exist')
      cy.get(".fields.phone .field-error").should('not.exist')
      cy.get(".fields.date .field-error").should('not.exist')
      cy.get(".field.zipcode .field-error").should('contain.text', 'Please enter a valid zipcode')

  })


  it('21. invallid entry zipcode', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email.com')

      cy.get('input[name=phone-area-code]').type('212')
      cy.get('input[name=phone-local-prefix]').type('555')
      cy.get('input[name=phone-local-suffix]').type('1234')

      cy.get('input[name=dob_d]').type('29')
      cy.get('input[name=dob_m]').type('02')
      cy.get('input[name=dob_y]').type('1956')

      cy.get('input[name=zipcode]').type('1234')

      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('not.exist')
      cy.get(".fields.phone .field-error").should('not.exist')
      cy.get(".fields.date .field-error").should('not.exist')
      cy.get(".field.zipcode .field-error").should('contain.text', 'Please enter a valid zipcode')

  })

  it('21. valid entry zipcode', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email.com')

      cy.get('input[name=phone-area-code]').type('212')
      cy.get('input[name=phone-local-prefix]').type('555')
      cy.get('input[name=phone-local-suffix]').type('1234')

      cy.get('input[name=dob_d]').type('29')
      cy.get('input[name=dob_m]').type('02')
      cy.get('input[name=dob_y]').type('1956')

      cy.get('input[name=zipcode]').type('12345')

      cy.wait(500)
      cy.get("#formSubmitBtn").click();
      cy.wait(500)
      cy.get(".field.first-name .field-error").should('not.exist')
      cy.get(".field.last-name .field-error").should('not.exist')
      cy.get(".field.email .field-error").should('not.exist')
      cy.get(".fields.phone .field-error").should('not.exist')
      cy.get(".fields.date .field-error").should('not.exist')
      cy.get(".field.zipcode .field-error").should('not.exist')

      cy.get(".field.checkbox .field-error").should('contain.text', 'Please accept terms and conditions')
  })

  it('22. valid entry', () => {
      cy.visit(url)
      cy.get('input[name=fname]').type('First Name')
      cy.get('input[name=lname]').type('Last-Name hyphen')
      cy.get('input[name=email]').type('123@email.com')

      cy.get('input[name=phone-area-code]').type('212')
      cy.get('input[name=phone-local-prefix]').type('555')
      cy.get('input[name=phone-local-suffix]').type('1234')

      cy.get('input[name=dob_d]').type('29')
      cy.get('input[name=dob_m]').type('02')
      cy.get('input[name=dob_y]').type('1956')

      cy.get('input[name=zipcode]').type('12345')
      cy.get('input[name=tc]').click()

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
