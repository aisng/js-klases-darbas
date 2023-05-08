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

        filterDialog.show();

        filterColorOptions.addEventListener("change", (e) => {
            let selectedColor = e.target.value;
            console.log("selectedColor before switch", selectedColor);
            console.log("currentImage before switch", currentImage);

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
                case "default":
                    currentImage.style.filter = "none";
                    break;
            }

            currentImage = null;
            selectedColor = null;
            filterDialog.close();
            console.log("color after switch", selectedColor);
            console.log("currentImage after switch", currentImage);
        });
    });
});