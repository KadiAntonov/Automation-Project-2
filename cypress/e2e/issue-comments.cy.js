import IssueDetailModal from "../pages/IssueDetailModal";

describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () => cy.get(IssueDetailModal.issueDetailModal);

  it("Should create a comment successfully", () => {
    const comment = "TEST_COMMENT";

    getIssueDetailsModal().within(() => {
      cy.contains(IssueDetailModal.addCommentName).click();

      cy.get(IssueDetailModal.commentTextArea).type(comment);

      IssueDetailModal.clickSaveButton();

      cy.contains(IssueDetailModal.addCommentName).should("exist");
      cy.get(IssueDetailModal.issueComment).should("contain", comment);
    });
  });

  it("Should edit a comment successfully", () => {
    const previousComment = "An old silent pond...";
    const comment = "TEST_COMMENT_EDITED";

    getIssueDetailsModal().within(() => {
      cy.get(IssueDetailModal.issueComment)
        .first()
        .contains(IssueDetailModal.editButtonName)
        .click()
        .should("not.exist");

      cy.get(IssueDetailModal.commentTextArea)
        .should("contain", previousComment)
        .clear()
        .type(comment);

      IssueDetailModal.clickSaveButton();

      cy.get(IssueDetailModal.issueComment)
        .should("contain", IssueDetailModal.editButtonName)
        .and("contain", comment);
    });
  });

  it("Should delete a comment successfully", () => {
    getIssueDetailsModal()
      .find(IssueDetailModal.issueComment)
      .contains(IssueDetailModal.deleteButtonName)
      .click();

    cy.get(IssueDetailModal.confirmationModal);
    IssueDetailModal.clickDeleteButton();

    getIssueDetailsModal()
      .find(IssueDetailModal.issueComment)
      .should("not.exist");
  });

  it("Should create, edit and delete a comment successfully", () => {
    const comment = "TEST_COMMENT";
    IssueDetailModal.createComment(comment);
    IssueDetailModal.ensureCommentIsVisible(comment);

    const commentEdited = "TEST_COMMENT_EDITED";
    IssueDetailModal.editComment(comment, commentEdited);
    IssueDetailModal.ensureEditedCommentIsVisible(commentEdited);

    IssueDetailModal.deleteComment(commentEdited);
    IssueDetailModal.ensureDeletedCommentIsNotVisible(commentEdited);
  });
});
