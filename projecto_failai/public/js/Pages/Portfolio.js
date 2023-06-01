export default class Porfolio {
  constructor() {
    this.generatePorfolio();
    this.applyPortfolioItemsFilter();
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
        $(".works").append(workElement);
      }
    });
    $(".work > img").on("click", this.showColorFilterDialog);
  }

  // still doesn't work properly
  showColorFilterDialog = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // const filterDialog = $("#filterDialog");
    // const filterColorCancel = filterDialog.find("button");

    $("#filterDialog").css({
      top: `${mouseY}px`,
      left: `${mouseX}px`,
    });

    $("#filterDialog").on("submit", (e) => {
      e.preventDefault();
      filterDialog[0].close();
    });

    let currentImage = event.target;
    $("#filterDialog")[0].show();

    if ($("#filterDialog")[0].open) {
      this.applyColorFilter(currentImage);
      currentImage = null;
    }
  };

  applyColorFilter(currentImage) {
    $("#colorFilterValues").on("change", (e) => {
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
      currentImage = null;
      // previousImage = currentImage;
      selectedColor = null;
      $("#filterDialog")[0].close();
    });
  }

  applyPortfolioItemsFilter() {
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
