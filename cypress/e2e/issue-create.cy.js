import IssueModal from "../pages/IssueModal";
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

  it.only("Should create a story type issue and validate it successfully", () => {
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
    NewIssueModal.ensureIssueIsCreated(NewIssueModal.issueTitle1);
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
      NewIssueModal.buttonCreateIssue.click();
    });

    cy.get(issueCreatingModal).should("not.exist");
    cy.contains(issueCreatingSuccess).should("be.visible");
    cy.reload();
    cy.contains(issueCreatingSuccess).should("not.exist");
    cy.get(listBacklog)
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get(listIssues)
          .should("have.length", "5")
          .first()
          .find("p")
          .contains(issueTitle2)
          .siblings()
          .within(() => {
            cy.get(avatarLordGaben).should("be.visible");
            cy.get(iconBug).should("be.visible");
          });
      });

    cy.get(listBacklog)
      .contains(issueTitle2)
      .within(() => {
        cy.get(avatarLordGaben).should("be.visible");
        cy.get(iconBug).should("be.visible");
      });
  });

  it("Should create a task type issue and validate it successfully", () => {
    NewIssueModal.getIssueCreateModal().within(() => {
      NewIssueModal.editDescription(NewIssueModal.issueDescriptionR);
      NewIssueModal.editTitle(NewIssueModal.issueTitleR);
      NewIssueModal.issueType.scrollIntoView();
      NewIssueModal.iconTask.should("be.visible");
      NewIssueModal.selectPriority(NewIssueModal.priorityLow);
      NewIssueModal.selectReporter(NewIssueModal.optionBabyYoda);
      NewIssueModal.buttonCreateIssue.click();
    });
    cy.get(issueCreatingModal).within(() => {
      cy.get(description).type(issueDescriptionR);
      cy.get(description).should("have.text", issueDescriptionR);
      cy.get(title).type(issueTitleR);
      cy.get(title).should("have.value", issueTitleR);
      cy.get(issueType).scrollIntoView();
      cy.get(iconTask).should("be.visible");
      cy.get(priorityDropdown).click();
      cy.get(priorityLow).click();
      cy.get(reporterDropdown).click();
      cy.get(optionBabyYoda).click();
      cy.get(buttonCreateIssue).click();
    });

    cy.get(issueCreatingModal).should("not.exist");
    cy.contains(issueCreatingSuccess).should("be.visible");
    cy.reload();
    cy.contains(issueCreatingSuccess).should("not.exist");
    cy.get(listBacklog)
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get(listIssues)
          .should("have.length", "5")
          .first()
          .find("p")
          .contains(issueTitleR)
          .siblings()
          .within(() => {
            cy.get(iconTask).should("be.visible");
          });
      });

    cy.get(listBacklog)
      .contains(issueTitleR)
      .within(() => {
        cy.get(iconTask).should("be.visible");
      });
  });

  it("Should validate title is required field if missing", () => {
    // System finds modal for creating issue and does next steps inside of it
    cy.get(issueCreatingModal).within(() => {
      // Try to click create issue button without filling any data
      cy.get(buttonCreateIssue).click();

      // Assert that correct error message is visible
      cy.get(formFieldTitle).should("contain", "This field is required");
    });
  });
});
