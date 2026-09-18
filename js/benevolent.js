/* ==========================================================================
   ICAN UK — BENEVOLENT FUND PAGE JS — VANILLA ONLY
   Depends on existing script.js for navigation, scroll progress, reveal
   Adds only page-specific enhancements
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initBenevolentTimeline();
  initBenevolentAppInteractions();
  // Re-use existing reveal if not already handled — ensure benevolent reveals
  // are observed even if script.js ran earlier (it already observes .reveal)
  ensureBenevolentRevealFallback();
});

/* Timeline active node on scroll */
function initBenevolentTimeline() {
  const timeline = document.getElementById("benevolent-timeline");
  if (!timeline) return;
  const steps = timeline.querySelectorAll(".timeline-step");
  if (!steps.length) return;

  // If IntersectionObserver exists, mark active when 50% visible
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-active");
            // keep active — don't unobserve so re-entry still active
          }
        });
      },
      { threshold: 0.45, rootMargin: "0px 0px -10% 0px" },
    );
    steps.forEach((s) => io.observe(s));
  } else {
    steps.forEach((s) => s.classList.add("is-active"));
  }

  // Optional: keyboard navigation for timeline steps
  timeline.addEventListener("keydown", (e) => {
    const focused = document.activeElement;
    if (!focused || !focused.closest(".timeline-step")) return;
    const idx = Array.from(steps).indexOf(focused.closest(".timeline-step"));
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = steps[Math.min(idx + 1, steps.length - 1)];
      next.querySelector("h3")?.focus();
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = steps[Math.max(idx - 1, 0)];
      prev.querySelector("h3")?.focus();
    }
  });
  // Make headings focusable for keyboard nav
  steps.forEach((s) => {
    const h = s.querySelector("h3");
    if (h) h.setAttribute("tabindex", "0");
  });
}

/* Application interactions — subtle, no external deps */
function initBenevolentAppInteractions() {
  const appCard = document.querySelector(".benevolent-app-card");
  if (!appCard) return;

  // Subtle parallax on mouse move for depth orb — respects reduced motion
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  let ticking = false;
  appCard.addEventListener(
    "mousemove",
    (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = appCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const orb = appCard.querySelector(".app-card-orb");
        if (orb) {
          orb.style.transform = `translate(${x * 18}px, ${y * 14}px)`;
        }
        ticking = false;
      });
    },
    { passive: true },
  );

  appCard.addEventListener("mouseleave", () => {
    const orb = appCard.querySelector(".app-card-orb");
    if (orb) orb.style.transform = "translate(0,0)";
  });
}

/* Fallback: ensure reveal works if script.js observer already ran */
function ensureBenevolentRevealFallback() {
  const els = document.querySelectorAll(".benevolent-page .reveal");
  if (!els.length) return;

  // If existing observer from script.js already marked some visible,
  // we only need to handle those not yet visible and observer not present
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Create a dedicated observer for benevolent page with slightly tighter threshold
  // This will complement the global one without conflict
  const seen = new Set();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !seen.has(en.target)) {
          en.target.classList.add("is-visible");
          seen.add(en.target);
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
  );

  els.forEach((el) => {
    if (!el.classList.contains("is-visible")) {
      io.observe(el);
    }
  });
}



/* WCAG 2.2 Enhancements for benevolent.js */
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
