const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#primary-nav");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-link").forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

const year = document.querySelector("#currentyear");
const modified = document.querySelector("#lastmodified");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (modified) {
  modified.textContent = document.lastModified;
}
