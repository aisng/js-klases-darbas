// let menuList = document.querySelectorAll('body > header > nav > ul > li > a');

// for (let i = 0; i < menuList.length; i++) {
//     menuList[i].href.replaceAll('.html', '');
// };

let menuItems = [{ title: "Pradžia", url: "/" }, { title: "Kontaktai", url: "kontaktai.html" }, { title: "Portfolio", url: "portfolio.html" }, { title: "Istorija", url: "istorija.html" }];
let menu = document.querySelector("body > header > nav > ul");
menu.innerHTML = menuItems
    .map((item) => `<li><a class="menu-button" href="${item.url}">${item.title}</a></li>`)
    .join("");



// window.location.href.replaceAll('.html', '');

const currentUrl = window.location.href.replaceAll('.html', '');
// currentUrl = currentUrl.split('.html')[0];
window.history.replaceState(null, null, currentUrl);


console.log(currentUrl);
const menuButtons = document.querySelectorAll('.menu-button');
menuButtons.forEach(button => {
    const buttonUrl = button.href.replaceAll('.html', '');
    if (buttonUrl === currentUrl) {
        button.style.backgroundColor = 'blue';
        button.style.color = 'white';
        button.style.border = '2px solid blue';
    };
});






// window.location.href.replaceAll('.html', '')






