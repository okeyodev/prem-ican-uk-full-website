/* ==========================================================================
   ICAN UK - MAIN JAVASCRIPT - VANILLA JS ONLY
   EDIT GUIDE:
   - Change CONFERENCE_DATE below to set countdown target
   - All functions are modular and commented
   - No external libraries needed
   ========================================================================== */

// EDIT THIS DATE: Conference countdown target - format YYYY-MM-DDTHH:MM:SS+00:00
// If invalid or past, fallback message shows automatically
const CONFERENCE_DATE = "2026-11-20T18:00:00+00:00"; // CONFIGURABLE

// Initialize all modules when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  try {
    initNavigation();
  } catch (e) {
    console.warn("initNavigation failed", e);
  }
  try {
    if (typeof init3DSlider === "function") init3DSlider();
  } catch (e) {
    console.warn("init3DSlider failed", e);
  }
  try {
    if (typeof initHeroPro === "function") initHeroPro();
  } catch (e) {
    console.warn("initHeroPro failed", e);
  }
  try {
    initScrollProgress();
  } catch (e) {
    console.warn("initScrollProgress failed", e);
  }
  try {
    initIntersectionObserver();
  } catch (e) {
    console.warn("initIntersectionObserver failed", e);
  }
  try {
    if (typeof initTimeline === "function") initTimeline();
  } catch (e) {
    console.warn("initTimeline failed", e);
  }
  try {
    initCountdown();
  } catch (e) {
    console.warn("initCountdown failed", e);
  }
  try {
    initBackToTop();
  } catch (e) {
    console.warn("initBackToTop failed", e);
  }
  try {
    if (typeof initNewsPage === "function") initNewsPage();
  } catch (e) {
    console.warn("initNewsPage failed", e);
  }
  try {
    if (typeof initSectionIndex === "function") initSectionIndex();
  } catch (e) {
    console.warn("initSectionIndex failed", e);
  }
});

/* ==========================================================================
   1. NAVIGATION - Desktop mega menu + mobile drawer
   EDIT: Hover delay in scheduleOpen/scheduleClose (ms)
   FIX: overlay display fixed to prevent dark blurry cover bug
   ========================================================================== */
function initNavigation() {
  const triggers = document.querySelectorAll(".nav-trigger");
  const megaMenus = document.querySelectorAll(".mega-menu");
  const overlay = document.getElementById("nav-overlay");
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileClose = document.getElementById("mobile-close");
  const drawerAccordions = document.querySelectorAll(".drawer-accordion");
  let lastFocus = null,
    openTimer = null,
    closeTimer = null;
  if (!mobileToggle) return;

  // Keep fixed-position navigation outside the filtered sticky header. A
  // backdrop-filter ancestor creates a containing block for fixed children.
  if (overlay && overlay.parentElement !== document.body) {
    document.body.append(overlay);
  }
  if (mobileDrawer && mobileDrawer.parentElement !== document.body) {
    document.body.append(mobileDrawer);
  }

  function closeAllMegas() {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    megaMenus.forEach((m) => {
      m.classList.remove("is-open");
      const btn = document.querySelector(`[aria-controls="${m.id}"]`);
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }
  function openMega(id) {
    clearTimeout(closeTimer);
    clearTimeout(openTimer);
    closeAllMegas();
    const menu = document.getElementById(id);
    const btn = document.querySelector(`[aria-controls="${id}"]`);
    if (!menu || !btn) return;
    menu.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
  }
  // EDIT: Hover intent delay - increase if menu closes too fast
  function scheduleOpen(id) {
    clearTimeout(closeTimer);
    clearTimeout(openTimer);
    openTimer = setTimeout(() => openMega(id), 140);
  }
  function scheduleClose() {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => closeAllMegas(), 280);
  }

  // Desktop hover with bridge gap handling
  document.querySelectorAll("[data-mega]").forEach((item) => {
    const btn = item.querySelector(".nav-trigger");
    const id = btn?.getAttribute("aria-controls");
    if (!id) return;
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 1100) scheduleOpen(id);
    });
    item.addEventListener("mouseleave", () => {
      if (window.innerWidth > 1100) scheduleClose();
    });
  });
  megaMenus.forEach((menu) => {
    menu.addEventListener("mouseenter", () => {
      if (window.innerWidth > 1100) clearTimeout(closeTimer);
    });
    menu.addEventListener("mouseleave", () => {
      if (window.innerWidth > 1100) scheduleClose();
    });
  });
  triggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("aria-controls");
      const exp = btn.getAttribute("aria-expanded") === "true";
      if (exp) closeAllMegas();
      else openMega(id);
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-mega]")) closeAllMegas();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllMegas();
      if (mobileDrawer?.classList.contains("is-open")) closeDrawer();
    }
  });

  // MOBILE DRAWER - FIX: overlay now properly hidden on close
  function openDrawer() {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    lastFocus = document.activeElement;
    mobileDrawer.classList.add("is-open");
    mobileDrawer.setAttribute("aria-hidden", "false");
    mobileToggle.setAttribute("aria-expanded", "true");
    overlay.hidden = false;
    overlay.style.display = "block";
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
    });
    document.body.style.overflow = "hidden";
    mobileDrawer.querySelector("button,a")?.focus({ preventScroll: true });
    window.scrollTo(scrollX, scrollY);
    mobileDrawer.addEventListener("keydown", trap);
  }
  function closeDrawer() {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    mobileDrawer.classList.remove("is-open");
    mobileDrawer.setAttribute("aria-hidden", "true");
    mobileToggle.setAttribute("aria-expanded", "false");
    overlay.style.opacity = "0";
    // FIX: wait for fade then hide completely - prevents dark blurry cover
    setTimeout(() => {
      overlay.hidden = true;
      overlay.style.display = "none";
    }, 220);
    document.body.style.overflow = "";
    mobileDrawer.removeEventListener("keydown", trap);
    lastFocus?.focus({ preventScroll: true });
    window.scrollTo(scrollX, scrollY);
  }
  function trap(e) {
    if (e.key !== "Tab") return;
    const focusable = Array.from(
      mobileDrawer.querySelectorAll('button,a,[tabindex]:not([tabindex="-1"])'),
    ).filter((el) => !el.hidden && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0],
      last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  mobileToggle.addEventListener("click", () => {
    mobileDrawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
  });
  mobileClose?.addEventListener("click", closeDrawer);
  overlay?.addEventListener("click", closeDrawer);
  drawerAccordions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("aria-controls");
      const panel = document.getElementById(id);
      const exp = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!exp));
      if (panel) panel.hidden = exp;
    });
  });
}

/* ==========================================================================
   2. HERO 3D SLIDER - Auto play, parallax on mouse move
   EDIT: Interval (6500ms) and parallax depth multiplier
   ========================================================================== */
/* ==========================================================================
   2. HERO — SPATIAL EDITORIAL HERO / ONE PERSISTENT WORLD
   - Persistent stage/world, large photo, chapter navigation
   - Camera parallax ±8px / ±6px / ±1.5deg with rAF lerp 0.06
   - Spatial out/in transitions, no display:none
   - Autoplay 6500ms with progress line, pause on hover/focus/interact
   - Keyboard, touch swipe 50px, reduced-motion support
   ========================================================================== */
function initHeroPro() {
  const stage = document.getElementById("hero-pro-stage");
  const photoWrap = document.getElementById("hero-pro-photo-wrap");
  const slidesContainer = document.getElementById("hero-pro-slides");
  const slides = document.querySelectorAll(".hero-pro-slide");
  const dots = document.querySelectorAll(".hero-pro-dot-btn");
  const cards = document.querySelectorAll(".hero-pro-card");

  if (!stage || !photoWrap || !slides.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 6000;

  function goTo(index) {
    const total = slides.length;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
      slide.setAttribute("aria-hidden", i === current ? "false" : "true");
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
    });
  }

  function nextSlide() {
    goTo(current + 1);
  }
  function prevSlide() {
    goTo(current - 1);
  }

  function startAutoplay() {
    if (reduced) return;
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
  }
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Dots only - arrows removed per request
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.dot, 10);
      goTo(idx);
      stopAutoplay();
      startAutoplay();
    });
  });

  stage.setAttribute("tabindex", "0");
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    }
    if (e.key === "ArrowLeft") {
      prevSlide();
      stopAutoplay();
      startAutoplay();
    }
  });

  photoWrap.addEventListener("mouseenter", stopAutoplay);
  photoWrap.addEventListener("mouseleave", startAutoplay);

  // Touch swipe
  let touchStartX = 0;
  slidesContainer?.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    },
    { passive: true },
  );
  slidesContainer?.addEventListener(
    "touchend",
    (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      startAutoplay();
    },
    { passive: true },
  );

  goTo(0);
  startAutoplay();

  // Parallax for floating cards - hover only on large, hidden on small
  if (reduced) return;
  let raf = null;
  let mouseX = 0,
    mouseY = 0;
  let currentX = 0,
    currentY = 0;

  function updateParallax() {
    raf = null;
    currentX += (mouseX - currentX) * 0.06;
    currentY += (mouseY - currentY) * 0.06;
    const activeSlide = slides[current];
    const activePhoto = activeSlide?.querySelector(".hero-pro-photo");
    if (activePhoto) {
      // Only subtle tilt on desktop
      if (window.innerWidth > 768) {
        activePhoto.style.transform = `perspective(1000px) rotateY(${currentX * 2.5}deg) rotateX(${currentY * -2}deg)`;
      }
    }
    // Only animate cards if they are visible (large screen)
    if (window.innerWidth > 768) {
      cards.forEach((card) => {
        const depth = parseFloat(card.dataset.parallax || "0.5");
        const tx = currentX * 16 * depth;
        const ty = currentY * 10 * depth;
        card.style.setProperty("--px", tx + "px");
        card.style.setProperty("--py", ty + "px");
      });
    }
    if (
      Math.abs(mouseX - currentX) > 0.001 ||
      Math.abs(mouseY - currentY) > 0.001
    ) {
      raf = requestAnimationFrame(updateParallax);
    }
  }

  stage.addEventListener(
    "mousemove",
    (e) => {
      if (window.innerWidth <= 768) return; // No parallax on mobile where cards hidden
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) / rect.width;
      mouseY = (e.clientY - cy) / rect.height;
      if (!raf) raf = requestAnimationFrame(updateParallax);
    },
    { passive: true },
  );

  stage.addEventListener(
    "mouseleave",
    () => {
      mouseX = 0;
      mouseY = 0;
      if (!raf) raf = requestAnimationFrame(updateParallax);
      const activeSlide = slides[current];
      const activePhoto = activeSlide?.querySelector(".hero-pro-photo");
      if (activePhoto) activePhoto.style.transform = "";
    },
    { passive: true },
  );
}

function init3DSlider() {
  // LEGACY HERO - new hero uses initHeroPro, this safely exits if old elements missing
  const stage = document.getElementById("hero-stage");
  if (!stage) return;

  // const stage = document.getElementById("hero-stage");
  const world = document.getElementById("hero-world");
  const imageFrame = document.getElementById("hero-image-frame");
  const imageEl = stage ? stage.querySelector("[data-hero-image]") : null;
  const eyebrowEl = stage ? stage.querySelector("[data-hero-eyebrow]") : null;
  const yearEl = stage ? stage.querySelector("[data-hero-year]") : null;
  const titleEl = stage ? stage.querySelector("[data-hero-title]") : null;
  const descEl = stage ? stage.querySelector("[data-hero-description]") : null;
  const primaryEl = stage ? stage.querySelector("[data-hero-primary]") : null;
  const secondaryEl = stage
    ? stage.querySelector("[data-hero-secondary]")
    : null;
  const captionEl = stage ? stage.querySelector("[data-hero-caption]") : null;
  const captionIndexEl = stage
    ? stage.querySelector("[data-hero-image-index]")
    : null;
  const currentIndexEl = stage
    ? stage.querySelector("[data-hero-current]")
    : null;
  const ambientEl = stage ? stage.querySelector("[data-hero-ambient]") : null;
  const navContainer = document.getElementById("hero-navigation");
  const prevBtn = document.getElementById("hero-prev");
  const nextBtn = document.getElementById("hero-next");
  const networkEl = document.getElementById("hero-network");
  const networkSignal = document.getElementById("hero-network-signal");

  if (!stage || !world || !imageEl) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Slide data — uses existing Unsplash placeholders, editorial copy preserved from original
  const heroSlides = [
    {
      eyebrow: "ICAN UK DISTRICT SOCIETY",
      year: "EST. 1988",
      title: "Professional<br>Excellence<br>Across Borders.",
      description:
        "Connecting over 550 chartered accountants — a bridge between heritage and innovation, Nigeria and the UK, standards and community.",
      image: "ICANUKPICNIC241.jpg",
      imageAlt: "ICAN UK members gathered together — community gathering",
      imagePosition: "50% 32%",
      caption: "PEOPLE · PROFESSIONALISM",
      primaryLabel: "Become a Member →",
      primaryHref: "#membership",
      secondaryLabel: "Explore Our Story",
      secondaryHref: "#about",
      chapter: "HERITAGE",
      networkState: "uk",
      ambient: "550+ MEMBERS · 30+ YEARS · UK × NG",
      indexLabel: "01 — HERITAGE",
    },
    {
      eyebrow: "ANNUAL CONFERENCE · CPD CERTIFIED",
      year: "CONNECTION",
      title: "One<br>Professional<br>Community.",
      description:
        "Building meaningful professional and social connections through shared knowledge, CPD and international collaboration across the UK and Nigeria.",
      image: "Conference2026Flyer1_IMG-20251127-WA0003 (1).jpg",
      imageAlt:
        "ICAN UK conference — professional gathering and knowledge sharing",
      imagePosition: "50% 42%",
      caption: "CONFERENCE · COMMUNITY",
      primaryLabel: "View Timeline →",
      primaryHref: "#timeline",
      secondaryLabel: "Our Pillars",
      secondaryHref: "#conference",
      chapter: "COMMUNITY",
      networkState: "community",
      ambient: "CPD CERTIFIED · BIG FOUR + HMRC · ANNUAL GALA",
      indexLabel: "02 — COMMUNITY",
    },
    {
      eyebrow: "COMMUNITY · PROFESSIONAL DEVELOPMENT",
      year: "LOOKING FORWARD",
      title: "Building<br>What Comes<br>Next.",
      description:
        "Supporting professional development, recognition and opportunities for the next generation of chartered accountants in the UK.",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80&auto=format&fit=crop",
      imageAlt:
        "ICAN UK gala dinner — recognition and professional celebration",
      imagePosition: "50% 36%",
      caption: "PROGRESS · POSSIBILITY",
      primaryLabel: "Next Conference →",
      primaryHref: "#countdown",
      secondaryLabel: "Member Hub",
      secondaryHref: "#member-hub",
      chapter: "FUTURE",
      networkState: "future",
      ambient: "FUTURE FOCUS · MENTORSHIP · BENEVOLENCE",
      indexLabel: "03 — FUTURE",
    },
  ];

  let current = 0;
  let previous = 0;
  let autoplayTimer = null;
  let isTransitioning = false;
  let isPaused = reducedMotion;
  let progressRAF = null;

  const AUTOPLAY_MS = 6500;
  const TRANSITION_OUT_MS = 420;
  const TRANSITION_IN_MS = 850;

  // Pointer / camera state
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let camRAF = null;
  let stageRect = null;

  function cacheRect() {
    stageRect = stage.getBoundingClientRect();
  }
  cacheRect();
  window.addEventListener("resize", cacheRect, { passive: true });

  function updateCamera() {
    if (reducedMotion) return;
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    // Subtle camera: ±8px X, ±6px Y, ±1.5deg rotation
    const tx = currentX * 8;
    const ty = currentY * -6;
    const rx = currentY * -1.2;
    const ry = currentX * 1.5;

    world.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;

    // Stop when close enough to save CPU
    const dx = Math.abs(targetX - currentX);
    const dy = Math.abs(targetY - currentY);
    if (dx < 0.001 && dy < 0.001 && autoplayTimer) {
      // keep looping only if needed for smoothness, but we can continue low-freq
    }
    camRAF = requestAnimationFrame(updateCamera);
  }

  function onPointerMove(e) {
    if (reducedMotion) return;
    if (!stageRect) cacheRect();
    const x = (e.clientX - stageRect.left) / stageRect.width - 0.5;
    const y = (e.clientY - stageRect.top) / stageRect.height - 0.5;
    targetX = Math.max(-0.5, Math.min(0.5, x));
    targetY = Math.max(-0.5, Math.min(0.5, y));
    if (!camRAF) {
      camRAF = requestAnimationFrame(updateCamera);
    }
  }

  function resetCamera() {
    targetX = 0;
    targetY = 0;
  }

  if (!reducedMotion && window.matchMedia("(hover: hover)").matches) {
    stage.addEventListener("mousemove", onPointerMove, { passive: true });
    stage.addEventListener(
      "mouseleave",
      () => {
        resetCamera();
      },
      { passive: true },
    );
    // Start camera loop
    camRAF = requestAnimationFrame(updateCamera);
  }

  // Chapter navigation generation
  function renderNav() {
    if (!navContainer) return;
    navContainer.innerHTML = heroSlides
      .map((s, i) => {
        const num = String(i + 1).padStart(2, "0");
        return `<button type="button" class="hero-chapter ${i === current ? "is-active" : ""}" data-index="${i}" aria-label="Go to ${s.chapter} chapter" aria-current="${i === current ? "true" : "false"}">
        <span class="hero-chapter__num">${num}</span>
        <span class="hero-chapter__label">${s.chapter}</span>
        <span class="hero-chapter__line"><i data-progress="${i}"></i></span>
      </button>`;
      })
      .join("");
  }

  function updateNavActive(newIndex) {
    if (!navContainer) return;
    navContainer.querySelectorAll(".hero-chapter").forEach((btn, i) => {
      const isActive = i === newIndex;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-current", isActive ? "true" : "false");
      const line = btn.querySelector("[data-progress]");
      if (line && !isActive) {
        line.style.transition = "none";
        line.style.width = "0%";
      }
    });
  }

  function startProgress(index) {
    if (reducedMotion) return;
    const activeBtn = navContainer
      ? navContainer.querySelector(
          `.hero-chapter[data-index="${index}"] [data-progress]`,
        )
      : null;
    if (!activeBtn) return;
    // Reset all
    navContainer.querySelectorAll("[data-progress]").forEach((el) => {
      el.style.transition = "none";
      el.style.width = "0%";
    });
    // Force reflow then animate
    void activeBtn.offsetWidth;
    activeBtn.style.transition = `width ${AUTOPLAY_MS}ms linear`;
    requestAnimationFrame(() => {
      activeBtn.style.width = "100%";
    });
  }

  function stopProgress() {
    if (!navContainer) return;
    navContainer.querySelectorAll("[data-progress]").forEach((el) => {
      const w = el.getBoundingClientRect().width;
      const parentW = el.parentElement
        ? el.parentElement.getBoundingClientRect().width
        : 1;
      const pct = parentW ? (w / parentW) * 100 : 0;
      el.style.transition = "none";
      el.style.width = pct + "%";
    });
  }

  function applySlideData(slide, index) {
    if (eyebrowEl) eyebrowEl.textContent = slide.eyebrow;
    if (yearEl) yearEl.textContent = slide.year;
    if (titleEl) titleEl.innerHTML = slide.title;
    if (descEl) descEl.textContent = slide.description;
    if (primaryEl) {
      primaryEl.textContent = slide.primaryLabel;
      primaryEl.setAttribute("href", slide.primaryHref);
    }
    if (secondaryEl) {
      secondaryEl.textContent = slide.secondaryLabel;
      secondaryEl.setAttribute("href", slide.secondaryHref);
    }
    if (captionEl) captionEl.textContent = slide.caption;
    if (captionIndexEl) captionIndexEl.textContent = slide.indexLabel;
    if (currentIndexEl)
      currentIndexEl.textContent = String(index + 1).padStart(2, "0");
    if (ambientEl) ambientEl.textContent = slide.ambient;

    if (networkEl) {
      networkEl.setAttribute("data-state", slide.networkState);
      networkEl.className = "hero-network";
      networkEl.classList.add(`hero-network--${slide.networkState}`);
      // keep base class
      networkEl.classList.add("hero-network");
    }

    // Image
    if (imageEl) {
      imageEl.style.objectPosition = slide.imagePosition || "center center";
      // Only change src if different to avoid flicker
      if (imageEl.getAttribute("src") !== slide.image) {
        imageEl.setAttribute("src", slide.image);
      }
      imageEl.setAttribute("alt", slide.imageAlt || "");
    }
  }

  function goTo(newIndex, opts = {}) {
    const { userInitiated = false } = opts;
    const normalized = (newIndex + heroSlides.length) % heroSlides.length;
    if (normalized === current && !opts.force) return;
    if (isTransitioning) return;

    previous = current;
    current = normalized;
    isTransitioning = true;

    if (userInitiated) {
      pauseAutoplay();
    }

    // Outgoing
    world.classList.add("is-exiting");
    world.classList.remove("is-entering", "is-visible");
    imageFrame.classList.add("is-receding");
    imageFrame.classList.remove("is-emerging");
    stopProgress();

    const slide = heroSlides[current];

    window.setTimeout(
      () => {
        // Swap content while out
        applySlideData(slide, current);
        updateNavActive(current);

        // Incoming setup
        world.classList.remove("is-exiting");
        world.classList.add("is-entering");
        imageFrame.classList.remove("is-receding");
        imageFrame.classList.add("is-emerging");

        // Trigger enter animation next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            world.classList.add("is-visible");
            // Image emerge to resting
            imageFrame.classList.remove("is-emerging");
            // Ensure image frame returns to base transform (CSS will transition)
          });
        });

        window.setTimeout(() => {
          world.classList.remove("is-entering", "is-visible");
          isTransitioning = false;
          if (!isPaused && !userInitiated) {
            startProgress(current);
          } else if (userInitiated) {
            // restart autoplay after user interaction after short delay
            window.setTimeout(() => {
              isPaused = false;
              startAutoplay();
            }, 800);
          }
        }, TRANSITION_IN_MS);
      },
      reducedMotion ? 0 : TRANSITION_OUT_MS,
    );
  }

  function nextSlide(userInitiated = false) {
    goTo(current + 1, { userInitiated });
  }
  function prevSlide(userInitiated = false) {
    goTo(current - 1, { userInitiated });
  }

  function startAutoplay() {
    if (reducedMotion) return;
    if (isPaused) return;
    stopAutoplay();
    startProgress(current);
    autoplayTimer = window.setInterval(() => {
      if (!isPaused && !isTransitioning) nextSlide(false);
    }, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function pauseAutoplay() {
    isPaused = true;
    stopAutoplay();
    stopProgress();
  }

  function resumeAutoplay() {
    if (reducedMotion) return;
    isPaused = false;
    startAutoplay();
  }

  // Events: chapters
  if (navContainer) {
    navContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".hero-chapter");
      if (!btn) return;
      const idx = parseInt(btn.getAttribute("data-index") || "0", 10);
      goTo(idx, { userInitiated: true });
    });
  }

  prevBtn?.addEventListener("click", () => prevSlide(true));
  nextBtn?.addEventListener("click", () => nextSlide(true));

  // Keyboard
  stage.setAttribute("tabindex", "0");
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide(true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide(true);
    }
  });

  // Touch swipe
  let touchStartX = 0;
  let touchStartY = 0;
  let touchDeltaX = 0;
  stage.addEventListener(
    "touchstart",
    (e) => {
      if (!e.touches[0]) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchDeltaX = 0;
    },
    { passive: true },
  );

  stage.addEventListener(
    "touchmove",
    (e) => {
      if (!e.touches[0]) return;
      touchDeltaX = e.touches[0].clientX - touchStartX;
    },
    { passive: true },
  );

  stage.addEventListener(
    "touchend",
    () => {
      const absX = Math.abs(touchDeltaX);
      const absY = Math.abs(touchStartY); // not used but keep
      if (absX > 50) {
        if (touchDeltaX < 0) nextSlide(true);
        else prevSlide(true);
      }
      touchStartX = 0;
      touchDeltaX = 0;
    },
    { passive: true },
  );

  // Pause on hover/focus
  if (!reducedMotion) {
    stage.addEventListener("mouseenter", () => {
      pauseAutoplay();
    });
    stage.addEventListener("mouseleave", () => {
      if (!document.hidden) resumeAutoplay();
    });
    stage.addEventListener("focusin", () => {
      pauseAutoplay();
    });
    stage.addEventListener("focusout", (e) => {
      if (!stage.contains(e.relatedTarget)) {
        resumeAutoplay();
      }
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
      stopProgress();
    } else if (!isPaused && !reducedMotion) {
      startAutoplay();
    }
  });

  // Network signal animation
  if (networkSignal && !reducedMotion) {
    networkSignal.classList.add("is-moving");
  }

  // Init
  renderNav();
  applySlideData(heroSlides[0], 0);
  updateNavActive(0);

  // Entrance on load
  world.classList.add("is-entering");
  imageFrame.classList.add("is-emerging");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      world.classList.add("is-visible");
      imageFrame.classList.remove("is-emerging");
      window.setTimeout(() => {
        world.classList.remove("is-entering", "is-visible");
      }, 900);
    });
  });

  if (!reducedMotion) {
    startAutoplay();
  }
}

/* ==========================================================================
   3. SCROLL PROGRESS - 4px bar at top
   EDIT: Color in css.scroll-progress
   ========================================================================== */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  let ticking = false;
  function upd() {
    const st = window.scrollY;
    const dh = document.documentElement.scrollHeight - window.innerHeight;
    const pct = dh > 0 ? st / dh : 0;
    bar.style.transform = `scaleX(${pct})`;
    bar.setAttribute("aria-valuenow", Math.round(pct * 100).toString());
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(upd);
        ticking = true;
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", upd);
  upd();
}

/* ==========================================================================
   4. SCROLL REVEAL - IntersectionObserver
   EDIT: Threshold and rootMargin for when animation triggers
   ========================================================================== */
function initIntersectionObserver() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
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
    { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
  );
  els.forEach((el) => io.observe(el));
}

/* ==========================================================================
   5. TIMELINE - Horizontal scroll with drag
   EDIT: Scroll amount in scrollAmt() - currently 80% of viewport
   ========================================================================== */
function initTimeline() {
  const track = document.getElementById("timeline-track");
  const prev = document.getElementById("timeline-prev");
  const next = document.getElementById("timeline-next");
  if (!track) return;
  const nodes = track.querySelectorAll(".timeline-node");
  let isDown = false,
    startX = 0,
    scrollLeft = 0;
  function updateBtn() {
    if (!prev || !next) return;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled =
      track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    prev.style.opacity = prev.disabled ? ".45" : "1";
    next.style.opacity = next.disabled ? ".45" : "1";
  }
  function scrollAmt(dir) {
    const amt = Math.min(360, track.clientWidth * 0.8);
    track.scrollBy({ left: dir * amt, behavior: "smooth" });
  }
  prev?.addEventListener("click", () => scrollAmt(-1));
  next?.addEventListener("click", () => scrollAmt(1));
  track.addEventListener(
    "scroll",
    () => {
      requestAnimationFrame(updateBtn);
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = null,
        bd = Infinity;
      nodes.forEach((n) => {
        const c = n.offsetLeft + n.offsetWidth / 2;
        const d = Math.abs(center - c);
        if (d < bd) {
          bd = d;
          best = n;
        }
      });
      nodes.forEach((n) => {
        n.classList.remove("is-active");
        n.removeAttribute("aria-current");
      });
      if (best) {
        best.classList.add("is-active");
        best.setAttribute("aria-current", "true");
      }
    },
    { passive: true },
  );
  track.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  window.addEventListener("mouseup", () => {
    isDown = false;
  });
  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeft - walk;
  });
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") scrollAmt(1);
    if (e.key === "ArrowLeft") scrollAmt(-1);
  });
  updateBtn();
  window.addEventListener("resize", updateBtn);
}

/* ==========================================================================
   6. COUNTDOWN - Conference date countdown
   EDIT: Change CONFERENCE_DATE at top of file
   If date invalid, fallback message shows
   ========================================================================== */
function initCountdown() {
  const dEl = document.getElementById("cd-days"),
    hEl = document.getElementById("cd-hours"),
    mEl = document.getElementById("cd-mins"),
    sEl = document.getElementById("cd-secs"),
    fb = document.getElementById("countdown-fallback"),
    wrap = document.getElementById("countdown-timer");
  if (!dEl || !wrap) return;
  let target = null;
  try {
    target = new Date(CONFERENCE_DATE);
    if (isNaN(target.getTime())) target = null;
  } catch {
    target = null;
  }
  function showFB() {
    if (fb) {
      fb.hidden = false;
      wrap
        .querySelectorAll(".cd-block,.cd-sep")
        .forEach((el) => (el.style.display = "none"));
    }
  }
  if (!target) {
    showFB();
    return;
  }
  function tick() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      dEl.textContent = "00";
      hEl.textContent = "00";
      mEl.textContent = "00";
      sEl.textContent = "00";
      if (fb) {
        fb.hidden = false;
        fb.querySelector("p").textContent =
          "Conference is live or has concluded.";
      }
      return;
    }
    const d = Math.floor(diff / 86400000),
      h = Math.floor((diff % 86400000) / 3600000),
      m = Math.floor((diff % 3600000) / 60000),
      s = Math.floor((diff % 60000) / 1000);
    dEl.textContent = String(d).padStart(2, "0");
    hEl.textContent = String(h).padStart(2, "0");
    mEl.textContent = String(m).padStart(2, "0");
    sEl.textContent = String(s).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
}

/* ==========================================================================
   7. BACK TO TOP - FIXED
   FIX: Now class-only, no hidden attribute that blocked mobile display
   EDIT: Scroll threshold (400px) in onScroll()
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let vis = false;
  function onScroll() {
    const should = window.scrollY > 400; // EDIT: Show after 400px scroll
    if (should !== vis) {
      vis = should;
      btn.classList.toggle("is-visible", should);
    }
  }
  window.addEventListener("scroll", () => requestAnimationFrame(onScroll), {
    passive: true,
  });
  window.addEventListener("resize", onScroll);
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }),
  );
  onScroll();
}

/* ==========================================================================
   News Page stub - prevents ReferenceError if news module not present
   ========================================================================== */
function initNewsPage() {
  // Optional: latest news page logic if present
  const newsGrid = document.querySelector("[data-page='news']");
  if (!newsGrid) return;
}

/* ==========================================================================
   8. SECTION INDEX - Floating desktop nav (generic, works for home, committee, events)
   Reused from committee page, now generic
   ========================================================================== */
/* ==========================================================================
   8. SECTION INDEX - Floating desktop nav (generic, works for home, committee, events)
   Reused from committee page, now generic - FIXED for homepage
   ========================================================================== */
function initSectionIndex() {
  const index = document.querySelector(".section-index");
  const links = document.querySelectorAll(".si-link");
  const progressBar = document.getElementById("si-progress");
  if (!index || !links.length) return;

  // Build sections array from links data-section or href
  const sections = Array.from(links)
    .map((link) => {
      const id =
        link.dataset.section ||
        link.getAttribute("href").replace("#", "").trim();
      if (!id) return null;
      return document.getElementById(id);
    })
    .filter(Boolean);

  if (!sections.length) {
    console.warn(
      "Section Index: no sections found for links",
      Array.from(links).map((l) => l.getAttribute("href")),
    );
    return;
  }

  // Progress bar for whole page - FIXED
  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    }
  }
  window.addEventListener(
    "scroll",
    () => requestAnimationFrame(updateProgress),
    { passive: true },
  );
  window.addEventListener("resize", updateProgress);
  updateProgress();

  // Helper to set active
  function setActiveById(id) {
    links.forEach((l) => {
      const sec =
        l.dataset.section || l.getAttribute("href").replace("#", "").trim();
      l.classList.toggle("is-active", sec === id);
    });
  }

  // Active section observer - improved thresholds for homepage
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        // Find the most visible entry
        let mostVisible = null;
        let maxRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry;
          }
        });
        if (mostVisible) {
          setActiveById(mostVisible.target.id);
        } else {
          // Fallback: check which section is closest to top
          const scrollPos = window.scrollY + 120;
          let currentId = sections[0]?.id;
          for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].offsetTop <= scrollPos) {
              currentId = sections[i].id;
              break;
            }
          }
          if (currentId) setActiveById(currentId);
        }
      },
      {
        threshold: [0, 0.15, 0.25, 0.45, 0.6],
        rootMargin: "-15% 0px -45% 0px",
      },
    );
    sections.forEach((s) => io.observe(s));
  } else {
    // Fallback scroll handler
    window.addEventListener(
      "scroll",
      () => {
        const scrollPos = window.scrollY + 150;
        let currentId = sections[0]?.id;
        for (let i = sections.length - 1; i >= 0; i--) {
          if (sections[i].offsetTop <= scrollPos) {
            currentId = sections[i].id;
            break;
          }
        }
        if (currentId) setActiveById(currentId);
      },
      { passive: true },
    );
  }

  // Smooth scroll for index links - prevent double binding
  links.forEach((link) => {
    if (link.dataset.siBound) return;
    link.dataset.siBound = "1";
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id =
        link.dataset.section ||
        link.getAttribute("href").replace("#", "").trim();
      const target = document.getElementById(id);
      if (target) {
        const headerOffset = 88;
        const top =
          target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}



/* ==========================================================================
   WCAG 2.2 AA ENHANCEMENTS - Added 2026
   - 2.4.11 Focus Not Obscured (Minimum)
   - 2.5.8 Target Size Minimum
   - 2.4.7 Focus Visible
   - 1.4.10 Reflow, 2.1.1 Keyboard, 2.4.3 Focus Order
   ========================================================================== */

(function() {
  // Skip link focus management - 2.4.1 Bypass Blocks
  function initSkipLink() {
    const skip = document.querySelector('.skip-link');
    const main = document.getElementById('main-content');
    if (!skip || !main) return;
    skip.addEventListener('click', function(e) {
      e.preventDefault();
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: false });
      // Ensure main is scrolled into view with offset for sticky header
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 78;
      const top = main.getBoundingClientRect().top + window.scrollY - headerH - 20;
      window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      // Push state to URL
      history.pushState(null, '', '#main-content');
    });
  }

  // Focus not obscured - ensure focused element is not hidden under sticky header
  function initFocusNotObscured() {
    const header = document.getElementById('site-header');
    if (!header) return;
    document.addEventListener('focusin', function(e) {
      const target = e.target;
      if (!target) return;
      // If target is inside main, ensure it's visible
      const rect = target.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();
      if (rect.top < headerRect.bottom) {
        // Element is obscured by header, scroll it into view with offset
        const headerH = headerRect.height + 16;
        const top = window.scrollY + rect.top - headerH;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          window.scrollTo({ top, behavior: 'auto' });
        } else {
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  }

  // Enhanced keyboard navigation for mega menus - 2.1.1, 2.4.3, 2.4.7
  function enhanceMegaMenuKeyboard() {
    const triggers = document.querySelectorAll('.nav-trigger');
    triggers.forEach(trigger => {
      trigger.addEventListener('keydown', function(e) {
        const megaId = trigger.getAttribute('aria-controls');
        const mega = document.getElementById(megaId);
        if (!mega) return;
        switch(e.key) {
          case 'ArrowDown':
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (trigger.getAttribute('aria-expanded') !== 'true') {
              trigger.click();
            }
            // Focus first link in mega menu
            const firstLink = mega.querySelector('a');
            if (firstLink) {
              setTimeout(() => firstLink.focus(), 100);
            }
            break;
          case 'Escape':
            e.preventDefault();
            // Close mega menu and return focus
            const closeBtn = document.querySelector(`[aria-controls="${megaId}"]`);
            if (closeBtn) {
              closeBtn.setAttribute('aria-expanded', 'false');
              mega.classList.remove('is-open');
              closeBtn.focus();
            }
            break;
          case 'ArrowUp':
            if (trigger.getAttribute('aria-expanded') === 'true') {
              e.preventDefault();
              trigger.click();
            }
            break;
        }
      });
    });

    // Trap focus inside mega menu when open
    document.addEventListener('keydown', function(e) {
      const openMega = document.querySelector('.mega-menu.is-open');
      if (!openMega) return;
      if (e.key !== 'Tab') return;
      const focusable = openMega.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // Ensure all interactive elements have minimum target size - 2.5.8
  function ensureTargetSize() {
    // CSS handles most, but ensure JS-created elements also have it
    const style = document.createElement('style');
    style.textContent = `
      button, .btn, a, [role="button"] {
        min-height: 24px;
        // min-width: 24px;
      }
    `;
    document.head.appendChild(style);
  }

  // Announce dynamic content to screen readers - 4.1.3 Status Messages
  function initLiveRegions() {
    // Ensure countdown updates are announced politely
    const timer = document.getElementById('countdown-timer');
    if (timer) {
      timer.setAttribute('aria-live', 'polite');
      timer.setAttribute('aria-atomic', 'true');
    }
    // Scroll progress already has aria attributes
    const progress = document.getElementById('scroll-progress');
    if (progress) {
      progress.setAttribute('aria-valuemin', '0');
      progress.setAttribute('aria-valuemax', '100');
      progress.setAttribute('aria-valuenow', '0');
    }
  }

  // Enhance mobile drawer - focus trap, inert background, return focus
  function enhanceMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('nav-overlay');
    if (!drawer) return;
    // Ensure drawer has proper aria
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    // When drawer opens, make main content inert for screen readers
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          const isOpen = drawer.classList.contains('is-open');
          const main = document.getElementById('main-content');
          const header = document.getElementById('site-header');
          if (main) {
            if (isOpen) {
              main.setAttribute('aria-hidden', 'true');
              // Also set inert if supported
              if ('inert' in main) main.inert = true;
            } else {
              main.removeAttribute('aria-hidden');
              if ('inert' in main) main.inert = false;
            }
          }
        }
      });
    });
    observer.observe(drawer, { attributes: true });
  }

  // Respect reduced motion - 2.3.3
  function respectReducedMotion() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Disable autoplay for hero sliders
      document.documentElement.style.setProperty('--ease-out', 'linear');
      // Stop any autoplaying intervals
      // Note: existing JS already checks prefers-reduced-motion for hero
    }
  }

  // Initialize all enhancements
  document.addEventListener('DOMContentLoaded', function() {
    initSkipLink();
    initFocusNotObscured();
    enhanceMegaMenuKeyboard();
    ensureTargetSize();
    initLiveRegions();
    enhanceMobileDrawer();
    respectReducedMotion();
    
    // Fix: ensure all buttons have type="button"
    document.querySelectorAll('button:not([type])').forEach(btn => {
      btn.setAttribute('type', 'button');
    });
  });

  // Also run immediately if DOM already loaded
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initSkipLink();
    initFocusNotObscured();
  }
})();
