const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const membersUrl = "data/members.json";

const membershipLevels = {
  1: "Member",
  2: "Silver",
  3: "Gold",
};

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

const getMembers = async () => {
  try {
    const response = await fetch(membersUrl);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersContainer.innerHTML =
      "<p class='error-message'>Sorry, the business directory could not be loaded.</p>";
    console.error("Error loading member data:", error);
  }
};

const displayMembers = (members) => {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    const image = document.createElement("img");
    const content = document.createElement("div");
    const name = document.createElement("h3");
    const category = document.createElement("p");
    const address = document.createElement("p");
    const phone = document.createElement("p");
    const website = document.createElement("a");
    const membership = document.createElement("p");
    const description = document.createElement("p");

    card.classList.add("member-card");
    content.classList.add("member-content");
    category.classList.add("category");
    membership.classList.add("membership");
    description.classList.add("description");

    image.setAttribute("src", `images/${member.image}`);
    image.setAttribute("alt", `${member.name} logo`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "120");
    image.setAttribute("height", "120");

    name.textContent = member.name;
    category.textContent = member.category;
    address.textContent = member.address;
    phone.textContent = member.phone;
    membership.textContent = `Membership Level: ${
      membershipLevels[member.membershipLevel]
    }`;
    description.textContent = member.description ?? "";

    website.setAttribute("href", member.website);
    website.setAttribute("target", "_blank");
    website.setAttribute("rel", "noopener noreferrer");
    website.textContent = "Visit Website";

    content.appendChild(name);
    content.appendChild(category);
    content.appendChild(address);
    content.appendChild(phone);
    content.appendChild(website);
    content.appendChild(membership);
    content.appendChild(description);

    card.appendChild(image);
    card.appendChild(content);

    membersContainer.appendChild(card);
  });
};

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");

  gridButton.classList.add("selected");
  listButton.classList.remove("selected");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");

  listButton.classList.add("selected");
  gridButton.classList.remove("selected");
});

gridButton.classList.add("selected");

getMembers();
