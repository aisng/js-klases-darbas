// let menuItems = [{ title: "Pradžia", url: "/" }, { title: "Kontaktai", url: "kontaktai.html" }, { title: "Portfolio", url: "portfolio.html" }, { title: "Istorija", url: "istorija.html" }];

// menu.innerHTML = menuItems
//     .map((item) => `<li><a class="menu-button" href="${item.url}">${item.title}</a></li>`)
//     .join("");

function createMenu(home, ...args) {
    /* the first parameter must be the homepage */
    let menuItemsList = [];
    menuItemsList.push({ title: `${home}`, url: "/" });

    for (let i = 0; i < args.length; i++) {
        let menuItem = {
            title: `${args[i]}`,
            url: `${args[i].toLowerCase()}.html`,
        };
        menuItemsList.push(menuItem);
    }

    let menu = document.querySelector("body > header > nav > ul");
    let newMenu = menuItemsList
        .map(
            (item) =>
                `<li><a class="menu-button" href="${item.url}">${item.title}</a></li>`
        )
        .join("");

    return (menu.innerHTML = newMenu);
}

function removeUrlExtension(url) {
    return window.history.replaceState(null, null, url);
}

function makeNavItemActive(url) {
    const menuButtons = document.querySelectorAll(".menu-button");
    menuButtons.forEach((button) => {
        const buttonUrl = button.href.replaceAll(".html", "");
        if (buttonUrl === url) {
            button.style.backgroundColor = "blue";
            button.style.color = "white";
            button.style.border = "2px solid blue";
        }
    });
}

const currentUrl = window.location.href.replaceAll(".html", "");

createMenu("Pradžia", "Kontaktai", "Portfolio", "Istorija");
removeUrlExtension(currentUrl);
makeNavItemActive(currentUrl);

// const addition = function (a, b) { return a + b };

// let tipOfTheDay = document.getElementById('tip');

// tipOfTheDay.addEventListener('click', function (event) { console.log(event) });
// tipOfTheDay.addEventListener('click', function () { alert(addition(3, 4)) });




