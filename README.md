# Divya & Nandan Wedding Invitation Website

A mobile-first Hindu wedding invitation website with:

- Landing page with envelope-style invite
- Event information section
- RSVP form
- Editable configuration file
- Free static hosting compatibility

## Files

- `index.html` — website structure
- `styles.css` — design and responsive layout
- `app.js` — interactions and RSVP logic
- `wedding-config.js` — edit names, dates, venue, RSVP endpoint, and wording

## Edit wedding details

Open `wedding-config.js` and update:

```js
brideName: "Divya",
groomName: "Nandan",
weddingDateDisplay: "26th November",
weddingCity: "Dallas, Texas",
venueName: "Venue name to be added",
venueAddress: "Dallas, Texas",
googleMapsLink: "https://maps.google.com/?q=Dallas%20Texas"
```

Update the event cards here:

```js
events: [
  {
    title: "Haldi & Mehendi",
    date: "25th November",
    time: "Starting from 3:00 PM",
    location: "Venue details to be added"
  },
  {
    title: "Wedding Ceremony",
    date: "26th November",
    time: "11:55 AM – 1:25 PM",
    location: "Venue details to be added"
  }
]
```

## Make RSVP work

Because this is a free static website, it needs a form endpoint to collect RSVP submissions.

### Option 1: Formspree

1. Create a free form on Formspree.
2. Copy the endpoint URL.
3. Paste it in `wedding-config.js`:

```js
RSVP_ENDPOINT: "https://formspree.io/f/yourFormId"
```

### Option 2: Email fallback

Leave `RSVP_ENDPOINT` blank and update:

```js
RSVP_EMAIL: "your-email@example.com"
```

Then the RSVP form will open the guest's email app with the RSVP details.

## Free hosting options

You can host this as a static website using GitHub Pages, Netlify, Vercel, or Cloudflare Pages.

## Local preview

Open `index.html` in a browser.

For a better local preview, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```
