# Google Business Profile setup for Victor

Step-by-step guide to creating Victor's GBP. Designed for a WhatsApp screen-share session with him. Reading time: 5 min. Setup time: ~15 min. Verification time: 5 days to 2 weeks (postcard) or 1-3 days (video).

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
- Studio address: Espaço Clô, Rua Magnólia, 69, Vila Gardênia, Atibaia, SP, 12942-010
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
- Don't add city ("Atibaia") to the name. Google will display the city automatically, and adding it triggers a name-stuffing penalty.
- Don't add the studio name ("Espaço Clô") to the business name. The studio is a venue, not part of his brand.

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
- `Spa` captures broader wellness search traffic
- `Praticante de medicina alternativa` reaches the holistic/spiritual seekers
- `Centro de bem-estar` is broader wellness umbrella

**Don't add:** Salon, Hair salon, Beauty salon, Nail salon (irrelevant; dilutes Google's understanding of what he does)

---

## Step 4: Location

Click **Yes, I serve customers at this location** (NOT "I deliver goods and services to my customers").

**Address:**
```
Rua Magnólia, 69
Vila Gardênia
Atibaia, SP, 12942-010
Brasil
```

Make sure when Google's map pin appears, it actually lands on the building. If it's off by a block, drag the pin to the correct spot.

---

## Step 5: Service area

Victor works from the studio only (right now). Skip the service-area question OR leave it blank.

If he eventually does house calls, he can add service areas later (e.g., "Atibaia, Bragança Paulista, Jundiaí").

---

## Step 6: Contact info

**Phone:**
Victor's Brazilian mobile (with country code: +55 11 XXXXX-XXXX or +55 19 XXXXX-XXXX or whatever his region is).
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
- Victor holds his phone, films himself walking through the studio
- Shows the address from outside
- Shows him doing massage stuff (technique demos, equipment, business signs)
- Approval in 1-3 business days
- Available for most service businesses now

### Option 2: Postcard (FALLBACK)
- Google mails a physical postcard to the studio address
- Takes 5-14 business days in Brazil
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
Massagem tailandesa tradicional em Atibaia, no Espaço Clô.

Eu sou o Victor (Vicji), brasileiro, formado como massagista na Tailândia, na fonte da tradição, e em yoga na Índia. Sou o único no Brasil oferecendo esse trabalho integrado: a técnica milenar da Thai Massage combinada com a compreensão energética dessas duas formações.

A sessão acontece no tatame, com roupas confortáveis, e trabalha o corpo em três dimensões: físico, energético e espiritual. Mais de 500 sessões realizadas.

Ofereço Thai Massage Tradicional (2h ou 3h, corpo inteiro) e Liberação de Quadril (1h30, foco na base).

Atendimentos sob agendamento, de segunda a sábado.
```

---

## Step 9: Services

Add each session as a separate Service:

### Service 1
- **Name:** Thai Massage Tradicional, 2 horas
- **Category:** Massagem
- **Price:** R$ 330
- **Description:** Sessão completa de Thai Massage tradicional, corpo inteiro dos pés à cabeça. Combina pressões em pontos energéticos (sen) e alongamentos passivos. Liberação muscular, mobilização articular, equilíbrio dos chakras. Sessão recomendada para conhecer o trabalho.

### Service 2
- **Name:** Thai Massage Tradicional, 3 horas (imersiva)
- **Category:** Massagem
- **Price:** R$ 480
- **Description:** A experiência completa. Cabeça aos pés, com tempo suficiente para o sistema nervoso entrar em coerência. Ideal para quem está há muito tempo sem parar. Trabalho profundo nos três níveis: físico, energético, espiritual.

### Service 3
- **Name:** Liberação de Quadril, 1h30
- **Category:** Massagem
- **Price:** R$ 250
- **Description:** Sessão focada na parte inferior do corpo: pernas, quadril, lombar. Harmoniza os chakras inferiores (raiz e sacral). Combina manobras da Thai Massage com alongamentos específicos, liberação miofascial e técnicas de descompressão. Centro energético e biomecânico do corpo.

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

---

## Step 12: Attributes

GBP asks about attributes (amenities, accessibility, etc.). Fill in what's true:

**Highlights:**
- Online appointments → **Yes** (WhatsApp counts)
- LGBTQ+ friendly → **Yes** (if true)
- Wi-Fi → If the studio has it
- Wheelchair accessible entrance → Check with Victor (Espaço Clô may or may not)

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
   > "Sou Victor, terapeuta de massagem tailandesa em Atibaia. Aprendi na fonte, em Chiang Mai, e trouxe a prática pro Brasil. Atendo no Espaço Clô. Te espero pra uma sessão."
5. **Reply to every review** (positive or negative) within 24h. Google notices.

### Week 3
6. **Add a new photo** every 3-4 days. Even a phone shot of the studio counts. Algorithmic preference for active profiles.
7. **Post another Update**: maybe a "What is Thai Massage" mini-explainer linking to the blog post.

### Week 4
8. **Audit Search Console** for any "vicji" or "massagem tailandesa atibaia" impressions to see if you're appearing yet.
9. **Add 2 more reviews** if you can.

By day 30, the GBP should be ranking for branded queries (`vicji massage`, `vicji massagem`) and starting to show for non-branded local queries (`massagem tailandesa atibaia`, `massagista atibaia`).

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
- Don't list service areas if Victor only works from the studio
- Don't add fake reviews
- Don't bulk-import reviews from another platform
- Don't add categories that don't actually apply (no "Hair salon")
- Don't make a second profile for "the Itacaré location" before he moves. Wait. When he moves, you UPDATE the address on this one profile. Two profiles for one person = duplicate listing penalty.

---

## When Victor moves to Itacaré later this year

DON'T delete this profile. DON'T create a new one.

Just go to GBP dashboard → **Edit business** → change the address. Google preserves all the review history and authority you've built. Takes a few days for the new address to verify.

---

## Reference

- Photos to upload: `vicjimassage-site/public/gbp/` (8 files)
- Website to enter: `https://vicjimassage.com.br`
- Business name: `Vicji Massagem Tailandesa`
- Primary category: `Massagista`
- Address: `Rua Magnólia, 69, Vila Gardênia, Atibaia, SP, 12942-010, Brasil`

Once verified, send the GBP profile link back and I'll embed it on the contact page so visitors can leave reviews with one click.
