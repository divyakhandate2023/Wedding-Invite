const config = window.WEDDING_CONFIG || {};

function setConfigText() {
  document.querySelectorAll("[data-config]").forEach((element) => {
    const key = element.getAttribute("data-config");
    if (config[key] !== undefined && config[key] !== null) {
      element.textContent = config[key];
    }
  });
}

function setupMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navMenu.classList.remove("open"));
  });
}

function setupInviteOpen() {
  const openBtn = document.getElementById("openCardButton");
  const card = document.getElementById("inviteCard");

  openBtn.addEventListener("click", () => {
    card.classList.add("open");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function renderEvents() {
  const grid = document.getElementById("eventGrid");
  grid.innerHTML = "";

  (config.events || []).forEach((event) => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.innerHTML = `
      <span class="event-label">${event.label || "Event"}</span>
      <h3 class="event-title">${event.title}</h3>
      <p class="event-date">${event.date}</p>
      <p class="event-time">${event.time}</p>
      <p class="event-location"><strong>Location:</strong> ${event.location}</p>
      <p class="event-description">${event.description}</p>
    `;
    card.addEventListener("click", () => card.classList.toggle("expanded"));
    grid.appendChild(card);
  });
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((el) => observer.observe(el));
}

function setupLinks() {
  const mapLink = document.getElementById("mapLink");
  mapLink.href = config.googleMapsLink || "https://maps.google.com/?q=Dallas%20Texas";

  const title = encodeURIComponent(`${config.brideName} & ${config.groomName} Wedding`);
  const details = encodeURIComponent("We are delighted to invite you to celebrate our wedding.");
  const location = encodeURIComponent(`${config.venueName || ""}, ${config.venueAddress || ""}`);

  const calendarLink = document.getElementById("calendarLink");
  calendarLink.href =
    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}` +
    `&dates=${config.weddingCalendarStart}/${config.weddingCalendarEnd}` +
    `&details=${details}&location=${location}`;
}

function getCheckedEvents() {
  return Array.from(document.querySelectorAll('input[name="events"]:checked'))
    .map((input) => input.value)
    .join(", ");
}

async function submitToEndpoint(payload) {
  const response = await fetch(config.RSVP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to submit RSVP.");
  }
}

function submitByEmail(payload) {
  const subject = encodeURIComponent(`RSVP from ${payload.guestName}`);
  const body = encodeURIComponent(
    `Name: ${payload.guestName}\n` +
    `Contact: ${payload.guestContact}\n` +
    `Attendance: ${payload.attendance}\n` +
    `Guests: ${payload.guestCount}\n` +
    `Events: ${payload.eventsAttending || "Not selected"}\n` +
    `Message: ${payload.message || "None"}`
  );

  window.location.href = `mailto:${config.RSVP_EMAIL}?subject=${subject}&body=${body}`;
}

function setupRSVP() {
  const form = document.getElementById("rsvpForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      guestName: form.guestName.value.trim(),
      guestContact: form.guestContact.value.trim(),
      attendance: form.attendance.value,
      guestCount: form.guestCount.value,
      eventsAttending: getCheckedEvents(),
      message: form.message.value.trim(),
      submittedAt: new Date().toISOString()
    };

    status.textContent = "Submitting your RSVP...";

    try {
      if (config.RSVP_ENDPOINT) {
        await submitToEndpoint(payload);
        status.textContent = "Thank you. Your RSVP has been submitted successfully.";
        form.reset();
      } else {
        status.textContent = "Opening your email app to send RSVP.";
        submitByEmail(payload);
      }
    } catch (error) {
      status.textContent = "Could not submit the RSVP. Please try again.";
    }
  });
}

function createPetals() {
  const petalLayer = document.getElementById("petalLayer");
  const total = window.innerWidth < 760 ? 12 : 18;

  for (let i = 0; i < total; i++) {
    const petal = document.createElement("span");
    petal.className = "petal" + (i % 4 === 0 ? " gold" : "");
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${8 + Math.random() * 8}s`;
    petal.style.animationDelay = `${Math.random() * 6}s`;
    petal.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
    petal.style.opacity = (0.35 + Math.random() * 0.45).toFixed(2);
    petal.style.transform = `scale(${0.8 + Math.random() * 1.1})`;
    petalLayer.appendChild(petal);
  }
}



function setupCountdown() {
  const weddingTime = new Date(config.countdownTarget || "2026-11-26T11:55:00-06:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingTime - now;

    if (distance <= 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function setupCopyInviteLink() {
  const button = document.getElementById("copyInviteLink");
  const status = document.getElementById("copyStatus");

  button.addEventListener("click", async () => {
    const link = window.location.href.split("#")[0];

    try {
      await navigator.clipboard.writeText(link);
      status.textContent = "Invite link copied.";
    } catch (error) {
      status.textContent = link;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setConfigText();
  setupMenu();
  setupInviteOpen();
  renderEvents();
  setupRevealAnimations();
  setupLinks();
  setupRSVP();
  setupCountdown();
  setupCopyInviteLink();
  createPetals();
});
