describe("Login Page Test Cases", () => {
  beforeEach(() => {
    cy.visit("https://aplikasipenjualan/");
  });

  it("Visit Login Page", () => {
    cy.title().should("eq", "Aplikasi Penjualan");
    cy.contains("Hello !!");
  });

  it("Contains Email and Password input, and Login button", () => {
    // check email
    const email = cy.get("input[name='email']");
    email.should("be.visible");
    email.should("have.attr", "type", "email");
    email.should("have.attr", "placeholder", "Email Address");

    // check password
    const password = cy.get("input[name='password']");
    password.should("be.visible");
    password.should("have.attr", "type", "password");
    password.should("have.attr", "placeholder", "Password");

    // check login button
    const button = cy.get("button");
    button.should("be.visible");
    button.contains("Login");
    button.should("have.css", "background-color", "rgb(79, 70, 229)");
    button.should("have.css", "color", "rgb(255, 255, 255)");
  });

  it("User login menggunakan invalid credential", () => {
    const button = cy.get("button");
    button.click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("login failed");
    });
  });

  it("Do Login with Wrong Values", () => {
    const email = cy.get("input[name='email']");
    email.type("wrong.email.com");

    const password = cy.get("input[name='password']");
    password.type("password");

    const button = cy.get("button");
    button.click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("login failed");
    });
  });

  it("User login menggunakan valid credential", () => {
    const email = cy.get("input[name='email']");
    email.type("Heru");

    const password = cy.get("input[name='password']");
    password.type("Heru123");

    const button = cy.get("button");
    button.click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("welcome");
    });

    cy.url().should(
      "eq",
      "https://aplikasipenjualan/"
    );
  });
});
