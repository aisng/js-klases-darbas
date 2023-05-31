export default class Porfolio {
  constructor() {
    this.generatePorfolio();
    this.applyPortfolioFilter();
  }

  async getPortfolio() {
    try {
      const response = await fetch("/portfolio.json");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  generatePortfolioElement(data) {
    const div = $("<div>").addClass("work " + data.category);
    const img = $("<img>").attr({
      src: data.src,
      alt: data.title,
      height: 200,
    });
    const span = $("<span>").text(data.title);

    div.append(img);
    div.append(span);

    return div[0];
  }

  async generatePorfolio(category = null) {
    $(".works").html("");

    let portfolioData = await this.getPortfolio();
    portfolioData.forEach((item) => {
      if (category == null || item.category.includes(category)) {
        let workElement = this.generatePortfolioElement(item);
        let imgElement = $(workElement).find("img");
        $(".works").append(workElement);

        $(imgElement).on("click", this.showDialogFilter);
      }
    });
  }

  // still doesn't work properly
  showDialogFilter(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const filterDialog = $("#filterDialog");
    console.log(filterDialog[0]);
    const filterColorOptions = filterDialog.find("select");
    filterDialog.css({
      top: `${mouseY}px`,
      left: `${mouseX}px`,
    });

    let currentImage = event.target;

    filterDialog.show();

    $(filterColorOptions).on("change", (e) => {
      let selectedColor = e.target.value;

      if (currentImage !== null) {
        switch (selectedColor) {
          case "red":
            $(currentImage).css(
              "filter",
              "brightness(50%) sepia(100%) hue-rotate(0deg) saturate(200%)"
            );
            break;
          case "blue":
            $(currentImage).css(
              "filter",
              "brightness(50%) sepia(100%) hue-rotate(240deg) saturate(200%)"
            );
            break;
          case "green":
            $(currentImage).css(
              "filter",
              "brightness(50%) sepia(100%) hue-rotate(120deg) saturate(200%)"
            );
            break;
          default:
            $(currentImage).css("filter", "none");
            break;
        }
      }
      filterDialog.hide();
      currentImage = null;
      selectedColor = null;
    });
  }

  applyPortfolioFilter() {
    let checkedFilters = [];

    $(".works-filter").on("change", (event) => {
      let filterName = event.target.name;
      if (
        event.target.checked === true &&
        !checkedFilters.includes(filterName)
      ) {
        checkedFilters.push(filterName);
      } else {
        const index = checkedFilters.indexOf(filterName);
        checkedFilters.splice(index, 1);
      }

      if (checkedFilters.length > 0) {
        checkedFilters.forEach((item) => {
          this.generatePorfolio(item);
        });
      } else {
        this.generatePorfolio();
      }
    });

    $(".works-filter > button").on("click", (event) => {
      event.preventDefault();
      checkedFilters = [];
      $("input[type='checkbox']").prop("checked", false);

      this.generatePorfolio();
    });
  }
}

// const portfolioFilter = document.querySelector(".works-filter");
// const portfolioDiv = document.querySelector(".works");
// const portfolioFilterBtnClear = document.querySelector(
//   ".works-filter > button"
// );
//#region before jQuery
// function generatePortfolioElement(data) {
//   let div = document.createElement("div");
//   div.className = "work " + data.category;
//   let img = document.createElement("img");
//   let span = document.createElement("span");
//   img.src = data.src;
//   img.alt = data.title;
//   img.height = 200;
//   img.width = 200;
//   span.textContent = data.title;

//   div.append(img);
//   div.append(span);

//   return div;
// }

// function handleImageClick(event) {
//   const mouseX = event.clientX;
//   const mouseY = event.clientY;

//   const filterDialog = $("#filterDialog");
//   const filterColorOptions = filterDialog.find("select");

//   filterDialog.css({ top: `${mouseY}px`, left: `${mouseX}px` });

//   let currentImage = $(event.target);

//   filterDialog.show();

//   filterColorOptions.on("change", handleColorChange.bind(event, currentImage));
// }

// function handleColorChange(currentImage, event) {
//   const selectedColor = event.target.value;

//   if (currentImage !== null) {
//     switch (selectedColor) {
//       case "red":
//         currentImage.css({
//           filter: "brightness(50%) sepia(100%) hue-rotate(0deg) saturate(200%)",
//         });
//         break;
//       case "blue":
//         currentImage.css({
//           filter:
//             "brightness(50%) sepia(100%) hue-rotate(240deg) saturate(200%)",
//         });
//         break;
//       case "green":
//         currentImage.css({
//           filter:
//             "brightness(50%) sepia(100%) hue-rotate(120deg) saturate(200%)",
//         });
//         break;
//       default:
//         currentImage.css({ filter: "none" });
//         break;
//     }
//   }
//   currentImage = null;
//   filterDialog.close();
// }
//#endregion
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

//     filterDialog.show();

//     filterColorOptions.addEventListener("change", (e) => {
//       let selectedColor = e.target.value;

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