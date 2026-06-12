import { getServices } from "./data.js";

const form = document.querySelector("#request-form");
const serviceSelect = document.querySelector("#service");
const serviceNote = document.querySelector("#service-note");
const urgency = document.querySelector("#urgency");
const urgencyNote = document.querySelector("#urgency-note");

let services = [];

function getFormData() {
  return Object.fromEntries(new FormData(form).entries());
}

function saveDraft() {
  if (!form) return;
  localStorage.setItem("requestDraft", JSON.stringify(getFormData()));
}

function restoreDraft() {
  if (!form) return;

  const savedDraft = JSON.parse(localStorage.getItem("requestDraft") || "{}");

  Object.entries(savedDraft).forEach(([name, value]) => {
    const field = form.elements[name];

    if (field && !field.value) {
      field.value = value;
    }
  });
}

function updateServiceNote() {
  if (!serviceSelect || !serviceNote) return;

  const selectedService = services.find((service) => service.id === serviceSelect.value);

  if (!selectedService) {
    serviceNote.textContent = "Elige un servicio para ver una recomendacion rapida.";
    return;
  }

  serviceNote.textContent = `${selectedService.summary} Tiempo estimado: ${selectedService.duration}.`;
}

function updateUrgencyNote() {
  if (!urgency || !urgencyNote) return;

  const messages = {
    Normal: "Perfecto para mantenimiento o instalaciones programadas.",
    Pronto: "Buena opcion si necesitas una visita en los proximos dias.",
    Urgente: "Para fugas, rebalses o problemas que no pueden esperar.",
  };

  urgencyNote.textContent = messages[urgency.value] || "";
}

async function populateServices() {
  if (!serviceSelect) return;

  try {
    services = await getServices();
    serviceSelect.insertAdjacentHTML(
      "beforeend",
      services
        .map((service) => `<option value="${service.id}">${service.name}</option>`)
        .join(""),
    );

    const requestedService = new URLSearchParams(window.location.search).get("service");

    if (requestedService) {
      serviceSelect.value = requestedService;
    }

    restoreDraft();
    updateServiceNote();
  } catch (error) {
    serviceNote.textContent = "No se pudo cargar la lista de servicios. Aun puedes enviar tu consulta.";
  }
}

form?.addEventListener("input", saveDraft);
form?.addEventListener("change", saveDraft);
form?.addEventListener("submit", () => {
  localStorage.setItem("lastRequest", JSON.stringify(getFormData()));
  localStorage.removeItem("requestDraft");
});
serviceSelect?.addEventListener("change", updateServiceNote);
urgency?.addEventListener("change", updateUrgencyNote);

populateServices();
updateUrgencyNote();
