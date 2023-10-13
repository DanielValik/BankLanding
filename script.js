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
