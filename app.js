const config = window.WEDDING_CONFIG || {};

function applyConfigText() {
  document.querySelectorAll("[data-config]").forEach((element) => {
    const key = element.getAttribute("data-config");
    if (config[key]) element.textContent = config[key];
  });
}

function renderEvents() {
  const eventCards = document.getElementById("eventCards");
  eventCards.innerHTML = "";

  (config.events || []).forEach((event) => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.innerHTML = `
      <p class="event-date">${event.date}</p>
      <h3>${event.title}</h3>
      <p class="time">${event.time}</p>
      <p class="location"><strong>Location:</strong> ${event.location}</p>
      <p class="description">${event.description}</p>
    `;
    eventCards.appendChild(card);
  });
}

function setupEnvelope() {
  const button = document.getElementById("openInviteButton");
  const reveal = document.getElementById("inviteReveal");

  button.addEventListener("click", () => {
    button.classList.add("open");
    reveal.classList.add("visible");
  });
}

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => links.classList.remove("open"));
  });
}

function setupLinks() {
  const mapsLink = document.getElementById("mapsLink");
  mapsLink.href = config.googleMapsLink || "https://maps.google.com/?q=Dallas%20Texas";

  const calendarLink = document.getElementById("calendarLink");
  const title = encodeURIComponent(`${config.brideName} & ${config.groomName} Wedding Ceremony`);
  const details = encodeURIComponent("We are delighted to invite you to celebrate our wedding.");
  const location = encodeURIComponent(`${config.venueName || ""}, ${config.venueAddress || ""}`);
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
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("RSVP submission failed.");
  }
}

function submitByEmail(payload) {
  const subject = encodeURIComponent(`RSVP: ${payload.guestName}`);
  const body = encodeURIComponent(
    `Name: ${payload.guestName}\n` +
    `Email / Phone: ${payload.guestEmail}\n` +
    `Attendance: ${payload.attendance}\n` +
    `Number of Guests: ${payload.guestCount}\n` +
    `Events: ${payload.eventsAttending || "Not selected"}\n` +
    `Message / Dietary Notes: ${payload.message || "None"}`
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
      guestEmail: form.guestEmail.value.trim(),
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
        status.textContent = "Thank you. Your RSVP has been submitted.";
        form.reset();
      } else {
        status.textContent = "Opening your email app to send RSVP.";
        submitByEmail(payload);
      }
    } catch (error) {
      status.textContent = "Could not submit RSVP. Please try again or contact the couple directly.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfigText();
  renderEvents();
  setupEnvelope();
  setupMobileNav();
  setupLinks();
  setupRSVP();
});
