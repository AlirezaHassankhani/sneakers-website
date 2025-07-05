"use strict";
let galleryPicture = document.querySelector(".gallery-picture");
let overal = document.querySelector(".overlay");
let slider = document.querySelector(".slider");
let currentPicture = document.querySelector(".current-picture");
let sliderNavigation = document.querySelector(".slider-navigation");
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
overal?.addEventListener("click", () => {
    overal?.classList.add(...["invisible", "opacity-0"]);
    slider?.classList.add(...["invisible", "opacity-0"]);
}, { capture: true });
galleryPicture?.querySelectorAll("div").forEach((div) => div.addEventListener("click", () => {
    overal?.classList.remove(...["invisible", "opacity-0"]);
    slider?.classList.remove(...["invisible", "opacity-0"]);
    let { id, src } = picture.find((i) => i.id == div.dataset.id);
    if (currentPicture) {
        let previousImg = sliderNavigation?.querySelector(`[data-id="${id}"]`);
        previousImg.dataset.isSelected = "true";
        currentPicture.dataset.id = id;
        currentPicture.src = src;
    }
}));
sliderNavigation?.querySelectorAll("div").forEach((div) => {
    div.addEventListener("click", () => {
        let previousImg = sliderNavigation?.querySelector(`[data-id="${currentPicture.dataset.id}"]`);
        previousImg.dataset.isSelected = "false";
        div.dataset.isSelected = "true";
        let { id, src } = picture.find((i) => i.id == div.dataset.id);
        if (currentPicture) {
            currentPicture.dataset.id = id;
            currentPicture.src = src;
        }
    });
});
