// let menuItems = [{ title: "Pradžia", url: "/" }, { title: "Kontaktai", url: "kontaktai.html" }, { title: "Portfolio", url: "portfolio.html" }, { title: "Istorija", url: "istorija.html" }];

// menu.innerHTML = menuItems
//     .map((item) => `<li><a class="menu-button" href="${item.url}">${item.title}</a></li>`)
//     .join("");

// function createMenu(home, ...args) {
//     /* the first parameter must be the homepage */
//     let menuItemsList = [];
//     menuItemsList.push({ title: `${home}`, url: "/" });

//     for (let i = 0; i < args.length; i++) {
//         let menuItem = {
//             title: `${args[i]}`,
//             url: `${args[i].toLowerCase()}.html`,
//         };
//         menuItemsList.push(menuItem);
//     }

//     let menu = document.querySelector("body > header > nav > ul");
//     let newMenu = menuItemsList
//         .map(
//             (item) =>
//                 `<li><a class="menu-button" href="${item.url}">${item.title}</a></li>`
//         )
//         .join("");

//     return (menu.innerHTML = newMenu);
// }

const page = window.location.pathname;

function getRedirectPage(pageWithoutExtension = null) {
  let redir = null;
  switch (pageWithoutExtension) {
    case "/":
    case "/index":
      if (page !== "/") {
        redir = "/";
      }
      break;
    case "/istorija":
      if (page !== "/istorija.html") {
        redir = "istorija.html";
      }
      break;
    case "/portfolio":
      if (page !== "/portfolio.html") {
        redir = "portfolio.html";
      }
      break;
    case "/kontaktai":
      if (page !== "/kontaktai.html") {
        redir = "kontaktai.html";
      }
      break;
    case "/404":
      if (page !== "/404.html") {
        redir = "404.html";
      }
      break;
    default:
      redir = "404.html";
      break;
  }
  return redir;
}

function redirectPage() {
  const pageWithoutExtension = page.replace(/\.html$/, "");
  let redir = getRedirectPage(pageWithoutExtension);

  if (redir) {
    window.location.href = redir;
  }
}

function getMenuJsonStr() {
  return '[{"title":"Pradžia", "url":"/"},{"title":"Istorija", "url":"/istorija"},{"title":"Portfolio", "url":"/portfolio"},{"title":"Kontaktai", "url":"/kontaktai"}]';
}

if (page) {
  redirectPage();
}

function getMenuList() {
  const jsonMenu = getMenuJsonStr();
  console.log(jsonMenu);
  return JSON.parse(jsonMenu);
}

let menuList = getMenuList();

let menuPlace = document.querySelector("body > header > nav > ul");

menuPlace.innerHTML = "";

for (let i = 0; i < menuList.length; i++) {
  let menuItem = menuList[i];
  menuPlace.innerHTML += `<li><a class="menu-button" href="${menuItem.url}">${menuItem.title}</a></li>`;
}

function makeNavItemActive() {
  const menuButtons = document.querySelectorAll(".menu-button");
  menuButtons.forEach((button) => {
    const currentUrl = window.location.href.replace(".html", "");
    const buttonUrl = button.href;
    if (buttonUrl === currentUrl) {
      button.classList.add("active");
    }
  });
}

makeNavItemActive();

$();
