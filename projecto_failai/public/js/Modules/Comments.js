export default class Comments {
  constructor() {
    this.commentsElement = $(".comments");
    this.commentDiv = $("<div>");
    this.commentLabel = $("<label>");
    this.commentInput = $("<input>");
    this.commentBtnRemove = $("<button>");
    this.commentBtnSubmit = $("<button>");
    this.commentBody = $("<p>");
  }

  createCommentElement(time) {
    this.commentDiv.addClass("comment");

    this.commentLabel.text(`Comment at ${time}`);
    this.commentLabel.attr("for", "comment");

    this.commentInput.attr("type", "textarea");
    // this.commentInput.attr("class", "comment");

    this.commentBtnRemove.attr("class", "btn-del");
    this.commentBtnRemove.text("Delete");

    this.commentBtnSubmit.attr("class", "btn-post");
    this.commentBtnSubmit.text("Post");

    this.commentsElement.append(this.commentDiv);
    this.commentDiv.append(
      this.commentLabel,
      this.commentInput,
      this.commentBtnSubmit,
      this.commentBtnRemove
    );

    $(".btn-del").click((e) => {
      e.preventDefault();
      e.target.parentElement.remove();
    });

    $(".btn-post").on("click", (e) => {
      e.preventDefault();
      const commentInputValue = $(e.target).prev("input").val();
      const commentData = { body: commentInputValue, timestamp: time };
      this.postComment(commentData, "http://localhost:5000/comments");
      this.commentDiv.remove();
    });
  }

  postComment(data, url) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((responseData) => this.renderComment(responseData))
      .catch((error) => console.error(error));
  }

  renderComment(data) {
    console.log(data);
    // const dataJson = JSON.parse(data);
    // const p = $("<p>").text(dataJson.body);
    this.commentBody.text(data.body);
    this.commentLabel.text(`Comment at ${data.timestamp}`);
    this.commentLabel.attr("for", "comment");
    this.commentBtnRemove.attr("class", "btn-del");
    this.commentBtnRemove.text("Delete");
    this.commentDiv.attr("class", `comment-${data.id}`);
    this.commentsElement.append(this.commentDiv);
    this.commentDiv.append(
      this.commentLabel,
      this.commentBody,
      this.commentBtnSubmit,
      this.commentBtnRemove
    );
  }
}
