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

// document.querySelector(".download-cv").addEventListener("click", function () {
//   showAlert();
// });

// function showAlert() {
//   var overlay = document.getElementById("overlay");
//   overlay.style.display = "block";
// }

// function closeAlert() {
//   var overlay = document.getElementById("overlay");
//   overlay.style.display = "none";
// }

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

document.addEventListener("DOMContentLoaded", function () {
  // Select all sections
  const sections = document.querySelectorAll("section");
  // Select all navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  // Function to update the active class on navigation links
  const updateActiveLink = () => {
    console.log("updateActiveLink called"); // Debugging line
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        const id = section.getAttribute("id");
        navLinks.forEach((navLink) => {
          if (navLink.getAttribute("href") === `#${id}`) {
            navLink.classList.add("active");
          } else {
            navLink.classList.remove("active");
          }
        });
      }
    });
  };

  // Set up the Intersection Observer
  const observer = new IntersectionObserver(updateActiveLink, {
    root: null,
    threshold: 0.1,
  });

  // Observe each section
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Update the active link when the page loads
  updateActiveLink();
});
