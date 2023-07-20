"use stricts";

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

document.querySelector(".download-cv").addEventListener("click", function () {
  alert(
    "📝 Whoops, no CV at the moment! But don't worry, I'm busy crafting one. Soon, my fabulous CV will be ready to impress employers! 🛠️🚀 Stay tuned for greatness! 😄"
  );
});

const nav_height = document.querySelector("header").offsetHeight;
const sections = document.querySelectorAll(".scroll");

sections.forEach((section) => {
  section.style.scrollMarginTop = `${nav_height}px`;
});

const burgerMenu = document.querySelector(".burger-menu");
const navLinks = document.querySelector(".nav-links");

// Function to hide the menu
function hideMenu() {
  navLinks.classList.remove("active");
}

// Toggle menu on burger menu click
burgerMenu.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

// Event listener for each link to hide menu when clicked
const navLinksContainer = document.querySelector(".nav-links-container");
const links = navLinksContainer.querySelectorAll("a");

links.forEach((link) => {
  link.addEventListener("click", function () {
    hideMenu();
  });
});
