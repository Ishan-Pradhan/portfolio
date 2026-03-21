"use strict";

// ── Element refs ─────────────────────────────────────────────────────────────
const header        = document.getElementById("header");
const burgerBtn     = document.getElementById("burger-btn");
const mobileOverlay = document.getElementById("mobile-overlay");
const mobileCloseBtn= document.getElementById("mobile-close-btn");
const sections      = document.querySelectorAll("section[id]");

// ── Open / close mobile menu ─────────────────────────────────────────────────
function openMenu() {
  mobileOverlay.classList.add("open");
  mobileOverlay.removeAttribute("aria-hidden");
  burgerBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeMenu() {
  mobileOverlay.classList.remove("open");
  mobileOverlay.setAttribute("aria-hidden", "true");
  burgerBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

burgerBtn.addEventListener("click", openMenu);
mobileCloseBtn.addEventListener("click", closeMenu);

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ── Mobile nav links — smooth scroll + close menu ───────────────────────────
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href.startsWith("#")) return;
    e.preventDefault();
    closeMenu();
    // Small delay so the overlay closes before scrolling
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }, 200);
  });
});

// ── Desktop nav links — smooth scroll ───────────────────────────────────────
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ── Sticky / scrolled header ──────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
  updateActiveLink();
}, { passive: true });

// ── Active nav link highlight ─────────────────────────────────────────────────
function updateActiveLink() {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const top    = section.offsetTop - 130;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute("id");

    // Desktop nav links
    const desktopLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (desktopLink) {
      desktopLink.classList.toggle("active", scrollY >= top && scrollY < bottom);
    }
    // Mobile nav links
    const mobileLink = document.querySelector(`.mobile-nav-link[href="#${id}"]`);
    if (mobileLink) {
      mobileLink.classList.toggle("active", scrollY >= top && scrollY < bottom);
    }
  });
}

// ── Section reveal (Intersection Observer) ────────────────────────────────────
const revealSections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("section--hidden");
      sectionObserver.unobserve(entry.target);
    });
  },
  { root: null, threshold: 0.08 }
);

revealSections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

// ── Initial state ─────────────────────────────────────────────────────────────
updateActiveLink();

// ── Dynamic Footer Year ───────────────────────────────────────────────────────
const yearSpan = document.getElementById("current-year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
