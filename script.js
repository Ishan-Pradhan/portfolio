"use stricts";

// FOR SMOOTH SCROLLING

document
  .querySelector(".nav-links-container")
  .addEventListener("click", function (e) {
    // console.log(e.target);

    //matching strategy
    if (e.target.classList.contains("nav-link")) {
      e.preventDefault();
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

const nav_height = document.querySelector("header").offsetHeight;
const sections = document.querySelectorAll(".scroll");

sections.forEach((section) => {
  section.style.scrollMarginTop = `${nav_height}px`;
});

// FOR ALERT

document.querySelector(".download-cv").addEventListener("click", function () {
  alert(
    "I don't have a resume right now, but I'm working on creating one. Soon, I'll have a great resume to show to potential employers. Thanks for your patience, and stay tuned for updates! 😄 🛠️ 🚀"
  );
});

// FOR BURGER MENU

const burgerMenu = document.querySelector(".burger-menu");
const navLinks = document.querySelector(".nav-links");

// Function to hide the menu
function hideMenu() {
  navLinks.classList.remove("active");
  burgerMenu.classList.remove("active");
}

// Toggle menu on burger menu click
burgerMenu.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  burgerMenu.classList.toggle("active");
});

const navLinksContainer = document.querySelector(".nav-links-container");
const links = navLinksContainer.querySelectorAll("a");

links.forEach((link) => {
  link.addEventListener("click", function () {
    hideMenu();
  });
});

// section animation
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// nav sticky
window.addEventListener("scroll", function () {
  var nav = document.querySelector("header");

  nav.classList.toggle("sticky", window.scrollY > 100);
});
