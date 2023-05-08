// let menuItems = [{ title: "Pradžia", url: "/" }, { title: "Kontaktai", url: "kontaktai.html" }, { title: "Portfolio", url: "portfolio.html" }, { title: "Istorija", url: "istorija.html" }];

// menu.innerHTML = menuItems
//     .map((item) => `<li><a class="menu-button" href="${item.url}">${item.title}</a></li>`)
//     .join("");

function createMenu(home, ...args) {
    /* the first parameter must be the homepage */
    let menuItemsList = [];
    menuItemsList.push({ title: `${home}`, url: '/' });

    for (let i = 0; i < args.length; i++) {
        let menuItem = { title: `${args[i]}`, url: `${args[i].toLowerCase()}.html` };
        menuItemsList.push(menuItem);
    };

    let menu = document.querySelector("body > header > nav > ul");
    let newMenu = menuItemsList.map((item) => `<li><a class="menu-button" href="${item.url}">${item.title}</a></li>`).join("");

    return menu.innerHTML = newMenu
};


function removeUrlExtension(url) {
    return window.history.replaceState(null, null, url);
}

function makeNavItemActive(url) {
    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(button => {
        const buttonUrl = button.href.replaceAll('.html', '');
        if (buttonUrl === url) {
            button.style.backgroundColor = 'blue';
            button.style.color = 'white';
            button.style.border = '2px solid blue';
        };
    });
};

const currentUrl = window.location.href.replaceAll('.html', '');

createMenu("Pradžia", "Kontaktai", "Portfolio", "Istorija");
removeUrlExtension(currentUrl);
makeNavItemActive(currentUrl);

// const addition = function (a, b) { return a + b };

// let tipOfTheDay = document.getElementById('tip');

// tipOfTheDay.addEventListener('click', function (event) { console.log(event) });
// tipOfTheDay.addEventListener('click', function () { alert(addition(3, 4)) });

const portfolioItems = document.querySelectorAll('.work > img');
const filterDialog = document.getElementById('filterDialog');
const filterColorOptions = filterDialog.querySelector('select');



portfolioItems.forEach(image => {
    image.addEventListener('click', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        filterDialog.style.top = `${mouseY}px`;
        filterDialog.style.left = `${mouseX}px`;

        let currentImage = event.target;

        filterDialog.show();

        filterColorOptions.addEventListener('change', (e) => {
            let selectedColor = e.target.value;
            console.log('selectedColor before switch', selectedColor);
            console.log('currentImage before switch', currentImage);

            switch (selectedColor) {
                case 'red':
                    currentImage.style.filter = 'brightness(50%) sepia(100%) hue-rotate(0deg) saturate(200%)';
                    break;
                case 'blue':
                    currentImage.style.filter = 'brightness(50%) sepia(100%) hue-rotate(240deg) saturate(200%)';
                    break;
                case 'green':
                    currentImage.style.filter = 'brightness(50%) sepia(100%) hue-rotate(120deg) saturate(200%)';
                    break;
                case 'default':
                    currentImage.style.filter = 'none';
                    break;

            };

            currentImage = null;
            selectedColor = null;
            filterDialog.close();
            console.log('color after switch', selectedColor);
            console.log('currentImage after switch', currentImage);
        });
    });
});





