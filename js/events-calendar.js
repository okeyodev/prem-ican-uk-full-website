/* ==========================================================================
   ICAN UK - EVENTS CALENDAR PAGE JAVASCRIPT
   Vanilla ES6+ - No frameworks, no external calendar libraries
   Modules: Calendar, Navigation, Upcoming, Past Filter, Gallery, Modal
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector('[data-page="events"]')) return;

  initEventsData();
  initCalendarNavigation();
  initEventCalendar();
  initUpcomingEvents();
  initPastEventsFilter();
  initGalleryScroller();
  initEventModal();
  initFeaturedCountdown();
  initDownloadCalendar();
  initEventReveal();
  initEventsSectionIndex(); // Floating Section Index - Desktop Only
});

/* ==========================================================================
   0. DATA - Central event source
   Edit: Add/remove events here. CMS-ready structure.
   Types: monthly, conference, cpd, social, gala, community
   Category for dot: meeting, cpd, social, conference, gala
   ========================================================================== */
let EVENTS = [];

function initEventsData() {
  EVENTS = [
    {
      id: "monthly-sep-2026",
      title: "September Monthly Meeting",
      category: "meeting",
      type: "monthly",
      date: "2026-09-18",
      time: "18:00",
      endTime: "20:00",
      venue: "London / Hybrid",
      location: "Chartered Accountants' Hall, London + Zoom",
      description: "Technical session on IFRS updates and professional development. Includes CPD certification and networking.",
      longDesc: "Join us for our flagship monthly technical session covering the latest IFRS developments, FRC guidance, and professional ethics. CPD certificates provided. Hybrid attendance available for regional members.",
      image: "../images/ICANUKPICNIC241.jpg",
      badges: ["Hybrid", "CPD 2hrs", "Members Only"],
      year: 2026,
      featured: false
    },
    {
      id: "monthly-oct-2026",
      title: "October Monthly Meeting",
      category: "meeting",
      type: "monthly",
      date: "2026-10-16",
      time: "18:00",
      endTime: "20:00",
      venue: "London / Hybrid",
      location: "London + Online",
      description: "Audit quality, risk management and regulatory update with ICAEW guest speaker.",
      longDesc: "Deep dive into audit quality frameworks, risk assessment and new regulatory expectations with guest from ICAEW.",
      image: "../images/Gallery1.jpeg",
      badges: ["Hybrid", "CPD 2hrs"],
      year: 2026,
      featured: false
    },
    {
      id: "cpd-ifrs-nov-2026",
      title: "IFRS Masterclass - CPD Session",
      category: "cpd",
      type: "cpd",
      date: "2026-10-28",
      time: "17:30",
      endTime: "19:30",
      venue: "Online",
      location: "Zoom - CPD Portal",
      description: "Intensive CPD on IFRS 9, 15 and 16 practical application for UK practitioners.",
      longDesc: "Accredited CPD session providing practical case studies on financial instruments, revenue recognition and leases.",
      image: "../images/ICANUKPICNIC241.jpg",
      badges: ["Online", "CPD 3hrs"],
      year: 2026,
      featured: false
    },
    {
      id: "networking-nov-2026",
      title: "Professional Networking Evening",
      category: "social",
      type: "social",
      date: "2026-11-05",
      time: "18:30",
      endTime: "21:00",
      venue: "Central London",
      location: "The City, London",
      description: "Connect with fellow chartered accountants, mentors and industry leaders.",
      longDesc: "Relaxed networking with 80+ members, welcome drinks, and mentorship matching for newly qualified accountants.",
      image: "../images/Gallery1.jpeg",
      badges: ["In-Person", "Social"],
      year: 2026,
      featured: false
    },
    {
      id: "conference-2026",
      title: "ICAN UK Annual Conference 2026",
      category: "conference",
      type: "conference",
      date: "2026-11-20",
      time: "09:00",
      endTime: "17:30",
      venue: "London Marriott",
      location: "London Marriott Grosvenor Square, London",
      description: "Leading the Future of Finance and Professional Excellence. Flagship annual gathering.",
      longDesc: "Our flagship conference brings together 300+ professionals, regulators, and industry leaders. Keynotes on AI in finance, sustainability reporting, leadership, and global mobility. CPD 8hrs, Gala dinner included.",
      image: "../images/ICANUKPICNIC241.jpg",
      badges: ["Conference", "CPD 8hrs", "Gala Dinner"],
      year: 2026,
      featured: true,
      speakers: 12,
      countdownDate: "2026-11-20T09:00:00+00:00"
    },
    {
      id: "gala-2026",
      title: "Annual Gala & Awards Night",
      category: "gala",
      type: "gala",
      date: "2026-11-21",
      time: "19:00",
      endTime: "23:00",
      venue: "London Marriott",
      location: "London Marriott Grosvenor Square",
      description: "Celebrating excellence, service and community. Black tie evening with awards.",
      longDesc: "Annual black-tie gala celebrating distinguished service, new Fellows, and community impact. Live band, three-course dinner.",
      image: "../images/Gallery1.jpeg",
      badges: ["Black Tie", "Awards"],
      year: 2026,
      featured: true
    },
    {
      id: "young-pro-dec-2026",
      title: "Young Professionals Forum",
      category: "social",
      type: "community",
      date: "2026-12-04",
      time: "18:00",
      endTime: "20:30",
      venue: "Canary Wharf",
      location: "Canary Wharf, London",
      description: "Career pathways, ACA to FCA journey, and building your network in the UK.",
      longDesc: "Designed for accountants under 35, newly qualified and students. Panel on career progression, migration, and building credibility.",
      image: "../images/ICANUKPICNIC241.jpg",
      badges: ["Young Pro", "Mentorship"],
      year: 2026,
      featured: false
    },
    {
      id: "christmas-social-2026",
      title: "Christmas Community Social",
      category: "social",
      type: "community",
      date: "2026-12-12",
      time: "17:00",
      endTime: "20:00",
      venue: "London",
      location: "Central London",
      description: "End-of-year community gathering, charity collection and member appreciation.",
      longDesc: "Festive community event with benevolent fund update, charity drive, and appreciation for volunteers and committee members.",
      image: "../images/Gallery1.jpeg",
      badges: ["Community", "Family Welcome"],
      year: 2026,
      featured: false
    },
    // Past events
    {
      id: "past-conf-2025",
      title: "Annual Conference 2025 - Resilience & Growth",
      category: "conference",
      type: "conference",
      date: "2025-11-15",
      time: "09:00",
      endTime: "17:00",
      venue: "London",
      location: "London",
      description: "Over 280 professionals gathered to discuss resilience in a changing economy.",
      longDesc: "Past event archive - keynotes on economic resilience, digital transformation, and professional leadership.",
      image: "../images/ICANUKPICNIC241.jpg",
      badges: ["Past Event"],
      year: 2025,
      featured: false
    },
    {
      id: "past-gala-2025",
      title: "Annual Gala 2025",
      category: "gala",
      type: "gala",
      date: "2025-11-16",
      time: "19:00",
      endTime: "23:00",
      venue: "London",
      location: "London",
      description: "Celebrating 37 years of community and professional excellence.",
      longDesc: "Elegant evening celebrating long service and new members.",
      image: "../images/Gallery1.jpeg",
      badges: ["Past Event"],
      year: 2025,
      featured: false
    },
    {
      id: "past-cpd-2024",
      title: "Technical CPD Series 2024",
      category: "cpd",
      type: "cpd",
      date: "2024-09-20",
      time: "18:00",
      endTime: "20:00",
      venue: "Hybrid",
      location: "London + Online",
      description: "Sustainability reporting and ISSB standards.",
      longDesc: "Archive - Technical deep dive on sustainability reporting.",
      image: "../images/ICANUKPICNIC241.jpg",
      badges: ["Past Event"],
      year: 2024,
      featured: false
    },
    {
      id: "past-picnic-2024",
      title: "Summer Family Picnic 2024",
      category: "social",
      type: "community",
      date: "2024-07-20",
      time: "12:00",
      endTime: "17:00",
      venue: "Hyde Park",
      location: "Hyde Park, London",
      description: "Family community picnic with over 150 members and families.",
      longDesc: "Community social event bringing members and families together.",
      image: "../images/Gallery1.jpeg",
      badges: ["Past Event"],
      year: 2024,
      featured: false
    },
    {
      id: "past-conf-2023",
      title: "Annual Conference 2023",
      category: "conference",
      type: "conference",
      date: "2023-11-18",
      time: "09:00",
      endTime: "17:00",
      venue: "London",
      location: "London",
      description: "Professional excellence in a digital age.",
      longDesc: "Archive event.",
      image: "../images/ICANUKPICNIC241.jpg",
      badges: ["Past Event"],
      year: 2023,
      featured: false
    }
  ];
}

/* ==========================================================================
   1. CALENDAR NAVIGATION - Sticky subnav + IntersectionObserver
   ========================================================================== */
function initCalendarNavigation() {
  const subnav = document.getElementById("event-subnav");
  const links = document.querySelectorAll(".e-subnav-link");
  const sections = ["monthly-meetings", "upcoming-events", "calendar-view", "past-events", "resources"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!subnav || !sections.length) return;

  // Smooth scroll
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        const offset = subnav.offsetHeight + 86;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // Active observer
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(l => {
            l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`);
          });
        }
      });
    }, { threshold: 0.45, rootMargin: "-20% 0px -50% 0px" });

    sections.forEach(s => io.observe(s));
  }
}

/* ==========================================================================
   2. INTERACTIVE CALENDAR VIEW - Vanilla JS
   Views: month, list, agenda
   ========================================================================== */
function initEventCalendar() {
  const wrap = document.getElementById("e-cal-wrap");
  const gridEl = document.getElementById("e-cal-grid");
  const listEl = document.getElementById("e-cal-list");
  const agendaEl = document.getElementById("e-cal-agenda");
  const titleEl = document.getElementById("e-cal-title-text");
  const prevBtn = document.getElementById("e-cal-prev");
  const nextBtn = document.getElementById("e-cal-next");
  const todayBtn = document.getElementById("e-cal-today");
  const viewBtns = document.querySelectorAll(".e-cal-view-btn");

  if (!wrap || !gridEl) return;

  let currentDate = new Date();
  let currentView = "month"; // month, list, agenda
  // On mobile, default to agenda but keep month logic for title
  if (window.innerWidth <= 768) currentView = "agenda";

  function getMonthEvents(year, month) {
    return EVENTS.filter(ev => {
      const d = new Date(ev.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }

  function getEventsForDate(dateStr) {
    return EVENTS.filter(ev => ev.date === dateStr);
  }

  function formatMonthYear(date) {
    return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  }

  function renderMonth() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (titleEl) titleEl.textContent = formatMonthYear(currentDate);

    // Clear
    gridEl.innerHTML = "";

    // Weekdays header already in HTML? We generate if not
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    weekdays.forEach(day => {
      const wd = document.createElement("div");
      wd.className = "e-cal-weekday";
      wd.textContent = day;
      gridEl.appendChild(wd);
    });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Calculate starting offset (Monday start)
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;

    // Previous month filler
    const prevMonthLast = new Date(year, month, 0).getDate();
    for (let i = 0; i < startDay; i++) {
      const dayNum = prevMonthLast - startDay + 1 + i;
      const dateStr = `${year}-${String(month).padStart(2,"0")}-${String(dayNum).padStart(2,"0")}`;
      const cell = createDayCell(dayNum, dateStr, true);
      gridEl.appendChild(cell);
    }

    // Current month
    const todayStr = new Date().toISOString().split("T")[0];
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
      const cell = createDayCell(d, dateStr, false, dateStr === todayStr);
      const events = getEventsForDate(dateStr);
      if (events.length) {
        cell.classList.add("has-events");
        const eventsWrap = cell.querySelector(".e-cal-events");
        events.slice(0,3).forEach(ev => {
          const chip = document.createElement("div");
          chip.className = `e-cal-event-chip ${ev.category}`;
          chip.textContent = ev.title;
          eventsWrap.appendChild(chip);
        });
        if (events.length > 3) {
          const more = document.createElement("div");
          more.className = "e-cal-more";
          more.textContent = `+${events.length - 3} more`;
          eventsWrap.appendChild(more);
        }
        // dots for mobile
        const dotsWrap = cell.querySelector(".e-cal-dots");
        if (dotsWrap) {
          events.slice(0,3).forEach(ev => {
            const dot = document.createElement("span");
            dot.className = `e-legend-dot ${ev.category}`;
            dotsWrap.appendChild(dot);
          });
        }
      }
      gridEl.appendChild(cell);
    }

    // Next month filler to fill 6 rows (42 cells total minus weekdays we added? Actually weekdays + days)
    const totalCells = startDay + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;
    // Fill to reach 35 or 42 cells for consistent height
    let extra = remaining;
    if (totalCells + remaining < 35) extra += 7;
    for (let i = 1; i <= extra; i++) {
      const dateStr = `${year}-${String(month + 2).padStart(2,"0")}-${String(i).padStart(2,"0")}`;
      const cell = createDayCell(i, dateStr, true);
      gridEl.appendChild(cell);
    }

    // Also update agenda view for current month
    renderAgenda();
    renderList();
  }

  function createDayCell(num, dateStr, isOther, isToday = false) {
    const cell = document.createElement("div");
    cell.className = "e-cal-day";
    if (isOther) cell.classList.add("is-other-month");
    if (isToday) cell.classList.add("is-today");
    cell.tabIndex = 0;
    cell.setAttribute("role", "button");
    cell.setAttribute("aria-label", `Events on ${dateStr}`);
    cell.dataset.date = dateStr;

    const numEl = document.createElement("div");
    numEl.className = "e-cal-day-num";
    numEl.textContent = num;

    const eventsWrap = document.createElement("div");
    eventsWrap.className = "e-cal-events";

    const dotsWrap = document.createElement("div");
    dotsWrap.className = "e-cal-dots";

    cell.appendChild(numEl);
    cell.appendChild(eventsWrap);
    cell.appendChild(dotsWrap);

    cell.addEventListener("click", () => {
      const evs = getEventsForDate(dateStr);
      if (evs.length) {
        openEventModal(evs[0].id);
      } else {
        // If no event, maybe show empty state? For now do nothing
      }
    });

    cell.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        cell.click();
      }
    });

    return cell;
  }

  function renderList() {
    if (!listEl) return;
    listEl.innerHTML = "";
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthEvents = getMonthEvents(year, month).sort((a,b) => new Date(a.date) - new Date(b.date));

    if (!monthEvents.length) {
      listEl.innerHTML = `<div style="padding:1.2rem;color:rgba(17,24,32,.54);font-size:.9rem;">No events scheduled for ${formatMonthYear(currentDate)}. Use next month to explore upcoming activities.</div>`;
      return;
    }

    monthEvents.forEach(ev => {
      const item = document.createElement("div");
      item.className = "e-cal-list-item";
      item.tabIndex = 0;
      const d = new Date(ev.date);
      const day = d.getDate();
      const monthShort = d.toLocaleDateString("en-GB", { month: "short" });

      item.innerHTML = `
        <div class="e-cal-list-date">
          <strong>${String(day).padStart(2,"0")}</strong>
          <span>${monthShort}</span>
        </div>
        <div class="e-cal-list-content">
          <h4>${ev.title}</h4>
          <p>${ev.time} • ${ev.venue} • ${ev.description}</p>
        </div>
        <div class="e-cal-list-meta">
          <span class="badge-hybrid" style="background:var(--color-ivory);border:1px solid var(--color-line);padding:.24rem .5rem;border-radius:999px;font-size:.6rem;text-transform:uppercase;font-weight:600;">${ev.category}</span>
        </div>
      `;
      item.addEventListener("click", () => openEventModal(ev.id));
      item.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          item.click();
        }
      });
      listEl.appendChild(item);
    });
  }

  function renderAgenda() {
    if (!agendaEl) return;
    agendaEl.innerHTML = "";
    // For agenda, show next 8 upcoming events from currentDate
    const today = new Date();
    today.setHours(0,0,0,0);
    const upcoming = EVENTS
      .filter(ev => new Date(ev.date) >= today)
      .sort((a,b) => new Date(a.date) - new Date(b.date))
      .slice(0, 12);

    if (!upcoming.length) {
      agendaEl.innerHTML = `<div style="padding:1rem;color:rgba(17,24,32,.54);">No upcoming events. Check past events archive for highlights.</div>`;
      return;
    }

    upcoming.forEach(ev => {
      const d = new Date(ev.date);
      const day = d.getDate();
      const monthShort = d.toLocaleDateString("en-GB", { month: "short" });
      const card = document.createElement("div");
      card.className = "e-agenda-card";
      card.tabIndex = 0;
      card.innerHTML = `
        <div class="e-cal-list-date" style="min-width:72px;">
          <strong>${String(day).padStart(2,"0")}</strong>
          <span>${monthShort}</span>
          <span style="margin-top:.2rem;font-size:.6rem;">${ev.time}</span>
        </div>
        <div style="flex:1;">
          <div style="display:flex;gap:.35rem;margin-bottom:.35rem;">
            <span class="e-legend-dot ${ev.category}"></span>
            <small style="font-size:.64rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(17,24,32,.5);font-weight:600;">${ev.category} • ${ev.venue}</small>
          </div>
          <h4 style="font-family:var(--font-display);font-size:.98rem;color:var(--color-navy);line-height:1.2;margin-bottom:.25rem;">${ev.title}</h4>
          <p style="font-size:.8rem;color:rgba(17,24,32,.62);line-height:1.45;">${ev.description}</p>
        </div>
      `;
      card.addEventListener("click", () => openEventModal(ev.id));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      });
      agendaEl.appendChild(card);
    });
  }

  function switchView(view) {
    currentView = view;
    wrap.dataset.view = view;
    viewBtns.forEach(b => b.classList.toggle("is-active", b.dataset.view === view));

    // Show/hide containers
    if (view === "month") {
      gridEl.style.display = "grid";
      if (listEl) listEl.style.display = "none";
      if (agendaEl) agendaEl.style.display = "none";
    } else if (view === "list") {
      gridEl.style.display = "none";
      if (listEl) listEl.style.display = "grid";
      if (agendaEl) agendaEl.style.display = "none";
      renderList();
    } else if (view === "agenda") {
      gridEl.style.display = "none";
      if (listEl) listEl.style.display = "none";
      if (agendaEl) agendaEl.style.display = "grid";
      renderAgenda();
    }

    // On mobile, month view forces agenda display via CSS, but JS still respects
    if (window.innerWidth <= 768 && view === "month") {
      // CSS handles it, but ensure agenda is visible as fallback
      if (agendaEl) agendaEl.style.display = "grid";
    }
  }

  // Controls
  prevBtn?.addEventListener("click", () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    renderMonth();
  });

  nextBtn?.addEventListener("click", () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    renderMonth();
  });

  todayBtn?.addEventListener("click", () => {
    currentDate = new Date();
    renderMonth();
    if (currentView === "list") renderList();
  });

  viewBtns.forEach(btn => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });

  // Initial render
  wrap.dataset.view = currentView;
  renderMonth();
  switchView(currentView);

  // Expose for resize handling
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768 && currentView === "month") {
      // Keep CSS handling
    }
  });
}

/* ==========================================================================
   3. UPCOMING EVENTS - Featured countdown and small cards interaction
   ========================================================================== */
function initUpcomingEvents() {
  // Populate upcoming small cards dynamically if container exists
  const grid = document.getElementById("upcoming-grid");
  if (!grid) return;

  const upcoming = EVENTS.filter(ev => !ev.featured && new Date(ev.date) >= new Date()).sort((a,b) => new Date(a.date) - new Date(b.date)).slice(0,4);

  // If static HTML already exists, just enhance with click handlers
  grid.querySelectorAll(".up-card").forEach(card => {
    const id = card.dataset.eventId;
    if (id) {
      card.addEventListener("click", () => openEventModal(id));
      card.style.cursor = "pointer";
    }
  });

  // Also handle featured card
  const featuredCard = document.getElementById("upcoming-featured");
  if (featuredCard) {
    const id = featuredCard.dataset.eventId;
    if (id) {
      featuredCard.querySelectorAll("[data-modal-trigger]").forEach(el => {
        el.addEventListener("click", e => {
          e.preventDefault();
          openEventModal(id);
        });
      });
    }
  }
}

/* ==========================================================================
   4. PAST EVENTS FILTER - Year filter
   ========================================================================== */
function initPastEventsFilter() {
  const filterWrap = document.getElementById("past-filter");
  const grid = document.getElementById("past-grid");
  if (!filterWrap || !grid) return;

  const yearBtns = filterWrap.querySelectorAll(".e-past-year");
  const cards = grid.querySelectorAll(".past-card");

  function filterByYear(year) {
    yearBtns.forEach(b => b.classList.toggle("is-active", b.dataset.year === year || (year === "all" && b.dataset.year === "all")));
    cards.forEach(card => {
      const cardYear = card.dataset.year;
      const show = year === "all" || cardYear === year;
      card.style.display = show ? "" : "none";
      if (show) {
        card.classList.remove("is-visible");
        void card.offsetWidth;
        card.classList.add("is-visible");
      }
    });
  }

  yearBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterByYear(btn.dataset.year);
    });
  });

  // Default to all or 2026
  filterByYear("all");
}

/* ==========================================================================
   5. GALLERY SCROLLER - Drag scroll + arrows
   ========================================================================== */
function initGalleryScroller() {
  const ribbon = document.getElementById("mem-ribbon");
  const prev = document.getElementById("mem-prev");
  const next = document.getElementById("mem-next");
  if (!ribbon) return;

  let isDown = false, startX = 0, scrollLeft = 0;

  ribbon.addEventListener("mousedown", e => {
    isDown = true;
    ribbon.classList.add("is-dragging");
    startX = e.pageX - ribbon.offsetLeft;
    scrollLeft = ribbon.scrollLeft;
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
    ribbon.classList.remove("is-dragging");
  });

  ribbon.addEventListener("mouseleave", () => {
    isDown = false;
    ribbon.classList.remove("is-dragging");
  });

  ribbon.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - ribbon.offsetLeft;
    const walk = (x - startX) * 1.2;
    ribbon.scrollLeft = scrollLeft - walk;
  });

  // Touch
  ribbon.addEventListener("touchstart", e => {
    startX = e.touches[0].pageX - ribbon.offsetLeft;
    scrollLeft = ribbon.scrollLeft;
  }, { passive: true });

  ribbon.addEventListener("touchmove", e => {
    const x = e.touches[0].pageX - ribbon.offsetLeft;
    const walk = (x - startX) * 1.2;
    ribbon.scrollLeft = scrollLeft - walk;
  }, { passive: true });

  function scrollAmt(dir) {
    const amt = ribbon.clientWidth * 0.8;
    ribbon.scrollBy({ left: dir * amt, behavior: "smooth" });
  }

  prev?.addEventListener("click", () => scrollAmt(-1));
  next?.addEventListener("click", () => scrollAmt(1));
}

/* ==========================================================================
   6. EVENT MODAL
   ========================================================================== */
function initEventModal() {
  const modal = document.getElementById("event-modal");
  const backdrop = modal?.querySelector(".e-modal-backdrop");
  const closeBtn = modal?.querySelector(".e-modal-close");
  const imgEl = modal?.querySelector("#e-modal-img");
  const kickerEl = modal?.querySelector("#e-modal-kicker");
  const titleEl = modal?.querySelector("#e-modal-title");
  const metaEl = modal?.querySelector("#e-modal-meta");
  const descEl = modal?.querySelector("#e-modal-desc");
  const actionsEl = modal?.querySelector("#e-modal-actions");

  if (!modal) return;

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  backdrop?.addEventListener("click", closeModal);
  closeBtn?.addEventListener("click", closeModal);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // Expose open function globally for calendar
  window.openEventModal = openEventModal;

  function openEventModal(eventId) {
    const ev = EVENTS.find(e => e.id === eventId);
    if (!ev) return;

    if (imgEl) {
      imgEl.src = ev.image;
      imgEl.alt = ev.title;
    }
    if (kickerEl) kickerEl.textContent = `${ev.category} • ${ev.type}`;
    if (titleEl) titleEl.textContent = ev.title;
    if (metaEl) {
      metaEl.innerHTML = `
        <span>${new Date(ev.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} • ${ev.time} - ${ev.endTime}</span>
        <span>${ev.venue}</span>
        <span>${ev.location}</span>
      `;
    }
    if (descEl) descEl.textContent = ev.longDesc || ev.description;
    if (actionsEl) {
      actionsEl.innerHTML = `
        <a href="#" class="btn btn-primary" data-register>Register for Event</a>
        <button class="btn btn-secondary" data-close-modal>Close</button>
      `;
      actionsEl.querySelector("[data-close-modal]")?.addEventListener("click", closeModal);
      actionsEl.querySelector("[data-register]")?.addEventListener("click", e => {
        e.preventDefault();
        showToast(`Registration for "${ev.title}" - portal opening soon`);
      });
    }

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    // Focus close for accessibility
    closeBtn?.focus();
  }
}

function openEventModal(id) {
  if (window.openEventModal) window.openEventModal(id);
}

/* ==========================================================================
   7. FEATURED COUNTDOWNS - Reuse existing logic
   ========================================================================== */
function initFeaturedCountdown() {
  const els = document.querySelectorAll("[data-countdown-date]");
  if (!els.length) return;

  els.forEach(container => {
    const dateStr = container.dataset.countdownDate;
    if (!dateStr) return;
    let target;
    try {
      target = new Date(dateStr);
      if (isNaN(target.getTime())) return;
    } catch { return; }

    const daysEl = container.querySelector("[data-days]");
    const hoursEl = container.querySelector("[data-hours]");
    const minsEl = container.querySelector("[data-mins]");
    const secsEl = container.querySelector("[data-secs]");

    function tick() {
      const diff = target - new Date();
      if (diff <= 0) {
        if (daysEl) daysEl.textContent = "00";
        if (hoursEl) hoursEl.textContent = "00";
        if (minsEl) minsEl.textContent = "00";
        if (secsEl) secsEl.textContent = "00";
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      if (daysEl) daysEl.textContent = String(d).padStart(2,"0");
      if (hoursEl) hoursEl.textContent = String(h).padStart(2,"0");
      if (minsEl) minsEl.textContent = String(m).padStart(2,"0");
      if (secsEl) secsEl.textContent = String(s).padStart(2,"0");
    }

    tick();
    setInterval(tick, 1000);
  });
}

/* ==========================================================================
   8. DOWNLOAD ANNUAL CALENDAR - Generate ICS
   ========================================================================== */
function initDownloadCalendar() {
  const btn = document.getElementById("download-calendar-btn");
  const btn2 = document.getElementById("download-calendar-btn-2");
  if (!btn && !btn2) return;

  function generateICS() {
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ICAN UK//Events Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:ICAN UK Events Calendar 2026"
    ];

    EVENTS.forEach(ev => {
      const start = new Date(`${ev.date}T${ev.time}:00`);
      const end = new Date(`${ev.date}T${ev.endTime}:00`);
      const fmt = d => d.toISOString().replace(/[-:]/g,"").split(".")[0] + "Z";
      lines.push("BEGIN:VEVENT");
      lines.push(`UID:${ev.id}@ican-uk.org`);
      lines.push(`DTSTAMP:${fmt(new Date())}`);
      lines.push(`DTSTART:${fmt(start)}`);
      lines.push(`DTEND:${fmt(end)}`);
      lines.push(`SUMMARY:${ev.title}`);
      lines.push(`DESCRIPTION:${ev.description.replace(/\n/g,"\\n")}`);
      lines.push(`LOCATION:${ev.location}`);
      lines.push("END:VEVENT");
    });

    lines.push("END:VCALENDAR");
    return lines.join("\r\n");
  }

  function download() {
    const ics = generateICS();
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ICAN-UK-Events-Calendar-2026.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("Annual calendar downloaded (.ics)");
  }

  btn?.addEventListener("click", e => {
    e.preventDefault();
    download();
  });
  btn2?.addEventListener("click", e => {
    e.preventDefault();
    download();
  });
}

/* ==========================================================================
   9. REVEAL - IntersectionObserver for .e-reveal
   ========================================================================== */
function initEventReveal() {
  const els = document.querySelectorAll(".e-reveal, .reveal");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });

  els.forEach(el => io.observe(el));
}

/* ==========================================================================
   10. TOAST - Simple feedback
   ========================================================================== */
function showToast(msg) {
  let toast = document.getElementById("e-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "e-toast";
    toast.className = "e-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("is-visible");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

// Expose for inline handlers
window.showToast = showToast;


/* ==========================================================================
   11. SECTION INDEX - Floating desktop nav for Events page (generic)
   Mirrors committee page but works for events sections
   ========================================================================== */
function initEventsSectionIndex() {
  // If global initSectionIndex already handled it, skip to avoid double binding
  // Check if script.js already initialized by seeing if links have listeners? Simple check: if progress bar already >0 after scroll, still init for safety
  const index = document.querySelector(".section-index");
  const links = document.querySelectorAll(".si-link");
  const progressBar = document.getElementById("si-progress");
  if (!index || !links.length) return;

  const sections = Array.from(links).map(link => {
    const id = link.dataset.section || link.getAttribute("href").replace("#","");
    return document.getElementById(id);
  }).filter(Boolean);

  if (!sections.length) return;

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
          links.forEach(l => {
            const sec = l.dataset.section || l.getAttribute("href").replace("#","");
            l.classList.toggle("is-active", sec === id);
          });
        }
      });
    }, { threshold: 0.45, rootMargin: "-10% 0px -40% 0px" });
    sections.forEach(s => io.observe(s));
  }

  // Avoid double-binding if script.js already bound click: we bind once with flag
  links.forEach(link => {
    if (link.dataset.siBound) return;
    link.dataset.siBound = "1";
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.dataset.section || link.getAttribute("href").replace("#","");
      const target = document.getElementById(id);
      if (target) {
        const headerOffset = 90;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}



/* WCAG 2.2 Enhancements for events-calendar.js */
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
