
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
          name: 'testuser1',
          username: 'testuser1',
          password: 'pass1'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user) 
        cy.visit('http://localhost:3000')
      })

    it('Home page with Log in button', function() {
      cy.contains('Blogs Application')
      cy.contains('Log in')
    })

    it('Login form shown', function() {
        cy.contains('Log in').click()
      })

    it('Valid login', function() {
    cy.contains('Log in').click()
    cy.get('#username').type('testuser1')
    cy.get('#password').type('pass1')
    cy.get('#login-button').click()

    cy.get('html').should('contain', 'testuser1 has logged in')
    })

    it('Invalid login', function() {
        cy.contains('Log in').click()
        cy.get('#username').type('testuser1')
        cy.get('#password').type('sjdjwj')
        cy.get('#login-button').click()
      
        cy.get('.error')
          .should('contain', 'Incorrect username/password')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid')
      
        cy.get('html').should('not.contain', 'testuser1 has logged in')
      })

      
  describe('When user logged in', function() {
    beforeEach(function() {
    cy.contains('Log in').click()
    cy.get('#username').type('testuser1')
    cy.get('#password').type('pass1')
    cy.get('#login-button').click()
    })

    it('New blog creation', function() {
        cy.contains('Create new blog').click()
        cy.get('#title').type('Blog created using cypress')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('/cypress')
        cy.get('#add-button').click()
        cy.contains('Blog created using cypress')
      })
  })



  })