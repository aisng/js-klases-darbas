import MainController from "../Controllers/MainController.js";
import HistoryController from "../Controllers/HistoryController.js";
import PortfolioController from "../Controllers/PortfolioController.js";
import ContactsController from "../Controllers/ContactsController.js";

export default class Router {
  constructor() {
    this.path = window.location.pathname;

    this.routes = {
      "/": {
        controller: new MainController(),
        template: "main.html",
      },
      "/history": {
        controller: new HistoryController(),
        template: "history.html",
      },
      "/portfolio": {
        controller: new PortfolioController(),
        template: "portfolio.html",
      },
      "/contacts": {
        controller: new ContactsController(),
        template: "contacts.html",
      },
    };

    this.handleRoutes(this.path);
  }

  async handleRoutes(path) {
    if (path in this.routes) {
      const currentPage = this.routes[path];
      // console.log("ROUTER this.path >", this.path);
      // console.log("ROUTER currPage.temp >", currentPage.template);
      await currentPage.controller.index(currentPage.template);
    } else {
      window.location.pathname = "/404.html";
    }
  }
}
