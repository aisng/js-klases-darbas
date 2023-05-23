const portfolioFilter = document.querySelector(".works-filter");
const portfolioDiv = document.querySelector(".works");
const portfolioFilterBtnClear = document.querySelector(
  ".works-filter > button"
);

async function getPortfolio() {
  try {
    const response = await fetch("/portfolio.json");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function generatePortfolioElement(data) {
  let div = document.createElement("div");
  div.className = "work " + data.category;
  let img = document.createElement("img");
  let span = document.createElement("span");
  img.src = data.src;
  img.alt = data.title;
  img.height = 200;
  img.width = 200;
  span.textContent = data.title;

  div.append(img);
  div.append(span);

  return div;
}

async function generatePorfolio(category = null) {
  portfolioDiv.innerHTML = "";
  let portfolioData = await getPortfolio();

  portfolioData.forEach((item) => {
    if (category == null || item.category.includes(category)) {
      let workElement = generatePortfolioElement(item);
      portfolioDiv.append(workElement);
    }
  });
}

function applyPortfolioFilter() {
  let checkedFilters = [];

  $(".works-filter").on("change", (event) => {
    let filterName = event.target.name;
    if (event.target.checked === true && !checkedFilters.includes(filterName)) {
      checkedFilters.push(filterName);
    } else {
      const index = checkedFilters.indexOf(filterName);
      checkedFilters.splice(index, 1);
    }

    if (checkedFilters.length > 0) {
      checkedFilters.forEach((item) => {
        generatePorfolio(item);
      });
    } else {
      generatePorfolio();
    }
  });
  
  $(".works-filter > button").on("click", (event) => {
    event.preventDefault();
    checkedFilters = [];

    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
    generatePorfolio();
  });
}

generatePorfolio();
applyPortfolioFilter();

//#region not working
// const portfolioItems = document.querySelectorAll(".work > img");
// const filterDialog = document.getElementById("filterDialog");
// const filterColorOptions = filterDialog.querySelector("select");

// portfolioItems.forEach((image) => {
//   image.addEventListener("click", (event) => {
//     console.log("kliked");
//     const mouseX = event.clientX;
//     const mouseY = event.clientY;

//     filterDialog.style.top = `${mouseY}px`;
//     filterDialog.style.left = `${mouseX}px`;

//     let currentImage = event.target;
//     // console.log(currentImage);
//     filterDialog.show();

//     filterColorOptions.addEventListener("change", (e) => {
//       let selectedColor = e.target.value;
//       // console.log("selectedColor before switch", selectedColor);
//       // console.log("currentImage before switch", currentImage);
//       if (currentImage !== null) {
//         console.log(currentImage);
//         switch (selectedColor) {
//           case "red":
//             currentImage.style.filter =
//               "brightness(50%) sepia(100%) hue-rotate(0deg) saturate(200%)";
//             break;
//           case "blue":
//             currentImage.style.filter =
//               "brightness(50%) sepia(100%) hue-rotate(240deg) saturate(200%)";
//             break;
//           case "green":
//             currentImage.style.filter =
//               "brightness(50%) sepia(100%) hue-rotate(120deg) saturate(200%)";
//             break;
//           default:
//             currentImage.style.filter = "none";
//             break;
//         }
//       }
//       filterDialog.close();
//       currentImage = null;
//       selectedColor = null;
//     });
//   });
// });
//#endregion
