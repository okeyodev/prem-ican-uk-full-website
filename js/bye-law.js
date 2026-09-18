/* ==========================================================================
   ICAN UK - BYE LAW PAGE JAVASCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector('[data-page="bye-law"]');
  if (!page) return;

  initSectionIndex();
  initReveal();
  initDownload();
});

function initSectionIndex() {
  const index = document.querySelector(".section-index");
  const links = document.querySelectorAll(".si-link");
  const sections = ["intro", "document", "compliance"].map(id => document.getElementById(id)).filter(Boolean);
  const progressBar = document.getElementById("si-progress");
  if (!index || !sections.length) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${pct}%`;
  }
  window.addEventListener("scroll", () => requestAnimationFrame(updateProgress), { passive: true });
  updateProgress();

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(l => l.classList.toggle("is-active", l.dataset.section === id));
        }
      });
    }, { threshold: 0.45, rootMargin: "-10% 0px -40% 0px" });
    sections.forEach(s => io.observe(s));
  }

  links.forEach(link => {
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
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  els.forEach(el => io.observe(el));
}

function initDownload() {
  const buttons = document.querySelectorAll("[data-download='bye-law']");
  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const href = btn.getAttribute("href");
      // If href is # or placeholder, show message instead of broken navigation
      if (!href || href === "#" || href.includes("HERE")) {
        e.preventDefault();
        // Try to find actual file in common locations
        const possibleFiles = [
          "/docs/ican-bye-law-district-societies.pdf",
          "/docs/bye-law.pdf",
          "/assets/bye-law.pdf",
          "docs/ican-bye-law.pdf"
        ];
        // For now, open a toast-like feedback via console and visual state
        btn.textContent = "Preparing download...";
        setTimeout(() => {
          btn.textContent = "Download Bye Law (PDF) →";
          // If you have the file, replace href above with real path
          alert("Please place the Bye Law PDF at /docs/ican-bye-law-district-societies.pdf and update the href in bye-law.html");
        }, 600);
      }
    });
  });
}



/* WCAG 2.2 Enhancements for bye-law.js */
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
