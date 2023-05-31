import Router from "../app/Router.js";

export class Menu {
  constructor() {
    this.router = new Router();

    $.getJSON("/menu.json", (data) => {
      this.generateMenu(data);
      // this.makeNavItemActive();
    });

    this.previousTarget = null;
  }

  generateMenu(menuData) {
    const navBar = $("body > header > nav");
    navBar.html("");
    const menu = $("<ul>");

    for (let i = 0; i < menuData.length; i++) {
      const menuItemData = menuData[i];
      const menuItem = $("<li>");
      const link = $("<a>")
        .attr("href", menuItemData.url)
        .attr("class", "menu-button")
        .text(menuItemData.title);

      menuItem.append(link);
      menu.append(menuItem);
    }

    navBar.append(menu);

    // const router = this.router;

    $(".menu-button").on("click", (e) => {
      e.preventDefault();
      this.makeNavItemActive(e);
      // console.log(e.target);
      this.router.handleRoutes($(e.target).attr("href"));
    });
  }

  makeNavItemActive(e) {
    const currentTarget = e.target;
    // console.log(currentTarget);
    // console.log(this.previousTarget);
    if (currentTarget !== this.previousTarget) {
      if (this.previousTarget) {
        this.previousTarget.classList.remove("active");
      }
      currentTarget.classList.add("active");
    }
    this.previousTarget = currentTarget;
  }
}
