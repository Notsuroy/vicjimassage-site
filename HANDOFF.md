# vicjimassage.com.br: Handoff

> Source of truth for project state, decisions, and what's next.

## Project context

Personal-brand website for **Vicji**, traditional Thai massage therapist based in Atibaia, Brazil (relocating to Itacaré later this year). Built as a gift / practice project by Suroy.

- Domain: `vicjimassage.com.br`: registered on registro.br (owned by Vicji's CPF)
- DNS: Cloudflare zone (Suroy's account, `boyd.ns.cloudflare.com` / `maeve.ns.cloudflare.com`)
- Hosting: Cloudflare Pages (to be connected to GitHub repo)
- Stack: Astro 5 + Tailwind 3
- Languages: PT (root), EN to come at `/en/` in Phase 2

## Brand positioning

> "A Brazilian bodyworker who traveled to Thailand to study Thai massage at its source, now bringing authentic, intuitive, slow bodywork to clients in Atibaia (and soon Itacaré). Grounded in tradition, infused with Brazilian warmth and a nomadic, spiritual approach to healing."

## Design system

**Bohemian Tropical palette** (see `tailwind.config.cjs`):
- Primary: deep ocean teal `#1F5965`
- Secondary: tropical sage `#7A9B6E`
- Warm accent: terracotta `#D4855B`
- Spiritual accent: antique gold `#C9A961`
- Background: sandy cream `#F5EFE6`
- Text: deep slate `#2C3539`

**Typography:**
- Display: Cormorant Garamond (serif, used for headings)
- Body: Inter (sans, used for paragraph copy)
- Accent: Grand Hotel (script, used for the "Vicji" wordmark, chosen to match Instagram's iconic logo style)

**Copy rules (non-negotiable):**
- Never use em dashes (the U+2014 character). Use commas, periods, colons, or en dashes (U+2013) instead. Run `grep -rPn '\xe2\x80\x94' src/ HANDOFF.md README.md tailwind.config.cjs` before any push to verify zero hits.

## Pages built (v1, Portuguese only)

- [x] `/`: Funnel homepage (Hero, Problem/Promise, MiniAbout, Services, Reviews wall, FAQ, Final CTA)
- [x] `/sobre`: About page (placeholder copy, awaiting Vicji's voice note)
- [x] `/servicos`: Service menu with 3 sessions (60/90/120 min)
- [x] `/agendar`: Booking page (WhatsApp-driven)
- [x] `/contato`: Contact + studio location + Google Maps embed

## TODO before launch (blocking)

1. **WhatsApp number**: replace `TODO_WHATSAPP_NUMBER` in `src/data/site.json`
2. **Email**: replace `TODO_EMAIL` in `src/data/site.json`
3. **Pix key**: replace `TODO_PIX_KEY` in `src/data/site.json`
4. ~~Real photos~~ ✅ Done: 13 photos in `/public/photos/` from Vicji's Drive folder. **Optimization pending**: each photo is 1-2MB; should be compressed to ~200-400KB via sharp or Astro Image component in Phase 2.
5. **Real reviews**: replace placeholder content in `src/data/reviews.json` (Suroy has the source material)
6. **Pricing confirmation**: confirm R$390 / R$540 / R$680 with Vicji; currently set at €60 ≈ R$390 for 60min
7. **Vicji's story**: record voice note, transcribe, replace placeholder in `src/pages/sobre.astro`
8. **OG image**: create `/public/og-image.jpg` for social sharing

## TODO after launch (Phase 2)

- [ ] EN mirror at `/en/` (all pages)
- [ ] hreflang validation
- [ ] Google Business Profile creation (Atibaia, Espaço Clô address)
- [ ] Google Search Console + sitemap submission
- [ ] Cal.com booking integration (currently WhatsApp-only)
- [ ] Email capture (Kit/MailerLite)
- [ ] Blog scaffolding + 3 launch posts
- [ ] `/metodo` page (long game: education brand foundation)

## Architecture decisions

- **Personal brand over scalable brand**: Vicji's long-term goal is to teach Thai massage to other therapists. Personal brand is the right structure for this (see Wim Hof, Tom Myers, Erik Dalton as references).
- **PT primary, EN secondary**: `.com.br` domain, Brazilian audience first. EN added for nomad audience once Itacaré move is closer.
- **WhatsApp-driven booking for v1**: non-tech-savvy therapist + Brazilian buying culture. Cal.com layer added later for nomad audience.
- **Reviews wall as conversion centerpiece**: Suroy's idea, expanded with filter chips by theme (relax / pain / athletic / first-time / international).
- **No Calendly/booking widget on homepage**: keeps the funnel clean. Booking lives at `/agendar`.

## Migration history

| Date | Event |
|------|-------|
| 2026-05-04 | Domain registered on registro.br |
| 2026-05-04 | Cloudflare zone created, nameservers swapped (`boyd`/`maeve`) |
| 2026-05-04 | Astro v1 scaffolded, PT pages built, pushed to GitHub |
| 2026-05-04 | Cloudflare Pages project `vicjimassage-site` created and deployed |
| 2026-05-04 | Custom domains attached: apex + www → Pages, both serving 200 |
| 2026-05-04 | GitHub Actions auto-deploy workflow added (`.github/workflows/deploy.yml`); secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` set on repo |
| 2026-05-04 | Real photos integrated: `hero.jpg` (Hero), `portrait.jpg` (MiniAbout), `portrait-meditative.jpg` (/sobre), `gallery-01..10.jpg` (new PhotoGallery component on homepage). 13 photos total in `public/photos/`. |
| 2026-05-04 | Wordmark font swapped to Grand Hotel (Instagram-style script). Em-dash purge across entire codebase per ÉLEVÉE/Vicji copy rule. |
