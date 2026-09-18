/* ==========================================================================
   ICAN UK - PAST CHAIRS ARCHIVE JAVASCRIPT
   Handles fallback avatars, filters, reveal, section index, image upload ready
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector('[data-page="past-chairs"]');
  if (!page) return;

  initPastChairsData();
  initImageFallback();
  initFilters();
  initSectionIndex();
  initReveal();
});

const pastChairs = [
  {
    id: 1,
    tenure: "1990 - 1996",
    startYear: 1990,
    name: "Mrs Camilla Shittu",
    designation: "ACTI, FIoD, FCA",
    note: "Founding Chair",
    era: "1990s",
    initials: "CS",
    image: "",
  },
  {
    id: 2,
    tenure: "1997 - 2001",
    startYear: 1997,
    name: "Mr James Coker",
    designation: "FCA",
    note: "",
    era: "1990s",
    initials: "JC",
    image: "",
  },
  {
    id: 3,
    tenure: "2001 - 2002",
    startYear: 2001,
    name: "Mr Femi Awojobi",
    designation: "FCA",
    note: "",
    era: "2000s",
    initials: "FA",
    image: "",
  },
  {
    id: 4,
    tenure: "2002 - 2003",
    startYear: 2002,
    name: "Mr. Femi St. James",
    designation: "FCA",
    note: "",
    era: "2000s",
    initials: "FS",
    image: "",
  },
  {
    id: 5,
    tenure: "2003 - 2005",
    startYear: 2003,
    name: "Mr Ben Etiaba",
    designation: "FCA",
    note: "",
    era: "2000s",
    initials: "BE",
    image: "",
  },
  {
    id: 6,
    tenure: "2005 - 2006",
    startYear: 2005,
    name: "Mr Tokunboh Gbadamosi",
    designation: "FCA",
    note: "",
    era: "2000s",
    initials: "TG",
    image: "",
  },
  {
    id: 7,
    tenure: "2006 - 2007",
    startYear: 2006,
    name: "Mr Julius Femi-Famakinwa",
    designation: "FCA",
    note: "",
    era: "2000s",
    initials: "JF",
    image: "",
  },
  {
    id: 8,
    tenure: "2007 - 2008",
    startYear: 2007,
    name: "Mr David Fadipe",
    designation: "FCA",
    note: "Committee Chair Past Chairs",
    era: "2000s",
    initials: "DF",
    image: "",
  },
  {
    id: 9,
    tenure: "2008 - 2009",
    startYear: 2008,
    name: "Ms Yemisi Rotimi",
    designation: "FCA",
    note: "",
    era: "2000s",
    initials: "YR",
    image: "",
  },
  {
    id: 10,
    tenure: "2009 - 2010",
    startYear: 2009,
    name: "Mr Ladi Hammond",
    designation: "FCA",
    note: "",
    era: "2000s",
    initials: "LH",
    image: "",
  },
  {
    id: 11,
    tenure: "2010 - 2011",
    startYear: 2010,
    name: "Mrs Ronke Adeagbo",
    designation: "FCA",
    note: "",
    era: "2010s",
    initials: "RA",
    image: "",
  },
  {
    id: 12,
    tenure: "2011 - 2012",
    startYear: 2011,
    name: "Mr Adegbenga Samuel",
    designation: "FCA",
    note: "",
    era: "2010s",
    initials: "AS",
    image: "",
  },
  {
    id: 13,
    tenure: "2012 - 2013",
    startYear: 2012,
    name: "Dr Olu Coker",
    designation: "FCA",
    note: "",
    era: "2010s",
    initials: "OC",
    image: "",
  },
  {
    id: 14,
    tenure: "2013 - 2014",
    startYear: 2013,
    name: "Mr. Omusa Baba Ohyoma",
    designation: "ACA",
    note: "",
    era: "2010s",
    initials: "OO",
    image: "",
  },
  {
    id: 15,
    tenure: "04/2014 - 06/2014",
    startYear: 2014,
    name: "Ben Ukaegbu",
    designation: "ACA",
    note: "Interim",
    era: "2010s",
    initials: "BU",
    image: "",
  },
  {
    id: 16,
    tenure: "09/2014 - 04/2015",
    startYear: 2014,
    name: "Flora Njoku",
    designation: "ACA",
    note: "Appointed",
    era: "2010s",
    initials: "FN",
    image: "",
  },
  {
    id: 17,
    tenure: "2015 - 2016",
    startYear: 2015,
    name: "Mrs. Camilla Shittu",
    designation: "FCA",
    note: "Caretaker Committee Chair",
    era: "2010s",
    initials: "CS",
    image: "",
  },
  {
    id: 18,
    tenure: "2016 - 2017",
    startYear: 2016,
    name: "Mr. Funso Ajayi",
    designation: "FCA",
    note: "",
    era: "2010s",
    initials: "FA",
    image: "",
  },
  {
    id: 19,
    tenure: "2017 - 2018",
    startYear: 2017,
    name: "Mrs. Bim Osunsami",
    designation: "FCA",
    note: "",
    era: "2010s",
    initials: "BO",
    image: "",
  },
  {
    id: 20,
    tenure: "2018 - 2019",
    startYear: 2018,
    name: "Mr. Doyin Adebayo",
    designation: "FCA",
    note: "",
    era: "2010s",
    initials: "DA",
    image: "",
  },
  {
    id: 21,
    tenure: "2019 - 2020",
    startYear: 2019,
    name: "Mr. Tunde Wey",
    designation: "FCA",
    note: "",
    era: "2010s",
    initials: "TW",
    image: "",
  },
  {
    id: 22,
    tenure: "2020 - 2021",
    startYear: 2020,
    name: "Mr. Emmanuel Bola Samuel",
    designation: "FCA",
    note: "",
    era: "2020s",
    initials: "ES",
    image: "",
  },
  {
    id: 23,
    tenure: "2021 - 2022",
    startYear: 2021,
    name: "Mr. Segun Omorayewa",
    designation: "FCA",
    note: "Committee Secretary Past Chairs",
    era: "2020s",
    initials: "SO",
    image: "",
  },
  {
    id: 24,
    tenure: "2022 - 2023",
    startYear: 2022,
    name: "Ms. Adebimpe Kudehinbu",
    designation: "FCA",
    note: "",
    era: "2020s",
    initials: "AK",
    image: "",
  },
  {
    id: 25,
    tenure: "2023 - 2024",
    startYear: 2023,
    name: "Mr. Iliyasu Maisanda",
    designation: "FCA",
    note: "Immediate Past Chair",
    era: "2020s",
    initials: "IM",
    image: "",
  },
];

function initPastChairsData() {
  window.ICAN_PAST_CHAIRS = pastChairs;
}

function initImageFallback() {
  const cards = document.querySelectorAll(".p-card");
  cards.forEach((card) => {
    const img = card.querySelector("img");
    const fallback = card.querySelector(".p-avatar-fallback");
    if (!img) return;

    const src = img.getAttribute("src")?.trim();
    if (!src) {
      img.style.display = "none";
      if (fallback) fallback.style.display = "grid";
      return;
    }

    img.addEventListener("error", () => {
      img.style.display = "none";
      if (fallback) fallback.style.display = "grid";
    });
    img.addEventListener("load", () => {
      if (fallback) fallback.style.display = "none";
    });

    // If already errored or empty
    if (img.naturalWidth === 0 && img.complete) {
      img.dispatchEvent(new Event("error"));
    }
  });
}

function initFilters() {
  const buttons = document.querySelectorAll(".p-filter-btn");
  const cards = document.querySelectorAll(".p-card");
  const countEl = document.getElementById("filter-count");
  if (!buttons.length || !cards.length) return;

  function updateCount(visible) {
    if (countEl)
      countEl.textContent = `${visible} Chair${visible !== 1 ? "s" : ""} shown`;
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      let visible = 0;
      cards.forEach((card) => {
        const era = card.dataset.era;
        const isSpecial = card.dataset.special; // caretaker, appointed etc
        let show = false;

        if (filter === "all") show = true;
        else if (filter === "caretaker")
          show =
            isSpecial === "caretaker" ||
            card.textContent.toLowerCase().includes("caretaker") ||
            card.textContent.toLowerCase().includes("appointed");
        else show = era === filter;

        card.style.display = show ? "" : "none";
        if (show) visible++;
      });

      // Hide empty era sections
      document.querySelectorAll(".p-era").forEach((eraSection) => {
        const visibleInEra = Array.from(
          eraSection.querySelectorAll(".p-card"),
        ).some((c) => c.style.display !== "none");
        eraSection.style.display = visibleInEra ? "" : "none";
      });

      updateCount(visible);
    });
  });

  updateCount(cards.length);
}

function initSectionIndex() {
  const index = document.querySelector(".section-index");
  const links = document.querySelectorAll(".si-link");
  const sections = ["intro", "archive"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const progressBar = document.getElementById("si-progress");
  if (!index || !sections.length) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${pct}%`;
  }
  window.addEventListener(
    "scroll",
    () => requestAnimationFrame(updateProgress),
    { passive: true },
  );
  updateProgress();

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((l) =>
              l.classList.toggle("is-active", l.dataset.section === id),
            );
          }
        });
      },
      { threshold: 0.45, rootMargin: "-10% 0px -40% 0px" },
    );
    sections.forEach((s) => io.observe(s));
  }

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const cards = document.querySelectorAll(".p-card");
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${(i % 8) * 0.04}s`;
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    // Era sections can be taller than the viewport on mobile. A small
    // threshold ensures those sections reveal as soon as they enter view.
    { threshold: 0.01, rootMargin: "0px 0px -6% 0px" },
  );
  els.forEach((el) => io.observe(el));
}



/* WCAG 2.2 Enhancements for past-chairs.js */
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
