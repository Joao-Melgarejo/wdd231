import { discoverItems } from "../data/discover.mjs";

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const visitMessage = document.querySelector("#visit-message");
const discoverGrid = document.querySelector("#discover-grid");

const lastVisitKey = "chamberDiscoverLastVisit";
const millisecondsPerDay = 1000 * 60 * 60 * 24;

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");

  const isOpen = navigation.classList.contains("open");

  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

function displayVisitMessage() {
  const lastVisit = Number(localStorage.getItem(lastVisitKey));
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetweenVisits = Math.floor((now - lastVisit) / millisecondsPerDay);

    if (daysBetweenVisits < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const dayLabel = daysBetweenVisits === 1 ? "day" : "days";
      visitMessage.textContent = `You last visited ${daysBetweenVisits} ${dayLabel} ago.`;
    }
  }

  localStorage.setItem(lastVisitKey, now);
}

function buildDiscoverCards(items) {
  discoverGrid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    const title = document.createElement("h2");
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const address = document.createElement("address");
    const description = document.createElement("p");
    const detail = document.createElement("p");
    const button = document.createElement("button");

    card.classList.add("discover-card");
    detail.classList.add("discover-detail");

    title.textContent = item.name;

    image.setAttribute("src", `images/${item.image}`);
    image.setAttribute("alt", `${item.name} in Puerto Inca`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "300");
    image.setAttribute("height", "200");

    address.textContent = item.address;
    description.textContent = item.description;
    detail.textContent = item.detail;
    detail.hidden = true;

    button.type = "button";
    button.textContent = "Learn More";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", `Learn more about ${item.name}`);

    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isExpanded));
      detail.hidden = isExpanded;
      button.textContent = isExpanded ? "Learn More" : "Show Less";
    });

    figure.appendChild(image);
    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(detail);
    card.appendChild(button);

    discoverGrid.appendChild(card);
  });
}

displayVisitMessage();
buildDiscoverCards(discoverItems);
