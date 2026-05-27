# vicjimassage.com.br

Personal brand website for Vicji, traditional Thai massage therapist based in Atibaia, Brazil (relocating to Itacaré later this year).

## Stack
- Astro 5 + Tailwind 3
- Cloudflare Pages hosting
- Brazilian + English audience (PT primary, EN at `/en/`)

## Local dev
```bash
npm install
npm run dev
```

## Deploy
Automatic on push to `main` via GitHub Actions (`.github/workflows/deploy.yml`) → Cloudflare Pages.

Manual deploy fallback:
```bash
npm run build
npx wrangler pages deploy dist --project-name vicjimassage-site
```

## Structure
- `src/data/site.json`: site-wide config (contact, brand, business info)
- `src/data/services.json`: service menu
- `src/data/reviews.json`: testimonials
- `src/pages/`: Portuguese pages at root, English mirrors at `/en/`
