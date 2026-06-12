import { getServiceCategories, getServices } from "./data.js";

const grid = document.querySelector("#services-grid");
const status = document.querySelector("#services-status");
const count = document.querySelector("#service-count");
const categoryFilter = document.querySelector("#category-filter");
const searchInput = document.querySelector("#service-search");
const dialog = document.querySelector("#service-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogContent = document.querySelector("#dialog-content");

let services = [];
let favorites = JSON.parse(localStorage.getItem("favoriteServices") || "[]");

function saveFavorites() {
  localStorage.setItem("favoriteServices", JSON.stringify(favorites));
}

function updateCount(items) {
  if (count) {
    count.textContent = `${items.length} servicio${items.length === 1 ? "" : "s"} encontrados`;
  }
}

function serviceMatches(service, selectedCategory, searchTerm) {
  const categoryMatches = selectedCategory === "Todos" || service.category === selectedCategory;
  const searchableText = `${service.name} ${service.summary} ${service.idealFor}`.toLowerCase();
  return categoryMatches && searchableText.includes(searchTerm);
}

function createServiceCard(service) {
  const isFavorite = favorites.includes(service.id);

  return `
    <article class="service-card" id="service-${service.id}">
      <img src="${service.image}" alt="${service.imageAlt}" width="520" height="390" loading="lazy">
      <div class="service-card__body">
        <div class="card-meta">
          <span class="pill">${service.category}</span>
          <button class="favorite-button" type="button" data-favorite="${service.id}" aria-pressed="${isFavorite}">
            ${isFavorite ? "Guardado" : "Guardar"}
          </button>
        </div>
        <h3>${service.name}</h3>
        <p>${service.summary}</p>
        <dl class="service-facts">
          <div>
            <dt>Respuesta</dt>
            <dd>${service.response}</dd>
          </div>
          <div>
            <dt>Duracion</dt>
            <dd>${service.duration}</dd>
          </div>
          <div>
            <dt>Garantia</dt>
            <dd>${service.warranty}</dd>
          </div>
        </dl>
        <button class="button button--small" type="button" data-service="${service.id}">Ver detalles</button>
      </div>
    </article>
  `;
}

function getFilteredServices() {
  const selectedCategory = categoryFilter?.value || "Todos";
  const searchTerm = searchInput?.value.trim().toLowerCase() || "";

  return services.filter((service) => serviceMatches(service, selectedCategory, searchTerm));
}

function renderServices() {
  if (!grid) return;

  const filteredServices = getFilteredServices();
  updateCount(filteredServices);

  if (filteredServices.length === 0) {
    grid.innerHTML = `
      <p class="notice">No encontramos servicios con esos filtros. Prueba con otra categoria o palabra clave.</p>
    `;
    return;
  }

  grid.innerHTML = filteredServices.map(createServiceCard).join("");
}

function openServiceDialog(serviceId) {
  const service = services.find((item) => item.id === serviceId);

  if (!service || !dialog || !dialogTitle || !dialogContent) return;

  localStorage.setItem(
    "lastService",
    JSON.stringify({
      id: service.id,
      name: service.name,
      summary: service.summary,
    }),
  );

  dialogTitle.textContent = service.name;
  dialogContent.innerHTML = `
    <img src="${service.image}" alt="${service.imageAlt}" width="520" height="390" loading="lazy">
    <p>${service.details}</p>
    <dl class="dialog-facts">
      <div>
        <dt>Categoria</dt>
        <dd>${service.category}</dd>
      </div>
      <div>
        <dt>Ideal para</dt>
        <dd>${service.idealFor}</dd>
      </div>
      <div>
        <dt>Tiempo estimado</dt>
        <dd>${service.duration}</dd>
      </div>
      <div>
        <dt>Respuesta</dt>
        <dd>${service.response}</dd>
      </div>
    </dl>
    <a class="button" href="contact.html?service=${service.id}">Solicitar este servicio</a>
  `;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function toggleFavorite(serviceId) {
  if (favorites.includes(serviceId)) {
    favorites = favorites.filter((id) => id !== serviceId);
  } else {
    favorites = [...favorites, serviceId];
  }

  saveFavorites();
  renderServices();
}

function populateCategories() {
  if (!categoryFilter) return;

  categoryFilter.innerHTML = getServiceCategories(services)
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
}

function handleGridClick(event) {
  const serviceButton = event.target.closest("[data-service]");
  const favoriteButton = event.target.closest("[data-favorite]");

  if (serviceButton) {
    openServiceDialog(serviceButton.dataset.service);
  }

  if (favoriteButton) {
    toggleFavorite(favoriteButton.dataset.favorite);
  }
}

function openRequestedService() {
  const serviceId = new URLSearchParams(window.location.search).get("service");

  if (serviceId) {
    setTimeout(() => openServiceDialog(serviceId), 150);
  }
}

async function initServicesPage() {
  if (!grid) return;

  try {
    services = await getServices();
    populateCategories();
    renderServices();
    openRequestedService();

    if (status) {
      status.textContent = "Servicios cargados correctamente.";
    }
  } catch (error) {
    grid.innerHTML = `
      <p class="notice">No se pudo cargar la lista de servicios. Revisa la conexion o intenta mas tarde.</p>
    `;
  }
}

grid?.addEventListener("click", handleGridClick);
categoryFilter?.addEventListener("change", renderServices);
searchInput?.addEventListener("input", renderServices);
dialog?.querySelector(".modal-close")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

initServicesPage();
