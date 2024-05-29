import NewIssueModal from "../pages/NewIssueModal";

describe("Issue create", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        // System will already open issue creating modal in beforeEach block
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  it("Should create a story type issue and validate it successfully", () => {
    NewIssueModal.createIssue(
      NewIssueModal.issueDescription1,
      NewIssueModal.issueTitle1,
      NewIssueModal.issueTypeStory,
      NewIssueModal.iconStory,
      NewIssueModal.optionBabyYoda,
      NewIssueModal.optionPickleRick
    );
    NewIssueModal.ensureIssueIsCreated(
      5,
      NewIssueModal.issueTitle1,
      NewIssueModal.avatarPickleRick,
      NewIssueModal.iconStory
    );
    NewIssueModal.ensureIssueIsVisibleOnBoard(NewIssueModal.issueTitle1);
  });

  it("Should create a bug type issue and validate it successfully", () => {
    NewIssueModal.getIssueCreateModal().within(() => {
      NewIssueModal.editDescription(NewIssueModal.issueDescription2);
      NewIssueModal.editTitle(NewIssueModal.issueTitle2);
      NewIssueModal.selectIssueType(
        NewIssueModal.issueTypeBug,
        NewIssueModal.iconBug
      );
      NewIssueModal.selectPriority(NewIssueModal.priorityHighest);
      NewIssueModal.selectReporter(NewIssueModal.optionPickleRick);
      NewIssueModal.selectAssignee(NewIssueModal.optionLordGaben);
      cy.get(NewIssueModal.buttonCreateIssue).click();
    });
    NewIssueModal.ensureIssueIsCreated(
      5,
      NewIssueModal.issueTitle2,
      NewIssueModal.avatarLordGaben,
      NewIssueModal.iconBug
    );
    NewIssueModal.ensureIssueIsVisibleOnBoard(NewIssueModal.issueTitle2);
  });

  it("Should create a task type issue and validate it successfully", () => {
    NewIssueModal.getIssueCreateModal().within(() => {
      NewIssueModal.editDescription(NewIssueModal.issueDescriptionR);
      NewIssueModal.editTitle(NewIssueModal.issueTitleR);
      cy.get(NewIssueModal.issueType).scrollIntoView();
      cy.get(NewIssueModal.iconTask).should("be.visible");
      NewIssueModal.selectPriority(NewIssueModal.priorityLow);
      NewIssueModal.selectReporter(NewIssueModal.optionBabyYoda);
      cy.get(NewIssueModal.buttonCreateIssue).click();
    });
    NewIssueModal.ensureIssueIsCreatedNoAssignee(
      5,
      NewIssueModal.issueTitleR,
      NewIssueModal.iconTask
    );
    NewIssueModal.ensureIssueIsVisibleOnBoard(NewIssueModal.issueTitleR);
  });

  it("Should validate title is required field if missing", () => {
    cy.get(NewIssueModal.issueCreateModal).within(() => {
      cy.get(NewIssueModal.buttonCreateIssue).click();
      cy.get(NewIssueModal.formFieldTitle).should(
        "contain",
        "This field is required"
      );
    });
  });
});
