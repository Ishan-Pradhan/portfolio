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
// ── Cursor Canvas Trail ──────────────────────────────────────────────────────
const canvas = document.getElementById("cursor-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = "rgba(56, 189, 248, 0.5)";
    this.life = 1;
    this.decay = Math.random() * 0.02 + 0.01;
    this.wavy = Math.random() * 0.1;
  }

  update() {
    this.x += this.speedX + Math.sin(Date.now() * 0.01) * this.wavy;
    this.y += this.speedY + Math.cos(Date.now() * 0.01) * this.wavy;
    this.life -= this.decay;
    if (this.size > 0.1) this.size -= 0.05;
  }

  draw() {
    ctx.fillStyle = this.color.replace("0.5", this.life * 0.5);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
}

window.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(x, y));
  }
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ── Project Modal Logic ─────────────────────────────────────────────────────
const modal = document.getElementById("project-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalTags = document.getElementById("modal-tags");
const modalDesc = document.getElementById("modal-desc");
const modalLive = document.getElementById("modal-live");
const modalCode = document.getElementById("modal-code");
const modalClose = document.getElementById("modal-close");
const modalBackdrop = document.getElementById("modal-backdrop");

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector(".project-title").textContent;
    const img    = card.querySelector(".project-img").src;
    const desc   = card.querySelector(".project-desc").textContent;
    const tags   = card.querySelectorAll(".tag");
    const links  = card.querySelectorAll(".project-links a");

    modalTitle.textContent = title;
    modalImg.src = img;
    modalDesc.textContent = desc;
    
    // Clear and add tags
    modalTags.innerHTML = "";
    tags.forEach(t => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t.textContent;
      modalTags.appendChild(span);
    });

    // Handle links
    modalLive.href = links[0]?.href || "#";
    modalCode.href = links[1]?.href || "#";

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });

  // 3D Perspective Effect
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
  });

  // Prevent modal when clicking links/buttons directly
  const cardLinks = card.querySelectorAll("a, button");
  cardLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
