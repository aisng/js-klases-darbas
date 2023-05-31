import Router from "../app/Router.js";

export class Menu {
  constructor() {
    this.router = new Router();

    $.getJSON("/menu.json", (data) => {
      this.generateMenu(data);
      // this.makeNavItemActive();
    });
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

    const router = this.router;

    $(document).on("click", "nav a", function (e) {
      e.preventDefault();

      // console.log($(this).attr("href"));
      router.handleRoutes($(this).attr("href"));
    });
  }

  makeNavItemActive() {
    const menuButtons = document.querySelectorAll(".menu-button");
    console.log(menuButtons);
    menuButtons.forEach((button) => {
      const currentUrl = window.location.href;
      console.log(currentUrl);
      const buttonUrl = button.href;
      if (buttonUrl === currentUrl) {
        button.classList.add("active");
      }
    });
  }
}
