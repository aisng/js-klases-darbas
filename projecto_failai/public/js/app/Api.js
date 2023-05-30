export default class Api {
  constructor() {
    this.url = "http://localhost";
  }

  get(url) {
    return $.ajax({
      url: `${this.url}/${url}`,
      method: "GET",
      dataType: "json",
    });
  }

  getText(url) {
    return $.ajax({
      url: `${this.url}/${url}`,
      method: "GET",
      dataType: "text",
    });
  }

  loadPage(page) {
    return $.ajax({
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
