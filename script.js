const animeData = [
  {
    id: "black-clover", title: "Black Clover", year: 2017, rating: 8.2,
    genre: "Fantasy", tags: ["Action", "Fantasy", "Adventure"], status: "Series",
    image: "file:///C:/Users/hp/Downloads/Black%20clover%20wallpaper.jpg",
    description: "In a world where magic is everything, Asta dreams of becoming the Wizard King despite being born without magic. A story about persistence, friendship and refusing to give up."
  },
  {
    id: "demon-slayer", title: "Demon Slayer", year: 2019, rating: 8.6,
    genre: "Action", tags: ["Action", "Fantasy", "Adventure"], status: "Series",
    image: "https://i.pinimg.com/736x/1c/72/5d/1c725d2171bec51c84a1b9a37610e7ed.jpg",
    description: "A determined young swordsman joins the fight against demons while searching for a way to save his sister. Known for intense battles and emotional storytelling."
  },
  {
    id: "jujutsu-kaisen", title: "Jujutsu Kaisen", year: 2020, rating: 8.5,
    genre: "Action", tags: ["Action", "Fantasy"], status: "Series",
    image: "file:///C:/Users/hp/Downloads/download%20(2).jpg",
    description: "A high-school student enters the dangerous world of curses and sorcerers after a fateful encounter. Dark supernatural action with a memorable cast."
  },
  {
    id: "attack-on-titan", title: "Attack on Titan", year: 2013, rating: 9.1,
    genre: "Drama", tags: ["Action", "Drama", "Mystery"], status: "Completed",
    image: "https://i.pinimg.com/736x/38/3b/40/383b40764209d941b87f4d9933777778.jpg",
    description: "Humanity fights for survival behind enormous walls while uncovering disturbing truths about their world. A tense story of freedom, war and sacrifice."
  },
  {
    id: "one-piece", title: "One Piece", year: 1999, rating: 9.0,
    genre: "Adventure", tags: ["Action", "Adventure", "Fantasy"], status: "Ongoing",
    image: "https://i.pinimg.com/736x/c6/79/d1/c679d1686eb0ffeef8de5a755db59e5c.jpg",
    description: "Monkey D. Luffy and his crew sail toward the ultimate treasure, meeting friends, rivals and mysteries across a vast ocean."
  },
  {
    id: "my-hero-academia", title: "My Hero Academia", year: 2016, rating: 8.0,
    genre: "Action", tags: ["Action", "Drama"], status: "Series",
    image: "https://i.pinimg.com/1200x/04/8b/99/048b9913d697804666fa1a88f000f4f9.jpg",
    description: "In a society where superpowers are common, a determined boy works to become the hero he has always admired."
  },
  {
    id: "solo-leveling", title: "Solo Leveling", year: 2024, rating: 8.7,
    genre: "Fantasy", tags: ["Action", "Fantasy"], status: "Series",
    image: "https://i.pinimg.com/736x/7a/1b/a6/7a1ba6f2c0af20ea586a87c5e9ff789b.jpg",
    description: "A low-ranked hunter receives a mysterious ability that lets him grow stronger, changing his fate in a world filled with dangerous gates."
  },
  {
    id: "your-name", title: "Your Name", year: 2016, rating: 8.4,
    genre: "Drama", tags: ["Drama", "Fantasy"], status: "Movie",
    image: "https://i.pinimg.com/736x/dd/c5/6b/ddc56b1fde7205b54fba8afb93e592c9.jpg",
    description: "Two teenagers mysteriously begin switching lives and try to find each other across distance, time and an extraordinary connection."
  },
  {
    id: "dr-stone", title: "Dr. Stone", year: 2019, rating: 8.1,
    genre: "Sci-Fi", tags: ["Adventure", "Sci-Fi"], status: "Series",
    image: "https://i.pinimg.com/1200x/44/e2/6e/44e26ec5ff6029faa65023ea0a141891.jpg",
    description: "After humanity is mysteriously petrified, a science-loving teenager sets out to rebuild civilization using knowledge and experimentation."
  },
  {
    id: "death-note", title: "Death Note", year: 2006, rating: 8.9,
    genre: "Mystery", tags: ["Drama", "Mystery"], status: "Completed",
    image: "https://i.pinimg.com/736x/a1/18/36/a11836d4b5f6ef8f503a875213e52ffa.jpg",
    description: "A brilliant student discovers a notebook with deadly power, setting off a battle of strategy, morality and intellect."
  },
  {
    id: "mob-psycho", title: "Mob Psycho 100", year: 2016, rating: 8.6,
    genre: "Adventure", tags: ["Action", "Comedy", "Adventure"], status: "Completed",
    image: "https://i.pinimg.com/1200x/09/7a/67/097a67616865e6f2208ef9969e73e44f.jpg",
    description: "A quiet psychic boy tries to understand himself and others while learning that raw power is not what makes a person valuable."
  },
  {
    id: "steins-gate", title: "Steins;Gate", year: 2011, rating: 9.0,
    genre: "Sci-Fi", tags: ["Drama", "Sci-Fi", "Mystery"], status: "Completed",
    image: "https://i.pinimg.com/1200x/d0/df/0a/d0df0a444f5581d2ddd842e2ea759a15.jpg",
    description: "A group of friends discover a way to send messages into the past, setting off a chain of events with serious consequences."
  }
];

const grid = document.querySelector("#anime-grid");
const watchlistGrid = document.querySelector("#watchlist-grid");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const resultsLine = document.querySelector("#results-line");
const emptyState = document.querySelector("#empty-state");
const watchlistEmpty = document.querySelector("#watchlist-empty");
const watchlistCount = document.querySelector("#watchlist-count");
const dialog = document.querySelector("#details-dialog");
const dialogContent = document.querySelector("#dialog-content");
const toast = document.querySelector("#toast");

let activeGenre = "All";
let currentSearch = "";
let toastTimer;

function getSavedIds() {
  try {
    const saved = JSON.parse(localStorage.getItem("animeverse-watchlist") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveIds(ids) {
  try {
    localStorage.setItem("animeverse-watchlist", JSON.stringify(ids));
  } catch {
    showToast("Could not save list in this browser.");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function cardTemplate(anime) {
  const saved = getSavedIds().includes(anime.id);
  return `
    <article class="anime-card">
      <div class="poster">
        <img src="${anime.image}" alt="${escapeHtml(anime.title)} artwork" loading="lazy"
             onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg,#25131b,#111827,#541222)'">
        <span class="poster-badge">${escapeHtml(anime.status)}</span>
        <button class="heart-btn ${saved ? "saved" : ""}" data-save="${anime.id}"
          type="button" aria-label="${saved ? "Remove from" : "Add to"} watchlist" title="Save to my list">${saved ? "♥" : "♡"}</button>
      </div>
      <div class="card-info">
        <div class="card-topline"><span>${anime.year} · ${escapeHtml(anime.genre)}</span><span class="rating">★ ${anime.rating.toFixed(1)}</span></div>
        <h3>${escapeHtml(anime.title)}</h3>
        <p>${escapeHtml(anime.description)}</p>
        <div class="card-bottom">
          <span class="genre-label">${anime.tags.map(escapeHtml).join(" · ")}</span>
          <button class="details-btn" data-details="${anime.id}" type="button">Details ↗</button>
        </div>
      </div>
    </article>`;
}

function filteredAnime() {
  let items = animeData.filter(anime => {
    const matchesGenre = activeGenre === "All" || anime.tags.includes(activeGenre) || anime.genre === activeGenre;
    const haystack = `${anime.title} ${anime.genre} ${anime.tags.join(" ")} ${anime.year}`.toLowerCase();
    return matchesGenre && haystack.includes(currentSearch.toLowerCase().trim());
  });

  if (sortSelect.value === "rating") items.sort((a, b) => b.rating - a.rating);
  if (sortSelect.value === "title") items.sort((a, b) => a.title.localeCompare(b.title));
  return items;
}

function renderCatalog() {
  const items = filteredAnime();
  grid.innerHTML = items.map(cardTemplate).join("");
  resultsLine.textContent = `Showing ${items.length} of ${animeData.length} titles`;
  emptyState.classList.toggle("hidden", items.length !== 0);
}

function renderWatchlist() {
  const ids = getSavedIds();
  const items = ids.map(id => animeData.find(anime => anime.id === id)).filter(Boolean);
  watchlistGrid.innerHTML = items.map(cardTemplate).join("");
  watchlistEmpty.classList.toggle("hidden", items.length !== 0);
  watchlistCount.textContent = items.length;
}

function renderAll() {
  renderCatalog();
  renderWatchlist();
}

function setGenre(genre) {
  activeGenre = genre;
  document.querySelectorAll("[data-genre]").forEach(button => {
    button.classList.toggle("active", button.dataset.genre === genre);
  });
  renderCatalog();
}

function toggleSaved(id) {
  const ids = getSavedIds();
  const anime = animeData.find(item => item.id === id);
  if (!anime) return;
  const exists = ids.includes(id);
  const next = exists ? ids.filter(savedId => savedId !== id) : [...ids, id];
  saveIds(next);
  renderAll();
  showToast(exists ? `${anime.title} removed from your list` : `${anime.title} added to your list`);
}

function openDetails(id) {
  const anime = animeData.find(item => item.id === id);
  if (!anime) return;
  const saved = getSavedIds().includes(id);
  dialogContent.innerHTML = `
    <div class="dialog-hero" style="background-image:linear-gradient(0deg,#121218,transparent 75%),url('${anime.image}')"></div>
    <div class="dialog-body">
      <p class="eyebrow">${escapeHtml(anime.genre)} · ${anime.year}</p>
      <h2>${escapeHtml(anime.title)}</h2>
      <div class="dialog-meta"><span class="rating">★ ${anime.rating.toFixed(1)}</span><span>${escapeHtml(anime.status)}</span><span>${anime.tags.map(escapeHtml).join(" · ")}</span></div>
      <p>${escapeHtml(anime.description)}</p>
      <p><strong>Note:</strong> This is an anime discovery demo. It does not host or play episodes.</p>
      <button class="btn btn-primary" data-save="${anime.id}" type="button">${saved ? "♥ Remove from my list" : "♡ Add to my list"}</button>
    </div>`;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else alert(`${anime.title}\n\n${anime.description}`);
}

document.addEventListener("click", event => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    toggleSaved(saveButton.dataset.save);
    if (dialog.open) openDetails(saveButton.dataset.save);
    return;
  }
  const detailsButton = event.target.closest("[data-details]");
  if (detailsButton) {
    openDetails(detailsButton.dataset.details);
    return;
  }
  const genreButton = event.target.closest("[data-genre]");
  if (genreButton) {
    setGenre(genreButton.dataset.genre);
    return;
  }
  const genreTile = event.target.closest("[data-genre-tile]");
  if (genreTile) {
    setGenre(genreTile.dataset.genreTile);
    document.querySelector("#catalog").scrollIntoView({ behavior: "smooth" });
  }
});

searchInput.addEventListener("input", event => {
  currentSearch = event.target.value;
  renderCatalog();
});

sortSelect.addEventListener("change", renderCatalog);

document.querySelector("#reset-filters").addEventListener("click", () => {
  currentSearch = "";
  searchInput.value = "";
  sortSelect.value = "featured";
  setGenre("All");
});

document.querySelector("#clear-watchlist").addEventListener("click", () => {
  if (getSavedIds().length === 0) {
    showToast("Your list is already empty.");
    return;
  }
  saveIds([]);
  renderAll();
  showToast("Your watchlist has been cleared.");
});

document.querySelector("#surprise-btn").addEventListener("click", () => {
  const anime = animeData[Math.floor(Math.random() * animeData.length)];
  openDetails(anime.id);
});

document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && dialog.open) dialog.close();
});

renderAll();
