describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')

    cy.contains('Add to cart').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should persist items in the cart when navigating to the homepage', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')

    cy.contains('Add to cart').click()

    cy.contains('Cart (1)').should('exist')

    cy.visit('/')

    cy.contains('Cart (1)').should('exist')
  })

  it('should count multiple products in the cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')

    cy.contains('Add to cart').click()

    cy.contains('Cart (1)').should('exist')

    cy.visit('/')

    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')

    cy.contains('Add to cart').click()

    cy.contains('Cart (2)').should('exist')
  })

  it('should be able to search for a product and add it to the cart', () => {
    cy.searchByQuery('shirt')

    cy.url().should('include', '/search')

    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')

    cy.contains('Add to cart').click()

    cy.contains('Cart (1)').should('exist')
  })
})
