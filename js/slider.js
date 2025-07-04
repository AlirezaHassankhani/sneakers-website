"use strict";
let galleryPicture = document.querySelector(".gallery-picture");
let overal = document.querySelector(".overlay");
let slider = document.querySelector(".slider");
let currentPicture = document.querySelector(".current-picture");
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
galleryPicture?.querySelectorAll("img").forEach((image) =>
  image.addEventListener("click", (e) => {
    overal?.classList.remove(...["invisible", "opacity-0"]);
    slider?.classList.remove(...["invisible", "opacity-0"]);
    let src = picture.find((i) => i.id == image.dataset.id);
    if (currentPicture) {
      currentPicture.innerHTML = "";
      let newImage = document.createElement("img");
      newImage.classList.add(...["w-md", "rounded-2xl"]);
      if (src) newImage.src = src.src;
      currentPicture.appendChild(newImage);
    }
  })
);
