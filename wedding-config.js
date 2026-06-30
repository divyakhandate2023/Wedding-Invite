/*
  EDIT THIS FILE ONLY for names, dates, venue, copy, and RSVP endpoint.
  This site is static and can be hosted free on GitHub Pages, Netlify, or Vercel.

  RSVP setup:
  1. Create a free Formspree form or use a Google Forms endpoint.
  2. Paste the form endpoint below in RSVP_ENDPOINT.
  3. Leave RSVP_ENDPOINT empty if you want the form to open the visitor's email app instead.
*/

window.WEDDING_CONFIG = {
  blessing: "|| Shree Ganeshaya Namah ||",
  initials: "D & N",

  brideName: "Divya",
  groomName: "Nandan",
  weddingDateDisplay: "26th November",
  weddingCity: "Dallas, Texas",

  detailsText:
    "We are happy and excited to invite you to our wedding celebration. More venue, dress code, hotel, and travel details can be added here.",

  venueName: "Venue name to be added",
  venueAddress: "Dallas, Texas",
  googleMapsLink: "https://maps.google.com/?q=Dallas%20Texas",

  // Use YYYYMMDDTHHMMSS format for Google Calendar links.
  weddingCalendarStart: "20261126T115500",
  weddingCalendarEnd: "20261126T132500",

  // Paste your Formspree / form backend endpoint here.
  // Example: "https://formspree.io/f/yourFormId"
  RSVP_ENDPOINT: "",

  // Email fallback used when RSVP_ENDPOINT is blank.
  RSVP_EMAIL: "your-email@example.com",

  events: [
    {
      title: "Haldi & Mehendi",
      date: "25th November",
      time: "Starting from 3:00 PM",
      location: "Venue details to be added",
      description:
        "An afternoon filled with color, music, blessings, mehendi, haldi, laughter, and family celebrations."
    },
    {
      title: "Wedding Ceremony",
      date: "26th November",
      time: "11:55 AM – 1:25 PM",
      location: "Venue details to be added",
      description:
        "With the blessings of our families, we invite you to witness our Hindu wedding ceremony and celebrate the start of our married life."
    }
  ]
};
