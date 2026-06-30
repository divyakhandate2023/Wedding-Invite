# Divya & Nandan Premium Lilac Wedding Invitation Website

This is a complete static wedding invitation website using a lilac, ivory, and gold palette.

## Included files

- `index.html`
- `styles.css`
- `app.js`
- `wedding-config.js`
- `README.md`

## Features

- Premium lilac landing page
- Hindu wedding text and Om/Ganesha blessing
- Click-to-open envelope invitation
- Wedding countdown timer
- Falling petal animation
- Events section
- RSVP form
- Copy invite link button
- Add to Google Calendar button
- Venue map button
- Mobile responsive layout

## Edit details

Open `wedding-config.js` and update:

```js
brideName: "Divya",
groomName: "Nandan",
venueName: "Venue name to be added",
venueAddress: "Dallas, Texas",
RSVP_EMAIL: "your-email@example.com",
RSVP_ENDPOINT: "",
countdownTarget: "2026-11-26T11:55:00-06:00"
```

## RSVP options

### Option 1: Email fallback

Leave this blank:

```js
RSVP_ENDPOINT: "",
```

Update this:

```js
RSVP_EMAIL: "your-email@example.com",
```

When guests submit RSVP, their email app opens with the RSVP details.

### Option 2: Formspree

Create a free Formspree form and paste the endpoint:

```js
RSVP_ENDPOINT: "https://formspree.io/f/yourFormId",
```

## Run locally

From the folder:

```powershell
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Push to GitHub

Copy these files into your Git repo, then run:

```powershell
git add .
git commit -m "Update wedding website to premium lilac version"
git push
```

GitHub Pages will update automatically after a few minutes.
