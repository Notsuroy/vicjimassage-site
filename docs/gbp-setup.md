# Google Business Profile setup for Victor

Step-by-step guide for Victor's GBP. Designed for a WhatsApp screen-share session with him. Reading time: 5 min. Setup time: ~15 min. Verification time: 5 days to 2 weeks (postcard) or 1-3 days (video).

**IMPORTANT: If Victor already has the Atibaia GBP verified, jump to [Moving an existing profile from Atibaia to Itacaré](#moving-an-existing-profile-from-atibaia-to-itacaré) at the bottom. Do NOT create a second profile.**

---

## Before you start

### Who creates this and owns it
**Victor creates and owns it under HIS Google account.** Not Suroy's.

Reasons:
- The profile is a legal claim to ownership of a business listing. Should be his.
- If your friendship ever changes, he keeps clean control.
- Postcard verification goes to his physical address. He has to pick it up.
- Suroy can be added as a Manager (full access except ownership transfer) afterward.

If Victor doesn't have a Gmail account, create one first at accounts.google.com.

### What to have ready
- Phone (his Brazilian mobile, not WhatsApp number if different)
- Email
- Address: R. Alto da Telebahia, 130, Itacaré, BA, 45530-000
- Photos from `public/gbp/` in this repo (8 files, all sized correctly for GBP)

---

## Step 1: Create the profile

1. Go to **business.google.com**
2. Sign in with Victor's Google account
3. Click **Manage now** (or **Add your business**)

---

## Step 2: Business name

**Enter exactly:**
```
Vicji Massagem Tailandesa
```

Notes:
- Use `Massagem Tailandesa` not `Thai Massage` (GBP indexes in local language; this is what Brazilians search)
- Don't add the city ("Itacaré") to the name. Google will display the city automatically, and adding it triggers a name-stuffing penalty.
- Don't add a studio or venue name to the business name.

---

## Step 3: Business category

**Primary category (most important):**
```
Massagista
```

When you start typing, Google will show suggestions. Pick the exact one labeled `Massagista` (Massage therapist).

**Additional categories** (you can add up to 9, use 3-4 strategic ones):
```
Spa
Praticante de medicina alternativa
Centro de bem-estar
```

Why these:
- `Massagista` is the core query that matches user intent
- `Spa` captures broader wellness search traffic (relevant in Itacaré, which is a tourism-heavy market)
- `Praticante de medicina alternativa` reaches the holistic/spiritual seekers
- `Centro de bem-estar` is broader wellness umbrella

**Don't add:** Salon, Hair salon, Beauty salon, Nail salon (irrelevant; dilutes Google's understanding of what he does)

---

## Step 4: Location

Click **Yes, I serve customers at this location** (NOT "I deliver goods and services to my customers").

**Address:**
```
R. Alto da Telebahia, 130
Itacaré, BA, 45530-000
Brasil
```

Make sure when Google's map pin appears, it actually lands on the building. If it's off by a block, drag the pin to the correct spot.

**Note on the home studio:** the address is Victor's home. This is fine for GBP as long as he genuinely sees clients there. If he wants to hide the exact street on the public listing (SAB, "service-area business"), see the note in Step 5.

---

## Step 5: Service area

Victor works from the address only (right now). Skip the service-area question OR leave it blank.

If he wants the street to NOT display publicly (common for home studios), toggle **"I also serve customers outside my location"** and add Itacaré + nearby areas as a service area. Google will then hide the exact street address on the listing but still use it for verification.

Reasonable service areas to add if he wants coverage:
- Itacaré, BA
- Uruçuca, BA
- Ilhéus, BA (for occasional house calls)

---

## Step 6: Contact info

**Phone:**
Victor's Brazilian mobile (with country code: +55 XX XXXXX-XXXX).
Use his **WhatsApp number** since that's where clients book.

**Website:**
```
https://vicjimassage.com.br
```

---

## Step 7: Verification

Google asks how to verify:

**Order of preference for Victor:**

### Option 1: Video verification (BEST if available)
- Schedule a video call with Google support
- Victor holds his phone, films himself walking through the space
- Shows the address from outside (street sign or number visible)
- Shows him doing massage stuff (technique demos, futon, equipment)
- Approval in 1-3 business days
- Available for most service businesses now

### Option 2: Postcard (FALLBACK)
- Google mails a physical postcard to the address
- Takes 5-14 business days in Brazil (Itacaré is remote, budget the longer end)
- Contains a verification code
- He enters the code in business.google.com to confirm
- DO NOT modify the business profile until the postcard arrives

### Option 3: Phone or email (RARE for massage businesses)
- Sometimes offered for certain categories
- If shown, use it. Instant.

**If neither video nor phone is offered:** take the postcard. Don't try to game it.

---

## Step 8: Business description (after verification)

After verification, fill in this description. **Copy/paste exactly** (~700 characters, Portuguese). This is the canonical brand description, also used in the site's LocalBusiness schema (`site.brand.fullDescription.pt`), so Google sees consistent messaging across GBP and the website:

```
Massagem tailandesa tradicional em Itacaré, Bahia.

Eu sou o Victor (Vicji), brasileiro, formado como massagista na Tailândia, na fonte da tradição, e em yoga na Índia. Sou o único no Brasil oferecendo esse trabalho integrado: a técnica milenar da Thai Massage combinada com a compreensão energética dessas duas formações.

A sessão acontece no tatame, com roupas confortáveis, e trabalha o corpo em três dimensões: físico, energético e espiritual. Mais de 500 sessões realizadas.

Ofereço Thai Massage Tradicional (2h ou 3h, corpo inteiro) e Liberação de Quadril (1h30, foco na base).

Atendimentos sob agendamento, de segunda a sábado.
```

If the copy in `src/data/site.json` (`brand.fullDescription.pt`) diverges from this doc, the JSON is the source of truth.

---

## Step 9: Services

Add each session as a separate Service:

### Service 1
- **Name:** Thai Massage Tradicional, 2 horas
- **Category:** Massagem
- **Price:** R$ 360
- **Description:** Sessão completa de Thai Massage tradicional, corpo inteiro dos pés à cabeça. Combina pressões em pontos energéticos (sen) e alongamentos passivos. Liberação muscular, mobilização articular, equilíbrio dos chakras. Sessão recomendada para conhecer o trabalho.

### Service 2
- **Name:** Thai Massage Tradicional, 3 horas (imersiva)
- **Category:** Massagem
- **Price:** R$ 520
- **Description:** A experiência completa. Cabeça aos pés, com tempo suficiente para o sistema nervoso entrar em coerência. Ideal para quem está há muito tempo sem parar. Trabalho profundo nos três níveis: físico, energético, espiritual.

### Service 3
- **Name:** Liberação de Quadril, 1h30
- **Category:** Massagem
- **Price:** R$ 290
- **Description:** Sessão focada na parte inferior do corpo: pernas, quadril, lombar. Harmoniza os chakras inferiores (raiz e sacral). Combina manobras da Thai Massage com alongamentos específicos, liberação miofascial e técnicas de descompressão. Centro energético e biomecânico do corpo.

If Victor introduces hotel-guest packages or a beach/pool-side variant in Itacaré, add those as separate Services later.

---

## Step 10: Hours

```
Segunda:  10:00 - 19:00
Terça:    10:00 - 19:00
Quarta:   10:00 - 19:00
Quinta:   10:00 - 19:00
Sexta:    10:00 - 19:00
Sábado:   09:00 - 16:00
Domingo:  Fechado
```

(Adjust to Victor's actual schedule. Check with him.)

Mark **"By appointment"** if available, since he doesn't take walk-ins.

---

## Step 11: Photos

Upload from `public/gbp/` in this repo (already cropped to the right sizes):

| Slot | File | Notes |
|------|------|-------|
| **Profile / Logo** | `profile.jpg` (720x720) | Tight portrait crop, square |
| **Cover** | `cover.jpg` (1920x1080) | Action shot in park, golden hour |
| **At work** | `at-work-01.jpg`, `at-work-02.jpg`, `at-work-03.jpg` | All landscape 4:3 action shots |
| **Team / About** | `team-01.jpg`, `team-02.jpg`, `team-03.jpg` | Portrait orientation |

**GBP also shows photos from Google reviews and your website automatically.** The website OG image (your hero) will already be pulled.

Once Victor has photos of the actual Itacaré space (interior of the room, view, the futon set up), add those too. Photos of the new location are one of the strongest signals to Google that the move is real.

---

## Step 12: Attributes

GBP asks about attributes (amenities, accessibility, etc.). Fill in what's true:

**Highlights:**
- Online appointments → **Yes** (WhatsApp counts)
- LGBTQ+ friendly → **Yes** (if true)
- Wi-Fi → If the space has it
- Wheelchair accessible entrance → Check with Victor

**Service options:**
- In-store services → **Yes**

**Payment methods:**
- Pix → **Yes**
- Dinheiro → **Yes**
- Cartão de crédito → **Yes**
- Cartão de débito → **Yes**

**Languages spoken:**
- Português
- English

---

## After setup: the first 30 days (critical for ranking)

The GBP algorithm gives a "new business boost" for the first 30-60 days. Use it.

### Week 1
1. **Get 5+ Google reviews fast.** Ask 5 happiest clients (from the top 10 reviews you've already collected) to also leave a Google review. Send them the direct review link: `g.page/r/[YOUR-GBP-ID]/review` (Google gives you this URL after verification).
2. **Upload all 8 photos** from `public/gbp/`
3. **Verify all fields** are filled (don't leave anything blank)

### Week 2
4. **Post a "Welcome" Update** on the GBP. Use his story:
   > "Sou Victor, terapeuta de massagem tailandesa em Itacaré. Aprendi na fonte, em Chiang Mai, e trouxe a prática para o Brasil. Te espero para uma sessão."
5. **Reply to every review** (positive or negative) within 24h. Google notices.

### Week 3
6. **Add a new photo** every 3-4 days. Even a phone shot of the space counts. Algorithmic preference for active profiles.
7. **Post another Update**: maybe a "What is Thai Massage" mini-explainer linking to the blog post.

### Week 4
8. **Audit Search Console** for any "vicji" or "massagem tailandesa itacaré" impressions to see if you're appearing yet.
9. **Add 2 more reviews** if you can.

By day 30, the GBP should be ranking for branded queries (`vicji massage`, `vicji massagem`) and starting to show for non-branded local queries (`massagem tailandesa itacaré`, `massagista itacaré`).

---

## Adding Suroy as a Manager (optional but recommended)

Once verified, Victor can add you so you can manage day-to-day without owning the profile:

1. In GBP dashboard: **Settings** → **Managers** → **Add**
2. Enter Suroy's Google email
3. Role: **Manager** (NOT Owner)
4. Suroy gets an invite, accepts, has full edit access but can't transfer ownership or delete

---

## Don'ts (mistakes that get profiles suspended)

- Don't put the city in the business name
- Don't put the website URL in the business name
- Don't make up an address (Google verifies)
- Don't list service areas he doesn't actually work in
- Don't add fake reviews
- Don't bulk-import reviews from another platform
- Don't add categories that don't actually apply (no "Hair salon")
- Don't create a second profile for the new city. If the Atibaia GBP already exists, UPDATE it (see next section). Two profiles for one person = duplicate-listing penalty and Google will suspend one or both.

---

## Moving an existing profile from Atibaia to Itacaré

If Vicji already has the Atibaia GBP verified (which he does), this is the path. It preserves all reviews and authority.

### Step 1: Update the address in the Atibaia profile
1. Go to **business.google.com** and sign in as Victor
2. Open the Atibaia profile
3. **Edit profile** → **Business information** → **Location**
4. Replace the Atibaia address with:
   ```
   R. Alto da Telebahia, 130
   Itacaré, BA, 45530-000
   Brasil
   ```
5. Drag the map pin onto the correct building if needed
6. **Save**

### Step 2: Re-verify
Google will REQUIRE re-verification because a cross-state move (SP → BA) is a large jump. Expect:
- Video verification if offered (best case, 1-3 days)
- Postcard to the new Itacaré address (5-14 days, likely longer given Itacaré's remoteness)
- The listing may go temporarily un-verified in Maps during this window. That's normal. Don't panic and don't create a new profile.

### Step 3: Update everything else on the profile
Same session, in the same profile:
- **Service area:** remove Atibaia/Bragança Paulista/Jundiaí. Add Itacaré/Uruçuca/Ilhéus.
- **Business description:** replace with the Itacaré version from [Step 8](#step-8-business-description-after-verification) above.
- **Hours:** confirm with Victor whether they change now that he's in a beach town (tourist rhythm often shifts weekend/evening hours).
- **Photos:** leave the existing ones for now (they still show Victor at work, which is what matters). Add photos of the new space as soon as he has them.

### Step 4: Post a "We've moved" Update
Once re-verified, post a GBP Update:

> "Nova localização: Itacaré, Bahia. Continuo oferecendo Thai Massage tradicional, agora no litoral baiano. Agendamentos pelo WhatsApp."

This signals to Google that the move is intentional and gives returning searchers context.

### What DOESN'T need to move
- **The reviews stay.** Google keeps them attached to the profile through an address change.
- **The GBP URL / place ID stays.** Anywhere it's linked from (site footer, review widgets) keeps working.
- **The Search Console `sc-domain:vicjimassage.com.br` verification stays valid.** GSC doesn't care about physical location.
- **The website's LocalBusiness schema** already updated automatically via `src/data/site.json`.

### What to DO after Google approves the move
- Reply to any client messages that came in during the un-verified window
- Add 1-2 new photos of the Itacaré space
- Tell existing clients (WhatsApp broadcast, IG post) that the profile is live at the new address, and ask any who visit the new space to leave a fresh review mentioning Itacaré. Fresh reviews with the new city name are one of the strongest local-SEO signals.

---

## Reference

- Photos to upload: `vicjimassage-site/public/gbp/` (8 files)
- Website to enter: `https://vicjimassage.com.br`
- Business name: `Vicji Massagem Tailandesa`
- Primary category: `Massagista`
- Address: `R. Alto da Telebahia, 130, Itacaré, BA, 45530-000, Brasil`

Once verified, send the GBP profile link back and I'll embed it on the contact page so visitors can leave reviews with one click.
