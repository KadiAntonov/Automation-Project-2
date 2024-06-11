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

  it("Should cancel creating a comment successfully", () => {
    const text = "CerebrumHub workshop";
    getIssueDetailsModal().within(() => {
      cy.contains(IssueDetailModal.addCommentName).click();
      cy.get(IssueDetailModal.commentTextArea).type(text);
      IssueDetailModal.clickCancelButton();
      cy.contains(IssueDetailModal.addCommentName).should("exist");
      cy.contains(text).should("not.exist");
    });
  });

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

  it("Should add and edit a comment successfully", () => {
    const previousComment = "This is my comment";
    const comment = "TEST_COMMENT_EDITED";

    getIssueDetailsModal().within(() => {
      cy.contains(IssueDetailModal.addCommentName).click();
      cy.get(IssueDetailModal.commentTextArea).type(previousComment);
      IssueDetailModal.clickSaveButton();
      cy.contains(IssueDetailModal.addCommentName).should("exist");
      cy.get(IssueDetailModal.issueComment).should("contain", previousComment);
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

  it("Should add and delete a comment successfully", () => {
    const comment = "Remove this comment";
    getIssueDetailsModal().within(() => {
      cy.contains(IssueDetailModal.addCommentName).click();
      cy.get(IssueDetailModal.commentTextArea).type(comment);
      IssueDetailModal.clickSaveButton();
      cy.contains(IssueDetailModal.addCommentName).should("exist");
      cy.get(IssueDetailModal.issueComment).should("contain", comment);
    });
    getIssueDetailsModal().find(IssueDetailModal.issueComment);
    cy.contains(IssueDetailModal.deleteButtonName).first().click();
    cy.get(IssueDetailModal.confirmationModal);
    IssueDetailModal.clickDeleteButton();
    cy.get(IssueDetailModal.confirmationModal).should("not.exist");
    getIssueDetailsModal().contains(comment).should("not.exist");
  });

  it("Should add a comment and cancel deletion of the comment successfully", () => {
    const comment = "Do not remove this comment";
    getIssueDetailsModal().within(() => {
      cy.contains(IssueDetailModal.addCommentName).click();
      cy.get(IssueDetailModal.commentTextArea).type(comment);
      IssueDetailModal.clickSaveButton();
      cy.contains(IssueDetailModal.addCommentName).should("exist");
      cy.get(IssueDetailModal.issueComment).should("contain", comment);
    });
    getIssueDetailsModal().find(IssueDetailModal.issueComment);
    cy.contains(IssueDetailModal.deleteButtonName).first().click();
    cy.get(IssueDetailModal.confirmationModal).within(() => {
      IssueDetailModal.clickCancelButton();
    });
    cy.get(IssueDetailModal.confirmationModal).should("not.exist");
    getIssueDetailsModal().within(() => {
      cy.contains(comment).should("be.visible");
    });
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
