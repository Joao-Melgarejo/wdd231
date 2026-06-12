import { getServices } from "./data.js";

const featuredContainer = document.querySelector("#featured-services");
const featuredStatus = document.querySelector("#featured-status");
const recentService = document.querySelector("#recent-service");

function serviceCard(service) {
  return `
    <article class="service-card service-card--compact">
      <img src="${service.image}" alt="${service.imageAlt}" width="520" height="390" loading="lazy">
      <div class="service-card__body">
        <span class="pill">${service.category}</span>
        <h3>${service.name}</h3>
        <p>${service.summary}</p>
        <a class="text-link" href="services.html?service=${service.id}">Ver detalles</a>
      </div>
    </article>
  `;
}

function renderRecentService() {
  if (!recentService) return;

  const saved = localStorage.getItem("lastService");

  if (!saved) {
    recentService.hidden = true;
    return;
  }

  const service = JSON.parse(saved);
  recentService.hidden = false;
  recentService.innerHTML = `
    <p class="eyebrow">Ultima consulta guardada</p>
    <h3>${service.name}</h3>
    <p>${service.summary}</p>
    <a class="button button--light" href="services.html?service=${service.id}">Volver a revisar</a>
  `;
}

async function renderFeaturedServices() {
  if (!featuredContainer) return;

  try {
    const services = await getServices();
    const featuredServices = services.filter((service) => service.featured);

    featuredContainer.innerHTML = featuredServices.map(serviceCard).join("");

    if (featuredStatus) {
      featuredStatus.textContent = `${featuredServices.length} servicios destacados cargados.`;
    }
  } catch (error) {
    featuredContainer.innerHTML = `
      <p class="notice">No se pudieron cargar los servicios destacados. Intenta nuevamente mas tarde.</p>
    `;
  }
}

renderFeaturedServices();
renderRecentService();
