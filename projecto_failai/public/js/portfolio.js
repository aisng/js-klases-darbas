const portfolioFilter = document.querySelector(".works-filter");
const portfolioDiv = document.querySelector(".works");
const portfolioFilterBtnClear = document.querySelector(
  ".works-filter > button"
);

function getPortfolioJson() {
  return fetch("/portfolio.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
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
// item.category.includes(category)
async function generatePorfolio(category = null) {
  portfolioDiv.innerHTML = "";
  let portfolioData = await getPortfolioJson();
  // console.log(portfolioData);dokcer
  portfolioData.forEach((item) => {
    if (category == null || item.category.includes(category)) {
      let workElement = generatePortfolioElement(item);
      portfolioDiv.append(workElement);
    }
    // let ite = item.category.split(" ");
    // console.log("ite", ite);
    // console.log("cat", category);
    // if (
    //   category == null ||
    //   ite.includes(category) ||
    //   ite.every(
    //     (ele) =>
    //       category.includes(ele) && category.every((ele) => ite.includes(ele))
    //   )
    // ) {
    //   let workElement = generatePortfolioElement(item);
    //   portfolioDiv.append(workElement);
    // }
  });
}

generatePorfolio();

let checkedFilters = [];

portfolioFilter.addEventListener("change", (event) => {
  let filterName = event.target.name;
  if (event.target.checked === true && !checkedFilters.includes(filterName)) {
    checkedFilters.push(filterName);
  } else {
    const index = checkedFilters.indexOf(filterName);
    checkedFilters.splice(index, 1);
  }

  if (checkedFilters.length > 0) {
    checkedFilters.forEach((item) => {
      // console.log(checkedFilters);
      generatePorfolio(item);
    });
    // generatePorfolio(checkedFilters);
  } else {
    generatePorfolio();
  }
});

portfolioFilterBtnClear.addEventListener("click", (event) => {
  event.preventDefault();
  checkedFilters = [];

  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
  generatePorfolio();
});

const portfolioItems = document.querySelectorAll(".work > img");
const filterDialog = document.getElementById("filterDialog");
const filterColorOptions = filterDialog.querySelector("select");

portfolioItems.forEach((image) => {
  image.addEventListener("click", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    filterDialog.style.top = `${mouseY}px`;
    filterDialog.style.left = `${mouseX}px`;

    let currentImage = event.target;
    // console.log(currentImage);
    filterDialog.show();

    filterColorOptions.addEventListener("change", (e) => {
      let selectedColor = e.target.value;
      // console.log("selectedColor before switch", selectedColor);
      // console.log("currentImage before switch", currentImage);
      if (currentImage !== null) {
        console.log(currentImage);
        switch (selectedColor) {
          case "red":
            currentImage.style.filter =
              "brightness(50%) sepia(100%) hue-rotate(0deg) saturate(200%)";
            break;
          case "blue":
            currentImage.style.filter =
              "brightness(50%) sepia(100%) hue-rotate(240deg) saturate(200%)";
            break;
          case "green":
            currentImage.style.filter =
              "brightness(50%) sepia(100%) hue-rotate(120deg) saturate(200%)";
            break;
          default:
            currentImage.style.filter = "none";
            break;
        }
      }
      filterDialog.close();
      currentImage = null;
      selectedColor = null;
      // image.removeEventListener('click', image);
      // console.log("selectedColor after switch", selectedColor);
      // console.log("currentImage after switch", currentImage);
    });
  });
});
