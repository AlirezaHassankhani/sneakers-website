"use strict"

const $ = document;

let overlayTag = $.querySelector(".overlay");

let navigationOpenBtn = $.querySelector(".navigation-open");
let navigationClose = $.querySelector(".navigation-close");
let navigationMenu = $.querySelector(".navigation");


const navigationOpenHandler = () => {
    navigationMenu.classList.replace("-left-64", "left-0");
    overlayTag.classList.remove(...["invisible", "opacity-0"]);
}

const navigationCloseHandler = () => {
    navigationMenu.classList.replace("left-0", "-left-64");
    overlayTag.classList.add(...["invisible", "opacity-0"]);
}

navigationOpenBtn.addEventListener("click", navigationOpenHandler);
navigationClose.addEventListener("click", navigationCloseHandler);
overlayTag.addEventListener("click", navigationCloseHandler);