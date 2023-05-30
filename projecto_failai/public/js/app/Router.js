import IndexController from "../Controllers/IndexController.js";
import HistoryController from "../Controllers/HistoryController.js";
import PortfolioController from "../Controllers/PortfolioController.js";
import ContactsController from "../Controllers/ContactsController.js";

export default class Router {
  constructor() {
    this.path = window.location.pathname;

    this.routes = {
      "/": {
        controller: new IndexController(),
        template: "index.html",
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

    this.handleRoutes();
  }

  handleRoutes() {
    if (this.path in this.routes) {
      const currentPage = this.routes[this.path];
      currentPage.controller.index(currentPage.template);
    } else {
      window.location.pathname = "/404.html";
    }
  }
}
