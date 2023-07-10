describe("Dashboard Page Test Cases", () => {
    beforeEach(() => {
      cy.visit("https://aplikasipenjualan/");
      const email = cy.get("input[name='email']");
      email.type("Heru");
      const password = cy.get("input[name='password']");
      password.type("Heru123");
      const button = cy.get("button");
      button.click();
      cy.on("window:alert", (t) => {
        expect(t).to.contains("welcome");
      });

      cy.url().should("eq", "https://aplikasipenjualan/admin");
    });

    it("contains checkboc", () => {
        cy.get("#kode-toko :checked").should("be.checked").and("have.value", "Sesuai");
    })

    it("contains checkboc", () => {
        cy.get("#kode-toko :checked").should("be.checked").and("have.value", "Tidak cukup");
    })
    
    it("User cetak dokumen surat jalan", () => {
        cy.get("form input").check(["Sesuai"]);
    
        const button = cy.get("button");
        button.click();
        cy.on("window:alert", (text) => {
          expect(text).to.contains("Cetak");
        });
      });

      it("User menandai nomor-nomor pesanan", () => {
        cy.get("form input").check(["Tidak cukup"]);
      });

});

