import IstorijaController from "../Controllers/IstorijaController.js";

export class Router {
  constructor() {
    this.path = window.location.pathname;
    console.log(window.location.pathname);

    this.routes = {
      "/": "index.html",
      "/istorija": {
        controller: new IstorijaController(),
        template: "istorija.html",
      },
      "/portfolio": "portfolio.html",
      "/kontaktai": "kontaktai.html",
    };

    this.handleRoutes();
  }

  handleRoutes() {
    if (this.path in this.routes) {
      const pageUrl = this.routes[this.path];
      pageUrl.controller.index(pageUrl.template);
      console.log(pageUrl);

      // this.loadPage(
      //   pageUrl,

      // );
    }
    // else {
    //   this.loadPage(
    //     "/404",
    //     (pageContent) => {
    //       const parser = new DOMParser();
    //       const pageContentHtml = parser.parseFromString(
    //         pageContent,
    //         "text/html"
    //       );
    //       console.log(pageContentHtml);
    //       const mainContent = pageContentHtml.querySelector("main > *");
    //       console.log(mainContent);
    //       // $("main").html($(pageContentHtml).find("main").html());
    //       $("main").html(mainContent);
    //     },
    //     (error) => {
    //       console.error("Couldn't load content", error);
    //     }
    //   );
    // }
  }

  // // kinda same as in menu redirect func
  // handleRoutes() {
  //   if (this.path === "/") {
  //     this.loadPage("index");
  //   } else if (this.path === "/istorija") {
  //     this.loadPage("istorija");
  //   } else if (this.path === "/portfolio") {
  //     this.loadPage("portfolio");
  //   } else if (this.path === "/kontaktai") {
  //     this.loadPage("kontaktai");
  //   } else {
  //     this.loadPage("404");
  //   }
  // }

  // loadPage(page, successCallback, errorCallback) {
  //   $.ajax({
  //     url: page,
  //     method: "GET",
  //     dataType: "html",
  //     success: function (data) {
  //       // console.log(data);
  //       // let main = $(data).find("main").html();
  //       successCallback(data);
  //     },
  //     error: function () {
  //       errorCallback(new Error("Couldn't load content."));
  //     },
  //   });
  // }
}
