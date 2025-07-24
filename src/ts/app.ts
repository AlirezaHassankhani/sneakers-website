const $ = document;

const overlay = $.querySelector(".overlay");

const mobileMenu = $.querySelector(".mobile-menu");
const menuOpenBtn = $.querySelector(".menu-open-btn");
const menuCloseBtn = $.querySelector(".menu-close-btn");

const cartBox = $.querySelector(".cart-box");

// Global event
function globalEvent(
  selector: string,
  type: string,
  parent: Element | null,
  callback: (e: Event) => void
) {
  parent?.addEventListener(type, function (e) {
    const target = e.target;
    if (target instanceof HTMLElement) {
      if (target.closest(selector)) callback(e);
    }
  });
}

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


