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

      describe('when logged in', function() {
        beforeEach(function() {
          cy.login({ username: 'testuser1', password: 'pass1' })
        })

        describe('and a note exists', function () {
            beforeEach(function () {
              cy.createBlog({
                title: 'Cypress blog2',
                author: 'cypress',
                url:'/test'
              })
            })
      
            it('Add Likes', function() {
                cy.get('#togglable-button').click()
                cy.get('#like-button').click()
                cy.contains('1')
              })

            it('Delete blog', function() {
            cy.get('#togglable-button').click()    
            cy.get('#del-button').click()
            cy.get('html').should('contain', 'Deleted blog')
            })

            it('Order blogs by likes', function() {   
              
              //should be second with 1 like
              cy.get('#togglable-button').click()
              cy.get('#like-button').click()
              
              //should be first with 10 like
              cy.createBlog({
                  title: 'Cypress blog3',
                  author: 'cypress',
                  url:'/test',
                  likes: 10
                })
              //should be last with no likes
                cy.createBlog({
                  title: 'Cypress blog4',
                  author: 'cypress',
                  url:'/test',
                  likes: 0
                })
                })
        })
    })
  })