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
  placeModal: document.querySelector("#placeModal"),
  placeModalBody: document.querySelector("#placeModalBody")
};

const colors = ["#ffb84d", "#54d6ff", "#8af08f", "#ff7ca8", "#c8a5ff", "#ffd166", "#47e5bc"];
const dayColorOverrides = {
  13: "#e879f9"
};
let routeGeometryData = {};
let allRoutePoints = routeData.flatMap((day) => getRoutePoints(day));
let activeDay = routeData[0];
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
  renderDayList(routeData);
  renderPrintDayPicker();
  renderAllRoutes();
  selectDay(1, { fit: false });
  fitAll();
  bindEvents();
}

async function loadRouteGeometry() {
  try {
    const response = await fetch("./data/routeGeometry.json?v=10");
    if (!response.ok) throw new Error(`Route geometry HTTP ${response.status}`);
    const payload = await response.json();
    routeGeometryData = payload.geometry || {};
    allRoutePoints = routeData.flatMap((day) => getRoutePoints(day));
  } catch (error) {
    console.warn("Straßengeometrie konnte nicht geladen werden, nutze Zwischenpunkte.", error);
  }
}

function bindEvents() {
  els.search.addEventListener("input", () => {
    const query = normalize(els.search.value);
    const filtered = routeData.filter((day) => normalize(daySearchText(day)).includes(query));
    renderDayList(filtered);
  });

  els.showAll.addEventListener("click", fitAll);
  els.showAllMobile.addEventListener("click", fitAll);
  els.focusDay.addEventListener("click", () => focusDay(activeDay));
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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePlaceModal();
  });

  window.addEventListener("resize", () => {
    window.setTimeout(() => {
      map.invalidateSize();
      focusDay(activeDay, { padding: true });
    }, 140);
  });
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
  els.printDayPicker.innerHTML = routeData.map((day) => `
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
  if (els.printScope.value === "all") return routeData;
  if (els.printScope.value === "custom") {
    const selected = [...els.printDayPicker.querySelectorAll("input:checked")].map((input) => Number(input.value));
    return routeData.filter((day) => selected.includes(day.day));
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
  const scopeText = days.length === routeData.length ? `Alle ${routeData.length} Tage` : days.map((day) => `Tag ${day.day}`).join(", ");
  return `
    <div class="print-document">
      <header class="print-title">
        <p>Motorradreise Juli 2026 · Basel - Caen - Basel</p>
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
  routeData.forEach((day) => {
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
  activeDay = routeData.find((day) => day.day === dayNumber) || routeData[0];
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
      <div class="route-actions">
        <a href="${googleRouteLink(day)}" target="_blank" rel="noreferrer">Google Tagesroute</a>
        <a href="${appleDestinationLink(day)}" target="_blank" rel="noreferrer">Apple Ziel</a>
        <button type="button" onclick="focusDay(routeData[${day.day - 1}])">Tag fokussieren</button>
      </div>
      <p class="gpx-note">Kartenlinie ist mit Autobahn/Maut vermeiden berechnet. Finale GPX trotzdem am besten in Kurviger, Calimoto oder ADAC mit „Autobahn vermeiden“ und „kurvig“ erzeugen.</p>
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
        ${attractionPlan(day).map(attractionCard).join("")}
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
          ${day.usaSpots.map(usaSpotCard).join("")}
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
        ${day.hotels.map(hotelCard).join("")}
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
          <a href="${stop.links.google}" target="_blank" rel="noreferrer">Google</a>
          <a href="${stop.links.apple}" target="_blank" rel="noreferrer">Apple</a>
          <a href="${stop.links.osm}" target="_blank" rel="noreferrer">OSM</a>
        </div>
      </div>
    </article>
  `;
}

function hotelCard(hotel) {
  return `
    <article class="hotel-card">
      <div class="place-photo-card" data-place-query="${escapeHtmlAttr(hotel.name)}" data-place-address="${escapeHtmlAttr(hotel.address)}" data-place-title="${escapeHtmlAttr(hotel.name)}" data-place-note="${escapeHtmlAttr(`${hotel.area} · ${hotel.parking}`)}" data-place-google="${hotel.links.google}" data-place-apple="${hotel.links.apple}" data-place-lat="${hotel.lat}" data-place-lng="${hotel.lng}" data-place-kind="hotel">
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
          <a href="${hotel.links.apple}" target="_blank" rel="noreferrer">Apple Karten</a>
        </div>
      </div>
    </article>
  `;
}

function usaSpotCard(spot) {
  return `
    <article class="attraction-card place-open-card" tabindex="0" role="button" aria-label="Details zu ${escapeHtmlAttr(spot.name)} öffnen">
      <div class="place-photo-card attraction-photo-card" data-place-query="${escapeHtmlAttr(spot.query)}" data-place-address="${escapeHtmlAttr(spot.area)}" data-place-title="${escapeHtmlAttr(spot.name)}" data-place-note="${escapeHtmlAttr(spot.note)}" data-place-google="${spot.links.google}" data-place-apple="${spot.links.apple}" data-place-lat="${spot.lat}" data-place-lng="${spot.lng}" data-place-kind="${spot.kind}">
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
          <a href="${spot.links.apple}" target="_blank" rel="noreferrer">Apple Karten</a>
        </div>
      </div>
    </article>
  `;
}

function mealCard(meal) {
  return `
    <article class="meal-card">
      <div class="meal-time">
        <span>${escapeHtml(meal.label)}</span>
        <strong>${escapeHtml(meal.time)}</strong>
      </div>
      <h4>${escapeHtml(meal.title)}</h4>
      <p>${escapeHtml(meal.place)} · ${escapeHtml(meal.note)}</p>
      <div class="place-photo-card meal-photo-card" data-place-query="${escapeHtmlAttr(meal.search)}" data-place-address="${escapeHtmlAttr(meal.place)}" data-place-title="${escapeHtmlAttr(meal.title)}" data-place-note="${escapeHtmlAttr(`${meal.label} ${meal.time} · ${meal.note}`)}" data-place-google="${meal.google}" data-place-apple="${meal.apple}" data-place-lat="${meal.lat}" data-place-lng="${meal.lng}" data-place-kind="restaurant">
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
        <a href="${meal.apple}" target="_blank" rel="noreferrer">Apple Karten</a>
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
  routeData.forEach((day, index) => {
    const start = day.stops[0];
    const position = offsetDuplicate(start, index, routeData.map((item) => item.stops[0]));
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
  return dayColorOverrides[day.day] || colors[(day.day - 1) % colors.length];
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

function googleRouteLink(day) {
  const origin = day.stops[0];
  const destination = day.stops[day.stops.length - 1];
  const waypoints = day.stops.slice(1, -1).map((stop) => `${stop.lat},${stop.lng}`).join("|");
  const params = new URLSearchParams({
    api: "1",
    travelmode: "driving",
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`
  });
  if (waypoints) params.set("waypoints", waypoints);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function appleDestinationLink(day) {
  const destination = day.stops[day.stops.length - 1];
  return `https://maps.apple.com/?daddr=${destination.lat},${destination.lng}&dirflg=d`;
}

function mealPlan(day) {
  const breakfastStop = day.stops[Math.min(1, day.stops.length - 1)];
  const lunchStop = day.stops[Math.floor((day.stops.length - 1) * 0.52)];
  const dinnerStop = day.stops[day.stops.length - 1];
  const dinnerQuery = day.day === 1
    ? "The BBQ Connection Ramstein American BBQ diner"
    : "gutes Restaurant";

  return [
    makeMeal("Frühstück", "08:00-09:00", "Café oder Bäckerei", breakfastStop, "früh am Tagesstart, bevor die längeren Landstraßen kommen", 12, "cafe frühstück bäckerei"),
    makeMeal("Mittag", "12:30-14:00", "Bistro oder Brasserie", lunchStop, "ungefähr zur Tagesmitte, gut für Fahrerpause und Flüssigkeit", 52, "restaurant bistro brasserie lunch"),
    makeMeal("Abendessen", "18:30-20:30", day.day === 1 ? "Diner / BBQ im Ramstein-Umfeld" : "Restaurant am Zielort", dinnerStop, "erst nach Ankunft und Hotel-Check-in", 95, dinnerQuery)
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
    apple: `https://maps.apple.com/?q=${encoded}&ll=${stop.lat},${stop.lng}`,
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
      google: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
      apple: `https://maps.apple.com/?q=${encoded}&ll=${anchor.lat},${anchor.lng}`
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

function attractionCard(attraction) {
  return `
    <article class="attraction-card place-open-card" tabindex="0" role="button" aria-label="Details zu ${escapeHtmlAttr(attraction.name)} öffnen">
      <div class="place-photo-card attraction-photo-card" data-place-query="${escapeHtmlAttr(attraction.query)}" data-place-address="${escapeHtmlAttr(attraction.area)}" data-place-title="${escapeHtmlAttr(attraction.name)}" data-place-note="${escapeHtmlAttr(attraction.note)}" data-place-google="${attraction.google}" data-place-apple="${attraction.apple}" data-place-lat="${attraction.lat}" data-place-lng="${attraction.lng}" data-place-kind="attraction">
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
          <a href="${attraction.apple}" target="_blank" rel="noreferrer">Apple Karten</a>
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
    area: card.dataset.placeAddress || "",
    lat: Number.isFinite(placeLat) ? placeLat : card.dataset.placeLat || "",
    lng: Number.isFinite(placeLng) ? placeLng : card.dataset.placeLng || "",
    google: place.googleMapsUri || card.dataset.placeGoogle || "",
    apple: card.dataset.placeApple || ""
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
    area: card.dataset.placeAddress || "",
    lat: card.dataset.placeLat || "",
    lng: card.dataset.placeLng || "",
    google: card.dataset.placeGoogle || "",
    apple: card.dataset.placeApple || ""
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
      ${hasLocation ? `
        <div class="modal-location">
          <span>Standort</span>
          <strong>${Number(data.lat).toFixed(5)}, ${Number(data.lng).toFixed(5)}</strong>
          <small>${escapeHtml(data.area || data.name)}</small>
        </div>
      ` : ""}
      <div class="link-row">
        ${data.google ? `<a href="${data.google}" target="_blank" rel="noreferrer">Google Maps</a>` : ""}
        ${data.apple ? `<a href="${data.apple}" target="_blank" rel="noreferrer">Apple Karten</a>` : ""}
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
