export class Api {
  constructor() {}

  loadPage(page, successCallback, errorCallback) {
    $.ajax({
      url: page,
      method: "GET",
      dataType: "html",
      success: function (data) {
        // console.log(data);
        // let main = $(data).find("main").html();
        successCallback(data);
      },
      error: function () {
        errorCallback(new Error("Couldn't load content."));
      },
    });
  }
}

export default Api;
