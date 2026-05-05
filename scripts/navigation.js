const navButton = document.querySelector("#nav-button");
const navBar = document.querySelector("#nav-bar");

navButton.addEventListener("click", () => {
  navButton.classList.toggle("show");
  navBar.classList.toggle("show");
});

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;
