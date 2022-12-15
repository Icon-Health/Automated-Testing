describe('Provider testcases', () => {

    const UpdateUrl = "https://pdmt-fh6wy6rlva-uc.a.run.app/physicaltherapy/1154467454/update"

    beforeEach(() => {
        const url = "https://pdmt-fh6wy6rlva-uc.a.run.app/physicaltherapy"
        cy.visit(url)
    })

    it('Physician Full list', () => {
        const expectedResults = 55670
        cy.contains("Total Records").should('have.text', 'Total Records: ' + expectedResults)
    })

    it("Physician Geo search", () => {
        const form = cy.get("#form1")
        cy.wait(3000)
        cy.get("input[name=address]").first().clear().type("Greenwich CT").should('have.value', 'Greenwich CT')
        form.submit();

        const expectedResults = 35
        cy.contains("Total Records").should('have.text', 'Total Records: ' + expectedResults)
    })

    it("Combo geo and name", () => {
        cy.wait(3000)
        const form = cy.get("#form1")
        cy.get("input[name=address]").first().clear().type("Greenwich CT").should('have.value', 'Greenwich CT')
        cy.get("input[name=name]").first().clear().type("Elite").should('have.value', 'Elite')
            // cy.wait(2000)
        form.submit();

        const expectedResults = 3
        cy.contains("Total Records").should('have.text', 'Total Records: ' + expectedResults)
    })

    it("Clear search", () => {
        cy.wait(3000)
        cy.contains("Clear").click()
        cy.wait(1000)

        const expectedResults = 55670
        cy.contains("Total Records").should('have.text', 'Total Records: ' + expectedResults)
    })

    it("Name Search + Geo search + Increased Radius", () => {
        cy.wait(3000)
        const form = cy.get("#form1")
        cy.get("input[name=address]").first().clear().type("Greenwich CT").should('have.value', 'Greenwich CT')
        cy.get("input[name=name]").first().clear().type("Elite").should('have.value', 'Elite')
        cy.get("select[name=dist]").first().select("50", { force: true }).should('have.value', '50')
        form.submit();

        const expectedResults = 20
        cy.contains("Total Records").should('have.text', 'Total Records: ' + expectedResults)
    })

    it("NPI - search", () => {
        cy.wait(3000)
        const form = cy.get("#form1")
        cy.get("input[name=name]").first().clear().type("1932625746").should('have.value', '1932625746')
        form.submit();
        cy.url().should('include', '/physicaltherapy/1932625746')
    })

    it("Update PT: enter website, contact info, notes", () => {
        cy.visit(UpdateUrl)
        cy.get("input[name=website]").clear().type("http://placeholder.com")

        // dummy informations are generated from https://www.fakepersongenerator.com/

        cy.get("input[name=maincontact]").first().clear().type("Robert Ratner").should('have.value', 'Robert Ratner')
        cy.get("input[name=maincontact_phone]").first().clear().type("5103256395").should('have.value', '5103256395')
        cy.get("input[name=maincontact_email]").first().clear().type("stevie_mckenz@hotmail.com").should('have.value', 'stevie_mckenz@hotmail.com')

        cy.get("input[name=midcontact]").first().clear().type("Richard T Woods").should('have.value', 'Richard T Woods')
        cy.get("input[name=midcontact_phone]").first().clear().type("2075519893").should('have.value', '2075519893')
        cy.get("input[name=midcontact_email]").first().clear().type("henriette_wucke@gmail.com").should('have.value', 'henriette_wucke@gmail.com')

        cy.get("textarea[name=iconnotes]").first().clear().type("The quick brown fox jumps over the lazy dog")
            .should('have.value', 'The quick brown fox jumps over the lazy dog')

        cy.get("button[type=submit]").first().click()

        cy.contains("Primary Contact").next().within(() => {
            cy.get('p').eq(0).should('have.text', 'Robert Ratner')
            cy.get('p').eq(1).invoke('text').should('contain', '5103256395')
            cy.get('p').eq(2).invoke('text').should('contain', 'stevie_mckenz@hotmail.com')
        })

        cy.contains("Mid-Level Contact").next().within(() => {
            cy.get('p').eq(0).should('have.text', 'Richard T Woods')
            cy.get('p').eq(1).invoke('text').should('contain', '207551989')
            cy.get('p').eq(2).invoke('text').should('contain', 'henriette_wucke@gmail.com')
        })

        cy.contains("http://placeholder.com").should('exist')

        cy.contains("The quick brown fox jumps over the lazy dog").should('exist')
    })

    it("Confirm Notes update is also visibile on the search result", () => {
        cy.visit(UpdateUrl)
        cy.get("textarea[name=iconnotes]").first().clear().type("The quick brown fox jumps over the lazy dog2")
            .should('have.value', 'The quick brown fox jumps over the lazy dog2')

        cy.get("button[type=submit]").first().click()

        cy.contains("The quick brown fox jumps over the lazy dog2").should('exist')
    })

    it("Edit a Phone Number, remove a Phone Number, Add a Phone Number", () => {
        cy.visit(UpdateUrl)
        cy.wait(500);

        // start test add phone number
        cy.get("button[data-toggle=modal]").eq(1).click()
        cy.wait(500);

        cy.get("#exampleModal .add-more-action").click({ force: true })
        cy.wait(500);

        cy.get("#exampleModal").find("input").last().type("9876543210").should('have.value', '9876543210')
        cy.wait(500);

        cy.get("button[type=submit]").first().click({ force: true })
        cy.wait(500);

        // check if added phone number exists
        cy.contains("9876543210").should('exist')
        cy.wait(500);

        // update phone number
        cy.visit(UpdateUrl)
        cy.wait(500);
        cy.get("button[data-toggle=modal]").eq(1).click()
        cy.wait(500);
        cy.get("#exampleModal").find("input").last().clear().type("9876543211").should('have.value', '9876543211')
        cy.wait(500);
        cy.get("button[type=submit]").first().click({ force: true })
        cy.wait(500);
        // check if updated phone number exists
        cy.contains("9876543211").should('exist')
        cy.wait(500);

        // delete all phone number that is 9876543211
        cy.visit(UpdateUrl)
        cy.wait(500);
        cy.get("button[data-toggle=modal]").eq(1).click()
        cy.wait(500);

        cy.get("#exampleModal").find("input[value=9876543211]").last().next('a').click({ multiple: true })
        cy.wait(500);

        cy.get("button[type=submit]").first().click({ force: true })
        cy.wait(500);

        cy.contains("9876543211").should('not.exist')
        cy.contains("9876543210").should('not.exist')

        // cy.contains("The quick brown fox jumps over the lazy dog2").should('exist')
    })

    it("Add an Address", () => {
        cy.visit(UpdateUrl)

        // start test add address
        cy.get("button[data-toggle=modal]").first().click()
        cy.wait(500);
        cy.get("#addressModal .add-more-action").click({ force: true })
        cy.wait(500);
        // const lastCreated = cy.get("#addressModal .input-item").last() 
        cy.get("#addressModal .input-item").last().find("input[type=text]").eq(0).type("Test Street 1").should('have.value', 'Test Street 1')
        cy.wait(500);
        cy.get("#addressModal .input-item").last().find("input[type=text]").eq(1).type("Test Street 2").should('have.value', 'Test Street 2')
        cy.wait(500);
        cy.get("#addressModal .input-item").last().find("input[type=text]").eq(2).type("Test City").should('have.value', 'Test City')
        cy.wait(500);
        cy.get("#addressModal .input-item").last().find("input[type=text]").eq(3).type("Test State").should('have.value', 'Test State')
        cy.wait(500);
        cy.get("#addressModal .input-item").last().find("input[type=text]").eq(4).type("543210").should('have.value', '543210')
        cy.wait(500);

        cy.get("button[type=submit]").first().click({ force: true })

        cy.get(".container-fluid > .row:first-of-type > .col-md-7 > div > .col:nth-of-type(2) > p").should("exist")
        cy.get(".container-fluid > .row:first-of-type > .col-md-7 > div > .col:nth-of-type(2) > p").last()
            .should(($div) => {
                const text = $div.text()
                expect(text).to.include('Test Street 1')
                expect(text).to.include('Test Street 2')
                expect(text).to.include('Test City')
                expect(text).to.include('Test State')
                expect(text).to.include('543210')
            })

    })

    it("Edit an Address, remove an Address, Add an Address", () => {

        // start test update address
        cy.visit(UpdateUrl)
        cy.wait(1000);
        cy.get("button[data-toggle=modal]").first().click()
        cy.wait(500);

        cy.get("#addressModal .input-item").last().find("input[type=text]").eq(0).clear().type("Updated Street 1").should('have.value', 'Updated Street 1')
        cy.wait(500);
        cy.get("#addressModal .input-item").last().find("input[type=text]").eq(1).clear().type("Updated Street 2").should('have.value', 'Updated Street 2')
        cy.wait(500);
        cy.get("#addressModal .input-item").last().find("input[type=text]").eq(2).clear().type("Updated City").should('have.value', 'Updated City')
        cy.wait(500);
        cy.get("#addressModal .input-item").last().find("input[type=text]").eq(3).clear().type("Updated State").should('have.value', 'Updated State')
        cy.wait(500);
        cy.get("#addressModal .input-item").last().find("input[type=text]").eq(4).clear().type("543211").should('have.value', '543211')
        cy.wait(500);

        cy.get("button[type=submit]").first().click({ force: true })

        cy.get(".container-fluid > .row:first-of-type > .col-md-7 > div > .col:nth-of-type(2) > p").should("exist")

        cy.get(".container-fluid > .row:first-of-type > .col-md-7 > div > .col:nth-of-type(2) > p").last()
            .should(($div) => {
                const text = $div.text()
                expect(text).to.include('Updated Street 1')
                expect(text).to.include('Updated Street 2')
                expect(text).to.include('Updated City')
                expect(text).to.include('Updated State')
                expect(text).to.include('543211')
            })
    })

    it("Delete an Address", () => {

        // start test update address
        cy.visit(UpdateUrl)
        cy.wait(1000);
        cy.get("button[data-toggle=modal]").first().click()
        cy.wait(500);

        cy.get("#addressModal .input-item").last().find(".remove-action").first().click()
        cy.wait(500);
        cy.get("button[type=submit]").first().click({ force: true })
    })

})