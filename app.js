const els = {
  dayList: document.querySelector("#dayList"),
  details: document.querySelector("#detailsPanel"),
  search: document.querySelector("#searchInput"),
  showAll: document.querySelector("#showAllBtn"),
  showAllMobile: document.querySelector("#showAllMobile"),
  focusDay: document.querySelector("#focusDayBtn"),
  printArea: document.querySelector("#printArea"),
  printRoute: document.querySelector("#printRouteBtn"),
  printMenuButton: document.querySelector("#printMenuBtn"),
  printMenu: document.querySelector("#printMenu"),
  printScope: document.querySelector("#printScope"),
  printDayPicker: document.querySelector("#printDayPicker"),
  mapToggle: document.querySelector("#mapToggleBtn"),
  routeOptions: document.querySelector("#routeOptions"),
  placeModal: document.querySelector("#placeModal"),
  placeModalBody: document.querySelector("#placeModalBody")
};

const colors = ["#ffb84d", "#54d6ff", "#8af08f", "#ff7ca8", "#c8a5ff", "#ffd166", "#47e5bc"];
const dayColorOverrides = {
  13: "#e879f9"
};
const optionDayColorOverrides = {
  "option-b": {
    8: "#e879f9"
  }
};
let routeGeometryData = {};
let routeGeometryPayload = {};
const availableRouteOptions = typeof routeOptions !== "undefined"
  ? routeOptions
  : [{
      id: "option-a",
      label: "Option A",
      name: "Aktuelle Route",
      headline: "Basel → Caen → Basel",
      totalKm: "~2.680 km",
      countries: 3,
      days: typeof routeData !== "undefined" ? routeData : [],
      summary: "Aktuelle Planung",
      strengths: []
    }];
let activeRouteOption = availableRouteOptions[0];
let currentRouteData = activeRouteOption.days;
let allRoutePoints = currentRouteData.flatMap((day) => getRoutePoints(day));
let activeDay = currentRouteData[0];
let showingRouteOverview = true;
const MAX_GOOGLE_WAYPOINTS = 8;
const SELECTION_STORAGE_KEY = "ausflug-auswahl-v1";
let selectionState = loadSelectionState();
let routeLayer = L.layerGroup();
let markerLayer = L.layerGroup();
let activeRouteLayer = L.layerGroup();
let modalMap = null;

const map = L.map("map", {
  zoomControl: false,
  scrollWheelZoom: true,
  tap: true
});

L.control.zoom({ position: "bottomright" }).addTo(map);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

routeLayer.addTo(map);
markerLayer.addTo(map);
activeRouteLayer.addTo(map);

async function init() {
  await loadRouteGeometry();
  renderRouteOptions();
  selectRouteOption(activeRouteOption.id, { showOverview: true, fit: false });
  bindEvents();
  fitAll();
}

async function loadRouteGeometry() {
  try {
    const response = await fetch("./data/routeGeometry.json?v=12");
    if (!response.ok) throw new Error(`Route geometry HTTP ${response.status}`);
    routeGeometryPayload = await response.json();
    setActiveRouteGeometry();
  } catch (error) {
    console.warn("Straßengeometrie konnte nicht geladen werden, nutze Zwischenpunkte.", error);
  }
}

function setActiveRouteGeometry() {
  routeGeometryData = routeGeometryPayload.options?.[activeRouteOption.id] || routeGeometryPayload.geometry || {};
  allRoutePoints = currentRouteData.flatMap((day) => getRoutePoints(day));
}

function bindEvents() {
  els.search.addEventListener("input", () => {
    const query = normalize(els.search.value);
    const filtered = currentRouteData.filter((day) => normalize(daySearchText(day)).includes(query));
    renderDayList(filtered);
  });

  els.showAll.addEventListener("click", fitAll);
  els.showAllMobile.addEventListener("click", fitAll);
  els.focusDay.addEventListener("click", () => focusDay(activeDay));
  els.mapToggle.addEventListener("click", toggleMapPanel);
  els.printMenuButton.addEventListener("click", togglePrintMenu);
  els.printRoute.addEventListener("click", printRouteSelection);
  els.printScope.addEventListener("change", () => {
    els.printDayPicker.classList.toggle("visible", els.printScope.value === "custom");
  });
  document.addEventListener("click", (event) => {
    if (!els.printMenu.hidden && !els.printMenu.contains(event.target) && !els.printMenuButton.contains(event.target)) {
      closePrintMenu();
    }
    if (event.target.closest("[data-close-place-modal]")) {
      closePlaceModal();
    }
  });

  els.details.addEventListener("click", (event) => {
    const hotelBtn = event.target.closest("[data-select-hotel]");
    if (hotelBtn) {
      handleHotelSelect(activeDay, hotelBtn.dataset.selectHotel);
      return;
    }
    const attractionBtn = event.target.closest("[data-select-attraction]");
    if (attractionBtn) {
      handleAttractionToggle(activeDay, attractionBtn.dataset.selectAttraction);
      return;
    }
    if (event.target.closest("[data-reset-day-selection]")) {
      resetDaySelection(activeDay);
      return;
    }
    if (event.target.closest("[data-download-day-gpx]")) {
      downloadDayGpx(activeDay);
      return;
    }
    if (event.target.closest("[data-download-option-gpx]")) {
      downloadOptionGpx();
      return;
    }
    if (event.target.closest("[data-focus-active-day]")) {
      focusDay(activeDay);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePlaceModal();
  });

  window.addEventListener("resize", () => {
    window.setTimeout(() => {
      map.invalidateSize();
      if (showingRouteOverview) {
        fitAll();
      } else {
        focusDay(activeDay, { padding: true });
      }
    }, 140);
  });
}

function renderRouteOptions() {
  if (!els.routeOptions) return;
  els.routeOptions.innerHTML = availableRouteOptions.map((option) => routeOptionButton(option)).join("");
  els.routeOptions.querySelectorAll("[data-route-option]").forEach((button) => {
    button.addEventListener("click", () => selectRouteOption(button.dataset.routeOption, { showOverview: true }));
  });
}

function routeOptionButton(option) {
  const first = option.days[0];
  const last = option.days[option.days.length - 1];
  return `
    <button class="route-option-chip${option.id === activeRouteOption.id ? " active" : ""}" type="button" data-route-option="${escapeHtmlAttr(option.id)}">
      <span>${escapeHtml(option.label)}</span>
      <strong>${escapeHtml(option.name)}</strong>
      <small>${escapeHtml(option.totalKm)} · ${option.days.length} Tage · ${escapeHtml(first.stops[0].name)} bis ${escapeHtml(last.stops[last.stops.length - 1].name)}</small>
    </button>
  `;
}

function selectRouteOption(optionId, settings = {}) {
  activeRouteOption = availableRouteOptions.find((option) => option.id === optionId) || availableRouteOptions[0];
  currentRouteData = activeRouteOption.days;
  activeDay = currentRouteData[0];
  setActiveRouteGeometry();
  closePrintMenu();
  els.search.value = "";
  renderRouteOptions();
  updateTripSummary();
  renderDayList(currentRouteData);
  renderPrintDayPicker();
  renderAllRoutes();
  renderOverviewMarkers();
  if (settings.showOverview) {
    renderRouteComparison();
  } else {
    selectDay(1, { fit: settings.fit !== false });
  }
  if (settings.fit !== false) fitAll();
}

function updateTripSummary() {
  const stats = document.querySelectorAll(".trip-summary div");
  if (stats[0]) stats[0].innerHTML = `<strong>${activeRouteOption.countries}</strong><span>Länder</span>`;
  if (stats[1]) stats[1].innerHTML = `<strong>${currentRouteData.length}</strong><span>Etappen</span>`;
  if (stats[2]) stats[2].innerHTML = `<strong>${escapeHtml(activeRouteOption.totalKm.replace(/\s*km$/i, ""))}</strong><span>km</span>`;
}

function renderRouteComparison() {
  showingRouteOverview = true;
  els.details.innerHTML = `
    <section class="route-choice-hero">
      <div class="route-choice-title">
        <div>
          <p class="eyebrow">Routenvorschläge</p>
          <h2>${escapeHtml(activeRouteOption.label)} · ${escapeHtml(activeRouteOption.headline)}</h2>
          <p class="description">Oben ist die komplette Karte der ausgewählten Variante sichtbar. Tagesdetails, Hotels, Essenspausen, Sehenswürdigkeiten, Druckansicht und GPX-Export wechseln automatisch mit.</p>
        </div>
        <button type="button" data-open-first-day>Tag 1 öffnen</button>
      </div>
      <div class="route-choice-grid">
        ${availableRouteOptions.map(routeChoiceCard).join("")}
      </div>
    </section>
  `;
  els.details.querySelectorAll("[data-route-choice]").forEach((button) => {
    button.addEventListener("click", () => selectRouteOption(button.dataset.routeChoice, { showOverview: true }));
  });
  els.details.querySelector("[data-open-first-day]")?.addEventListener("click", () => selectDay(1));
}

function routeChoiceCard(option) {
  return `
    <article class="route-choice-card${option.id === activeRouteOption.id ? " active" : ""}">
      <div class="route-choice-head">
        <span>${escapeHtml(option.label)}</span>
        <strong>${escapeHtml(option.totalKm)}</strong>
      </div>
      <h3>${escapeHtml(option.headline)}</h3>
      <p>${escapeHtml(option.summary)}</p>
      <dl class="route-choice-stats">
        <div><dt>Tage</dt><dd>${option.days.length}</dd></div>
        <div><dt>Länder</dt><dd>${option.countries}</dd></div>
        <div><dt>Max. Tag</dt><dd>${escapeHtml(maxDistanceLabel(option.days))}</dd></div>
      </dl>
      <ol class="route-choice-days">
        ${option.days.map((day) => `<li><span>Tag ${day.day}</span><strong>${escapeHtml(day.title)}</strong><small>${escapeHtml(day.distance)} · ${escapeHtml(day.focus)}</small></li>`).join("")}
      </ol>
      <ul class="route-choice-strengths">
        ${option.strengths.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      <button type="button" data-route-choice="${escapeHtmlAttr(option.id)}">${option.id === activeRouteOption.id ? "Ausgewählt" : `${escapeHtml(option.label)} Karte anzeigen`}</button>
    </article>
  `;
}

function maxDistanceLabel(days) {
  return days.reduce((max, day) => {
    const value = Number((day.distance.match(/\d+/) || [0])[0]);
    return value > max.value ? { value, label: day.distance } : max;
  }, { value: 0, label: "" }).label;
}

function toggleMapPanel() {
  const collapsed = document.body.classList.toggle("map-collapsed");
  els.mapToggle.setAttribute("aria-pressed", String(collapsed));
  els.mapToggle.setAttribute("aria-label", collapsed ? "Karte aufklappen" : "Karte einklappen");
  els.mapToggle.setAttribute("title", collapsed ? "Karte aufklappen" : "Karte einklappen");
  els.mapToggle.textContent = collapsed ? "▣" : "▤";
  if (!collapsed) {
    window.setTimeout(() => {
      map.invalidateSize();
      focusDay(activeDay, { padding: true });
    }, 120);
  }
}


function togglePrintMenu() {
  const willOpen = els.printMenu.hidden;
  els.printMenu.hidden = !willOpen;
  els.printMenuButton.setAttribute("aria-expanded", String(willOpen));
}

function closePrintMenu() {
  els.printMenu.hidden = true;
  els.printMenuButton.setAttribute("aria-expanded", "false");
}

function renderDayList(days) {
  els.dayList.innerHTML = "";
  if (!days.length) {
    els.dayList.innerHTML = '<p class="empty-state">Keine Etappe gefunden.</p>';
    return;
  }

  days.forEach((day) => {
    const button = document.createElement("button");
    button.className = `day-card${day.day === activeDay.day ? " active" : ""}`;
    button.type = "button";
    button.dataset.day = String(day.day);
    button.setAttribute("aria-label", `Tag ${day.day}: ${day.title}`);
    button.innerHTML = `
      <span class="day-number">Tag ${day.day}</span>
      <span class="day-title">${escapeHtml(day.title)}</span>
      <span class="day-meta">${escapeHtml(day.distance)} · ${stars(day.curveFactor)}</span>
      <span class="day-focus">${escapeHtml(day.focus)}</span>
    `;
    button.addEventListener("click", () => selectDay(day.day));
    els.dayList.appendChild(button);
  });
}

function renderPrintDayPicker() {
  els.printDayPicker.innerHTML = currentRouteData.map((day) => `
    <label>
      <input type="checkbox" value="${day.day}" checked />
      <span>Tag ${day.day}</span>
    </label>
  `).join("");
}

function printRouteSelection() {
  const days = getPrintDays();
  if (!days.length) return;
  const options = getPrintOptions();
  els.printArea.innerHTML = renderPrintView(days, options);
  els.printArea.setAttribute("aria-hidden", "false");
  closePrintMenu();
  window.setTimeout(() => window.print(), 80);
}

function getPrintDays() {
  if (els.printScope.value === "all") return currentRouteData;
  if (els.printScope.value === "custom") {
    const selected = [...els.printDayPicker.querySelectorAll("input:checked")].map((input) => Number(input.value));
    return currentRouteData.filter((day) => selected.includes(day.day));
  }
  return [activeDay];
}

function getPrintOptions() {
  return [...document.querySelectorAll("[data-print-option]")].reduce((options, input) => {
    options[input.dataset.printOption] = input.checked;
    return options;
  }, {});
}

function renderPrintView(days, options) {
  const scopeText = days.length === currentRouteData.length ? `Alle ${currentRouteData.length} Tage` : days.map((day) => `Tag ${day.day}`).join(", ");
  return `
    <div class="print-document">
      <header class="print-title">
        <p>Motorradreise Juli 2026 · ${escapeHtml(activeRouteOption.label)} · ${escapeHtml(activeRouteOption.headline)}</p>
        <h1>${escapeHtml(scopeText)}</h1>
        <span>Landstraßenroute mit Autobahnvermeidung · Stand ${new Date().toLocaleDateString("de-DE")}</span>
      </header>
      ${days.map((day) => renderPrintDay(day, options)).join("")}
    </div>
  `;
}

function renderPrintDay(day, options) {
  return `
    <article class="print-day">
      <header>
        <p>Tag ${day.day} · ${escapeHtml(day.countries.join(" / "))}</p>
        <h2>${escapeHtml(day.title)}</h2>
        <strong>${escapeHtml(day.distance)} · Kurven ${stars(day.curveFactor)}</strong>
      </header>
      <p>${escapeHtml(day.description)}</p>
      ${day.note ? `<p class="print-warning">${escapeHtml(day.note)}</p>` : ""}
      <dl class="print-facts">
        <div><dt>Fokus</dt><dd>${escapeHtml(day.focus)}</dd></div>
        <div><dt>Stopps</dt><dd>${day.stops.length}</dd></div>
        <div><dt>Route</dt><dd>Autobahn/Maut vermeiden</dd></div>
      </dl>
      ${options.maps ? `<p class="print-map-link"><strong>Google Tagesroute:</strong> ${escapeHtml(googleRouteLink(day))}</p>` : ""}
      ${options.meals ? printSection("Essen nach Fortschritt", mealPlan(day).map((meal) => `
        <li><strong>${escapeHtml(meal.label)} ${escapeHtml(meal.time)}:</strong> ${escapeHtml(meal.title)} bei ${escapeHtml(meal.place)}. ${escapeHtml(meal.note)}${options.links ? `<br><span>${escapeHtml(meal.google)}</span>` : ""}</li>
      `).join("")) : ""}
      ${options.meals && day.usaSpots ? printSection("USA-Fan Stopps Ramstein/Kaiserslautern", day.usaSpots.map((spot) => `
        <li><strong>${escapeHtml(spot.name)}</strong> · ${escapeHtml(spot.area)}<br>${escapeHtml(spot.note)}${options.links ? `<br><span>${escapeHtml(spot.links.google)}</span>` : ""}</li>
      `).join("")) : ""}
      ${options.stops ? printSection("Stoppliste", day.stops.map((stop, index) => `
        <li><strong>${day.day}.${index + 1} ${escapeHtml(stop.name)}</strong> - ${escapeHtml(stop.address)}${options.links ? `<br><span>${escapeHtml(stop.links.google)}</span>` : ""}</li>
      `).join("")) : ""}
      ${options.notes ? printSection("Highlights & Motorrad-Hinweise", [...day.highlights, ...day.riderNotes, ...(day.food || [])].map((item) => `<li>${escapeHtml(item)}</li>`).join("")) : ""}
      ${options.hotels ? printSection("Hotelvorschläge", day.hotels.map((hotel) => `
        <li>
          <strong>${escapeHtml(hotel.name)}</strong> · ${escapeHtml(hotel.area)}<br>
          ${escapeHtml(hotel.address)}<br>
          ${options.prices ? `<span>${escapeHtml(hotel.priceRange)}</span><br>` : ""}
          ${options.ratings ? `<span>${escapeHtml(hotel.rating)}</span><br>` : ""}
          Parken: ${escapeHtml(hotel.parking)}<br>
          Vorteil: ${escapeHtml(hotel.pro)} · Nachteil: ${escapeHtml(hotel.con)}
          ${options.links ? `<br><span>${escapeHtml(hotel.links.google)}</span>` : ""}
        </li>
      `).join("")) : ""}
    </article>
  `;
}

function printSection(title, items) {
  return `<section class="print-section"><h3>${escapeHtml(title)}</h3><ul>${items}</ul></section>`;
}

function renderAllRoutes() {
  routeLayer.clearLayers();
  currentRouteData.forEach((day) => {
    L.polyline(getRoutePoints(day), {
      color: getDayColor(day),
      weight: 4,
      opacity: 0.88,
      lineCap: "round",
      lineJoin: "round"
    }).addTo(routeLayer);
  });
}

function selectDay(dayNumber, options = { fit: true }) {
  activeDay = currentRouteData.find((day) => day.day === dayNumber) || currentRouteData[0];
  document.querySelectorAll(".day-card").forEach((card) => card.classList.remove("active"));
  document.querySelector(`.day-card[data-day="${activeDay.day}"]`)?.classList.add("active");
  renderActiveRoute(activeDay);
  renderDetails(activeDay);
  if (options.fit) focusDay(activeDay);
}

function renderActiveRoute(day) {
  markerLayer.clearLayers();
  activeRouteLayer.clearLayers();
  const dayColor = getDayColor(day);
  const points = getRoutePoints(day);

  L.polyline(points, {
    color: "#071018",
    weight: 10,
    opacity: 0.74,
    lineCap: "round",
    lineJoin: "round"
  }).addTo(activeRouteLayer);

  L.polyline(points, {
    color: dayColor,
    weight: 5,
    opacity: 0.96,
    lineCap: "round",
    lineJoin: "round"
  }).addTo(activeRouteLayer);

  day.stops.forEach((stop, index) => {
    const position = offsetDuplicate(stop, index, day.stops);
    const marker = L.marker(position, {
      icon: numberedIcon(day.day, index + 1, dayColor),
      keyboard: true,
      title: `${day.day}.${index + 1} ${stop.name}`
    }).addTo(markerLayer);

    marker.bindPopup(`
      <strong>Tag ${day.day}.${index + 1} · ${escapeHtml(stop.name)}</strong>
      <span>${escapeHtml(stop.address)}</span>
      <a href="${stop.links.google}" target="_blank" rel="noreferrer">Google Maps öffnen</a>
    `);
  });
}

function renderDetails(day) {
  showingRouteOverview = false;
  const sel = getDaySelection(day);
  els.details.innerHTML = `
    <article class="detail-card hero-detail">
      <div class="detail-heading">
        <div>
          <p class="eyebrow">Tag ${day.day} · ${escapeHtml(day.countries.join(" / "))}</p>
          <h2>${escapeHtml(day.title)}</h2>
        </div>
        <div class="distance-pill">${escapeHtml(day.distance)}</div>
      </div>
      <p class="description">${escapeHtml(day.description)}</p>
      ${day.note ? `<p class="safety-note">${escapeHtml(day.note)}</p>` : ""}
      <div class="quick-grid">
        <div><span>Kurven</span><strong>${stars(day.curveFactor)}</strong></div>
        <div><span>Fokus</span><strong>${escapeHtml(day.focus)}</strong></div>
        <div><span>Stopps</span><strong>${day.stops.length}</strong></div>
      </div>
      <p class="how-to-text">So geht's: Bei „Hotelvorschläge" und „Sehenswürdigkeiten" weiter unten anklicken, was ihr für diesen Tag wollt. Hier oben erscheint dann automatisch eure eigene Route zum Öffnen oder Herunterladen.</p>
      <div class="selection-bar" id="selectionBar">${renderSelectionBarInner(day)}</div>
    </article>

    <section class="detail-card overview-card">
      <h3>Tagesüberblick</h3>
      <div class="overview-grid">
        ${overviewCard("Start", day.stops[0].name, day.stops[0].address)}
        ${overviewCard("Mittag ungefähr", day.stops[Math.floor((day.stops.length - 1) * 0.52)].name, "gute Stelle für Pause und Essen")}
        ${overviewCard("Ziel", day.stops[day.stops.length - 1].name, "Hotel, Abendessen und Tagesabschluss")}
      </div>
    </section>

    <section class="detail-card">
      <div class="section-title-row">
        <div>
          <p class="eyebrow">nah an der Strecke</p>
          <h3>Sehenswürdigkeiten</h3>
        </div>
      </div>
      <div class="attraction-grid">
        ${attractionPlan(day).map((attraction) => attractionCard(attraction, day, sel)).join("")}
      </div>
    </section>

    ${day.usaSpots ? `
      <section class="detail-card usa-card">
        <div class="section-title-row">
          <div>
            <p class="eyebrow">Ramstein / Kaiserslautern</p>
            <h3>USA-Fan Stopps</h3>
          </div>
        </div>
        <p class="description">Alles außerhalb der Air Base geplant: Diner, BBQ, Burger und öffentlich erreichbare Ramstein-Orte.</p>
        <div class="attraction-grid">
          ${day.usaSpots.map((spot) => usaSpotCard(spot, day, sel)).join("")}
        </div>
      </section>
    ` : ""}

    <section class="detail-card">
      <div class="section-title-row">
        <div>
          <p class="eyebrow">nach Tagesfortschritt</p>
          <h3>Essen & Pausen</h3>
        </div>
      </div>
      <div class="meal-grid">
        ${mealPlan(day).map(mealCard).join("")}
      </div>
    </section>

    <section class="detail-card">
      <div class="section-title-row">
        <div>
          <p class="eyebrow">Übernachtung</p>
          <h3>Hotelvorschläge</h3>
        </div>
      </div>
      <div class="hotel-grid">
        ${day.hotels.map((hotel) => hotelCard(hotel, day, sel)).join("")}
      </div>
    </section>

    <div class="detail-grid">
      <section class="detail-card">
        <h3>Highlights</h3>
        <ul class="chip-list">${day.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section class="detail-card">
        <h3>Motorrad-Hinweise</h3>
        <ul class="note-list">${[...day.riderNotes, ...(day.food || [])].map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    </div>

    <section class="detail-card">
      <h3>Stoppliste</h3>
      <div class="stop-list compact-stop-list">
        ${day.stops.map((stop, index) => stopCard(stop, index, day.day)).join("")}
      </div>
    </section>
  `;
  hydratePlacePhotos();
}

function overviewCard(label, title, text) {
  return `
    <article class="overview-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(title)}</strong>
      <small>${escapeHtml(text)}</small>
    </article>
  `;
}

function stopCard(stop, index, dayNumber) {
  return `
    <article class="stop-card">
      <div class="stop-index">${dayNumber}.${index + 1}</div>
      <div>
        <h4>${escapeHtml(stop.name)}</h4>
        <p>${escapeHtml(stop.address)}</p>
        <small>${stop.lat.toFixed(4)}, ${stop.lng.toFixed(4)}</small>
        <div class="link-row">
          <a href="${stop.links.google}" target="_blank" rel="noreferrer">Google Maps</a>
        </div>
      </div>
    </article>
  `;
}

function hotelCard(hotel, day, sel) {
  const story = hotelStory(hotel);
  const isSelected = sel.hotelName === hotel.name;
  return `
    <article class="hotel-card${isSelected ? " is-selected" : ""}">
      <button type="button" class="select-toggle-btn" data-select-hotel="${escapeHtmlAttr(hotel.name)}" aria-pressed="${isSelected}">
        ${isSelected ? "✓ Für diese Nacht gewählt" : "Für diese Nacht wählen"}
      </button>
      <div class="place-photo-card" data-place-query="${escapeHtmlAttr(hotel.name)}" data-place-address="${escapeHtmlAttr(hotel.address)}" data-place-title="${escapeHtmlAttr(hotel.name)}" data-place-note="${escapeHtmlAttr(`${hotel.area} · ${hotel.parking}`)}" data-place-story="${escapeHtmlAttr(story)}" data-place-google="${hotel.links.google}" data-place-lat="${hotel.lat}" data-place-lng="${hotel.lng}" data-place-kind="hotel">
        <div class="place-photo-empty">
          <span>Echte Google-Fotos</span>
          <strong>API-Key eintragen</strong>
        </div>
      </div>
      <div class="hotel-content">
        <p class="hotel-area">${escapeHtml(hotel.area)}</p>
        <h4>${escapeHtml(hotel.name)}</h4>
        <p>${escapeHtml(hotel.address)}</p>
        <small>${hotel.lat.toFixed(4)}, ${hotel.lng.toFixed(4)}</small>
        <div class="hotel-facts">
          <span>${escapeHtml(hotel.priceRange)}</span>
          <span>${escapeHtml(hotel.rating)}</span>
        </div>
        <iframe class="place-preview" title="Google Maps Vorschau ${escapeHtml(hotel.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${mapEmbedLink(hotel.name, hotel.address)}"></iframe>
        <dl>
          <div><dt>Parken</dt><dd>${escapeHtml(hotel.parking)}</dd></div>
          <div><dt>Vorteil</dt><dd>${escapeHtml(hotel.pro)}</dd></div>
          <div><dt>Nachteil</dt><dd>${escapeHtml(hotel.con)}</dd></div>
        </dl>
        <div class="link-row">
          <a href="${hotel.links.google}" target="_blank" rel="noreferrer">Google Maps</a>
          <a href="${hotel.links.photos}" target="_blank" rel="noreferrer">Hotelbilder</a>
        </div>
      </div>
    </article>
  `;
}

function usaSpotCard(spot, day, sel) {
  const key = `usa-${slugifyFilename(spot.name)}`;
  const isSelected = sel.attractionKeys.includes(key);
  return `
    <article class="attraction-card place-open-card${isSelected ? " is-selected" : ""}" tabindex="0" role="button" aria-label="Details zu ${escapeHtmlAttr(spot.name)} öffnen">
      <button type="button" class="select-toggle-btn" data-select-attraction="${escapeHtmlAttr(key)}" aria-pressed="${isSelected}">
        ${isSelected ? "✓ Ausgewählt" : "Für Route auswählen"}
      </button>
      <div class="place-photo-card attraction-photo-card" data-place-query="${escapeHtmlAttr(spot.query)}" data-place-address="${escapeHtmlAttr(spot.area)}" data-place-title="${escapeHtmlAttr(spot.name)}" data-place-note="${escapeHtmlAttr(spot.note)}" data-place-story="${escapeHtmlAttr(placeStory(spot.name, spot.kind, spot.note))}" data-place-google="${spot.links.google}" data-place-lat="${spot.lat}" data-place-lng="${spot.lng}" data-place-kind="${spot.kind}">
        <div class="place-photo-empty">
          <span>Google-Fotos</span>
          <strong>werden geladen</strong>
        </div>
      </div>
      <div class="attraction-content">
        <p class="hotel-area">${escapeHtml(spot.area)}</p>
        <h4>${escapeHtml(spot.name)}</h4>
        <p>${escapeHtml(spot.note)}</p>
        <div class="link-row">
          <a href="${spot.links.google}" target="_blank" rel="noreferrer">Google Maps</a>
          <a href="${spot.links.photos}" target="_blank" rel="noreferrer">Fotos</a>
        </div>
      </div>
    </article>
  `;
}

function mealCard(meal) {
  const story = mealStory(meal);
  return `
    <article class="meal-card">
      <div class="meal-time">
        <span>${escapeHtml(meal.label)}</span>
        <strong>${escapeHtml(meal.time)}</strong>
      </div>
      <h4>${escapeHtml(meal.title)}</h4>
      <p>${escapeHtml(meal.place)} · ${escapeHtml(meal.note)}</p>
      <div class="place-photo-card meal-photo-card" data-place-query="${escapeHtmlAttr(meal.search)}" data-place-address="${escapeHtmlAttr(meal.place)}" data-place-title="${escapeHtmlAttr(meal.title)}" data-place-note="${escapeHtmlAttr(`${meal.label} ${meal.time} · ${meal.note}`)}" data-place-story="${escapeHtmlAttr(story)}" data-place-google="${meal.google}" data-place-lat="${meal.lat}" data-place-lng="${meal.lng}" data-place-kind="restaurant">
        <div class="place-photo-empty">
          <span>Echte Google-Fotos</span>
          <strong>API-Key eintragen</strong>
        </div>
      </div>
      <iframe class="place-preview meal-preview" title="Google Maps Vorschau ${escapeHtml(meal.title)} ${escapeHtml(meal.place)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${meal.embed}"></iframe>
      <div class="meal-progress">
        <span style="width: ${meal.progress}%"></span>
      </div>
      <div class="link-row">
        <a href="${meal.google}" target="_blank" rel="noreferrer">Google Maps</a>
      </div>
    </article>
  `;
}

function focusDay(day, options = {}) {
  renderActiveRoute(day);
  const bounds = L.latLngBounds(getRoutePoints(day));
  map.fitBounds(bounds, {
    paddingTopLeft: [30, options.padding ? 70 : 90],
    paddingBottomRight: [30, 46],
    maxZoom: day.distance.includes("0-120") ? 10 : 11
  });
}

function fitAll() {
  activeRouteLayer.clearLayers();
  renderOverviewMarkers();
  map.fitBounds(L.latLngBounds(allRoutePoints), {
    paddingTopLeft: [38, 78],
    paddingBottomRight: [38, 48],
    maxZoom: 8
  });
}

function renderOverviewMarkers() {
  markerLayer.clearLayers();
  currentRouteData.forEach((day, index) => {
    const start = day.stops[0];
    const position = offsetDuplicate(start, index, currentRouteData.map((item) => item.stops[0]));
    const color = getDayColor(day);
    const marker = L.marker(position, {
      icon: overviewIcon(day.day, color),
      keyboard: true,
      title: `Tag ${day.day}: ${day.title}`
    }).addTo(markerLayer);

    marker.bindPopup(`
      <strong>Tag ${day.day} · ${escapeHtml(day.title)}</strong>
      <span>${escapeHtml(day.distance)} · ${escapeHtml(day.focus)}</span>
    `);
  });
}

function getDayColor(day) {
  return optionDayColorOverrides[activeRouteOption?.id]?.[day.day] || dayColorOverrides[day.day] || colors[(day.day - 1) % colors.length];
}

function numberedIcon(dayNumber, stopNumber, color) {
  return L.divIcon({
    className: "numbered-marker-wrap",
    html: `<div class="map-pin" style="--marker-color:${color}"><span>${stopNumber}</span></div>`,
    iconSize: [34, 46],
    iconAnchor: [17, 43],
    popupAnchor: [0, -38]
  });
}

function overviewIcon(dayNumber, color) {
  return L.divIcon({
    className: "numbered-marker-wrap",
    html: `<div class="map-pin overview-pin" style="--marker-color:${color}"><span>${dayNumber}</span></div>`,
    iconSize: [32, 44],
    iconAnchor: [16, 41],
    popupAnchor: [0, -36]
  });
}

function offsetDuplicate(stop, index, stops) {
  const sameBefore = stops.slice(0, index).filter((other) => other.lat === stop.lat && other.lng === stop.lng).length;
  if (!sameBefore) return [stop.lat, stop.lng];
  const offset = 0.012 * sameBefore;
  return [stop.lat + offset, stop.lng + offset];
}

function getRoutePoints(day) {
  if (routeGeometryData[day.day] && geometryMatchesDay(day, routeGeometryData[day.day])) {
    return routeGeometryData[day.day];
  }
  return day.stops.map((stop) => [stop.lat, stop.lng]);
}

function geometryMatchesDay(day, points) {
  if (!Array.isArray(points) || points.length < 2) return false;
  const start = day.stops[0];
  const end = day.stops[day.stops.length - 1];
  return pointsNearStop(points[0], start) && pointsNearStop(points[points.length - 1], end);
}

function pointsNearStop(point, stop) {
  if (!point || !stop) return false;
  return Math.abs(Number(point[0]) - stop.lat) < 0.08 && Math.abs(Number(point[1]) - stop.lng) < 0.08;
}

function loadSelectionState() {
  try {
    const raw = localStorage.getItem(SELECTION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
}

function saveSelectionState() {
  try {
    localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(selectionState));
  } catch (error) {
    console.warn("Auswahl konnte nicht gespeichert werden.", error);
  }
}

function getDaySelection(day) {
  const optionId = activeRouteOption.id;
  if (!selectionState[optionId]) selectionState[optionId] = {};
  if (!selectionState[optionId][day.day]) selectionState[optionId][day.day] = { hotelName: null, attractionKeys: [] };
  return selectionState[optionId][day.day];
}

function handleHotelSelect(day, hotelName) {
  const sel = getDaySelection(day);
  sel.hotelName = sel.hotelName === hotelName ? null : hotelName;
  saveSelectionState();
  refreshSelectionUI(day);
}

function handleAttractionToggle(day, key) {
  const sel = getDaySelection(day);
  const index = sel.attractionKeys.indexOf(key);
  if (index >= 0) {
    sel.attractionKeys.splice(index, 1);
  } else {
    sel.attractionKeys.push(key);
  }
  saveSelectionState();
  refreshSelectionUI(day);
}

function resetDaySelection(day) {
  const optionId = activeRouteOption.id;
  if (selectionState[optionId]) delete selectionState[optionId][day.day];
  saveSelectionState();
  refreshSelectionUI(day);
}

function refreshSelectionUI(day) {
  const sel = getDaySelection(day);
  els.details.querySelectorAll("[data-select-hotel]").forEach((btn) => {
    const isSelected = sel.hotelName === btn.dataset.selectHotel;
    btn.classList.toggle("is-selected", isSelected);
    btn.textContent = isSelected ? "✓ Für diese Nacht gewählt" : "Für diese Nacht wählen";
    btn.setAttribute("aria-pressed", String(isSelected));
    btn.closest(".hotel-card")?.classList.toggle("is-selected", isSelected);
  });
  els.details.querySelectorAll("[data-select-attraction]").forEach((btn) => {
    const isSelected = sel.attractionKeys.includes(btn.dataset.selectAttraction);
    btn.classList.toggle("is-selected", isSelected);
    btn.textContent = isSelected ? "✓ Ausgewählt" : "Für Route auswählen";
    btn.setAttribute("aria-pressed", String(isSelected));
    btn.closest(".attraction-card")?.classList.toggle("is-selected", isSelected);
  });
  const bar = document.querySelector("#selectionBar");
  if (bar) bar.innerHTML = renderSelectionBarInner(day);
}

function renderSelectionBarInner(day) {
  const sel = getDaySelection(day);
  const hotel = day.hotels.find((h) => h.name === sel.hotelName);
  const attractionCount = sel.attractionKeys.length;
  const hasSelection = Boolean(hotel) || attractionCount > 0;
  const overflowCount = Math.max(0, attractionCount - MAX_GOOGLE_WAYPOINTS);

  return `
    <div class="selection-summary${hasSelection ? " has-selection" : ""}">
      <p class="selection-summary-title">${hasSelection ? "Eure eigene Route für diesen Tag" : "Noch keine eigene Auswahl für diesen Tag"}</p>
      <div class="selection-summary-rows">
        <div class="selection-summary-row">
          <span>Hotel</span>
          <strong>${hotel ? escapeHtml(hotel.name) : "noch nicht gewählt"}</strong>
        </div>
        <div class="selection-summary-row">
          <span>Sehenswürdigkeiten</span>
          <strong>${attractionCount} ausgewählt</strong>
        </div>
      </div>
      ${overflowCount > 0 ? `<p class="selection-note">Google Maps zeigt nur die ersten ${MAX_GOOGLE_WAYPOINTS} Sehenswürdigkeiten dieses Tages. Die Garmin-Datei enthält alle ${attractionCount}.</p>` : ""}
    </div>
    <div class="route-actions">
      <a href="${googleRouteLink(day)}" target="_blank" rel="noreferrer">${hasSelection ? "Meine Route in Google Maps öffnen" : "Google Tagesroute öffnen"}</a>
      <button type="button" data-download-day-gpx>Garmin-Datei für diesen Tag</button>
      <button type="button" data-download-option-gpx>Garmin-Datei für die ganze Reise</button>
      <button type="button" data-focus-active-day>Tag fokussieren</button>
      ${hasSelection ? `<button type="button" class="reset-selection-btn" data-reset-day-selection>Auswahl zurücksetzen</button>` : ""}
    </div>
    <p class="gpx-note">${hasSelection ? "Die Route enthält jetzt euer gewähltes Hotel und eure gewählten Sehenswürdigkeiten. " : ""}Für Garmin-Geräte: GPX herunterladen und per USB/SD in Garmin/BaseCamp importieren. Am Gerät zusätzlich „Autobahnen vermeiden" aktivieren.</p>
  `;
}

function selectablePlacesForDay(day) {
  const attractions = attractionPlan(day).map((item) => ({
    key: `attraction-${slugifyFilename(item.name)}`,
    name: item.name,
    address: item.area,
    lat: item.lat,
    lng: item.lng,
    order: nearestStopIndex(day, item.lat, item.lng)
  }));
  const usaSpots = (day.usaSpots || []).map((item) => ({
    key: `usa-${slugifyFilename(item.name)}`,
    name: item.name,
    address: item.address,
    lat: item.lat,
    lng: item.lng,
    order: nearestStopIndex(day, item.lat, item.lng)
  }));
  return [...attractions, ...usaSpots];
}

function nearestStopIndex(day, lat, lng) {
  let bestIndex = 0;
  let bestDist = Infinity;
  day.stops.forEach((stop, index) => {
    const dist = (stop.lat - lat) ** 2 + (stop.lng - lng) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      bestIndex = index;
    }
  });
  return bestIndex;
}

function buildDayWaypoints(day) {
  const sel = getDaySelection(day);
  const hasSelection = Boolean(sel.hotelName) || sel.attractionKeys.length > 0;
  const origin = day.stops[0];
  if (!hasSelection) {
    return {
      origin,
      destination: day.stops[day.stops.length - 1],
      waypoints: day.stops.slice(1, -1)
    };
  }
  const pool = selectablePlacesForDay(day);
  const waypoints = pool
    .filter((place) => sel.attractionKeys.includes(place.key))
    .sort((a, b) => a.order - b.order);
  const hotel = day.hotels.find((h) => h.name === sel.hotelName);
  const destination = hotel || day.stops[day.stops.length - 1];
  return { origin, destination, waypoints };
}

function googleRouteLink(day) {
  const { origin, destination, waypoints } = buildDayWaypoints(day);
  const capped = waypoints.slice(0, MAX_GOOGLE_WAYPOINTS);
  const waypointParam = capped.map((point) => `${point.lat},${point.lng}`).join("|");
  const params = new URLSearchParams({
    api: "1",
    travelmode: "driving",
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`
  });
  if (waypointParam) params.set("waypoints", waypointParam);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function downloadDayGpx(day) {
  const sel = getDaySelection(day);
  const personalized = Boolean(sel.hotelName) || sel.attractionKeys.length > 0;
  const suffix = personalized ? "-meine-route" : "";
  const fileName = `${slugifyFilename(activeRouteOption.label)}-tag-${String(day.day).padStart(2, "0")}-${slugifyFilename(day.title)}${suffix}.gpx`;
  downloadTextFile(fileName, buildGpx([day], `${activeRouteOption.label} Tag ${day.day} ${day.title}${personalized ? " (eigene Auswahl)" : ""}`), "application/gpx+xml");
}

function downloadOptionGpx() {
  const personalized = currentRouteData.some((day) => {
    const sel = getDaySelection(day);
    return Boolean(sel.hotelName) || sel.attractionKeys.length > 0;
  });
  const suffix = personalized ? "-meine-route" : "";
  const fileName = `${slugifyFilename(activeRouteOption.label)}-${slugifyFilename(activeRouteOption.name)}-alle-tage${suffix}.gpx`;
  downloadTextFile(fileName, buildGpx(currentRouteData, `${activeRouteOption.label} ${activeRouteOption.headline}${personalized ? " (eigene Auswahl)" : ""}`), "application/gpx+xml");
}

function buildGpx(days, title) {
  const routes = days.map((day) => {
    const { origin, destination, waypoints } = buildDayWaypoints(day);
    const points = [origin, ...waypoints, destination];
    return `
  <rte>
    <name>${xmlEscape(`Tag ${day.day} - ${day.title}`)}</name>
    <desc>${xmlEscape(`${day.distance} · ${day.focus} · Autobahnen am Garmin vermeiden`)}</desc>
${points.map((point, index) => `    <rtept lat="${point.lat}" lon="${point.lng}">
      <name>${xmlEscape(`${day.day}.${index + 1} ${point.name}`)}</name>
      ${point.address ? `<desc>${xmlEscape(point.address)}</desc>` : ""}
    </rtept>`).join("\n")}
  </rte>`;
  }).join("\n");

  const tracks = days.map((day) => `
  <trk>
    <name>${xmlEscape(`Track Tag ${day.day} - ${day.title}`)}</name>
    <desc>${xmlEscape("Sichtbare Kartenlinie als Referenz, falls Garmin die Route neu berechnet.")}</desc>
    <trkseg>
${getRoutePoints(day).map((point) => `      <trkpt lat="${Number(point[0]).toFixed(6)}" lon="${Number(point[1]).toFixed(6)}"></trkpt>`).join("\n")}
    </trkseg>
  </trk>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Motorradroute Basel-Caen" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${xmlEscape(title)}</name>
    <desc>${xmlEscape("Motorradroute mit Zwischenstopps. Im Garmin-Gerät Autobahnen vermeiden aktivieren.")}</desc>
  </metadata>
${routes}
${tracks}
</gpx>
`;
}

function downloadTextFile(fileName, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 250);
}

function slugifyFilename(value) {
  return String(value || "route")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "route";
}

function xmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function mealPlan(day) {
  const breakfastStop = day.stops[Math.min(1, day.stops.length - 1)];
  const lunchStop = day.stops[Math.floor((day.stops.length - 1) * 0.52)];
  const dinnerStop = day.stops[day.stops.length - 1];
  const hasUsaDinner = day.usaSpots || /ramstein|landstuhl|kaiserslautern/i.test(`${day.title} ${day.focus}`);
  const dinnerQuery = hasUsaDinner
    ? "The BBQ Connection Ramstein American BBQ diner"
    : "gutes Restaurant";

  return [
    makeMeal("Frühstück", "08:00-09:00", "Café oder Bäckerei", breakfastStop, "früh am Tagesstart, bevor die längeren Landstraßen kommen", 12, "cafe frühstück bäckerei"),
    makeMeal("Mittag", "12:30-14:00", "Bistro oder Brasserie", lunchStop, "ungefähr zur Tagesmitte, gut für Fahrerpause und Flüssigkeit", 52, "restaurant bistro brasserie lunch"),
    makeMeal("Abendessen", "18:30-20:30", hasUsaDinner ? "Diner / BBQ im Ramstein-Umfeld" : "Restaurant am Zielort", dinnerStop, "erst nach Ankunft und Hotel-Check-in", 95, dinnerQuery)
  ];
}

function makeMeal(label, time, title, stop, note, progress, query) {
  const search = `${query} ${stop.name} ${stop.address}`;
  const encoded = encodeURIComponent(search);
  return {
    label,
    time,
    title,
    place: stop.name,
    note,
    progress,
    search,
    google: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
    embed: mapEmbedLink(query, stop.address),
    lat: stop.lat,
    lng: stop.lng
  };
}

function attractionPlan(day) {
  return day.highlights.slice(0, 6).map((name, index) => {
    const anchor = matchingHighlightStop(day, name, index);
    const query = `${name} ${anchor.address}`;
    const encoded = encodeURIComponent(query);
    return {
      name,
      area: anchor.name,
      lat: anchor.lat,
      lng: anchor.lng,
      note: index < 3 ? "direkt als schöner Stopp einplanbar" : "in Routennähe als flexible Pause",
      query,
      google: `https://www.google.com/maps/search/?api=1&query=${encoded}`
    };
  });
}

function matchingHighlightStop(day, name, index) {
  const target = normalize(name);
  const exact = day.stops.find((stop) => {
    const stopName = normalize(stop.name);
    const stopAddress = normalize(stop.address);
    return stopName === target || stopName.includes(target) || target.includes(stopName) || stopAddress.includes(target);
  });
  if (exact) return exact;
  return day.stops[Math.min(index + 1, day.stops.length - 1)];
}

function hotelStory(hotel) {
  return [
    `${hotel.name} ist hier als Etappenhotel gesetzt, weil die Lage in ${hotel.area} nach einem Fahrtag praktisch bleibt und die Anfahrt nicht unnötig kompliziert werden soll.`,
    `Für Motorradfahrer zählt vor allem: ${hotel.parking}`,
    `Der konkrete Vorteil ist: ${hotel.pro} Der mögliche Haken: ${hotel.con}`,
    "Bewertung, Preis und Fotos werden live über Google geprüft, damit die Seite nicht mit Symbolbildern arbeitet."
  ].join(" ");
}

function mealStory(meal) {
  const timing = meal.label === "Frühstück"
    ? "Der Vorschlag liegt bewusst früh in der Etappe, damit die Gruppe satt startet und nicht erst nach vielen Kilometern suchen muss."
    : meal.label === "Mittag"
      ? "Der Vorschlag liegt ungefähr in der Tagesmitte, damit Essen, Trinken und eine ruhige Pause zusammenfallen."
      : "Der Vorschlag liegt am Zielort oder sehr nah am Abendziel, damit nach Hotel-Check-in nicht noch einmal lange gefahren werden muss.";
  return `${timing} ${meal.note} Der Suchpunkt ist ${meal.place}; die Karte öffnet passende Cafés, Restaurants oder Diner im direkten Umfeld.`;
}

function placeStory(name, kind, note) {
  const lower = `${name} ${kind}`.toLowerCase();
  const known = {
    ramstein: "Ramstein ist hier nicht als Basisbesuch geplant, sondern als USA-geprägter Abendstopp rund um Landstuhl und Kaiserslautern. Ohne Militärzugang bleiben Diner, BBQ, Shops und öffentliche Orte im Umfeld die spannenden Punkte.",
    kaiserslautern: "Kaiserslautern passt für den USA-Fan in der Gruppe, weil die Stadt durch die US-Community geprägt ist und sich Diner, Burger, BBQ und entspannte Abendstopps gut kombinieren lassen.",
    landstuhl: "Landstuhl ist als Übernachtungsraum ideal, weil es nah bei Ramstein liegt, aber mit Hotels und Restaurants öffentlich zugänglich bleibt.",
    nancy: "Nancy ist ein guter Kulturstopp auf der Ost-West-Achse: Place Stanislas, Altstadt und Cafés funktionieren auch dann, wenn man nur eine begrenzte Pause einplant.",
    reims: "Reims bringt Kathedrale, Champagner und breite Boulevards in die Route. Für die Gruppe ist es ein guter Abschluss nach den Argonnen, ohne noch bis Paris zu müssen.",
    rouen: "Rouen ist ein starker Normandie-Einstieg mit Altstadt, Fachwerk und Seine. Die Stadt liegt günstig, bevor es am nächsten Tag ruhiger Richtung Caen geht.",
    caen: "Caen ist die ruhige Basis für die D-Day-Runde. Von hier aus lassen sich Museen, Küstenabschnitte und Friedhöfe erreichen, ohne täglich das Hotel wechseln zu müssen.",
    "omaha beach": "Omaha Beach ist einer der zentralen D-Day-Orte. Der Stopp ist emotional, aber wichtig, weil er die Landungsgeschichte direkt am Gelände sichtbar macht.",
    "arromanches": "Arromanches zeigt mit den Resten des künstlichen Hafens sehr anschaulich, wie die Versorgung nach der Landung funktionierte.",
    "pegasus bridge": "Pegasus Bridge ist ein kompakter, gut verständlicher Geschichtsstopp und eignet sich besonders gut, wenn die Gruppe nicht zu lange laufen möchte.",
    "le mans": "Le Mans ist als Zwischenziel sinnvoll, weil es die Normandie-Etappe entspannt beendet und gleichzeitig Altstadt, Gastronomie und Motorsportgeschichte bietet.",
    tours: "Tours ist ein guter Loire-Pausenpunkt mit vielen Optionen für Essen und Kaffee, ohne sich tief in Schlossbesichtigungen zu verlieren.",
    sancerre: "Sancerre ist ein schöner später Pausenpunkt mit Blicken, Weinbergen und kleinen Straßen. Für Motorradfahrer ist die Anfahrt meist reizvoller als ein reiner Autobahnzubringer.",
    nevers: "Nevers ist als Übernachtung praktisch, weil es die lange Loire/Jura-Rückfahrt teilt und die Altstadt abends noch gut zu Fuß funktioniert.",
    dijon: "Dijon ist das letzte große französische Ziel vor der Heimfahrt: Altstadt, Essen und übersichtliche Hotels machen den Abend planbar.",
    besançon: "Besançon liegt ideal auf dem direkten Rückweg nach Basel. Die Schleife am Doubs und die Zitadelle geben der Pause Substanz, ohne die Route zu zerreißen.",
    pontarlier: "Pontarlier ist ein sinnvoller Jura-Stopp, weil danach die letzte Etappe Richtung Schweiz konzentriert gefahren werden kann.",
    morteau: "Morteau steht für den französischen Jura: kleinere Straßen, Höhenzüge und eine gute letzte Pause vor der Heimfahrt.",
    basel: "Basel ist bewusst als direkter Zielpunkt gesetzt. Am letzten Tag wird nicht mehr über Freiburg, Colmar oder Ballon d'Alsace verlängert.",
    trier: "Trier ist ein starker erster Abendort in Option B: römische Geschichte, Moselatmosphäre und genug Hotels/Restaurants, ohne dass die Gruppe nach der Ankunft noch weit fahren muss.",
    "porta nigra": "Die Porta Nigra ist das schnelle, klare Trier-Signal: gut verständlich, zentral und auch bei kurzer Abendrunde ein lohnender Blickfang.",
    luxemburg: "Luxemburg ist ein guter Übergang in den Nordbogen der Route. Der Stopp bringt Abwechslung, sollte aber eher kompakt bleiben, damit der Tag nach Lille nicht zu lang wird.",
    bastogne: "Bastogne passt thematisch zur Reise, weil hier WWII-Geschichte und Ardennenlandschaft zusammenkommen. Als Mittagsstopp ist es stark, als langer Museumsstopp würde es den Tag sprengen.",
    mons: "Mons liegt gut auf dem Weg nach Lille und eignet sich als kurze belgische Stadtpause, ohne die Route stark zu verlängern.",
    tournai: "Tournai ist der letzte sinnvolle belgische Stopp vor Lille. Kurz halten, danach konzentriert in die Stadt einfahren.",
    lille: "Lille ist in Option B das große nördliche Zwischenziel: lebendige Altstadt, viele Restaurants und ein klarer Bruch zur ländlicheren Anfahrt durch Belgien.",
    arras: "Arras ist ein schöner erster Stopp nach Lille mit markanten Plätzen und viel Nordfrankreich-Geschichte. Wegen des langen Tages nur kurz einplanen.",
    albert: "Albert liegt im Somme-Gebiet und passt als kurzer Erinnerungs- und Kaffeestopp auf dem Weg Richtung Normandie.",
    amiens: "Amiens ist auf den Nordfrankreich-Etappen der beste längere Pausenort: Kathedrale, Cafés und genug Infrastruktur für eine Gruppe.",
    verdun: "Verdun ist ein historisch schwerer, aber sinnvoller Stopp. Für diese Motorradreise reicht eine bewusste Pause, damit die Etappe nicht emotional und zeitlich zu voll wird.",
    "sainte-menehould": "Sainte-Menehould ist ein ruhiger Argonnen-Stopp zwischen Reims und Lothringen, gut für Kaffee oder Mittag ohne Großstadtstress.",
    toul: "Toul ist ein praktischer letzter Pausenpunkt vor Nancy und hält die Etappe ruhig auf Landstraßen.",
    lunéville: "Lunéville bringt Schloss- und Altstadtflair auf dem Weg von Nancy ins Elsass, ohne einen großen Umweg zu erzeugen.",
    sarrebourg: "Sarrebourg ist auf den Lothringen/Elsass-Etappen ein guter Verschnaufpunkt, bevor die Route wieder in Richtung Vogesen und Weinstraße geht.",
    riquewihr: "Riquewihr ist einer der hübschesten Elsass-Orte, aber oft voll. Für Motorradfahrer am besten als kurzer Fotostopp statt langer Stadtbesuch.",
    colmar: "Colmar ist in Option B der letzte französische Abendort: Altstadt, Restaurants und ein sehr kurzer Heimtag nach Basel am nächsten Morgen.",
    breisach: "Breisach ist ein schöner Rhein-Stopp auf dem kurzen Heimweg. Er gibt dem letzten Tag noch einen Abschluss, ohne Freiburg einzubauen.",
    kandern: "Kandern hält den letzten Abschnitt nach Basel klein und ländlich. Gut als ruhiger Übergang vom Elsass ins Markgräflerland.",
    diner: "Dieser Stopp ist für den USA-Fan gedacht: unkompliziertes Essen, amerikanischer Stil und genug Atmosphäre, ohne dass Militärbasis-Zugang nötig ist.",
    bbq: "BBQ passt besonders gut zum Ramstein-Abend, weil es den US-Bezug aufgreift und nach einem langen Fahrtag unkompliziert funktioniert.",
    burger: "Burger/Diner ist hier bewusst als einfache, gruppentaugliche Abendoption gesetzt: wenig formell, gut planbar und passend zum USA-Thema."
  };
  const match = Object.keys(known).find((key) => lower.includes(key));
  const base = match
    ? known[match]
    : `${name} ist als Stopp eingeplant, weil er nahe an der Tagesroute liegt und eine sinnvolle Pause mit Orientierung, Essen oder kurzer Besichtigung ermöglicht.`;
  return `${base} ${note || ""}`.trim();
}

function attractionCard(attraction, day, sel) {
  const story = placeStory(attraction.name, "attraction", attraction.note);
  const key = `attraction-${slugifyFilename(attraction.name)}`;
  const isSelected = sel.attractionKeys.includes(key);
  return `
    <article class="attraction-card place-open-card${isSelected ? " is-selected" : ""}" tabindex="0" role="button" aria-label="Details zu ${escapeHtmlAttr(attraction.name)} öffnen">
      <button type="button" class="select-toggle-btn" data-select-attraction="${escapeHtmlAttr(key)}" aria-pressed="${isSelected}">
        ${isSelected ? "✓ Ausgewählt" : "Für Route auswählen"}
      </button>
      <div class="place-photo-card attraction-photo-card" data-place-query="${escapeHtmlAttr(attraction.query)}" data-place-address="${escapeHtmlAttr(attraction.area)}" data-place-title="${escapeHtmlAttr(attraction.name)}" data-place-note="${escapeHtmlAttr(attraction.note)}" data-place-story="${escapeHtmlAttr(story)}" data-place-google="${attraction.google}" data-place-lat="${attraction.lat}" data-place-lng="${attraction.lng}" data-place-kind="attraction">
        <div class="place-photo-empty">
          <span>Google-Fotos</span>
          <strong>werden geladen</strong>
        </div>
      </div>
      <div class="attraction-content">
        <p class="hotel-area">${escapeHtml(attraction.area)}</p>
        <h4>${escapeHtml(attraction.name)}</h4>
        <p>${escapeHtml(attraction.note)}</p>
        <div class="link-row">
          <a href="${attraction.google}" target="_blank" rel="noreferrer">Google Maps</a>
        </div>
      </div>
    </article>
  `;
}



const placePhotoCache = new Map();
const PLACES_TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";

function hydratePlacePhotos() {
  const cards = [...document.querySelectorAll(".place-photo-card")];
  if (!cards.length) return;

  cards.forEach((card) => {
    const container = card.closest(".place-open-card, .hotel-card, .meal-card, .attraction-card");
    if (!container || container.dataset.placeOpenBound) return;
    container.dataset.placeOpenBound = "true";
    container.addEventListener("click", (event) => {
      if (event.target.closest("a, button, iframe")) return;
      openPlaceModal(card);
    });
    container.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("a, button")) return;
      event.preventDefault();
      openPlaceModal(card);
    });
  });

  if (!window.GOOGLE_MAPS_API_KEY) {
    cards.forEach((card) => {
      card.classList.add("needs-api-key");
    });
    return;
  }

  cards.forEach(loadPlaceCard);
}

async function loadPlaceCard(card) {
  const query = card.dataset.placeQuery;
  const lat = Number(card.dataset.placeLat);
  const lng = Number(card.dataset.placeLng);
  const kind = card.dataset.placeKind || "place";
  if (!query) return;

  const cacheKey = `${kind}|${query}|${lat}|${lng}`;
  if (placePhotoCache.has(cacheKey)) {
    renderPlaceResult(card, placePhotoCache.get(cacheKey), query, kind);
    return;
  }

  try {
    const place = await searchPlaceRestApi({ query, lat, lng, kind });
    if (!place) {
      renderPlaceEmpty(card, "Kein Google-Treffer", "Maps-Link nutzen");
      return;
    }
    placePhotoCache.set(cacheKey, place);
    renderPlaceResult(card, place, query, kind);
  } catch (error) {
    renderPlaceEmpty(card, "Google Places", readablePlaceStatus(error));
  }
}

async function searchPlaceRestApi({ query, lat, lng, kind }) {
  const baseBody = {
    textQuery: query,
    languageCode: "de",
    regionCode: "DE",
    maxResultCount: 5
  };

  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    baseBody.locationBias = {
      circle: {
        center: { latitude: lat, longitude: lng },
        radius: kind === "hotel" ? 700 : kind === "restaurant" ? 2200 : 12000
      }
    };
  }

  const typedBody = { ...baseBody };
  if (kind === "hotel") typedBody.includedType = "lodging";
  if (kind === "restaurant") typedBody.includedType = "restaurant";

  const searchBodies = kind === "attraction"
    ? [
        baseBody,
        { ...baseBody, textQuery: `${query} Sehenswürdigkeit` },
        { ...baseBody, textQuery: `${query} Altstadt Zentrum` },
        { ...baseBody, includedType: "tourist_attraction" }
      ]
    : [typedBody, baseBody];

  for (const body of searchBodies) {
    const place = await fetchGooglePlace(body);
    if (place?.photos?.length) return place;
    if (place && body === searchBodies[searchBodies.length - 1]) return place;
  }

  return null;
}

async function fetchGooglePlace(body) {
  const response = await fetch(PLACES_TEXT_SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": window.GOOGLE_MAPS_API_KEY,
      "X-Goog-FieldMask": "places.displayName,places.photos.name,places.rating,places.userRatingCount,places.priceLevel,places.googleMapsUri,places.location"
    },
    body: JSON.stringify(body)
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.error) {
    throw new Error(payload.error?.message || `Places HTTP ${response.status}`);
  }
  return pickPhotoPlace(payload.places || []);
}

function pickPhotoPlace(results) {
  return results.find((place) => place.photos?.length) || results[0] || null;
}

function renderPlaceResult(card, place, fallbackName, kind) {
  card.__placeResult = normalizePlaceResult(card, place, fallbackName, kind);
  const { photos, name, rating, count, price } = card.__placeResult;

  if (!photos.length) {
    card.classList.add("no-google-photo");
    card.innerHTML = `
      <div class="place-photo-empty rich-place-empty">
        <span>${escapeHtml(name)}</span>
        <strong>${escapeHtml(rating)}${count ? ` · ${escapeHtml(count)}` : ""}</strong>
        <small>${escapeHtml(kind === "hotel" ? price : "Google liefert hier keine Fotos aus")}</small>
      </div>
    `;
    return;
  }

  const slidesId = `slides-${Math.random().toString(36).slice(2)}`;
  card.innerHTML = `
    <div class="photo-carousel" id="${slidesId}" tabindex="0" aria-label="Google Fotos ${escapeHtml(name)}">
      ${photos.map((src, index) => `<img src="${src}" alt="${escapeHtml(name)} Foto ${index + 1}" loading="lazy" referrerpolicy="origin-when-cross-origin" />`).join("")}
    </div>
    ${photos.length > 1 ? `
      <button class="photo-nav photo-prev" type="button" aria-label="Vorheriges Foto">‹</button>
      <button class="photo-nav photo-next" type="button" aria-label="Nächstes Foto">›</button>
    ` : ""}
    <div class="place-photo-overlay">
      <span>${escapeHtml(name)}</span>
      <strong>${escapeHtml(rating)}${count ? ` · ${escapeHtml(count)}` : ""}</strong>
      <small>${escapeHtml(price)}</small>
    </div>
  `;
  card.querySelector(".photo-prev")?.addEventListener("click", () => scrollPhotoCarousel(card, -1));
  card.querySelector(".photo-next")?.addEventListener("click", () => scrollPhotoCarousel(card, 1));
}

function normalizePlaceResult(card, place, fallbackName, kind) {
  const photos = (place.photos || []).slice(0, 8).map((photo) => photo.name ? googlePhotoUrl(photo.name) : "").filter(Boolean);
  const fallbackTitle = card.dataset.placeTitle || fallbackName;
  const placeLat = place.location?.latitude;
  const placeLng = place.location?.longitude;
  return {
    name: place.displayName?.text || place.displayName || fallbackTitle,
    rating: place.rating ? `${Number(place.rating).toFixed(1)} Sterne` : "Bewertung live prüfen",
    count: place.userRatingCount ? `${place.userRatingCount} Bewertungen` : "",
    price: place.priceLevel ? formatGooglePrice(place.priceLevel) : "Preis live prüfen",
    photos,
    kind,
    note: card.dataset.placeNote || "",
    story: card.dataset.placeStory || "",
    area: card.dataset.placeAddress || "",
    lat: Number.isFinite(placeLat) ? placeLat : card.dataset.placeLat || "",
    lng: Number.isFinite(placeLng) ? placeLng : card.dataset.placeLng || "",
    google: place.googleMapsUri || card.dataset.placeGoogle || ""
  };
}

function openPlaceModal(card) {
  destroyModalMap();
  const data = card.__placeResult || {
    name: card.dataset.placeTitle || card.dataset.placeQuery || "Details",
    rating: "Bewertung live prüfen",
    count: "",
    price: "Preis live prüfen",
    photos: [],
    note: card.dataset.placeNote || "",
    story: card.dataset.placeStory || "",
    area: card.dataset.placeAddress || "",
    lat: card.dataset.placeLat || "",
    lng: card.dataset.placeLng || "",
    google: card.dataset.placeGoogle || ""
  };
  els.placeModalBody.innerHTML = renderPlaceModalContent(data);
  bindModalPhotoControls();
  els.placeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  els.placeModal.querySelector(".place-modal-close")?.focus();
  window.requestAnimationFrame(() => renderPlaceModalMap(data));
}

function closePlaceModal() {
  if (!els.placeModal || els.placeModal.getAttribute("aria-hidden") === "true") return;
  destroyModalMap();
  els.placeModal.setAttribute("aria-hidden", "true");
  els.placeModalBody.innerHTML = "";
  document.body.classList.remove("modal-open");
}

function renderPlaceModalContent(data) {
  const hero = data.photos.length
    ? `<div class="modal-photo-wrap">
        <div class="modal-photo-carousel" data-modal-carousel>${data.photos.map((src, index) => `<img src="${src}" alt="${escapeHtml(data.name)} Foto ${index + 1}" loading="lazy" referrerpolicy="origin-when-cross-origin" />`).join("")}</div>
        ${data.photos.length > 1 ? `
          <button class="modal-photo-nav modal-photo-prev" type="button" data-modal-prev aria-label="Vorheriges Bild">‹</button>
          <button class="modal-photo-nav modal-photo-next" type="button" data-modal-next aria-label="Nächstes Bild">›</button>
          <div class="modal-photo-count" data-modal-count>1 / ${data.photos.length}</div>
        ` : ""}
      </div>`
    : `<div class="modal-photo-empty"><span>Keine Fotos</span><strong>${escapeHtml(data.name)}</strong></div>`;
  const hasLocation = data.lat && data.lng;
  return `
    ${hero}
    <div class="modal-info">
      <p class="eyebrow">${escapeHtml(data.area || "Details")}</p>
      <h2 id="placeModalTitle">${escapeHtml(data.name)}</h2>
      <div class="modal-facts">
        <span>${escapeHtml(data.rating)}${data.count ? ` · ${escapeHtml(data.count)}` : ""}</span>
        <span>${escapeHtml(data.price)}</span>
      </div>
      ${data.note ? `<p>${escapeHtml(data.note)}</p>` : ""}
      ${data.story ? `
        <div class="modal-story">
          <span>Einordnung</span>
          <p>${escapeHtml(data.story)}</p>
        </div>
      ` : ""}
      ${hasLocation ? `
        <div class="modal-location">
          <span>Standort</span>
          <strong>${Number(data.lat).toFixed(5)}, ${Number(data.lng).toFixed(5)}</strong>
          <small>${escapeHtml(data.area || data.name)}</small>
        </div>
      ` : ""}
      <div class="link-row">
        ${data.google ? `<a href="${data.google}" target="_blank" rel="noreferrer">Google Maps</a>` : ""}
      </div>
      ${hasLocation ? `
        <div class="modal-map-card">
          <div class="modal-map-head">
            <span>Kartenansicht</span>
            <strong>${escapeHtml(data.name)}</strong>
          </div>
          <div class="modal-map" data-modal-map aria-label="Kartenansicht von ${escapeHtml(data.name)}"></div>
        </div>
      ` : ""}
    </div>
  `;
}

function renderPlaceModalMap(data) {
  const container = els.placeModalBody.querySelector("[data-modal-map]");
  const lat = Number(data.lat);
  const lng = Number(data.lng);
  if (!container || !Number.isFinite(lat) || !Number.isFinite(lng)) return;

  modalMap = L.map(container, {
    zoomControl: false,
    scrollWheelZoom: false,
    tap: true
  }).setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(modalMap);

  L.control.zoom({ position: "bottomright" }).addTo(modalMap);
  L.marker([lat, lng]).addTo(modalMap).bindPopup(escapeHtml(data.name));

  window.setTimeout(() => modalMap?.invalidateSize(), 120);
}

function destroyModalMap() {
  if (!modalMap) return;
  modalMap.remove();
  modalMap = null;
}

function bindModalPhotoControls() {
  const carousel = els.placeModalBody.querySelector("[data-modal-carousel]");
  if (!carousel) return;
  const images = [...carousel.querySelectorAll("img")];
  const count = els.placeModalBody.querySelector("[data-modal-count]");
  const updateCount = () => {
    if (!count || !images.length) return;
    const index = Math.round(carousel.scrollLeft / Math.max(1, carousel.clientWidth));
    count.textContent = `${Math.min(images.length, index + 1)} / ${images.length}`;
  };
  els.placeModalBody.querySelector("[data-modal-prev]")?.addEventListener("click", () => {
    carousel.scrollBy({ left: -carousel.clientWidth, behavior: "smooth" });
  });
  els.placeModalBody.querySelector("[data-modal-next]")?.addEventListener("click", () => {
    carousel.scrollBy({ left: carousel.clientWidth, behavior: "smooth" });
  });
  carousel.addEventListener("scroll", () => window.requestAnimationFrame(updateCount));
  updateCount();
}

function googlePhotoUrl(photoName) {
  const params = new URLSearchParams({
    maxWidthPx: "1800",
    maxHeightPx: "1200",
    key: window.GOOGLE_MAPS_API_KEY
  });
  return `https://places.googleapis.com/v1/${photoName}/media?${params.toString()}`;
}

function formatGooglePrice(priceLevel) {
  const value = String(priceLevel).replace("PRICE_LEVEL_", "");
  const prices = {
    FREE: "kostenlos",
    INEXPENSIVE: "€",
    MODERATE: "€€",
    EXPENSIVE: "€€€",
    VERY_EXPENSIVE: "€€€€"
  };
  return prices[value] || "Preis live prüfen";
}

function scrollPhotoCarousel(card, direction) {
  const carousel = card.querySelector(".photo-carousel");
  if (!carousel) return;
  carousel.scrollBy({ left: direction * carousel.clientWidth, behavior: "smooth" });
}

function renderPlaceEmpty(card, title, detail) {
  card.innerHTML = `<div class="place-photo-empty"><span>${escapeHtml(title)}</span><strong>${escapeHtml(detail)}</strong></div>`;
}

function readablePlaceStatus(error) {
  const text = typeof error === "string" ? error : error?.message || String(error || "");
  if (text.includes("REQUEST_DENIED")) return "API-Key/Referrer prüfen";
  if (text.includes("RefererNotAllowed") || text.includes("referer")) return "Referrer prüfen";
  if (text.includes("ApiNotActivated") || text.includes("not enabled")) return "Places API (New) aktivieren";
  if (text.includes("OVER_QUERY_LIMIT")) return "Limit erreicht";
  if (text.includes("billing")) return "Billing aktivieren";
  if (text.includes("Failed to fetch") || text.includes("Load failed")) return "Browser blockiert API/CORS";
  return text ? text.replace(/_/g, " ").slice(0, 80) : "bitte API prüfen";
}

function mapEmbedLink(name, address) {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${name} ${address}`)}&output=embed`;
}

function daySearchText(day) {
  return [
    day.title,
    day.distance,
    day.countries.join(" "),
    day.focus,
    day.description,
    day.highlights.join(" "),
    attractionPlan(day).map((item) => `${item.name} ${item.area}`).join(" "),
    day.food?.join(" ") || "",
    day.usaSpots?.map((spot) => `${spot.name} ${spot.area} ${spot.note}`).join(" ") || "",
    mealPlan(day).map((meal) => `${meal.label} ${meal.title} ${meal.place}`).join(" "),
    day.stops.map((stop) => `${stop.name} ${stop.address}`).join(" "),
    day.hotels.map((hotel) => `${hotel.name} ${hotel.area} ${hotel.address}`).join(" ")
  ].join(" ");
}

function stars(count) {
  return "★".repeat(count) + "☆".repeat(5 - count);
}

function normalize(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function escapeHtmlAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

init();
