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
// let cookieMessage = document.createElement("div");
// cookieMessage.innerHTML = `Czy zezwalasz dostep dla plikow cookie? <button id="ok_cookie">Ok</button>`;

// header.before(cookieMessage);

// document
//   .getElementById("ok_cookie")
//   .addEventListener("click", () => cookieMessage.remove());

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

// Navigation Hover effects

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

let section1Coords = section1.getBoundingClientRect();

window.addEventListener("scroll", function () {
  if (window.scrollY > section1Coords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});

// Sticky Navigation

const navHeight = nav.getBoundingClientRect().height;

let headerObserver = new IntersectionObserver(
  function (entries) {
    if (!entries[0].isIntersecting) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);

headerObserver.observe(header);

// Scroll appearance

const sections = document.querySelectorAll("section");
const appearanceObserver = new IntersectionObserver(
  (entries, observer) => {
    if (!entries[0].isIntersecting) return;

    entries[0].target.classList.remove("section--hidden");
    observer.unobserve(entries[0].target);
  },
  {
    root: null,
    threshold: 0.2,
  }
);

sections.forEach((s) => {
  s.classList.add("section--hidden");
  appearanceObserver.observe(s);
});

// Lazy loading

const lazyImages = document.querySelectorAll("img[data-src]");
const lazyImgObserver = new IntersectionObserver(
  function (entries, observer) {
    if (!entries[0].isIntersecting) return;

    entries[0].target.src = entries[0].target.dataset.src;
    entries[0].target.addEventListener("load", () => {
      entries[0].target.classList.remove("lazy-img");
    });
    observer.unobserve(entries[0].target);
  },
  {
    root: null,
    threshold: 0.1,
  }
);

lazyImages.forEach((lzi) => {
  lazyImgObserver.observe(lzi);
});

// Slider

const slides = document.querySelectorAll(".slide");
const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");
let sliderLenght = slides.length - 1;
let currentSlide = 0;

function setSliderTranslateX() {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
  });
}

setSliderTranslateX();

function goLeft() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = sliderLenght;
  }

  setSliderTranslateX();
  activateCurrentDot();
}

function goRight() {
  currentSlide++;
  if (currentSlide > sliderLenght) {
    currentSlide = 0;
  }

  setSliderTranslateX();
  activateCurrentDot();
}

sliderBtnLeft.addEventListener("click", goLeft);
sliderBtnRight.addEventListener("click", goRight);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") goLeft();
  if (e.key === "ArrowRight") goRight();
});

// Slider dots

const dots = document.querySelector(".dots");

slides.forEach((_, index) => {
  dots.insertAdjacentHTML(
    "beforeend",
    `<button class="dots__dot" data-slide ="${index}" ></button>`
  );
});

function activateCurrentDot() {
  document.querySelectorAll(".dots__dot").forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });
  document
    .querySelector(`.dots__dot[data-slide = "${currentSlide}"]`)
    .classList.add("dots__dot--active");
}

activateCurrentDot();

dots.addEventListener("click", (e) => {
  currentSlide = e.target.dataset.slide;

  setSliderTranslateX();
  activateCurrentDot();
});
