
const resources = [
  {
    title: "Mecanique Du Point",
    description: "Mecanique du point programme pour les etuduiants du FS S1",
    category: "Cours",
    type: "Playlist",
    icon: "⚙️",
    url: "https://youtube.com/playlist?list=PL9niwmraVUM5jA-yLuCkq2wrMCn32-G4Z&si=l46iSRKFBAz2Qjyv"
  },
  {
    title: "Thermodynamique",
    description: "Thermodynamique programme pour les etudiants du FS S1",
    category: "Cours",
    type: "Playlist",
    icon: "⚡",
    url: "https://youtube.com/playlist?list=PLnjaGA_b3hAE_3qitwgY_pni8YSbFqpTb&si=o-z7MeAOWiLvEuTN"
  },
  {
    title: "ThermoChimie",
    description: "thermochimie programme pour les etudiants du FS S1",
    category: "Cours",
    type: "Playlist",
    icon: "⚗️",
    url: "https://youtube.com/playlist?list=PL9niwmraVUM56g9hOJayxDrg58ztT5VTr&si=Vthfi_hz_avd2hOf"
  },
  {
    title: "Atomistique",
    description: "Atomistique programme pour les etudiants du FS S1",
    category: "Cours",
    type: "Playlist",
    icon: "⌬",
    url: "https://youtube.com/playlist?list=PL9niwmraVUM67mZbsmTDKnqMX5XNRJQ5n&si=XC8H6q7AuvOOAala"
  },
  {
    title: "Analyse1",
    description: "Programme d'Analyse pour les etudiants du FS S1",
    category: "Cours",
    type: "Playlist",
    icon: "∑",
    url: "https://youtube.com/playlist?list=PLPJslh6L7zNznWpuSwgX4RNOHStXzKILR&si=D5MdO1hD4Nr6OwP4"
  },
  {
    title: "Algebre1",
    description: "Programme d'Algebre pour les studiants du FS S1",
    category: "Cours",
    type: "Playlist",
    icon: "🖩",
    url: "https://youtube.com/playlist?list=PLh8CSljgwDFTEsLrTYE4J0S8WPKPAd1w5&si=j07UMXySN63tlQlH"
  }
];

const grid = document.getElementById("resourceGrid");
const search = document.getElementById("search");
const filters = document.getElementById("filters");
const count = document.getElementById("count");
const noResults = document.getElementById("noResults");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

let activeFilter = "all";

function renderResources() {
  const query = search.value.trim().toLowerCase();

  const filtered = resources.filter(item => {
    const matchesFilter =
      activeFilter === "all" ||
      item.type === activeFilter;

    const searchableText =
      `${item.title} ${item.description} ${item.category}`.toLowerCase();

    return matchesFilter && searchableText.includes(query);
  });

  count.textContent = filtered.length;
  noResults.hidden = filtered.length !== 0;
  grid.replaceChildren();

  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = "resource-card";

    const top = document.createElement("div");
    top.className = "card-top";

    const icon = document.createElement("div");
    icon.className = "card-icon";
    icon.textContent = item.icon;

    const type = document.createElement("span");
    type.className = "card-type";
    type.textContent = item.type;

    top.append(icon, type);

    const category = document.createElement("p");
    category.className = "card-category";
    category.textContent = item.category;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = item.description;

    const link = document.createElement("a");
    link.className = "card-open";
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const label = document.createElement("span");
    label.textContent = "↗";

    link.append(
      document.createTextNode(
        item.type === "pdf" ? "OPEN DOCUMENT" :
        item.type === "video" ? "WATCH VIDEO" :
        "OPEN RESOURCE"
      ),
      label
    );

    card.append(top, category, title, description, link);
    grid.append(card);
  });
}

filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;

  activeFilter = button.dataset.filter;

  filters.querySelectorAll(".filter").forEach(filter => {
    filter.classList.toggle("active", filter === button);
  });

  renderResources();
});

search.addEventListener("input", renderResources);

menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

renderResources();
