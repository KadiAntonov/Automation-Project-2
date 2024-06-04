class IssueDetailModal {
  constructor() {
    this.issueDetailModal = '[data-testid="modal:issue-details"]';
    this.confirmationModal = '[data-testid="modal:confirm"]';
    this.getIssueDetailModal = () => cy.get(this.issueDetailModal);
    this.addCommentName = "Add a comment...";
    this.commentTextArea = 'textarea[placeholder="Add a comment..."]';
    this.clickSaveButton = () =>
      cy.contains("button", "Save").click().should("not.exist");
    this.clickDeleteButton = () =>
      cy.contains("button", "Delete comment").click().should("not.exist");
    this.editButtonName = "Edit";
    this.deleteButtonName = "Delete";
    this.issueComment = '[data-testid="issue-comment"]';
  }

  createComment(comment) {
    this.getIssueDetailModal().within(() => {
      cy.contains(this.addCommentName).click();
      cy.get(this.commentTextArea).type(comment);
      this.clickSaveButton();
      cy.contains(this.addCommentName).should("exist");
    });
  }

  editComment(previousComment, newComment) {
    this.getIssueDetailModal().within(() => {
      cy.get(this.issueComment)
        .first()
        .should("contain", previousComment)
        .contains(this.editButtonName)
        .click()
        .should("not.exist");

      cy.get(this.commentTextArea)
        .should("contain", previousComment)
        .clear()
        .type(newComment);

      this.clickSaveButton();
    });
  }

  deleteComment(newComment) {
    this.getIssueDetailModal()
      .find(this.issueComment)
      .should("contain", newComment)
      .contains(this.deleteButtonName)
      .click();

    cy.get(this.confirmationModal).should("be.visible");
    this.clickDeleteButton();
    cy.get(this.confirmationModal).should("not.exist");
  }

  ensureCommentIsVisible(comment) {
    cy.get(this.issueComment).should("contain", comment);
  }

  ensureEditedCommentIsVisible(comment) {
    cy.get(this.issueComment)
      .should("contain", this.editButtonName)
      .and("contain", comment);
  }

  ensureDeletedCommentIsNotVisible(comment) {
    this.getIssueDetailModal();
    cy.get(this.issueComment).contains(comment).should("not.exist");
  }
}

export default new IssueDetailModal();
