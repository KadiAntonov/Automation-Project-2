let Array = [];

describe("Issue details editing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  it("Should update type, status, assignees, reporter, priority successfully", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click("bottomRight");
      cy.get('[data-testid="select-option:Story"]')
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="select:type"]').should("contain", "Story");

      cy.get('[data-testid="select:status"]').click("bottomRight");
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should("have.text", "Done");

      cy.get('[data-testid="select:assignees"]').click("bottomRight");
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click("bottomRight");
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should("contain", "Baby Yoda");
      cy.get('[data-testid="select:assignees"]').should(
        "contain",
        "Lord Gaben"
      );

      cy.get('[data-testid="select:reporter"]').click("bottomRight");
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should(
        "have.text",
        "Pickle Rick"
      );

      cy.get('[data-testid="select:priority"]').click("bottomRight");
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should("have.text", "Medium");
    });
  });

  it("Should update title, description successfully", () => {
    const title = "TEST_TITLE";
    const description = "TEST_DESCRIPTION";

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get(".ql-snow").click().should("not.exist");

      cy.get(".ql-editor").clear().type(description);

      cy.contains("button", "Save").click().should("not.exist");

      cy.get('textarea[placeholder="Short summary"]').should(
        "have.text",
        title
      );
      cy.get(".ql-snow").should("have.text", description);
    });
  });

  it("Should validate values in issue priorities", () => {
    const expectedLenght = 5;
    const priorityMedium = '[data-testid="select-option:Medium"]';
    const priorityHighest = '[data-testid="select-option:Highest"]';
    const priorityHigh = '[data-testid="select-option:High"]';
    const priorityLow = '[data-testid="select-option:Low"]';
    const priorityLowest = '[data-testid="select-option:Lowest"]';
    Array = [];
    getIssueDetailsModal().within(() => {
      pushItemToArray(priorityMedium, 1);
      pushItemToArray(priorityHighest, 2);
      pushItemToArray(priorityHigh, 3);
      pushItemToArray(priorityLow, 4);
      pushItemToArray(priorityLowest, expectedLenght);
      cy.log(`Current array items: ${JSON.stringify(Array)}`);
    });
  });

  function pushItemToArray(priority, lengthOfArray) {
    Array.push(priority);
    cy.log(`Array value: ${priority}`);
    cy.log(`Array Length: ${Array.length}`);
    expect(Array).to.include(priority);
    expect(Array.length).to.equal(lengthOfArray);
  }

  it("Should validate reporter name has only characters in it", () => {
    const reporter = '[data-testid="select:reporter"]';
    getIssueDetailsModal().within(() => {
      cy.get(reporter)
        .invoke("text")
        .then((text) => {
          cy.log(text);
          expect(text).to.match(/^[A-Za-z\s]+$/);
        });
    });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
});
