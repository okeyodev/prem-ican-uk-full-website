/* ==========================================================================
   ICAN UK - EXECUTIVE TEAM PAGE JAVASCRIPT
   Vanilla ES6+ only - no libraries
   Inherits header, scroll progress, reveal from script.js
   Data-driven, CMS-ready
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const execPage = document.querySelector('[data-page="executive"]');
  if (!execPage) return;

  initExecutiveData();
  initSectionIndex();
  initExecutiveReveal();
  initChairmanParallax();
});

// Data structure - real people, real roles, real images
const BASE_IMG = "https://dashboard.ican-uk.org/app/webroot/excos/";

const executiveTeam = [
  {
    name: "Akintayo Ojo FCA",
    shortName: "Akintayo Ojo",
    designation: "FCA",
    role: "Chairman",
    category: "chairman",
    image: `${BASE_IMG}chairman.jpeg`,
    objectPosition: "center top",
    index: "01",
    isIPC: false,
  },
  {
    name: "Tayo Animashaun, FCA",
    shortName: "Tayo Animashaun",
    designation: "FCA",
    role: "Vice Chairman",
    category: "core-executive",
    image: `${BASE_IMG}vice-chairman.jpeg`,
    objectPosition: "center top",
    index: "02",
    isIPC: false,
  },
  {
    name: "Moses Peters, FCA",
    shortName: "Moses Peters",
    designation: "FCA",
    role: "Deputy Vice Chairman",
    category: "core-executive",
    image: `${BASE_IMG}deputy-vice-chairman.jpeg`,
    objectPosition: "center top",
    index: "03",
    isIPC: false,
  },
  {
    name: "Olajumoke Sangojinmi, FCA",
    shortName: "Olajumoke Sangojinmi",
    designation: "FCA",
    role: "General Secretary",
    category: "core-executive",
    image: `${BASE_IMG}general-secretary.jpeg`,
    objectPosition: "center top",
    index: "04",
    isIPC: false,
  },
  {
    name: "Obi Ifezue, ACA",
    shortName: "Obi Ifezue",
    designation: "ACA",
    role: "Asst. General Secretary",
    category: "core-executive",
    image: `${BASE_IMG}assistant-general-secretary.jpeg`,
    objectPosition: "center top",
    index: "05",
    isIPC: false,
  },
  {
    name: "Iredele Oyedele, FCA",
    shortName: "Iredele Oyedele",
    designation: "FCA",
    role: "Treasurer",
    category: "executive-officer",
    image: `${BASE_IMG}treasurer.jpeg`,
    objectPosition: "center top",
    index: "06",
    isIPC: false,
  },
  {
    name: "Vivian Okolie, FCA",
    shortName: "Vivian Okolie",
    designation: "FCA",
    role: "Financial Secretary",
    category: "executive-officer",
    image: `${BASE_IMG}financial-secretary.jpeg`,
    objectPosition: "center top",
    index: "07",
    isIPC: false,
  },
  {
    name: "Samuel Olayioye, FCA",
    shortName: "Samuel Olayioye",
    designation: "FCA",
    role: "Technical Secretary",
    category: "executive-officer",
    image: `${BASE_IMG}technical-secretary.jpeg`,
    objectPosition: "center top",
    index: "08",
    isIPC: false,
  },
  {
    name: "Ifeoma Okafor, FCA",
    shortName: "Ifeoma Okafor",
    designation: "FCA",
    role: "Membership Secretary",
    category: "executive-officer",
    image: `${BASE_IMG}membership-secretary.jpeg`,
    objectPosition: "center top",
    index: "09",
    isIPC: false,
  },
  {
    name: "Deborah O. Suleiman, ACA",
    shortName: "Deborah O. Suleiman",
    designation: "ACA",
    role: "Social Secretary",
    category: "executive-officer",
    image: `${BASE_IMG}social-secretary.jpeg`,
    objectPosition: "center top",
    index: "10",
    isIPC: false,
  },
  {
    name: "Seyi Bamisaye, FCA",
    shortName: "Seyi Bamisaye",
    designation: "FCA",
    role: "Ex-Officio 1",
    category: "ex-officio",
    image: `${BASE_IMG}ex-officio-1.jpeg`,
    objectPosition: "center top",
    index: "11",
    isIPC: false,
  },
  {
    name: "Olawunmi Hassan, FCA",
    shortName: "Olawunmi Hassan",
    designation: "FCA",
    role: "Ex-Officio 2",
    category: "ex-officio",
    image: `${BASE_IMG}ex-officio-2.jpeg`,
    objectPosition: "center top",
    index: "12",
    isIPC: false,
  },
  {
    name: "Marian Adekoya, FCA",
    shortName: "Marian Adekoya",
    designation: "FCA",
    role: "Ex-Officio 3 / IPC",
    category: "ex-officio",
    image: `${BASE_IMG}ex-officio-3.jpeg`,
    objectPosition: "center top",
    index: "13",
    isIPC: true,
  },
];

function initExecutiveData() {
  // Data is rendered statically in HTML for SEO/accessibility.
  // This function is reserved for future CMS hydration / filtering.
  // Keep console clean, but expose data globally for debugging / future PHP integration.
  window.ICAN_EXECUTIVE_TEAM = executiveTeam;
}

/* Section Index - IntersectionObserver + progress */
function initSectionIndex() {
  const index = document.querySelector(".section-index");
  const links = document.querySelectorAll(".si-link");
  const sections = ["intro", "chairman", "executive", "exofficio", "commitment"]
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
            links.forEach((l) => {
              l.classList.toggle("is-active", l.dataset.section === id);
            });
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

/* Reveal - staggered for cards */
function initExecutiveReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const cards = document.querySelectorAll(".e-card");
  cards.forEach((card, i) => {
    // Stagger only within each grid, keep subtle
    const grid = card.closest(".e-exec-grid");
    if (!grid) return;
    const siblings = Array.from(grid.children);
    const idx = siblings.indexOf(card);
    card.style.transitionDelay = `${idx * 0.05}s`;
  });

  const principles = document.querySelectorAll(".e-principle");
  principles.forEach((p, i) => {
    p.style.transitionDelay = `${i * 0.06}s`;
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
    { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
  );

  els.forEach((el) => io.observe(el));
}

/* Chairman subtle parallax on mouse */
function initChairmanParallax() {
  const media = document.querySelector(".e-chairman-media");
  const frame = document.querySelector(".e-chairman-frame");
  if (
    !media ||
    !frame ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  if (window.innerWidth <= 768) return;

  let raf = null;
  media.addEventListener("mousemove", (e) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = media.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `rotateX(${1.2 + y * -3}deg) rotateY(${-1.5 + x * 4}deg) translateZ(12px) translateY(-4px) scale(1.01)`;
    });
  });
  media.addEventListener("mouseleave", () => {
    if (raf) cancelAnimationFrame(raf);
    frame.style.transform = "";
  });
}



/* WCAG 2.2 Enhancements for executive.js */
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
