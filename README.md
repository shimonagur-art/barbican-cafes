# Barbican Cafés ☕

A café finder app for the Barbican / EC1 area of London. Shows cafés within walking distance, with ratings, reviews, filters, and walk times.

## Project structure

```
barbican-cafes/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   └── App.jsx       ← all the app code lives here
└── package.json
```

## Running locally

```bash
npm install
npm start
```

Then open http://localhost:3000

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to vercel.com → Add New Project → import your GitHub repo
3. Vercel auto-detects Create React App — just hit Deploy
4. Done. Every push to GitHub auto-redeploys.

## Adding or editing cafés

All café data is in `src/App.jsx` in the `RAW_CAFES` array near the top of the file. Each café has:

- `name`, `address`
- `lat`, `lng` — coordinates (get from Google Maps)
- `rating`, `ratingCount`
- `hours` — opening hours as a string
- `types` — array of tags e.g. `["Specialty", "Cosy"]`
- `highlight` — one-line description
- `reviews` — array of `{ text, author }` objects
- `place_id` — Google Place ID (for the Maps link)

