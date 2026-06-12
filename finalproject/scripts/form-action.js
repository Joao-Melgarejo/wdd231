const summary = document.querySelector("#request-summary");
const summaryDetails = document.querySelector("#summary-details");
const emptyState = document.querySelector("#empty-request");
const whatsappLink = document.querySelector("#whatsapp-summary");
const params = new URLSearchParams(window.location.search);

const labels = {
  fullname: "Nombre",
  phone: "Telefono",
  district: "Distrito",
  service: "Servicio solicitado",
  urgency: "Prioridad",
  preferredDate: "Fecha preferida",
  notes: "Detalles del problema",
};

function formatServiceName(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function renderSummary() {
  if (!summary || !summaryDetails) return;

  const hasData = [...params.keys()].length > 0;

  if (!hasData) {
    summary.hidden = true;
    emptyState.hidden = false;
    return;
  }

  const list = document.createElement("dl");
  list.className = "summary-list";

  Object.entries(labels).forEach(([key, label]) => {
    const rawValue = params.get(key);

    if (!rawValue) return;

    const group = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");

    term.textContent = label;
    description.textContent = key === "service" ? formatServiceName(rawValue) : rawValue;
    group.append(term, description);
    list.append(group);
  });

  summaryDetails.replaceChildren(list);
  summary.hidden = false;
  emptyState.hidden = true;

  if (whatsappLink) {
    const message = `Hola Fernando, soy ${params.get("fullname") || "un cliente"}. Necesito ayuda con: ${
      params.get("notes") || formatServiceName(params.get("service") || "un servicio de gasfiteria")
    }. Mi distrito es ${params.get("district") || "por confirmar"}.`;

    whatsappLink.href = `https://wa.me/51936872862?text=${encodeURIComponent(message)}`;
  }
}

renderSummary();
