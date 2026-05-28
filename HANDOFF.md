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

## Pages built (v1, PT + EN)

PT (root):
- [x] `/`: Funnel homepage (Hero, Problem/Promise, MiniAbout, Services, Gallery, Reviews wall, FAQ, Final CTA)
- [x] `/sobre`: About page (placeholder copy, awaiting Vicji's voice note)
- [x] `/servicos`: Service menu with 3 sessions (60/90/120 min)
- [x] `/agendar`: Booking page (WhatsApp-driven)
- [x] `/contato`: Contact + studio location + Google Maps embed

EN (at /en/):
- [x] `/en/`: Homepage (same components, EN content)
- [x] `/en/about`
- [x] `/en/services`
- [x] `/en/book`
- [x] `/en/contact`

Language switcher uses a PT slug to EN slug map (both `Header.astro` and `BaseLayout.astro` keep the map in sync). hreflang alternates set per page.

## TODO before launch (blocking on Vicji's input)

1. ~~WhatsApp number~~ ✅ Done 2026-05-27: `5511970994438` wired into all booking CTAs.
2. **Email**: replace `TODO_EMAIL` in `src/data/site.json`
3. **Pix key**: replace `TODO_PIX_KEY` in `src/data/site.json`
4. ~~Real photos~~ ✅ Done: 13 photos in `/public/photos/`. Optimized via sharp on 2026-05-27 (24.67MB to 4.83MB WebP).
5. ~~Real reviews~~ ✅ Done. Top 10 transcribed + EN-translated + theme-tagged. All 30 screenshots displayed in masonry/bento. Source screenshots in `public/Reviews/review-01..30.jpeg`. Author names anonymized to `Cliente A.` through `J.` (waiting on permission to use real names).
6. **Pricing confirmation**: confirm R$390 / R$540 / R$680 with Vicji; currently set at €60 ≈ R$390 for 60min
7. **Vicji's story**: record voice note, transcribe, replace placeholder in `src/pages/sobre.astro` and `src/pages/en/about.astro`
8. **OG image**: optional. Currently using `/photos/hero.jpg` as OG image. Dedicated 1200x630 OG image would be nicer.

## TODO after launch (Phase 2, in priority order)

### Email capture (queued, full plan below in "Email capture playbook")
- [ ] Phase 1 (no Vicji action): footer signup + inline blog form + `/obrigado` page + Cloudflare Pages Function endpoint. Sends emails to Vicji's inbox initially.
- [ ] Phase 2 (when Vicji is ready): create Kit account, swap endpoint destination, build welcome sequence.
- [ ] Phase 3 (after Cal.com): Cal.com webhook to Zapier to Kit (auto-add bookers to list).

### Booking system
- [ ] Cal.com integration on `/agendar` and `/en/book` (currently WhatsApp-only).
  - Vicji creates Cal.com account (free), connects Google Calendar, sets weekly availability, creates 3 event types matching the 3 session lengths.
  - I embed the Cal.com inline widget on the booking pages. WhatsApp stays as fallback below.

### Google Business Profile
- [ ] GBP creation by Vicji (using `docs/Vicji-GBP-Setup-Guide.docx` + photos in `public/gbp/`).
- [ ] Once verified, send back GBP link + Place ID so I can embed review CTA on `/contato` and add to LocalBusiness schema.

### Content / SEO
- [ ] Bing Webmaster Tools verification (Suroy, 5 min).
- [ ] Local citations: Apontador, GuiaMais, Foursquare, Yelp Brasil.
- [ ] More blog posts (target 1-2/month). Next 3 ideas:
  - "Os 7 benefícios da massagem tailandesa" (listicle, Layer 1 awareness)
  - "Massagem tailandesa vs. sueca: qual escolher" (Layer 2 comparison)
  - "Massagem tailandesa para ansiedade" (Layer 2 problem-aware)
- [ ] EN translations of the 3 existing PT blog posts (closer to Itacaré move when nomad audience matters).
- [ ] `/metodo` page (long-game: foundation for future education brand). Vicji's approach to Thai massage.

### Polish
- [ ] Dedicated OG image (1200x630, branded).
- [ ] Real names on reviews (after Vicji confirms which clients consented).
- [ ] Pix key wired into `/obrigado` and booking confirmation messaging.

---

## Email capture playbook (next session)

**Why now (before Cal.com):** Cal.com only captures bookers. Footer/blog forms capture the 95% of visitors who aren't ready to book yet. That's where long-term list growth lives, and the list is the asset for the eventual education business (year 2-3).

### Architecture

3 capture surfaces, 1 endpoint, swappable destination:

```
[Footer signup]  ──┐
[Inline blog form] ├──> /api/subscribe (Cloudflare Pages Function)
[/obrigado page]   ──┘     │
                           ├── Phase 1: log + email Vicji
                           └── Phase 2: POST to Kit API
```

### Capture surfaces

1. **Footer newsletter signup** on every page. Single email field, quiet design. PT: "Dicas de bem-estar e novidades de Vicji." EN: "Wellness tips and updates from Vicji."
2. **Inline form at the bottom of every blog post**. High-intent moment. Offers the lead magnet ("5 alongamentos") in exchange for email. Above the "Outros textos" section.
3. **`/obrigado` thank-you page**: redirected to after booking (via WhatsApp or Cal.com). Second-touch ask for email signup as a "stay in touch" option.

### Lead magnet

**"5 alongamentos que eu ensino a todos os meus clientes"** as a PDF + 3-5 short videos (60sec each).

Why this:
- High perceived value (videos demonstrate expertise)
- Direct extension of his service, not random freebie
- Plants "this guy knows things" seed, drives later booking
- Becomes a paid course module in year 2

Production: Vicji shoots with his phone in the studio in ~2 hours. PT first, EN dubbed later.

### Email tool: Kit (formerly ConvertKit)

Decision rationale:
- **Free tier covers 10K subscribers** (years of runway for him)
- Kit Commerce built in for the eventual course launch
- Visual automation builder, non-tech-savvy friendly
- Used by most creator-economy practitioners in his bracket
- Portuguese supported

Alternative: MailerLite (Brazilian-market friendly, simpler, less course-business-ready).

### Phased rollout

**Phase 1 (no Vicji action needed, can ship before he sets up Kit):**
- Build footer signup component (PT + EN versions)
- Build inline blog signup component with lead-magnet hook (placeholder PDF until videos shot)
- Build `/obrigado` thank-you page
- Build Cloudflare Pages Function at `/api/subscribe`: validates email + logs + sends Vicji notification email
- Honeypot anti-spam (no captcha, no UX friction)
- Schema markup updates to declare newsletter availability

Result: email capture is live from day 1. Captured emails go to Vicji's inbox. He can manually add to whatever tool when ready.

**Phase 2 (when Vicji creates Kit account):**
- Vicji creates Kit account at kit.com, sets up basic welcome sequence (5 emails over 2 weeks)
- Sends his Kit API key
- I swap the Cloudflare Function destination from "log + notify" to "POST /v3/forms/{form_id}/subscribe" on Kit's API
- Migrate any captured emails into Kit
- Activate the welcome sequence

**Phase 3 (after Cal.com is set up):**
- Cal.com webhook fires on every booking
- Webhook to Zapier (or direct to a Cloudflare Function)
- Zapier adds subscriber to Kit list with "booker" tag
- Every booker automatically joins the email list

### Don'ts

- **No exit-intent popups.** Conflicts with bohemian/wellness aesthetic.
- **No scroll-triggered popups.** Same reason.
- **No email form on the homepage hero.** Hero is for booking. One CTA per surface.
- **No "join my newsletter" interruption mid-blog-post.** Stays at the end.

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
| 2026-05-04 | Instagram logo: outline to brand-gradient (yellow to orange to pink to purple to blue). |
| 2026-05-04 | EN mirror built (5 pages). Language switcher uses PT/EN route slug map. Sitemap updated with all 10 URLs. |
| 2026-05-04 | Top 10 reviews wired into Reviews Wall. PT originals transcribed from `public/Reviews/review-01..10.jpeg`; EN translations adapted (not literal). New `spiritual` theme added. ReviewsWall component upgraded: line-clamp with fade + click-to-expand modal for long reviews. |
| 2026-05-04 | Reviews Wall rebuilt to show all 30 WhatsApp screenshots as masonry-style grid (authenticity over polish). Top 10 sort first with gold "Destaque/Featured" ribbon. Click any screenshot to open modal: full image left + transcribed text right (top 10 only). Transcribed text also lives in sr-only block for SEO indexing. |
| 2026-05-27 | Removed "Featured" ribbon (was covering screenshot text). Top 10 still sort first via component logic. |
| 2026-05-27 | Blog scaffolded: Astro content collection at `src/content/blog/{pt,en}/`, routes `/blog`, `/blog/[slug]`, `/en/blog`. Article schema on each post. Sitemap dynamically picks up blog entries. Header nav + route map updated to include /blog. Custom `.prose-blog` typography in global.css. |
| 2026-05-27 | 3 launch PT posts published: `o-que-e-massagem-tailandesa` (1500w, Layer 1 awareness), `massagem-tailandesa-para-dor-lombar` (1200w, Layer 2 consideration), `antes-da-primeira-sessao` (800w, Layer 3 decision). |
| 2026-05-27 | GSC domain property verified (via Cloudflare OAuth). Sitemap submitted by Suroy via GSC UI. |
| 2026-05-27 | Images optimized: all 13 photos + 30 review screenshots compressed via sharp. Total page weight 24.67MB to 4.83MB WebP / 6.79MB JPEG (~80%/72% reduction). All image-rendering components updated to `<picture>` with WebP source + JPEG fallback. |
| 2026-05-27 | Schema markup expanded: Service + OfferCatalog with each session as priced Offer on `/servicos` + `/en/services`. BreadcrumbList added to `/sobre`, `/servicos`, `/agendar`, `/contato`, `/blog`, `/blog/[slug]` and EN equivalents via shared `Breadcrumbs.astro` component. |
| 2026-05-27 | IndexNow set up. Key `0pes2e9k...` placed at `public/<key>.txt`. Ping script at `scripts/indexnow-ping.mjs` submits all 15 URLs to Bing (forwards to Yandex/others). Run manually after content changes. |
| 2026-05-27 | GBP prep packet complete: `docs/Vicji-GBP-Setup-Guide.docx` (Word doc, 16KB, share-ready) generated via `scripts/generate-gbp-docx.mjs` from `docs/gbp-setup.md`. 8 pre-cropped photos in `public/gbp/`. Pending: Vicji creates and verifies the profile (his Google account, his address). |
| 2026-05-27 | Full content reframe per Vicji's voice-note feedback + client-facing copy. **Services restructured from 3 generic tiers (60/90/120min at R$390-680) to his ACTUAL 2 services**: Thai Massage Tradicional (2h R$330 / 3h R$480) and Liberação de Quadril (1h30 R$250). Brand positioning reframed from physical-only to 3-dimensional (physical + energetic + spiritual). Added India yoga training + "único no Brasil" unique-positioning claim. Rewrote: services.json (with sessionStructure + preparation + contraindications), site.json (brand/SEO), Hero, ProblemPromise, MiniAbout, ServicesGrid (entirely rewritten for 2-service layout), /servicos + /en/services (full restructure with 5-step session structure), /sobre + /en/about (Thailand + India + world synthesis story), faq.json (new contraindications + payment + service comparison Q), homepage schema (priceRange updated). Khòp khun kráp 🙏 signature added to /sobre. |
| 2026-05-27 | All 3 PT blog posts reframed (3 levels added to overview post, Liberação de Quadril plugged in back-pain post, opening ritual added to first-session post). All 3 EN translations published at /en/blog/{what-is-thai-massage,thai-massage-for-back-pain,before-your-first-session} with nomad-specific framing. |
| 2026-05-27 | **PT register shift** per Vicji feedback: site-wide swap of "tu/teu/tua/ti" to "você/seu/sua/você" across blog posts, FAQ, components, pages. Also swapped Portugal-style verb conjugations (podes/deves/estás/etc.) to BR-standard 3rd person. Done via `.tmp-detuify.py` script with word-boundary regex (safe for words like "tudo", "atende", "estudei"). |
| 2026-05-27 | **Card payments added** (credit + debit, both national and international) alongside Pix and cash. Updated: site.json (payment methods array), /servicos + /en/services payment sections, faq.json (both PT and EN payment Q), /agendar + /en/book step-3 cards, docs/gbp-setup.md GBP attributes (Cartão crédito/débito: Yes), regenerated Vicji-GBP-Setup-Guide.docx. |
| 2026-05-27 | **First-session paragraphs rewritten** per Vicji feedback in `o-que-e-massagem-tailandesa.md` + `what-is-thai-massage.md`: intake conversation expanded to 15-30 min (health/emotional/sleep/prior practices) framed as "campo de entendimento, compaixão e acolhimento"; during-session line simplified to "Sem muita conversa ou bate papo"; closing paragraph adds post-integration return-to-room conversation with body-state feedback + day-to-day takeaway recommendations. Also dropped one stray em dash in EN footer. Commit `7fb5e1e`. |
| 2026-05-27 | **Sense-of-value upgrades** to support holding current prices while demand engine ramps (volume-first sequence per Suroy strategy call). Five additions: (1) new `CredentialsStrip.astro` component (4-icon row: Thailand / Índia / 2500+ sessões / único no Brasil) rendered above ServicesGrid on /servicos + /en/services; (2) `included.pt[]` + `included.en[]` arrays added to services.json + rendered as a callout block above pricing in ServicesGrid when `showAll=true` (intake convo 15-30min, full session, integration, closing convo, day-to-day tips, WhatsApp follow-up); (3) new "Sobre o tempo / About the time" duration philosophy section on /servicos + /en/services between ServicesGrid and the 5-moments section (ocean-card with gold accents; explains why 60min is a spa default not a body requirement); (4) pricing philosophy paragraph on /sobre + /en/about (2 paragraphs in Vicji's voice between "Atendo em Atibaia" and "Cada sessão"); (5) USD/EUR equivalent displayed under each BRL price on /en/services using new `site.fx` block (usdPerBrl 0.196, eurPerBrl 0.181, updatedAt 2026-05-27). **Prices unchanged** — raise trigger is demand-driven (waitlist forming, 3+ wk lead time, or Itacaré relocation). Commit `c3d7c03`. |
| 2026-05-27 | **EN price hierarchy flipped** on /en/services: USD/EUR now the prominent `font-display` price, BRL displayed as a small reference line underneath. Nomads anchor on their own currency, so leading with USD/EUR improves price comprehension. PT pricing unchanged. Commit `c481c1b`. |
| 2026-05-27 | **Credentials strip number fix + headline split**: corrected card #3 from "2500+ sessions / Given over the years" (incorrect — conflated the 2500-year Nuad Boran tradition figure with Vicji's session count) to "200+ sessões / Realizadas até hoje" (PT) / "200+ sessions / Given to date" (EN), matching Hero proofPrefix and reviews aggregate already used site-wide. Also split the two-sentence headline "Duas sessões. Dois caminhos no mesmo trabalho." / "Two sessions. Two paths through the same work." onto two lines in ServicesGrid section title and /servicos + /en/services H1. Commit `288304a`. |
| 2026-05-27 | **Canonical brand description wired across schema + GBP**: added `brand.fullDescription` (PT + EN, ~650 chars) to site.json as single source of truth for long-form brand copy. Switched LocalBusiness JSON-LD `description` on homepage PT + EN from `shortDescription` (Footer-sized) to `fullDescription`. Updated `docs/gbp-setup.md` Step 8 with the new canonical copy so the GBP description Vicji pastes matches the schema exactly. Regenerated `docs/Vicji-GBP-Setup-Guide.docx` (16.3 KB). Same copy across GBP + schema = consistent E-E-A-T signal for Google. `brand.shortDescription` retained for Footer visual fit. Commit `7a4ff48`. |
| 2026-05-28 | **Vicji batch 5 feedback**: Hero sub-headline (PT + EN) `trouxe pra Atibaia` → `trouxe pra o Brasil` / `home to Atibaia` → `home to Brazil` (broader positioning, aligned with GBP description). ProblemPromise: headline trimmed (dropped `Trabalha o corpo inteiro.` / `It works the whole body.`); first body paragraph restructured per Vicji's rewrite (2500-year heritage split into own sentence, integrated framing reworded to `nasceu integrada entre o tratamento físico, energético e espiritual`); client quote expanded to fuller emotional version (`não sei explicar, mas sinto que algo em mim mudou para melhor`); Físico card terminology tightened (`Liberação muscular profunda, soltura das fáscias` → `Liberação miofascial`). Commit `2adbf29`. |
| 2026-05-28 | **Vicji batch 6 feedback (15 edits, 9 files)**: ProblemPromise Espiritual card (comma join + `É prática integrativa milenar` / `ancient, integrative practice`); ServicesGrid + /servicos + /en/services H1 (`Sessões exclusivas e originais.` / `Exclusive, original sessions.` — single-line headline), sub now reads `Ambas trabalham o campo físico, energético e espiritual`; services.json Thai Tradicional copy tightened (`relaxar tensões fasciais` not `relaxar fáscias`, `eliminar` not `soltar`, `Trabalho o corpo inteiro` adds article, `feedback sobre o seu estado`, `se te interessar` not `se você quiser`); ReviewsWall `após as sessões`; PhotoGallery drops comma (`O trabalho em movimento.` / `The work in motion.`); FAQ 5 edits (acessórios not joias; faço os ajustes necessários; Thai Massage **Tradicional** opener; trabalha o corpo como um todo; para decidirmos juntos; para que eu possa); FinalCTA headlines `Venha viver essa experiência única. Agende agora mesmo a sua sessão.` (+EN); Footer address switched from `<br />` to `<span class="block">` per line (eliminates leading-space rendering quirk); /sobre PT + /en/about EN 4-paragraph rewrites (para 2 expanded with traumas/fears framing; para 3 `me formei como massagista, direto na fonte` + `integrada, e não fragmentada`; para 4 `como um sistema energético`; para 5 `em um ritmo` + `não a raiz do problema`); pricing philosophy `algo mais rápido e superficial, encontra em muitos lugares`. Commit `e0d7484`. |
| 2026-05-28 | **Vicji batch 7 feedback (4 areas)**: services.json Liberação de Quadril `included` block synced with the full Thai Tradicional list (PT + EN) — Vicji wanted both sessions to communicate the same scope of inclusion. sessionStructure step 2 (Conexão e Intenção) PT + EN: `respirações profundas` → `respirações profundas e completas`; `abro a sessão com um minuto de meditação` → `realizo um minuto de meditação` (clearer single act). sessionStructure step 5 (Encerramento) PT + EN: `com dicas pra aplicar` → `com dicas extras pra aplicar` (signals bonus value). /servicos + /en/services duration philosophy section: `vende sessão como produto` → `vende a sessão como um produto`; `tempo para abrir` → `tempo para se abrir e reorganizar`; `não um extra` → `não é um extra`; **`Está pagando` → `Está investindo`** (reframes payment as investment, consistent with /sobre pricing philosophy). Commit `09ae41f`. |
