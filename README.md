# Divya & Nandan Lilac Wedding Invitation Website

This version uses a lilac, cream, blush, and gold wedding palette instead of sage green.

## Added interactive elements
- Wedding countdown timer
- Copy invite link button
- Click-to-open envelope invitation
- Animated falling petals
- Clickable/expandable event cards
- RSVP form
- Add to calendar button
- Venue map button
- Expandable details section for dress code, travel, and what to bring

## Files
- `index.html`
- `styles.css`
- `app.js`
- `wedding-config.js`
- `README.md`

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

## Run locally
From this folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Push updates to GitHub

After replacing your current files with this version:

```bash
git add .
git commit -m "Update wedding website to lilac theme"
git push
```
