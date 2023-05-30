import Render from "../app/Render.js";

export class Menu {
  constructor() {
    // const page = window.location.pathname;

    // if (page) {
    //   this.redirectPage(page);
    // }

    $.getJSON("/menu.json", (data) => {
      this.generateMenu(data);
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
        .text(menuItemData.title);
      console.log(link[0].href);
      menuItem.append(link);
      menu.append(menuItem);
    }

    navBar.append(menu);

    $(document).on("click", "nav a", function (e) {
      e.preventDefault();
      const render = new Render();
      console.log($(this).attr("href"));
      render.renderView($(this).attr("href"));
    });
  }

  // getRedirectPage(pageWithoutExtension = null) {
  //   let redir = null;
  //   switch (pageWithoutExtension) {
  //     case "/":
  //     case "/index":
  //       if (window.location.pathname !== "/") {
  //         redir = "/";
  //       }
  //       break;
  //     case "/istorija":
  //       if (window.location.pathname !== "/istorija.html") {
  //         redir = "istorija.html";
  //       }
  //       break;
  //     case "/portfolio":
  //       if (window.location.pathname !== "/portfolio.html") {
  //         redir = "portfolio.html";
  //       }
  //       break;
  //     case "/kontaktai":
  //       if (window.location.pathname !== "/kontaktai.html") {
  //         redir = "kontaktai.html";
  //       }
  //       break;
  //     case "/404":
  //       if (window.location.pathname !== "/404.html") {
  //         redir = "404.html";
  //       }
  //       break;
  //     default:
  //       redir = "404.html";
  //       break;
  //   }
  //   return redir;
  // }

  // redirectPage() {
  //   const pageWithoutExtension = window.location.pathname.replace(
  //     /\.html$/,
  //     ""
  //   );
  //   let redir = this.getRedirectPage(pageWithoutExtension);

  //   $("main").load(redir + " main>*");
  // }

  makeNavItemActive() {
    const menuButtons = document.querySelectorAll(".menu-button");
    menuButtons.forEach((button) => {
      const currentUrl = window.location.href.replace(".html", "");
      const buttonUrl = button.href;
      if (buttonUrl === currentUrl) {
        button.classList.add("active");
      }
    });
  }
}
