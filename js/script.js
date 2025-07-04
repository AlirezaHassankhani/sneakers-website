"use strict";

import Counter from "./counter.js";

const $ = document;

let cart = [];

document.addEventListener("DOMContentLoaded", setCart);

let overlayTag = $.querySelector(".overlay");

let navigationOpenBtn = $.querySelector(".navigation-open");
let navigationClose = $.querySelector(".navigation-close");
let navigationMenu = $.querySelector(".navigation");

let counterDisplay = $.querySelector(".counter-display");
let decreaseBtn = $.querySelector(".decrease-btn");
let increaseBtn = $.querySelector(".increase-btn");

let addCartBtn = $.querySelector(".add-cart-btn");

let cartBox = $.querySelector(".cart-box");

const navigationOpenHandler = () => {
  navigationMenu.classList.replace("-left-64", "left-0");
  overlayTag.classList.remove(...["invisible", "opacity-0"]);
};

const navigationCloseHandler = () => {
  navigationMenu.classList.replace("left-0", "-left-64");
  overlayTag.classList.add(...["invisible", "opacity-0"]);
};

navigationOpenBtn.addEventListener("click", navigationOpenHandler);
navigationClose.addEventListener("click", navigationCloseHandler);
overlayTag.addEventListener("click", navigationCloseHandler);

let counter = new Counter(0);

decreaseBtn.addEventListener("click", () => {
  counter.decreaseCount();
  counterDisplay.textContent = counter.getCount();
});

increaseBtn.addEventListener("click", () => {
  counter.increaseCount();
  counterDisplay.textContent = counter.getCount();
});

const addCartHandler = () => {
  if (counter.getCount() == 0) return;

  let newProduct = {
    id: crypto.randomUUID(),
    count: counter.getCount(),
    name: "fall limited edition sneakers",
    price: 125,
  };

  cart.push(newProduct);
  setCart();

  counter.setCount(0);
  counterDisplay.textContent = counter.getCount();
};

addCartBtn.addEventListener("click", addCartHandler);

function setCart() {
  cartBox.textContent = "";

  if (cart.length) {
    cart.forEach((product) => {
      const divMain = document.createElement("div");
      divMain.className = "flex justify-evenly items-center gap-4 h-16";
      divMain.dataset.id = product.id;

      const img = document.createElement("img");
      img.src = "./assets/images/image-product-1-thumbnail.jpg";
      img.alt = "product";
      img.className = "size-14 object-cover rounded-md";

      const divText = document.createElement("div");
      divText.className = "flex flex-col gap-1 font-display capitalize text-slate-500 text-sm";

      const pTitle = document.createElement("p");
      pTitle.className = "capitalize";
      pTitle.textContent = "fall limited edition sneakers";

      const pPrice = document.createElement("p");
      pPrice.innerHTML = `$${product.price}.00 &#10006; ${product.count} `;

      const spanTotal = document.createElement("span");
      spanTotal.className = "text-black font-bold ms-2";
      spanTotal.textContent = `$${product.price * product.count}.00`;

      pPrice.appendChild(spanTotal);

      divText.appendChild(pTitle);
      divText.appendChild(pPrice);

      const divIcon = document.createElement("div");

      divIcon.addEventListener("click", () => {
        cart = cart.filter((p) => p.id != product.id);

        let selectedProduct = cartBox.querySelector(`[data-id="${product.id}"]`);
        if (selectedProduct) {
          selectedProduct.remove();
        }

        if (cart.length === 0) {
          setCart();
        }
      });

      divIcon.className = "cursor-pointer";

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "14");
      svg.setAttribute("height", "16");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        "M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
      );
      path.setAttribute("id", "a");

      defs.appendChild(path);

      svg.appendChild(defs);

      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("class", "fill-[#C3CAD9] transition-all hover:fill-slate-900");
      use.setAttribute("fill-rule", "nonzero");
      use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#a");

      svg.appendChild(use);

      divIcon.appendChild(svg);

      divMain.appendChild(img);
      divMain.appendChild(divText);
      divMain.appendChild(divIcon);

      cartBox.appendChild(divMain);
    });
  } else {
    cartBox.insertAdjacentHTML(
      "beforeend",
      `
            <div class="flex justify-center items-center h-full">
                  <p class="font-display font-bold text-slate-500">Your cart is empty</p>
            </div>`
    );
  }
}
