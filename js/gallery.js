/* ==========================================================================
   ICAN UK - GALLERY PAGE - VANILLA JS
   Features: data-driven render, filter, lightbox, load-more, keyboard, swipe
   Depends on existing script.js for nav, scroll-progress, reveal, back-to-top
   ========================================================================== */

const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "conference", label: "Conferences" },
  { id: "cpd", label: "CPD & Meetings" },
  { id: "community", label: "Community" },
  { id: "celebration", label: "Celebrations" },
  { id: "leadership", label: "Leadership" },
  { id: "members", label: "Members" },
  { id: "archive", label: "Archive" },
];

// Central data source - easy to maintain, replace src with real paths later
// Using existing project images as placeholders where real gallery not yet uploaded
const galleryItems = [
  {
    id: 1,
    src: "../images/ICANUKPICNIC241.jpg",
    alt: "ICAN UK members gathering at annual picnic, London",
    category: "community",
    title: "Annual Community Picnic",
    location: "London",
    year: "2024",
    featured: true,
    size: "large",
  },
  {
    id: 2,
    src: "../images/Gallery1.jpeg",
    alt: "Members networking at professional evening",
    category: "members",
    title: "Members' Networking Evening",
    location: "London",
    year: "2024",
    featured: true,
    size: "standard",
  },
  {
    id: 3,
    src: "../images/ICANUKPICNIC241.jpg",
    alt: "Executive team on stage at conference",
    category: "leadership",
    title: "Executive Leadership Session",
    location: "London",
    year: "2023",
    featured: true,
    size: "standard",
  },
  {
    id: 4,
    src: "../images/Gallery1.jpeg",
    alt: "ICAN UK annual conference audience",
    category: "conference",
    title: "Annual Conference 2024",
    location: "London",
    year: "2024",
    size: "large",
  },
  {
    id: 5,
    src: "../images/ICANUKPICNIC241.jpg",
    alt: "CPD technical workshop in progress",
    category: "cpd",
    title: "Technical CPD Workshop",
    location: "London",
    year: "2024",
    size: "tall",
  },
  {
    id: 6,
    src: "../images/Gallery1.jpeg",
    alt: "Members celebrating achievement",
    category: "celebration",
    title: "Fellowship Induction",
    location: "London",
    year: "2023",
    size: "standard",
  },
  {
    id: 7,
    src: "../images/ICANUKPICNIC241.jpg",
    alt: "Chartered accountants group photograph",
    category: "members",
    title: "Members' Group Photograph",
    location: "London",
    year: "2024",
    size: "wide",
  },
  {
    id: 8,
    src: "../images/Gallery1.jpeg",
    alt: "Annual gala dinner moment",
    category: "celebration",
    title: "Annual Gala Dinner",
    location: "London",
    year: "2024",
    size: "standard",
  },
  {
    id: 9,
    src: "../images/ICANUKPICNIC241.jpg",
    alt: "Leadership panel discussion",
    category: "leadership",
    title: "Leadership Panel",
    location: "London",
    year: "2023",
    size: "square",
  },
  {
    id: 10,
    src: "../images/Gallery1.jpeg",
    alt: "Monthly meeting in session",
    category: "cpd",
    title: "Monthly Members Meeting",
    location: "London",
    year: "2024",
    size: "standard",
  },
  {
    id: 11,
    src: "../images/ICANUKPICNIC241.jpg",
    alt: "ICAN UK benevolent outreach",
    category: "community",
    title: "Community Outreach",
    location: "London",
    year: "2023",
    size: "tall",
  },
  {
    id: 12,
    src: "../images/Gallery1.jpeg",
    alt: "Historical archive - early gathering 1990s",
    category: "archive",
    title: "Historical Archive",
    location: "London",
    year: "1998",
    size: "standard",
  },
  {
    id: 13,
    src: "../images/ICANUKPICNIC241.jpg",
    alt: "Conference speakers on stage",
    category: "conference",
    title: "Conference Keynote",
    location: "London",
    year: "2024",
    size: "wide",
  },
  {
    id: 14,
    src: "../images/Gallery1.jpeg",
    alt: "Members mentorship session",
    category: "community",
    title: "Mentorship Session",
    location: "London",
    year: "2024",
    size: "standard",
  },
  {
    id: 15,
    src: "../images/ICANUKPICNIC241.jpg",
    alt: "Award presentation moment",
    category: "celebration",
    title: "Recognition & Awards",
    location: "London",
    year: "2024",
    size: "standard",
  },
  {
    id: 16,
    src: "../images/Gallery1.jpeg",
    alt: "Executive committee meeting",
    category: "leadership",
    title: "Executive Committee",
    location: "London",
    year: "2023",
    size: "square",
  },
  {
    id: 17,
    src: "../images/ICANUKPICNIC241.jpg",
    alt: "Professional gathering group",
    category: "members",
    title: "Professional Gathering",
    location: "London",
    year: "2024",
    size: "standard",
  },
  {
    id: 18,
    src: "../images/Gallery1.jpeg",
    alt: "ICAN UK AGM documentation",
    category: "archive",
    title: "AGM Records",
    location: "London",
    year: "2022",
    size: "large",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  initGalleryFilters();
  initGalleryRender();
  initLightbox();
  initLoadMore();
  initGalleryReveal();
  initHeroScroll();
});

/* ---------- HERO SCROLL TO ARCHIVE ---------- */
function initHeroScroll() {
  const btn = document.querySelector("[data-scroll-to-archive]");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.getElementById("archive");
    if (!target) return;
    const offset = 92;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
}

/* ---------- FILTER RENDERING ---------- */
function initGalleryFilters() {
  const container = document.getElementById("filter-scroll");
  if (!container) return;

  container.innerHTML = "";
  GALLERY_CATEGORIES.forEach((cat, idx) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (cat.id === "all" ? " is-active" : "");
    btn.type = "button";
    btn.dataset.filter = cat.id;
    btn.setAttribute("aria-pressed", cat.id === "all" ? "true" : "false");
    btn.textContent = cat.label;
    if (idx === 0) btn.setAttribute("autofocus", "");
    container.appendChild(btn);
  });

  // Event delegation for filtering
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    const filter = btn.dataset.filter;
    setActiveFilter(filter, container);
    applyFilter(filter);
  });

  // Keyboard: arrow navigation in toolbar
  container.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    const btns = Array.from(container.querySelectorAll(".filter-btn"));
    const current = document.activeElement;
    const idx = btns.indexOf(current);
    if (idx === -1) return;
    e.preventDefault();
    let nextIdx = idx;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % btns.length;
    if (e.key === "ArrowLeft") nextIdx = (idx - 1 + btns.length) % btns.length;
    if (e.key === "Home") nextIdx = 0;
    if (e.key === "End") nextIdx = btns.length - 1;
    btns[nextIdx].focus();
    // Activate on keyboard navigation for accessibility
    const filter = btns[nextIdx].dataset.filter;
    setActiveFilter(filter, container);
    applyFilter(filter);
  });
}

function setActiveFilter(filterId, container) {
  container.querySelectorAll(".filter-btn").forEach((b) => {
    const active = b.dataset.filter === filterId;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function applyFilter(filterId) {
  const items = document.querySelectorAll(".gallery-item");
  let visibleCount = 0;
  items.forEach((el) => {
    const cat = el.dataset.category;
    const shouldShow = filterId === "all" || cat === filterId;
    if (shouldShow) {
      el.classList.remove("is-hidden");
      // Re-trigger reveal for filtered items
      requestAnimationFrame(() => {
        el.classList.add("is-visible");
      });
      visibleCount++;
    } else {
      el.classList.add("is-hidden");
      el.classList.remove("is-visible");
    }
  });

  // Update load more visibility
  const loadMoreWrap = document.querySelector(".gallery-loadmore");
  if (loadMoreWrap) {
    const btn = document.getElementById("load-more");
    const isFiltered = filterId !== "all";
    // If filtering, show all matching, hide load more
    if (isFiltered) {
      document.querySelectorAll(".gallery-item").forEach((el) => {
        if (!el.classList.contains("is-hidden")) el.style.display = "";
      });
      loadMoreWrap.style.display = "none";
    } else {
      // Restore load more logic
      updateLoadMoreState();
    }
  }
}

/* ---------- GALLERY RENDERING ---------- */
let initialVisible = 9; // show 9 first, load more reveals rest
let visibleStep = 6;

function initGalleryRender() {
  const featuredGrid = document.getElementById("featured-grid");
  const mainGrid = document.getElementById("gallery-grid");
  if (!mainGrid) return;

  // Featured: first 3 items marked featured
  const featuredItems = galleryItems.filter((i) => i.featured).slice(0, 3);
  if (featuredGrid) {
    featuredGrid.innerHTML = "";
    featuredItems.forEach((item, index) => {
      const el = createFeaturedElement(item, index);
      featuredGrid.appendChild(el);
    });
  }

  // Main archive: all items
  mainGrid.innerHTML = "";
  galleryItems.forEach((item, index) => {
    const el = createGalleryElement(item, index);
    // Initially hide beyond initialVisible
    if (index >= initialVisible) {
      el.style.display = "none";
      el.dataset.hiddenByLoadMore = "true";
    }
    mainGrid.appendChild(el);
  });

  updateLoadMoreState();
}

function createFeaturedElement(item, index) {
  const div = document.createElement("div");
  div.className = `featured-item reveal ${index === 0 ? "featured-item--main" : ""}`;
  div.tabIndex = 0;
  div.setAttribute("role", "button");
  div.setAttribute("aria-label", `Open ${item.title} in viewer`);
  div.dataset.index = String(item.id);
  div.dataset.category = item.category;

  div.innerHTML = `
    <img src="${item.src}" alt="${escapeHtml(item.alt)}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async">
    <span class="featured-num">${String(index + 1).padStart(2, "0")} / ${item.category.toUpperCase()}</span>
    <div class="featured-caption">
      <span class="featured-kicker">${escapeHtml(item.category)}</span>
      <span class="featured-title">${escapeHtml(item.title)}</span>
      <span class="featured-meta">${escapeHtml(item.location)} · ${escapeHtml(item.year)}</span>
    </div>
  `;

  div.addEventListener("click", () => openLightboxById(item.id));
  div.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightboxById(item.id);
    }
  });

  return div;
}

function createGalleryElement(item, globalIndex) {
  const article = document.createElement("article");
  const sizeClass = `gallery-item--${item.size || "standard"}`;
  article.className = `gallery-item ${sizeClass} reveal`;
  article.dataset.category = item.category;
  article.dataset.id = String(item.id);
  article.dataset.index = String(globalIndex);
  article.tabIndex = 0;
  article.setAttribute("role", "button");
  article.setAttribute("aria-label", `View ${item.title}, ${item.location} ${item.year}`);

  article.innerHTML = `
    <figure>
      <img src="${item.src}" alt="${escapeHtml(item.alt)}" loading="lazy" decoding="async">
      <span class="gallery-item-num">${String(globalIndex + 1).padStart(2, "0")}</span>
      <figcaption>
        <span class="gallery-item-kicker">${escapeHtml(item.category)}</span>
        <span class="gallery-item-title">${escapeHtml(item.title)}</span>
        <span class="gallery-item-meta">${escapeHtml(item.location)} · ${escapeHtml(item.year)}</span>
      </figcaption>
    </figure>
  `;

  article.addEventListener("click", () => openLightboxById(item.id));
  article.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightboxById(item.id);
    }
  });

  return article;
}

/* ---------- LOAD MORE ---------- */
function initLoadMore() {
  const btn = document.getElementById("load-more");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const hidden = Array.from(document.querySelectorAll('.gallery-item[data-hidden-by-load-more="true"]')).filter(
      (el) => el.style.display === "none" && !el.classList.contains("is-hidden")
    );
    // If filtering active, we already show all; this is for unfiltered
    const allHiddenByLoadMore = document.querySelectorAll('.gallery-item[data-hidden-by-load-more="true"]');
    let revealed = 0;
    allHiddenByLoadMore.forEach((el) => {
      if (el.style.display === "none" && revealed < visibleStep) {
        el.style.display = "";
        el.dataset.hiddenByLoadMore = "false";
        // Trigger reveal animation
        requestAnimationFrame(() => {
          el.classList.add("is-visible");
        });
        revealed++;
      }
    });
    updateLoadMoreState();
  });
}

function updateLoadMoreState() {
  const wrap = document.querySelector(".gallery-loadmore");
  const btn = document.getElementById("load-more");
  if (!wrap || !btn) return;
  const remaining = document.querySelectorAll('.gallery-item[data-hidden-by-load-more="true"][style*="display: none"], .gallery-item[data-hidden-by-load-more="true"][style="display: none;"], .gallery-item[data-hidden-by-load-more="true"]:not([style])').length;
  // More robust check
  const hiddenCount = Array.from(document.querySelectorAll('.gallery-item[data-hidden-by-load-more="true"]')).filter(
    (el) => el.style.display === "none"
  ).length;
  if (hiddenCount === 0) {
    wrap.style.display = "none";
  } else {
    wrap.style.display = "flex";
    btn.textContent = `Load More Moments (${hiddenCount} remaining)`;
  }
}

/* ---------- REVEAL OBSERVER FOR GALLERY ---------- */
function initGalleryReveal() {
  const els = document.querySelectorAll(".gallery-item, .featured-item, .reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- LIGHTBOX ---------- */
let currentLightboxId = null;
let lastFocusedElement = null;
let touchStartX = 0;
let touchEndX = 0;

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = lightbox?.querySelector(".lightbox-close");
  const prevBtn = lightbox?.querySelector(".lightbox-prev");
  const nextBtn = lightbox?.querySelector(".lightbox-next");
  const img = document.getElementById("lightbox-img");

  if (!lightbox || !closeBtn || !prevBtn || !nextBtn || !img) return;

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => navigateLightbox(-1));
  nextBtn.addEventListener("click", () => navigateLightbox(1));

  // Click outside image closes
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-main") || e.target.classList.contains("lightbox-figure")) {
      closeLightbox();
    }
  });

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      navigateLightbox(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      navigateLightbox(1);
    }
  });

  // Touch swipe
  const figure = lightbox.querySelector(".lightbox-figure");
  if (figure) {
    figure.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    figure.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );
  }

  // Prevent body scroll when open is handled in open/close
}

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  const threshold = 42;
  if (Math.abs(diff) < threshold) return;
  if (diff > 0) {
    navigateLightbox(1); // swipe left -> next
  } else {
    navigateLightbox(-1);
  }
}

function openLightboxById(id) {
  const item = galleryItems.find((g) => g.id === id);
  if (!item) return;
  currentLightboxId = id;
  lastFocusedElement = document.activeElement;
  renderLightbox(item);
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  // Focus close for accessibility
  const closeBtn = lightbox.querySelector(".lightbox-close");
  closeBtn?.focus({ preventScroll: true });
}

function renderLightbox(item) {
  const img = document.getElementById("lightbox-img");
  const title = document.getElementById("lightbox-title");
  const meta = document.getElementById("lightbox-meta");
  const count = document.getElementById("lightbox-count");

  if (!img || !title || !meta || !count) return;

  // Update with transition
  img.style.opacity = "0";
  img.style.transform = "scale(0.96)";
  setTimeout(() => {
    img.src = item.src;
    img.alt = item.alt;
    title.textContent = item.title;
    meta.textContent = `${item.category.toUpperCase()} • ${item.location} · ${item.year}`;
    const currentIndex = galleryItems.findIndex((g) => g.id === item.id) + 1;
    count.textContent = `${String(currentIndex).padStart(2, "0")} / ${String(galleryItems.length).padStart(2, "0")}`;

    requestAnimationFrame(() => {
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    });
  }, 120);
}

function navigateLightbox(direction) {
  if (currentLightboxId === null) return;
  const currentIdx = galleryItems.findIndex((g) => g.id === currentLightboxId);
  if (currentIdx === -1) return;
  let nextIdx = currentIdx + direction;
  // Loop
  if (nextIdx < 0) nextIdx = galleryItems.length - 1;
  if (nextIdx >= galleryItems.length) nextIdx = 0;
  const nextItem = galleryItems[nextIdx];
  currentLightboxId = nextItem.id;
  renderLightbox(nextItem);
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  currentLightboxId = null;
  // Restore focus
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus({ preventScroll: true });
  }
}

/* ---------- UTILS ---------- */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Expose for debugging if needed
window.ICAN_GALLERY = {
  items: galleryItems,
  categories: GALLERY_CATEGORIES,
  open: openLightboxById,
};



/* WCAG 2.2 Enhancements for gallery.js */
(function() {
  // Ensure modals/lightboxes have proper focus trap and aria
  function enhanceModals() {
    const modals = document.querySelectorAll('[id*="modal"], [id*="lightbox"], .lightbox, .e-modal');
    modals.forEach(modal => {
      if (!modal.hasAttribute('role')) modal.setAttribute('role', 'dialog');
      if (!modal.hasAttribute('aria-modal')) modal.setAttribute('aria-modal', 'true');
      // Ensure close buttons have accessible names
      const closeBtns = modal.querySelectorAll('.close, [class*="close"]');
      closeBtns.forEach(btn => {
        if (!btn.hasAttribute('aria-label')) btn.setAttribute('aria-label', 'Close dialog');
        if (!btn.hasAttribute('type')) btn.setAttribute('type', 'button');
      });
    });
  }

  // Ensure all interactive cards are keyboard accessible - 2.1.1
  function enhanceCards() {
    const cards = document.querySelectorAll('.org-card, .exec-card, .gallery-item, .event-card, .past-card, .benevolent-card, .news-card');
    cards.forEach(card => {
      if (!card.hasAttribute('tabindex') && card.classList.contains('org-card')) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        if (!card.hasAttribute('aria-label')) card.setAttribute('aria-label', 'View details');
      }
      // Add keyboard handler if not already
      if (!card.dataset.wcagEnhanced) {
        card.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
          }
        });
        card.dataset.wcagEnhanced = 'true';
      }
    });
  }

  // Ensure accordions have proper ARIA - 4.1.2 Name Role Value
  function enhanceAccordions() {
    const triggers = document.querySelectorAll('.accordion-trigger, .drawer-accordion, .standing-trigger, [aria-expanded]');
    triggers.forEach(trigger => {
      if (!trigger.hasAttribute('type')) trigger.setAttribute('type', 'button');
      // Ensure aria-controls exists and panel has appropriate role
      const controls = trigger.getAttribute('aria-controls');
      if (controls) {
        const panel = document.getElementById(controls);
        if (panel) {
          if (!panel.hasAttribute('role')) panel.setAttribute('role', 'region');
          if (!panel.hasAttribute('aria-labelledby')) {
            if (trigger.id) panel.setAttribute('aria-labelledby', trigger.id);
          }
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    enhanceModals();
    enhanceCards();
    enhanceAccordions();
  });
})();
