"use strict";
let overal = document.querySelector(".overlay");
let slider = document.querySelector(".slider");
let currentPicture = document.querySelector(".current-picture");
let sliderNavigation = document.querySelectorAll("[data-slider-id] = ");
let picture = [
    {
        id: "1",
        src: "./assets/images/image-product-1.jpg",
    },
    {
        id: "2",
        src: "./assets/images/image-product-2.jpg",
    },
    {
        id: "3",
        src: "./assets/images/image-product-3.jpg",
    },
    {
        id: "4",
        src: "./assets/images/image-product-4.jpg",
    },
];
// galleryPicture?.querySelectorAll("div").forEach((div) =>
//   div.addEventListener("click", () => {
//     overal?.classList.remove(...["invisible", "opacity-0"]);
//     slider?.classList.remove(...["invisible", "opacity-0"]);
//     let { id, src } = picture.find((i) => i.id == div.dataset.id)!;
//     if (currentPicture) {
//       let previousImg: HTMLImageElement = sliderNavigation?.querySelector(`[data-id="${id}"]`)!;
//       previousImg.dataset.isSelected = "true"
//       currentPicture.dataset.id = id;
//       currentPicture.src = src;
//     }
//   })
// );
sliderNavigation.forEach((navigation) => {
    navigation.querySelectorAll("div").forEach((div) => {
        div.addEventListener("click", () => {
            overal?.classList.remove(...["invisible", "opacity-0"]);
            slider?.classList.remove(...["invisible", "opacity-0"]);
            let { id, src } = picture.find((i) => i.id == div.dataset.id);
            // let previousImg: HTMLImageElement = sliderNavigation?.querySelector(
            //   `[data-id="${currentPicture.dataset.id}"]`
            // )!;
            // previousImg.dataset.isSelected = "false";
            // div.dataset.isSelected = "true";
            if (currentPicture) {
                currentPicture.dataset.id = id;
                currentPicture.src = src;
            }
        });
    });
});
