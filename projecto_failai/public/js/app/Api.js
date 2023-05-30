export default class Api {
  constructor() {}

  loadPage(page) {
    $.ajax({
      url: page,
      method: "GET",
      dataType: "html",
      success: (data) => {
        const parser = new DOMParser();
        const dataHtml = parser.parseFromString(data, "text/html");
        const mainContent = dataHtml.querySelector("main > *");
        $("main").html(mainContent);
      },
      error: (error) => {
        console.error("Couldn't load content", error);
      },
    });
  }
}
