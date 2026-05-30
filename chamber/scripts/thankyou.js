const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const applicationResults = document.querySelector("#application-results");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");

  const isOpen = navigation.classList.contains("open");

  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

const params = new URLSearchParams(window.location.search);

const requiredFields = [
  ["First Name", params.get("first-name")],
  ["Last Name", params.get("last-name")],
  ["Email Address", params.get("email")],
  ["Mobile Phone Number", params.get("phone")],
  ["Business or Organization Name", params.get("organization")],
  ["Application Timestamp", params.get("timestamp")],
];

const hasRequiredData = requiredFields.every((field) => field[1]);

if (hasRequiredData) {
  const list = document.createElement("dl");

  requiredFields.forEach(([label, value]) => {
    const term = document.createElement("dt");
    const description = document.createElement("dd");

    term.textContent = label;
    description.textContent = value;

    list.appendChild(term);
    list.appendChild(description);
  });

  applicationResults.appendChild(list);
} else {
  applicationResults.innerHTML = `
    <p>No application information was found.</p>
    <p><a href="join.html">Return to the membership application form</a></p>
  `;
}
