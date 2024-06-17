"use strict";

// add event on element

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

// navbar toggle

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

// header sticky & back top btn active

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    // backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    // backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
};

addEventOnElem(window, "scroll", headerSticky);

// scroll reveal effect

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
};

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

// faq expand
const faqs = document.querySelectorAll(".faq-wrapper");
faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});

// image carousel

let currentIndex = 0;

function showSlide(index) {
  const slides = document.querySelector("[slides]");
  const totalSlides = document.querySelectorAll("[slide]").length;

  if (index >= totalSlides) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalSlides - 1;
  } else {
    currentIndex = index;
  }

  const offset = -currentIndex * 100;
  slides.style.transform = `translateX(${offset}%)`;
}

function autoSlide() {
  showSlide(currentIndex + 1);
  setTimeout(autoSlide, 3000); // Change slide every 3 seconds
}

function createDots() {
  const dotsContainer = document.querySelector("[navigation-dots]");
  const totalSlides = document.querySelectorAll("[slide]").length;
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => showSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createDots();
  autoSlide();
  updateDots();
});
