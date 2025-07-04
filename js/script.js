"use strict"

import Counter from "./counter.js";

const $ = document;

let overlayTag = $.querySelector(".overlay");

let navigationOpenBtn = $.querySelector(".navigation-open");
let navigationClose = $.querySelector(".navigation-close");
let navigationMenu = $.querySelector(".navigation");

let counterDisplay = $.querySelector(".counter-display");
let decreaseBtn = $.querySelector(".decrease-btn");
let increaseBtn = $.querySelector(".increase-btn");

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

let counter = new Counter(0);

const decreaseHandler = () => {
    counter.decreaseCount();
    counterDisplay.textContent = counter.getCount();
}

const increaseHandler = () => {
    counter.increaseCount();
    counterDisplay.textContent = counter.getCount();
}

decreaseBtn.addEventListener("click", decreaseHandler);
increaseBtn.addEventListener("click", increaseHandler);
