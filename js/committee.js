/* ==========================================================================
   ICAN UK - COMMITTEE PAGE JAVASCRIPT
   Vanilla ES6+ only - no libraries
   Safe initialization: only runs if committee page DOM exists
   Reuses existing navigation, scroll progress, reveal, back-to-top from script.js
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const committeePage = document.querySelector('[data-page="committee"]');
  if (!committeePage) return;

  initCommitteeAccordion();
  initGovernanceMap();
  initOrganisationMap();
  initSectionIndex();
  initCommitteeReveal();
});

// Data structure - future CMS ready, no fabricated names
const executiveCommittee = [
  {
    role: "Chairman",
    name: "",
    image: "",
    status: "Elected",
    desc: "Leadership of the Society",
  },
  { role: "Vice Chairman", name: "", image: "", status: "Elected", desc: "" },
  {
    role: "General Secretary",
    name: "",
    image: "",
    status: "Elected",
    desc: "",
  },
  {
    role: "Assistant General Secretary",
    name: "",
    image: "",
    status: "Elected",
    desc: "",
  },
  {
    role: "Financial Secretary",
    name: "",
    image: "",
    status: "Elected",
    desc: "",
  },
  { role: "Treasurer", name: "", image: "", status: "Elected", desc: "" },
  {
    role: "Technical Secretary",
    name: "",
    image: "",
    status: "Elected",
    desc: "",
  },
  {
    role: "Social & Events Secretary",
    name: "",
    image: "",
    status: "Elected",
    desc: "",
  },
  {
    role: "Ex-Officio Members",
    name: "",
    image: "",
    status: "2 Elected Members",
    desc: "Elected members supporting Executive functions",
  },
  {
    role: "Immediate Past Chair",
    name: "",
    image: "",
    status: "Ex-Officio • IPC",
    desc: "Ex-Officio Exco Member • Continuity & Guidance",
  },
];

const standingCommittees = [
  {
    id: "finance",
    title: "Finance Committee",
    tag: "Financial Control",
    chair: "Benjamin Ajayi",
    secretary: "Nnewima Nwafor-Orizu",
    objective:
      "The Committee's objective is to ensure financial control in the District's affairs and facilitate revenue generation.",
  },
  {
    id: "media",
    title: "Media and Communications Committee",
    tag: "Communications",
    chair: "Nnenna Anyanwu",
    secretary: "Nojeem Yusuf",
    objective:
      "The Committee's objective are to deliver all media and communication needs of the district - Print, Email, Web, Social media etc; as well as deliver all Information Technology needs of the District.",
  },
  {
    id: "membership",
    title: "Membership and Regions",
    tag: "Membership",
    chair: "Tope Imevbore",
    secretary: "Chinasa Mbachu",
    objective:
      "The Committee's objectives are to manage and safeguard the membership database, reach out to dormant members and expand District's membership base; provide adequate mentorship programmes as well as reach out to and involve members located in other United Kingdom regions in District activities.",
  },
  {
    id: "socials",
    title: "Socials and Events Committee",
    tag: "Social Wellbeing",
    chair: "Wunmi Hassan",
    secretary: "Olayinka Oluwi",
    objective:
      "The Committee's objective is to facilitate Members’ social wellbeing and organise all district social events.",
  },
  {
    id: "conference",
    title: "International Conference Committee",
    tag: "Conference",
    chair: "Tayo Animashaun",
    secretary: "Kemi Phillips",
    objective:
      "The Committee's objective is to organise and deliver the District's annual International Conference.",
  },
  {
    id: "technical",
    title: "Technical, CCAB and Skills Committee",
    tag: "Professional Dev",
    chair: "Seyi Bamisaye",
    secretary: "Franklin Nakpodia",
    objective:
      "The Committee's objective is to organise technical sessions which are accredited by The Institute, with aim to fulfil skills and professional development needs of members; ensure harmonious relationship with other CCAB bodies.",
  },
  {
    id: "ethics",
    title: "Ethics Committee",
    tag: "Ethics",
    chair: "Yetunde Raimi-Odimayo",
    secretary: "Abiola Elizabeth James",
    objective:
      "The Committee's objectives are to develop a code of conduct for members of the ICAN UK and District Society and ensure protocol at all meetings (including timeliness); deliver appropriate and relevant Bye-Law concessions to ensure continued harmony - ensure concessions granted to previous Caretaker Committee is extended for at least 3 years.",
  },
  {
    id: "benevolent",
    title: "Benevolent Fund",
    tag: "Member Welfare",
    chair: "",
    secretary: "",
    objective:
      "This fund was set up by the pioneers of ICAN UK and the District Society in 2014. It is to serve as a practical way of demonstrating the District’s commitment to part of its mission to “… help our members achieve professional excellence and social well-being …”",
  },
  {
    id: "partnership",
    title: "Partnership & Sponsors Committee",
    tag: "Partnerships",
    chair: "",
    secretary: "",
    objective:
      "Reach out to sponsors - exiting and seek new sponsors / UK-based & Nigeria based, and form new partnerships with other professional bodies.",
  },
  {
    id: "past",
    title: "Committee of Past Chairs and Patrons",
    tag: "Continuity",
    chair: "David Fadipe",
    secretary: "Segun Omorayewa",
    objective:
      "The committee of Past Chairs and Patrons advises the Executive Committee on matters referred to it by the Executive Committee and supports the Executive Committee at major events organised by the Society.",
  },
];

/* ==========================================================================
   1. STANDING COMMITTEE ACCORDION
   - Keyboard accessible: button, aria-expanded, aria-controls
   - Only one open at a time on mobile, multiple allowed on desktop but we close others for clarity
   ========================================================================== */
function initCommitteeAccordion() {
  const list = document.getElementById("standing-list");
  if (!list) return;

  const items = list.querySelectorAll(".standing-item");
  const triggers = list.querySelectorAll(".standing-trigger");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      const panelId = trigger.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      const item = trigger.closest(".standing-item");

      // Close others (optional - keeps narrative clean)
      if (!expanded) {
        items.forEach((i) => {
          if (i !== item) {
            i.classList.remove("is-open");
            const t = i.querySelector(".standing-trigger");
            const p = document.getElementById(t.getAttribute("aria-controls"));
            t.setAttribute("aria-expanded", "false");
            p.hidden = true;
          }
        });
      }

      // Toggle current
      trigger.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
      item.classList.toggle("is-open", !expanded);

      if (!expanded) {
        // Smooth scroll into view on mobile
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            item.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }, 120);
        }
      }
    });

    // Keyboard: Enter/Space already handled by button, but ensure Escape closes
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const panelId = trigger.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);
        const item = trigger.closest(".standing-item");
        trigger.setAttribute("aria-expanded", "false");
        panel.hidden = true;
        item.classList.remove("is-open");
        trigger.focus();
      }
    });
  });
}

/* ==========================================================================
   2. GOVERNANCE MAP - Hero visualization
   Hover on desktop highlights, tap on mobile expands detail
   ========================================================================== */
function initGovernanceMap() {
  const visual = document.getElementById("gov-hero-visual");
  const detail = document.getElementById("gov-detail");
  if (!visual || !detail) return;

  const nodes = visual.querySelectorAll(".gv-node--standing");
  const detailText = detail.querySelector(".gv-detail-text");
  const defaultText = detailText.textContent;

  const descriptions = {
    finance:
      "Finance ensures financial control in the District's affairs and facilitates revenue generation.",
    media:
      "Media & Communications delivers all media needs — Print, Email, Web, Social — plus IT infrastructure.",
    membership:
      "Membership safeguards the database, reaches dormant members, expands base, and connects UK regions.",
    socials:
      "Socials & Events facilitates members’ social wellbeing and organises all district social events.",
    conference:
      "International Conference Committee organises and delivers the annual International Conference.",
    technical:
      "Technical, CCAB & Skills organises accredited technical sessions for professional development.",
    ethics:
      "Ethics develops code of conduct, ensures protocol, and delivers Bye-Law concessions for harmony.",
    benevolent:
      "Benevolent Fund — established 2014 by pioneers — demonstrates commitment to professional excellence and social well-being.",
    partnership:
      "Partnership & Sponsors reaches out to sponsors UK & Nigeria and forms partnerships with professional bodies.",
    past: "Past Chairs & Patrons advises Executive on referred matters and supports major events.",
  };

  function setActive(id) {
    nodes.forEach((n) => {
      n.classList.toggle("is-active", n.dataset.committee === id);
      n.classList.toggle("is-dim", n.dataset.committee !== id);
    });
    if (descriptions[id]) {
      detailText.textContent = descriptions[id];
      detail.querySelector(".eyebrow").textContent =
        standingCommittees.find((c) => c.id === id)?.title + " • Objective" ||
        "Governance Map";
    }
  }

  function clearActive() {
    nodes.forEach((n) => {
      n.classList.remove("is-active", "is-dim");
    });
    detailText.textContent = defaultText;
    detail.querySelector(".eyebrow").textContent =
      "Governance Map • Hover to explore";
  }

  nodes.forEach((node) => {
    // Desktop hover
    node.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) setActive(node.dataset.committee);
    });
    node.addEventListener("focus", () => {
      setActive(node.dataset.committee);
    });
    // Click / tap
    node.addEventListener("click", (e) => {
      e.preventDefault();
      const isActive = node.classList.contains("is-active");
      if (isActive) {
        clearActive();
      } else {
        setActive(node.dataset.committee);
        // On mobile, scroll to standing committee
        if (window.innerWidth <= 1100) {
          const targetId = `standing-${node.dataset.committee}`;
          const target = document.getElementById(targetId);
          const trigger = document.getElementById(
            `trigger-${node.dataset.committee}`,
          );
          if (target && trigger) {
            // Open accordion
            if (trigger.getAttribute("aria-expanded") !== "true") {
              trigger.click();
            }
            setTimeout(() => {
              document
                .getElementById("standing")
                .scrollIntoView({ behavior: "smooth" });
            }, 100);
          }
        }
      }
    });
  });

  visual.addEventListener("mouseleave", () => {
    if (window.innerWidth > 768) clearActive();
  });

  // Keyboard escape
  visual.addEventListener("keydown", (e) => {
    if (e.key === "Escape") clearActive();
  });
}

/* ==========================================================================
   3. ORGANISATION MAP - Second visualization with cards
   ========================================================================== */
function initOrganisationMap() {
  const grid = document.getElementById("org-grid");
  if (!grid) return;
  const cards = grid.querySelectorAll(".org-card");

  function setActive(id) {
    cards.forEach((c) => {
      c.classList.toggle("is-active", c.dataset.committee === id);
      c.classList.toggle("is-dim", c.dataset.committee !== id);
    });
  }
  function clear() {
    cards.forEach((c) => c.classList.remove("is-active", "is-dim"));
  }

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) setActive(card.dataset.committee);
    });
    card.addEventListener("focus", () => setActive(card.dataset.committee));
    card.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) clear();
    });
    card.addEventListener("blur", clear);
    card.addEventListener("click", () => {
      // Link to standing accordion
      const id = card.dataset.committee;
      const trigger = document.getElementById(`trigger-${id}`);
      if (trigger) {
        document
          .getElementById("standing")
          .scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          if (trigger.getAttribute("aria-expanded") !== "true") trigger.click();
        }, 400);
      }
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
      if (e.key === "Escape") clear();
    });
  });

  grid.addEventListener("mouseleave", clear);
}

/* ==========================================================================
   4. SECTION INDEX - IntersectionObserver + progress
   ========================================================================== */
function initSectionIndex() {
  const index = document.querySelector(".section-index");
  const links = document.querySelectorAll(".si-link");
  const sections = [
    "structure",
    "organisation",
    "executive",
    "standing",
    "past",
  ]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const progressBar = document.getElementById("si-progress");
  if (!index || !sections.length) return;

  // Progress bar for whole page
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

  // Active section observer
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

  // Smooth scroll for index links
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ==========================================================================
   5. REVEAL - Reuse existing pattern but scoped to committee
   ========================================================================== */
function initCommitteeReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Stagger for exec and org cards
  const execCards = document.querySelectorAll(".exec-card");
  execCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.04}s`;
  });

  const standingItems = document.querySelectorAll(".standing-item");
  standingItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.02}s`;
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
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
  );

  els.forEach((el) => io.observe(el));
}



/* WCAG 2.2 Enhancements for committee.js */
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
