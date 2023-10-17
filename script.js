"use strict";

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const btnCloseModalWindow = document.querySelector(".btn--close-modal-window");
const btnsOpenModalWindow = document.querySelectorAll(
  ".btn--show-modal-window"
);

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModalWindow.forEach((element) =>
  element.addEventListener("click", openModalWindow)
);

btnCloseModalWindow.addEventListener("click", closeModalWindow);
overlay.addEventListener("click", closeModalWindow);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalWindow.classList.contains("hidden")) {
    closeModalWindow();
  }
});

// Cookie message

let header = document.querySelector("header");
let cookieMessage = document.createElement("div");
cookieMessage.innerHTML = `Czy zezwalasz dostep dla plikow cookie? <button id="ok_cookie">Ok</button>`;

header.before(cookieMessage);

document
  .getElementById("ok_cookie")
  .addEventListener("click", () => cookieMessage.remove());

// console.log(Number.parseFloat(getComputedStyle(cookieMessage).height));

const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScroll.addEventListener("click", (e) => {
  // const section1Coordinates = section1.getBoundingClientRect();
  // console.log(section1Coordinates);
  // window.scrollTo({
  //   left: section1Coordinates.left + window.pageXOffset,
  //   top: section1Coordinates.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

// document.querySelectorAll(".nav__link").forEach((element) => {
//   element.addEventListener("click", (e) => {
//     e.preventDefault();
//     let href = e.target.getAttribute("href");
//     document.querySelector(href).scrollIntoView({ behavior: "smooth" });
//   });
// });

document.querySelector(".nav__links").addEventListener("click", (e) => {
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    let href = e.target.getAttribute("href");
    document.querySelector(href).scrollIntoView({ behavior: "smooth" });
  }
});

//Tabs

const tabContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const contents = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  let activeBtn = e.target.closest(".operations__tab");

  if (!activeBtn) return;

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  activeBtn.classList.add("operations__tab--active");

  contents.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  document
    .querySelector(`.operations__content--${activeBtn.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Navigation

const nav = document.querySelector(".nav");

function navigationHoverOpacity(e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    let linkOver = e.target;
    let links = linkOver.closest(".nav__links").querySelectorAll(".nav__link");
    let image = linkOver.closest(".nav").querySelector("img");
    let text = linkOver.closest(".nav").querySelector(".nav__text");

    links.forEach((e) => {
      if (e !== linkOver) e.style.opacity = this;
    });

    image.style.opacity = this;
    text.style.opacity = this;
  }
}

nav.addEventListener("mouseover", navigationHoverOpacity.bind(0.4));

nav.addEventListener("mouseout", navigationHoverOpacity.bind(1));
