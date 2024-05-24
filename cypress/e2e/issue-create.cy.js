import { faker } from "@faker-js/faker";

// Selectors
const issueCreatingModal = '[data-testid="modal:issue-create"]';
const description = ".ql-editor";
const title = 'input[name="title"]';
const issueType = '[data-testid="select:type"]';
const issueTypeStory = '[data-testid="select-option:Story"]';
const issueTypeBug = '[data-testid="select-option:Bug"]';
const issueTypeTask = '[data-testid="select-option:Task"]';
const priorityDropdown = '[data-testid="select:priority"]';
const priorityHighest = '[data-testid="select-option:Highest"]';
const priorityLow = '[data-testid="select-option:Low"]';
const reporterDropdown = '[data-testid="select:reporterId"]';
const assigneeDropdown = '[data-testid="form-field:userIds"]';
const optionBabyYoda = '[data-testid="select-option:Baby Yoda"]';
const optionPickleRick = '[data-testid="select-option:Pickle Rick"]';
const optionLordGaben = '[data-testid="select-option:Lord Gaben"]';
const buttonCreateIssue = 'button[type="submit"]';
const issueCreatingSuccess = "Issue has been successfully created.";
const listBacklog = '[data-testid="board-list:backlog"]';
const listIssues = '[data-testid="list-issue"]';
const avatarBabyYoda = '[data-testid="avatar:Baby Yoda"]';
const avatarPickleRick = '[data-testid="avatar:Pickle Rick"]';
const avatarLordGaben = '[data-testid="avatar:Lord Gaben"]';
const iconStory = '[data-testid="icon:story"]';
const iconBug = '[data-testid="icon:bug"]';
const iconTask = '[data-testid="icon:task"]';
const formFieldTitle = '[data-testid="form-field:title"]';

// Text values
let issueDescription1 = "TEST_DESCRIPTION";
let issueDescription2 = "My bug description";
const issueDescriptionR = faker.lorem.words();
let issueTitle1 = "TEST_TITLE";
let issueTitle2 = "Bug";
const issueTitleR = faker.lorem.word();

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
    cy.get(issueCreatingModal).within(() => {
      cy.get(description).type(issueDescription1);
      cy.get(description).should("have.text", issueDescription1);
      cy.get(title).type(issueTitle1);
      cy.get(title).should("have.value", issueTitle1);
      cy.get(issueType).click();
      cy.get(issueTypeStory).wait(1000).trigger("mouseover").trigger("click");
      cy.get(iconStory).should("be.visible");
      cy.get(reporterDropdown).click();
      cy.get(optionBabyYoda).click();
      cy.get(assigneeDropdown).click();
      cy.get(optionPickleRick).click();
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
          .contains(issueTitle1)
          .siblings()
          .within(() => {
            cy.get(avatarPickleRick).should("be.visible");
            cy.get(iconStory).should("be.visible");
          });
      });

    cy.get(listBacklog)
      .contains(issueTitle1)
      .within(() => {
        cy.get(avatarPickleRick).should("be.visible");
        cy.get(iconStory).should("be.visible");
      });
  });

  it("Should create a bug type issue and validate it successfully", () => {
    cy.get(issueCreatingModal).within(() => {
      cy.get(description).type(issueDescription2);
      cy.get(description).should("have.text", issueDescription2);
      cy.get(title).type(issueTitle2);
      cy.get(title).should("have.value", issueTitle2);
      cy.get(issueType).click();
      cy.get(issueTypeBug).wait(1000).trigger("mouseover").trigger("click");
      cy.get(iconBug).should("be.visible");
      cy.get(priorityDropdown).click();
      cy.get(priorityHighest).click();
      cy.get(reporterDropdown).click();
      cy.get(optionPickleRick).click();
      cy.get(assigneeDropdown).click();
      cy.get(optionLordGaben).click();
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
