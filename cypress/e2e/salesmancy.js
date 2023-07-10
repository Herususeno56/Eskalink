describe("Dashboard Page Test Cases", () => {
  beforeEach(() => {
    cy.visit("https://aplikasipenjualan/");
    const email = cy.get("input[name='email']");
    email.type("user@react.test");
    const password = cy.get("input[name='password']");
    password.type("password");
    const button = cy.get("button");
    button.click();
    cy.on("window:alert", (t) => {
      expect(t).to.contains("welcome");
    });
    cy.url().should("eq", "https://aplikasipenjualan/salesman");
  });

  it("Contains checkbox kode toko, checkbox kode produk, input catatan ,input qty", () => {
    //check checkbox kode toko
    cy.get("#kode-toko :checked").should("be.checked").and("have.value", "08");

    //check checkbox kode toko
    cy.get("#kode-produk :checked")
      .should("be.checked")
      .and("have.value", "57");

    // check jumlah qty
    const qty = cy.get("input[name='qty']");
    qty.should("be.visible");
    qty.should("have.attr", "type", "form");
    qty.should("have.attr", "placeholder", "jumlah qty");

    // check pesan
    const pesan = cy.get("input[name='qty']");
    pesan.should("be.visible");
    pesan.should("have.attr", "type", "form");
    pesan.should("have.attr", "placeholder", "jumlah qty");

    // check login button
    const button = cy.get("button");
    button.should("be.visible");
    button.contains("Kirim");
    button.should("have.css", "background-color", "rgb(79, 70, 229)");
    button.should("have.css", "color", "rgb(255, 255, 255)");
  });

  it("user input data dengan valid credential", () => {
    cy.get("form input").check(["08", "09"]);
    cy.get("form input").check(["57", "58"]);
    const Qty = cy.get("input[name='Qty']");
    Qty.type("25");

    const Pesan = cy.get("input[name='Pesan']");
    Pesan.type("Optional");

    const button = cy.get("button");
    button.click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Kirim");
    });
  });

  it("User input data Qty dengan abjad", () => {
    cy.get("form input").check(["08", "09"]);
    cy.get("form input").check(["57", "58"]);

    const Qty = cy.get("input[name='Qty']");
    Qty.type("Dua pulu lima");

    const Catatan = cy.get("input[name='Catatan']");
    Catatan.type("Optional");

    const button = cy.get("button");
    button.click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Gagal Kirim");
    });
  });

  it("User input data Qty dengan simbol", () => {
    cy.get("form input").check(["08", "09"]);
    cy.get("form input").check(["57", "58"]);

    const Qty = cy.get("input[name='Qty']");
    Qty.type("####");

    const Catatan = cy.get("input[name='Catatan']");
    Catatan.type("Optional");

    const button = cy.get("button");
    button.click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Gagal Kirim");
    });
  });

  it("User tidak meng input data", () => {
    cy.get("form input").check(["08", "09"]);
    cy.get("form input").check(["57", "58"]);

    const Qty = cy.get("input[name='Qty']");
    Qty.type("####");

    const Catatan = cy.get("input[name='Catatan']");
    Catatan.type("Optional");

    const button = cy.get("button");
    button.click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Anda Tidak Mengisi Apapun");
    });
  });
});
