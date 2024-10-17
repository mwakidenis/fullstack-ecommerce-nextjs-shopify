describe("Home Hero Section", () => {
  beforeEach(() => {
    cy.visit("/"); // Assuming the component is on the homepage
  });

  it("should display the carousel", () => {
    cy.get('[data-testid="hero-carousel"]').should("exist");
  });

  it("should display the correct number of carousel items", () => {
    cy.get('[data-testid="hero-carousel-item"]').should("have.length", 2);
  });

  it("should display the correct content for the first carousel item", () => {
    cy.get('[data-testid="hero-carousel-item"]')
      .first()
      .within(() => {
        cy.get('[data-testid="upper-title"]').should(
          "have.text",
          "New Arrivals"
        );
        cy.get('[data-testid="title"]').should(
          "have.text",
          "Summer Collection"
        );
        cy.get('[data-testid="text"]').should(
          "have.text",
          "Explore our latest summer collection."
        );
        cy.get("button").should("have.text", "Shop Now");
        cy.get("img").should("have.attr", "alt", "Product 1");
      });
  });

  it("should navigate to the next carousel item", () => {
    cy.get('[data-testid="carousel-next"]').click();
    cy.get('[data-testid="hero-carousel-item"]')
      .first()
      .within(() => {
        cy.get('[data-testid="upper-title"]').should(
          "have.text",
          "Best Sellers"
        );
        cy.get('[data-testid="title"]').should(
          "have.text",
          "Winter Collection"
        );
      });
  });

  it("should navigate to the previous carousel item", () => {
    cy.get('[data-testid="carousel-next"]').click();
    cy.get('[data-testid="carousel-previous"]').click();
    cy.get('[data-testid="hero-carousel-item"]')
      .first()
      .within(() => {
        cy.get('[data-testid="upper-title"]').should(
          "have.text",
          "New Arrivals"
        );
      });
  });

  it('should have a working "Shop Now" button', () => {
    cy.get('[data-testid="hero-carousel-item"]')
      .first()
      .within(() => {
        cy.get("button").click();
        // Add an assertion here for the expected behavior after clicking the button
        // For example, if it should navigate to a shop page:
        // cy.url().should('include', '/shop')
      });
  });
});
