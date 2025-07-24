import Cart from "./cart.js";
import Counter from "./counter.js";

const $ = document;

const overlay = $.querySelector(".overlay");

const mobileMenu = $.querySelector(".mobile-menu");
const menuOpenBtn = $.querySelector(".menu-open-btn");
const menuCloseBtn = $.querySelector(".menu-close-btn");

const addCartBtn = $.querySelector(".add-cart-btn");
const cartBox = $.querySelector(".cart-box");

const cart = new Cart(JSON.parse(localStorage.getItem("products") || "[]"));
const counter = new Counter(0);

const counterWrapper = $.querySelector(".counter");
const increaseBtn = counterWrapper?.querySelector(".increase-btn");
const decreaseBtn = counterWrapper?.querySelector(".decrease-btn");
const counterDisplay = $.querySelector(".counter-display");

// Dom load
$.addEventListener("DOMContentLoaded", setCart);

// Overlay logic
overlay?.addEventListener("click", closeOverlay);

function closeOverlay() {
  if (overlay instanceof HTMLElement) {
    overlay.dataset.isActive = "false";
  }

  const query = $.querySelector("[data-is-open=true]");

  if (query instanceof HTMLElement) {
    query.dataset.isOpen = "false";
  }
}

function openOverlay() {
  if (overlay instanceof HTMLElement) {
    overlay.dataset.isActive = "true";
  }
}

export { openOverlay, closeOverlay };

// Menu mobile logic
menuOpenBtn?.addEventListener("click", openMenuHandler);
menuCloseBtn?.addEventListener("click", closeMenuHandler);

function openMenuHandler() {
  openOverlay();
  if (mobileMenu instanceof HTMLElement) {
    mobileMenu.dataset.isOpen = "true";
  }
}

function closeMenuHandler() {
  closeOverlay();
  if (mobileMenu instanceof HTMLElement) {
    mobileMenu.dataset.isOpen = "false";
  }
}

// Add cart
addCartBtn?.addEventListener("click", addCartHandler);

function addCartHandler() {
  if (counter.getCount() === 0) return;

  const newProduct = {
    id: crypto.randomUUID(),
    name: "fall limited edition sneakers",
    price: 150,
    count: counter.getCount(),
  };
  cart.setCart(newProduct);
  localStorage.setItem("products", JSON.stringify(cart.getCart()));
  setCart();

  counter.setCount(0);
  updateDisplayCounter();
}

// Counter
increaseBtn?.addEventListener("click", () => {
  counter.increaseCount();
  updateDisplayCounter();
});

decreaseBtn?.addEventListener("click", () => {
  counter.decreaseCount();
  updateDisplayCounter();
});

function updateDisplayCounter() {
  if (counterDisplay instanceof HTMLElement) {
    counterDisplay.textContent = String(counter.getCount());
  }
}

// Set cart
function setCart() {
  if (cart.getCount()) {
    const fragment = $.createDocumentFragment();
    cart.getCart().forEach((product) => {
      const divElem = $.createElement("div");
      divElem.insertAdjacentHTML("beforeend", getCartProductTemplate(product));
      fragment.append(divElem);
    });

    if (cartBox instanceof HTMLDivElement) {
      cartBox.innerHTML = "";
      cartBox.append(fragment);
    }
  } else {
    const divElem = $.createElement("div");
    divElem.classList.add(...["flex", "justify-center", "items-center", "h-full"]);

    const pElem = $.createElement("p");
    pElem.textContent = "Cart is empty";

    divElem.append(pElem);
    if (cartBox instanceof HTMLElement) {
      cartBox.innerHTML = "";
      cartBox?.append(divElem);
    }
  }
}

function getCartProductTemplate({
  count,
  price,
  id,
}: {
  count: number;
  price: number;
  id: string;
}) {
  return `  
    <div class="flex justify-evenly items-center gap-4 h-16" data-id="${id}">
  <img src="./public/images/image-product-1-thumbnail.jpg" alt="product" class="size-14 object-cover rounded-md" />
  <div class="flex flex-col gap-1 font-display capitalize text-slate-500 text-sm">
    <p class="capitalize">fall limited edition sneakers</p>
    <p>
      $${price}.00 &#10006; ${count}
      <span class="text-black font-bold ms-2">$${price * count}.00</span>
    </p>
  </div>
  <div class="delete-cart-btn cursor-pointer">
    <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <path
          d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
          id="a"
        />
      </defs>
      <use class="fill-[#C3CAD9] transition-all hover:fill-slate-900" fill-rule="nonzero" xlink:href="#a" />
    </svg>
  </div>
</div>

    `;
}

// Delete cart (with event delegation logic)

cartBox?.addEventListener("click", function (e) {
  const target = e.target;

  if (target instanceof Element) {
    const deleteCartBtn = target.closest(".delete-cart-btn");

    if (deleteCartBtn) {
      const product = deleteCartBtn?.closest("[data-id]");
      if (product instanceof HTMLElement) {
        cart.deleteFromCart(product.dataset.id || "");
        localStorage.setItem("products", JSON.stringify(cart.getCart()));
        setCart();
      }
    }
  }
});
