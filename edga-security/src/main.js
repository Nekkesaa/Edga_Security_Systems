import "@fontsource-variable/sora";
import "@fontsource-variable/inter";
import "./style.css";

/* Mobile menu */
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", open);
}

toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

/* Footer year */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* Camera and areas panel */
const camera = document.querySelector(".camera");
const cameraBtn = document.querySelector(".camera-btn");

function setAreas(open) {
  camera.classList.toggle("show-areas", open);
  cameraBtn.setAttribute("aria-expanded", open);
}

cameraBtn.addEventListener("click", () => {
  setAreas(!camera.classList.contains("show-areas"));
});

document.addEventListener("click", (e) => {
  if (!camera.contains(e.target)) setAreas(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setAreas(false);
});

/* Hero reveal: opens on load and again whenever you return to the top */
const hero = document.querySelector("#hero");
const heroTitle = document.querySelector(".hero-title");
let firstOpen = true;
let openTimer;

const heroObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      openTimer = setTimeout(
        () => heroTitle.classList.add("is-open"),
        firstOpen ? 800 : 200
      );
      firstOpen = false;
    } else {
      clearTimeout(openTimer);
      heroTitle.classList.remove("is-open");
      setAreas(false);
    }
  },
  { threshold: 0.4 }
);

heroObserver.observe(hero);