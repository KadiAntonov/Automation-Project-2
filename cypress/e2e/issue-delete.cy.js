import NewIssueModal from "../pages/NewIssueModal";

describe("Deleting an issue (cancel and confirm)", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
    cy.get(NewIssueModal.issueDetailModal).should("be.visible");
  });
  it("Should delete the issue and confirm it is not visible on board", () => {
    NewIssueModal.clickDeleteButton();
    NewIssueModal.confirmDeletion();
    NewIssueModal.ensureIssueIsDeleted(3, NewIssueModal.deleteIssueTitle);
    NewIssueModal.ensureIssueIsNotVisibleOnBoard(
      NewIssueModal.deleteIssueTitle
    );
  });
  it("Should not delete the issue and confirm it is still visible on board", () => {
    NewIssueModal.clickDeleteButton();
    NewIssueModal.cancelDeletion();
    NewIssueModal.closeDetailModal();
    NewIssueModal.ensureIssueIsNotDeleted(4, NewIssueModal.deleteIssueTitle);
    NewIssueModal.ensureIssueIsVisibleOnBoard(NewIssueModal.deleteIssueTitle);
  });
});
