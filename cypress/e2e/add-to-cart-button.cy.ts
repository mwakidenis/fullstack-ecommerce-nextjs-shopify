describe("Add to Cart Button", () => {
  beforeEach(() => {
    // Make sure your Next.js development server is running on port 3000
    cy.visit("http://localhost:3000/product/fire-motif-zandana");
  });

  describe("Basic Add to Cart", () => {
    it("should successfully add a product to cart", () => {
      // Click add to cart button
      cy.get("button").contains("Add to Cart").first().should("exist").click();

      // Verify success toast
      cy.contains("added to cart!").should("be.visible");
    });

    it("should show loading state while adding to cart", () => {
      cy.get("button").contains("Add to Cart").first().should("exist").click();

      // Verify loading state
      cy.contains("Adding...").should("be.visible");
    });
  });

  describe("Product Detail Quantity Controls", () => {
    beforeEach(() => {
      // Click on first product to go to detail page
      // Update this selector based on your actual HTML structure
      cy.get("a").contains("Product").first().click();
    });

    it("should change quantity using controls", () => {
      // Increase quantity
      cy.get('button[aria-label="Increase quantity"]').click();
      cy.get('input[type="number"]').should("have.value", "2");

      // Decrease quantity
      cy.get('button[aria-label="Decrease quantity"]').click();
      cy.get('input[type="number"]').should("have.value", "1");
    });

    it("should handle manual quantity input", () => {
      // Enter valid quantity
      cy.get('input[type="number"]')
        .clear()
        .type("3")
        .should("have.value", "10");

      // Try entering invalid quantities
      cy.get('input[type="number"]')
        .clear()
        .type("0")
        .should("have.value", "01");

      cy.get('input[type="number"]')
        .clear()
        .type("11")
        .should("have.value", "10");
    });
  });

  // describe("Out of Stock Products", () => {
  //   it("should show out of stock button state", () => {
  //     // Find and verify an out of stock button if exists
  //     cy.get("button")
  //       .contains("Out of Stock")
  //       .should("be.visible")
  //       .and("be.disabled");
  //   });
  // });
});
