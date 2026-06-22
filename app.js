const els = {
  dayList: document.querySelector("#dayList"),
  details: document.querySelector("#detailsPanel"),
  search: document.querySelector("#searchInput"),
  showAll: document.querySelector("#showAllBtn"),
  showAllMobile: document.querySelector("#showAllMobile"),
  focusDay: document.querySelector("#focusDayBtn")
};

const colors = ["#ffb84d", "#54d6ff", "#8af08f", "#ff7ca8", "#c8a5ff", "#ffd166", "#47e5bc"];
let routeGeometryData = {};
let allRoutePoints = routeData.flatMap((day) => getRoutePoints(day));
let activeDay = routeData[0];
let routeLayer = L.layerGroup();
let markerLayer = L.layerGroup();
let activeRouteLayer = L.layerGroup();

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
  renderAllRoutes();
  selectDay(1, { fit: false });
  fitAll();
  bindEvents();
}

async function loadRouteGeometry() {
  try {
    const response = await fetch("./data/routeGeometry.json?v=3");
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

  window.addEventListener("resize", () => {
    window.setTimeout(() => {
      map.invalidateSize();
      focusDay(activeDay, { padding: true });
    }, 140);
  });
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

function renderAllRoutes() {
  routeLayer.clearLayers();
  routeData.forEach((day, index) => {
    L.polyline(getRoutePoints(day), {
      color: colors[index % colors.length],
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
  const dayColor = colors[(day.day - 1) % colors.length];
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
      <p class="gpx-note">Finale GPX am besten in Kurviger, Calimoto oder ADAC mit „Autobahn vermeiden“ und „kurvig“ erzeugen.</p>
    </article>

    ${day.food ? `
      <section class="detail-card">
        <h3>Diner & Abendessen</h3>
        <ul class="note-list">${day.food.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    ` : ""}

    <div class="detail-grid">
      <section class="detail-card">
        <h3>Highlights</h3>
        <ul class="chip-list">${day.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section class="detail-card">
        <h3>Motorrad-Hinweise</h3>
        <ul class="note-list">${day.riderNotes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    </div>

    <section class="detail-card">
      <h3>Stoppliste</h3>
      <div class="stop-list">
        ${day.stops.map((stop, index) => stopCard(stop, index, day.day)).join("")}
      </div>
    </section>

    <section class="detail-card">
      <h3>Hotelvorschläge</h3>
      <div class="hotel-grid">
        ${day.hotels.map(hotelCard).join("")}
      </div>
    </section>
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
      <div class="hotel-image">
        <img src="${hotel.image}" alt="${escapeHtml(hotel.imageLabel)} für ${escapeHtml(hotel.name)}" loading="lazy" />
        <span>${escapeHtml(hotel.imageLabel)}</span>
      </div>
      <div class="hotel-content">
        <p class="hotel-area">${escapeHtml(hotel.area)}</p>
        <h4>${escapeHtml(hotel.name)}</h4>
        <p>${escapeHtml(hotel.address)}</p>
        <small>${hotel.lat.toFixed(4)}, ${hotel.lng.toFixed(4)}</small>
        <dl>
          <div><dt>Parken</dt><dd>${escapeHtml(hotel.parking)}</dd></div>
          <div><dt>Vorteil</dt><dd>${escapeHtml(hotel.pro)}</dd></div>
          <div><dt>Nachteil</dt><dd>${escapeHtml(hotel.con)}</dd></div>
        </dl>
        <div class="link-row">
          <a href="${hotel.links.google}" target="_blank" rel="noreferrer">Google</a>
          <a href="${hotel.links.apple}" target="_blank" rel="noreferrer">Apple</a>
        </div>
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
    const color = colors[(day.day - 1) % colors.length];
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
  if (routeGeometryData[day.day]) {
    return routeGeometryData[day.day];
  }
  return day.stops.map((stop) => [stop.lat, stop.lng]);
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

function daySearchText(day) {
  return [
    day.title,
    day.distance,
    day.countries.join(" "),
    day.focus,
    day.description,
    day.highlights.join(" "),
    day.food?.join(" ") || "",
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
