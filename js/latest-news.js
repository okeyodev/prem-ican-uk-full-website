
/* ==========================================================================
   NEWS PAGE — Latest News editorial system
   ========================================================================== */

const newsArticles = [
  {
    id: 1,
    title:
      "[Placeholder] ICAN UK Annual Conference 2026 — London Programme Announced",
    category: "Events",
    date: "2026-09-12",
    dateLabel: "12 September 2026",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Placeholder excerpt: Replace with actual conference announcement. This featured story highlights the flagship gathering, CPD tracks and community programme for ICAN UK members across the UK.",
    featured: true,
    href: "#",
    readTime: "4 min read",
  },
  {
    id: 2,
    title:
      "[Placeholder] Professional Update: Technical Resources for Chartered Accountants",
    category: "Professional",
    date: "2026-09-08",
    dateLabel: "8 September 2026",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Placeholder: New technical resources, CPD materials and practice guidance curated for ICAN UK members. Replace with actual resource update.",
    featured: false,
    href: "#",
    readTime: "3 min read",
  },
  {
    id: 3,
    title:
      "[Placeholder] Community Story: Mentorship and Growth in the UK District",
    category: "Community",
    date: "2026-09-05",
    dateLabel: "5 September 2026",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Placeholder: How ICAN UK mentors newly qualified accountants and supports professional growth across London and beyond.",
    featured: false,
    href: "#",
    readTime: "5 min read",
  },
  {
    id: 4,
    title:
      "[Placeholder] ICAN UK Governance Update: Committee and Executive Team",
    category: "ICAN UK",
    date: "2026-09-01",
    dateLabel: "1 September 2026",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Placeholder: Oversight, standards and continuity — update on governance, bylaws and leadership. Replace with official announcement.",
    featured: false,
    href: "#",
    readTime: "3 min read",
  },
  {
    id: 5,
    title:
      "[Placeholder] Benevolent Fund and Welfare Support — Notice to Members",
    category: "Announcements",
    date: "2026-08-28",
    dateLabel: "28 August 2026",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Placeholder: Information on welfare, benevolence and member support services. Replace with verified welfare notice.",
    featured: false,
    href: "#",
    readTime: "2 min read",
  },
  {
    id: 6,
    title:
      "[Placeholder] Monthly Meeting Recap: Technical Session and Networking",
    category: "Events",
    date: "2026-08-22",
    dateLabel: "22 August 2026",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Placeholder: Recap of the latest monthly meeting, CPD highlights and community networking. Replace with actual meeting summary.",
    featured: false,
    href: "#",
    readTime: "4 min read",
  },
  {
    id: 7,
    title:
      "[Placeholder] Professional Development: CPD Certificates and Member Hub Access",
    category: "Professional",
    date: "2026-08-18",
    dateLabel: "18 August 2026",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Placeholder: How members can access CPD certificates, directory and mentorship via the ICAN UK Member Hub.",
    featured: false,
    href: "#",
    readTime: "3 min read",
  },
  {
    id: 8,
    title:
      "[Placeholder] Gallery Update: Annual Gala and Community Celebrations",
    category: "Community",
    date: "2026-08-10",
    dateLabel: "10 August 2026",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Placeholder: Highlights from recent community events, annual gala and cultural celebrations. Replace with real gallery.",
    featured: false,
    href: "#",
    readTime: "2 min read",
  },
  {
    id: 9,
    title:
      "[Placeholder] Announcement: Membership Applications and Renewal Process",
    category: "Announcements",
    date: "2026-08-02",
    dateLabel: "2 August 2026",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Placeholder: Guidance on membership applications, renewal and verification for ICAN UK & District Society. Replace with official notice.",
    featured: false,
    href: "#",
    readTime: "3 min read",
  },
];

function initNewsPage() {
  const page = document.querySelector(".news-page");
  if (!page) return;

  const featuredEl = document.getElementById("news-featured");
  const gridEl = document.getElementById("news-grid");
  const filterTrack = document.getElementById("news-filter-track");
  const searchInput = document.getElementById("news-search");
  const resultsCount = document.getElementById("news-results-count");
  const loadMoreBtn = document.getElementById("news-load-more");
  const loadMoreWrap = document.getElementById("news-load-more-wrap");
  const endNote = document.getElementById("news-end-note");

  if (!gridEl || !filterTrack) return;

  // Derive categories from data
  const categories = [
    "All News",
    ...Array.from(new Set(newsArticles.map((a) => a.category))),
  ];
  // Ensure order: All, ICAN UK, Professional, Community, Events, Announcements
  const preferredOrder = [
    "All News",
    "ICAN UK",
    "Professional",
    "Community",
    "Events",
    "Announcements",
  ];
  const orderedCats = preferredOrder.filter(
    (c) => categories.includes(c) || c === "All News",
  );
  // add any remaining not in preferred
  categories.forEach((c) => {
    if (c !== "All News" && !orderedCats.includes(c)) orderedCats.push(c);
  });

  let activeCategory = "All News";
  let searchQuery = "";
  let visibleCount = 6; // initial
  const batchSize = 3;

  function renderFilters() {
    filterTrack.innerHTML = "";
    orderedCats.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "news-filter-btn";
      btn.type = "button";
      btn.textContent = cat;
      btn.setAttribute("data-filter", cat);
      btn.setAttribute(
        "aria-pressed",
        cat === activeCategory ? "true" : "false",
      );
      btn.addEventListener("click", () => {
        activeCategory = cat;
        visibleCount = 6;
        renderFilters();
        renderAll();
        // subtle scroll to grid on mobile
        if (window.innerWidth < 768) {
          document
            .getElementById("latest-stories")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      filterTrack.appendChild(btn);
    });
  }

  function getFilteredArticles() {
    return newsArticles.filter((article) => {
      const catMatch =
        activeCategory === "All News" || article.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const searchMatch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q);
      return catMatch && searchMatch;
    });
  }

  function renderFeatured() {
    if (!featuredEl) return;
    const featured = newsArticles.find((a) => a.featured) || newsArticles[0];
    if (!featured) return;
    featuredEl.innerHTML = `
      <a class="news-featured-media" href="${featured.href}" aria-label="${featured.title}">
        <img src="${featured.image}" alt="${featured.title} — placeholder image, replace with actual editorial photo" loading="eager" decoding="async">
      </a>
      <div class="news-featured-content">
        <div class="news-meta">
          <span class="news-category">${featured.category}</span>
          <time class="news-date" datetime="${featured.date}">${featured.dateLabel} · ${featured.readTime}</time>
        </div>
        <h2><a href="${featured.href}">${featured.title}</a></h2>
        <p class="news-featured-excerpt">${featured.excerpt}</p>
        <a class="news-read-link" href="${featured.href}">Read Story <span aria-hidden="true">→</span></a>
      </div>
    `;
  }

  function renderGrid() {
    const filtered = getFilteredArticles().filter((a) => !a.featured); // exclude featured from grid to avoid duplication
    // If search includes featured, show it too? For simplicity, keep featured separate unless filtered category excludes it — if active is All and no search, exclude featured. If search matches featured or category is its category, include? We'll include featured in grid when filtering non-All? Actually keep separate: featured always separate, grid shows non-featured.
    // But if activeCategory is not All and featured category != active, featured remains visible as editor's pick — still editorially correct. So grid only non-featured.
    const toShow = filtered.slice(0, visibleCount);

    gridEl.innerHTML = "";

    if (toShow.length === 0) {
      gridEl.innerHTML = `<div class="news-empty"><p>No stories found for "${searchQuery}" in ${activeCategory}. Try another category or search term.</p></div>`;
    } else {
      toShow.forEach((article, idx) => {
        const isWide = idx === 3 && toShow.length > 4; // 4th card wide for magazine rhythm
        const card = document.createElement("article");
        card.className = `news-card reveal ${isWide ? "news-card--wide" : ""}`;
        card.setAttribute("role", "listitem");
        card.innerHTML = `
          <a class="news-card-media" href="${article.href}" aria-label="${article.title}">
            <img src="${article.image}" alt="${article.title} — placeholder" loading="lazy" decoding="async">
          </a>
          <div class="news-card-content">
            <div class="news-meta">
              <span class="news-category">${article.category}</span>
              <time class="news-date" datetime="${article.date}">${article.dateLabel}</time>
            </div>
            <h3><a href="${article.href}">${article.title}</a></h3>
            <p class="news-card-excerpt">${article.excerpt}</p>
            <div class="news-card-footer">
              <span class="news-date">${article.readTime}</span>
              <a class="news-read-link" href="${article.href}">Read Story <span aria-hidden="true">→</span></a>
            </div>
          </div>
        `;
        gridEl.appendChild(card);
      });
      // re-observe reveal
      if (typeof initIntersectionObserver === "function") {
        // manual trigger for new cards
        const observer = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((en) => {
              if (en.isIntersecting) {
                en.target.classList.add("is-visible");
                obs.unobserve(en.target);
              }
            });
          },
          { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
        );
        gridEl
          .querySelectorAll(".reveal")
          .forEach((el) => observer.observe(el));
      }
    }

    // results count
    if (resultsCount) {
      const total = filtered.length;
      resultsCount.textContent =
        total === 0
          ? "No stories"
          : `Showing ${Math.min(visibleCount, total)} of ${total} ${total === 1 ? "story" : "stories"}`;
    }

    // load more
    if (loadMoreBtn && endNote) {
      if (filtered.length > visibleCount) {
        loadMoreBtn.hidden = false;
        endNote.hidden = true;
      } else {
        loadMoreBtn.hidden = true;
        endNote.hidden = filtered.length === 0 ? true : false;
      }
    }
  }

  function renderAll() {
    renderFeatured();
    renderGrid();
  }

  function initSearch() {
    if (!searchInput) return;
    let debounceTimer = null;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value;
        visibleCount = 6;
        renderGrid();
      }, 180);
    });
  }

  function initLoadMore() {
    if (!loadMoreBtn) return;
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += batchSize;
      renderGrid();
    });
  }

  function initNewsletter() {
    const form = document.getElementById("newsletter-form");
    const feedback = document.getElementById("newsletter-feedback");
    if (!form || !feedback) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput?.value.trim();
      if (!email || !email.includes("@")) {
        feedback.textContent =
          "Please enter a valid email address — placeholder validation.";
        feedback.hidden = false;
        feedback.style.background = "rgba(176,149,99,.14)";
        feedback.style.borderColor = "rgba(176,149,99,.28)";
        feedback.style.color = "var(--color-brass-strong)";
        return;
      }
      feedback.textContent = `Thanks — ${email} saved as placeholder. No backend configured, ready for future integration.`;
      feedback.hidden = false;
      feedback.style.background = "rgba(36,78,59,.08)";
      feedback.style.borderColor = "rgba(36,78,59,.14)";
      feedback.style.color = "var(--color-forest)";
      form.reset();
      setTimeout(() => {
        feedback.hidden = true;
      }, 6000);
    });
  }

  renderFilters();
  renderAll();
  initSearch();
  initLoadMore();
  initNewsletter();
}



/* WCAG 2.2 Enhancements for latest-news.js */
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
