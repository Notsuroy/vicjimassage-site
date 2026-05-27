#!/usr/bin/env node
// Generates Vicji-GBP-Setup-Guide.docx from the structured content of docs/gbp-setup.md.
// Run: node scripts/generate-gbp-docx.mjs

import { writeFileSync } from 'node:fs';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, BorderStyle, WidthType, ShadingType,
  AlignmentType, LevelFormat, ExternalHyperlink, PageBreak,
} from 'docx';

const TEAL = '1F5965';
const TERRACOTTA = 'D4855B';
const GOLD = 'C9A961';
const INK = '2C3539';
const MUTED = '7A7268';
const SAND = 'F5EFE6';
const CODE_BG = 'EEEAE0';
const FONT = 'Calibri';
const MONO = 'Consolas';

// ---------- Helpers ----------

const p = (text, opts = {}) => new Paragraph({
  spacing: { after: 120, line: 320, ...(opts.spacing ?? {}) },
  alignment: opts.alignment,
  ...opts.pParams,
  children: typeof text === 'string'
    ? [new TextRun({ text, font: FONT, size: 22, color: INK, ...opts.runOpts })]
    : text,
});

const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 0, after: 300 },
  children: [new TextRun({ text, font: FONT, size: 48, bold: true, color: TEAL })],
});

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 360, after: 200 },
  children: [new TextRun({ text, font: FONT, size: 32, bold: true, color: TEAL })],
});

const h3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 240, after: 120 },
  children: [new TextRun({ text, font: FONT, size: 26, bold: true, color: TERRACOTTA })],
});

const h4 = (text) => new Paragraph({
  spacing: { before: 200, after: 80 },
  children: [new TextRun({ text, font: FONT, size: 22, bold: true, color: INK })],
});

// Mixed-format paragraph: pass array of { text, bold, italic, color, hyperlink }
const rich = (parts, opts = {}) => new Paragraph({
  spacing: { after: 120, line: 320, ...(opts.spacing ?? {}) },
  children: parts.map((part) => {
    if (part.hyperlink) {
      return new ExternalHyperlink({
        link: part.hyperlink,
        children: [new TextRun({
          text: part.text, font: FONT, size: 22, color: TEAL, underline: {},
        })],
      });
    }
    return new TextRun({
      text: part.text,
      font: FONT,
      size: 22,
      color: part.color ?? INK,
      bold: part.bold ?? false,
      italic: part.italic ?? false,
    });
  }),
});

const bullet = (text, level = 0, runs = null) => new Paragraph({
  numbering: { reference: 'bullets', level },
  spacing: { after: 80, line: 320 },
  children: runs ?? [new TextRun({ text, font: FONT, size: 22, color: INK })],
});

const num = (text, level = 0, runs = null) => new Paragraph({
  numbering: { reference: 'numbers', level },
  spacing: { after: 80, line: 320 },
  children: runs ?? [new TextRun({ text, font: FONT, size: 22, color: INK })],
});

// Code block: single-cell shaded table to get bg color + border
const codeBlock = (lines) => new Table({
  width: { size: 9000, type: WidthType.DXA },
  columnWidths: [9000],
  rows: [new TableRow({
    children: [new TableCell({
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: GOLD },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD },
        left: { style: BorderStyle.SINGLE, size: 12, color: GOLD },
        right: { style: BorderStyle.SINGLE, size: 4, color: GOLD },
      },
      shading: { fill: CODE_BG, type: ShadingType.CLEAR },
      width: { size: 9000, type: WidthType.DXA },
      margins: { top: 160, bottom: 160, left: 200, right: 200 },
      children: lines.map(line => new Paragraph({
        spacing: { after: 0, line: 280 },
        children: [new TextRun({ text: line, font: MONO, size: 20, color: INK })],
      })),
    })],
  })],
});

// Horizontal rule (bottom border on empty paragraph)
const hr = () => new Paragraph({
  spacing: { before: 240, after: 240 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 1 } },
  children: [new TextRun('')],
});

// Photos table (4 rows: Slot / File / Notes)
const photosTable = () => new Table({
  width: { size: 9000, type: WidthType.DXA },
  columnWidths: [2200, 3200, 3600],
  rows: [
    new TableRow({
      tableHeader: true,
      children: ['Slot', 'File', 'Notes'].map(label =>
        new TableCell({
          width: { size: label === 'Slot' ? 2200 : label === 'File' ? 3200 : 3600, type: WidthType.DXA },
          shading: { fill: TEAL, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 140, right: 140 },
          borders: { top: { style: BorderStyle.SINGLE, size: 4, color: TEAL }, bottom: { style: BorderStyle.SINGLE, size: 4, color: TEAL }, left: { style: BorderStyle.NONE, size: 0, color: 'auto' }, right: { style: BorderStyle.NONE, size: 0, color: 'auto' } },
          children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, color: 'FFFFFF', font: FONT, size: 22 })] })],
        })
      ),
    }),
    ...[
      ['Profile / Logo', 'profile.jpg (720x720)', 'Tight portrait crop, square'],
      ['Cover', 'cover.jpg (1920x1080)', 'Action shot in park, golden hour'],
      ['At work', 'at-work-01.jpg, at-work-02.jpg, at-work-03.jpg', 'All landscape 4:3 action shots'],
      ['Team / About', 'team-01.jpg, team-02.jpg, team-03.jpg', 'Portrait orientation'],
    ].map(row => new TableRow({
      children: row.map((cell, i) => new TableCell({
        width: { size: i === 0 ? 2200 : i === 1 ? 3200 : 3600, type: WidthType.DXA },
        shading: { fill: 'FAF7F0', type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        borders: { top: { style: BorderStyle.SINGLE, size: 2, color: 'DDDDDD' }, bottom: { style: BorderStyle.SINGLE, size: 2, color: 'DDDDDD' }, left: { style: BorderStyle.NONE, size: 0, color: 'auto' }, right: { style: BorderStyle.NONE, size: 0, color: 'auto' } },
        children: [new Paragraph({ children: [new TextRun({ text: cell, font: FONT, size: 20, color: INK, bold: i === 0 })] })],
      })),
    })),
  ],
});

// Callout box (for tips/warnings)
const callout = (label, lines, color = TERRACOTTA) => new Table({
  width: { size: 9000, type: WidthType.DXA },
  columnWidths: [9000],
  rows: [new TableRow({
    children: [new TableCell({
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color },
        bottom: { style: BorderStyle.SINGLE, size: 4, color },
        left: { style: BorderStyle.SINGLE, size: 24, color },
        right: { style: BorderStyle.SINGLE, size: 4, color },
      },
      shading: { fill: 'FBF5EE', type: ShadingType.CLEAR },
      width: { size: 9000, type: WidthType.DXA },
      margins: { top: 180, bottom: 180, left: 240, right: 200 },
      children: [
        new Paragraph({
          spacing: { after: 100 },
          children: [new TextRun({ text: label, font: FONT, size: 20, bold: true, color, allCaps: true })],
        }),
        ...lines.map(line => new Paragraph({
          spacing: { after: 60, line: 300 },
          children: [new TextRun({ text: line, font: FONT, size: 22, color: INK })],
        })),
      ],
    })],
  })],
});

// ---------- Document content ----------

const children = [];

// Title
children.push(h1('Google Business Profile setup for Vicji'));

// Intro paragraph
children.push(p('Step-by-step guide to creating Vicji\'s Google Business Profile (GBP). Designed for a WhatsApp screen-share session with him.', { runOpts: { italic: true, color: MUTED } }));

children.push(rich([
  { text: 'Reading time: ', bold: true },
  { text: '5 min   ' },
  { text: 'Setup time: ', bold: true },
  { text: '~15 min   ' },
  { text: 'Verification: ', bold: true },
  { text: '5 days to 2 weeks (postcard) or 1-3 days (video)' },
]));

// "How to use this guide" intro
children.push(callout('How to use this guide', [
  'Open WhatsApp video call with Vicji. He shares his screen. You read each section out loud, he types what you tell him. The whole setup takes about 15 minutes if you have everything ready (photos, address, phone). The hardest part is choosing the verification method, covered in Step 7.',
  'All text in monospace boxes is meant to be copied and pasted exactly. The 8 photos he needs are already cropped and sitting in this folder: vicjimassage-site/public/gbp/',
]));

children.push(hr());

// Before you start
children.push(h2('Before you start'));

children.push(h3('Who creates this and owns it'));
children.push(rich([
  { text: 'Vicji creates and owns it under HIS Google account.', bold: true },
  { text: ' Not Suroy\'s.' },
]));
children.push(p('Reasons:'));
children.push(bullet('The profile is a legal claim to ownership of a business listing. Should be his.'));
children.push(bullet('If your friendship ever changes, he keeps clean control.'));
children.push(bullet('Postcard verification goes to his physical address. He has to pick it up.'));
children.push(bullet('Suroy can be added as a Manager (full access except ownership transfer) afterward.'));
children.push(rich([
  { text: 'If Vicji doesn\'t have a Gmail account, create one first at ', },
  { text: 'accounts.google.com', hyperlink: 'https://accounts.google.com' },
  { text: '.' },
]));

children.push(h3('What to have ready'));
children.push(bullet('Phone (his Brazilian mobile, not WhatsApp number if different)'));
children.push(bullet('Email'));
children.push(bullet('Studio address: Espaço Clô, Rua Magnólia, 69, Vila Gardênia, Atibaia, SP, 12942-010'));
children.push(bullet('Photos from public/gbp/ in this repo (8 files, all sized correctly for GBP)'));

children.push(hr());

// Step 1
children.push(h2('Step 1: Create the profile'));
children.push(num('Go to business.google.com', 0));
children.push(num('Sign in with Vicji\'s Google account', 0));
children.push(num('Click Manage now (or Add your business)', 0));

children.push(hr());

// Step 2
children.push(h2('Step 2: Business name'));
children.push(rich([{ text: 'Enter exactly:', bold: true }]));
children.push(codeBlock(['Vicji Massagem Tailandesa']));
children.push(p('Notes:'));
children.push(bullet('Use "Massagem Tailandesa" not "Thai Massage" (GBP indexes in local language; this is what Brazilians search)'));
children.push(bullet('Don\'t add city ("Atibaia") to the name. Google will display the city automatically, and adding it triggers a name-stuffing penalty.'));
children.push(bullet('Don\'t add the studio name ("Espaço Clô") to the business name. The studio is a venue, not part of his brand.'));

children.push(hr());

// Step 3
children.push(h2('Step 3: Business category'));
children.push(rich([{ text: 'Primary category (most important):', bold: true }]));
children.push(codeBlock(['Massagista']));
children.push(p('When you start typing, Google will show suggestions. Pick the exact one labeled "Massagista" (Massage therapist).'));
children.push(rich([
  { text: 'Additional categories ', bold: true },
  { text: '(you can add up to 9, use 3-4 strategic ones):' },
]));
children.push(codeBlock([
  'Spa',
  'Praticante de medicina alternativa',
  'Centro de bem-estar',
]));
children.push(p('Why these:'));
children.push(bullet('Massagista is the core query that matches user intent'));
children.push(bullet('Spa captures broader wellness search traffic'));
children.push(bullet('Praticante de medicina alternativa reaches the holistic/spiritual seekers'));
children.push(bullet('Centro de bem-estar is broader wellness umbrella'));
children.push(rich([
  { text: 'Don\'t add: ', bold: true, color: TERRACOTTA },
  { text: 'Salon, Hair salon, Beauty salon, Nail salon (irrelevant; dilutes Google\'s understanding of what he does)' },
]));

children.push(hr());

// Step 4
children.push(h2('Step 4: Location'));
children.push(rich([
  { text: 'Click ', },
  { text: 'Yes, I serve customers at this location', bold: true },
  { text: ' (NOT "I deliver goods and services to my customers").' },
]));
children.push(rich([{ text: 'Address:', bold: true }]));
children.push(codeBlock([
  'Rua Magnólia, 69',
  'Vila Gardênia',
  'Atibaia, SP, 12942-010',
  'Brasil',
]));
children.push(callout('Important', [
  'Make sure when Google\'s map pin appears, it actually lands on the building. If it\'s off by a block, drag the pin to the correct spot.',
]));

children.push(hr());

// Step 5
children.push(h2('Step 5: Service area'));
children.push(p('Vicji works from the studio only (right now). Skip the service-area question OR leave it blank.'));
children.push(p('If he eventually does house calls, he can add service areas later (e.g., "Atibaia, Bragança Paulista, Jundiaí").'));

children.push(hr());

// Step 6
children.push(h2('Step 6: Contact info'));
children.push(rich([{ text: 'Phone:', bold: true }]));
children.push(p('Vicji\'s Brazilian mobile (with country code: +55 11 XXXXX-XXXX or +55 19 XXXXX-XXXX or whatever his region is).'));
children.push(rich([
  { text: 'Use his ' },
  { text: 'WhatsApp number', bold: true },
  { text: ' since that\'s where clients book.' },
]));
children.push(rich([{ text: 'Website:', bold: true }]));
children.push(codeBlock(['https://vicjimassage.com.br']));

children.push(hr());

// Step 7
children.push(h2('Step 7: Verification'));
children.push(p('Google asks how to verify:'));
children.push(rich([{ text: 'Order of preference for Vicji:', bold: true }]));

children.push(h3('Option 1: Video verification (BEST if available)'));
children.push(bullet('Schedule a video call with Google support'));
children.push(bullet('Vicji holds his phone, films himself walking through the studio'));
children.push(bullet('Shows the address from outside'));
children.push(bullet('Shows him doing massage stuff (technique demos, equipment, business signs)'));
children.push(bullet('Approval in 1-3 business days'));
children.push(bullet('Available for most service businesses now'));

children.push(h3('Option 2: Postcard (FALLBACK)'));
children.push(bullet('Google mails a physical postcard to the studio address'));
children.push(bullet('Takes 5-14 business days in Brazil'));
children.push(bullet('Contains a verification code'));
children.push(bullet('He enters the code in business.google.com to confirm'));
children.push(bullet('DO NOT modify the business profile until the postcard arrives'));

children.push(h3('Option 3: Phone or email (RARE for massage businesses)'));
children.push(bullet('Sometimes offered for certain categories'));
children.push(bullet('If shown, use it. Instant.'));

children.push(callout('If neither video nor phone is offered', [
  'Take the postcard. Don\'t try to game it.',
]));

children.push(hr());

// Step 8
children.push(h2('Step 8: Business description (after verification)'));
children.push(rich([
  { text: 'After verification, fill in this description. ' },
  { text: 'Copy/paste exactly', bold: true },
  { text: ' (750 characters, Portuguese):' },
]));
children.push(codeBlock([
  'A Thai massage tradicional em Atibaia, no Espaço Clô. Vicji se',
  'formou massagista na Tailândia, aprofundou em yoga na Índia, e',
  'oferece um trabalho corporal integrado em três dimensões: físico,',
  'energético e espiritual. Único no Brasil oferecendo esse',
  'atendimento. Sessões de Thai Massage Tradicional (2h ou 3h) e',
  'Liberação de Quadril (1h30). Atendimento sob agendamento via',
  'WhatsApp. Brasileiros e clientes internacionais (inglês fluente).',
  'Pix, dinheiro, cartão de crédito ou débito, e moedas estrangeiras',
  '(USD, EUR). Em breve em Itacaré, Bahia.',
]));

children.push(hr());

// Step 9
children.push(h2('Step 9: Services'));
children.push(p('Add each session as a separate Service:'));

const svc = (n, name, price, desc) => [
  h3(`Service ${n}`),
  rich([{ text: 'Name: ', bold: true }, { text: name }]),
  rich([{ text: 'Category: ', bold: true }, { text: 'Massagem' }]),
  rich([{ text: 'Price: ', bold: true }, { text: price }]),
  rich([{ text: 'Description: ', bold: true }, { text: desc }]),
];
children.push(...svc(1, 'Thai Massage Tradicional, 2 horas', 'R$ 330', 'Sessão completa de Thai massage tradicional, corpo inteiro dos pés à cabeça. Combina pressões em pontos energéticos (sen) e alongamentos passivos. Liberação muscular, mobilização articular, equilíbrio dos chakras. Sessão recomendada para conhecer o trabalho.'));
children.push(...svc(2, 'Thai Massage Tradicional, 3 horas (imersiva)', 'R$ 480', 'A experiência completa. Cabeça aos pés, com tempo suficiente para o sistema nervoso entrar em coerência. Ideal para quem está há muito tempo sem parar. Trabalho profundo nos três níveis: físico, energético, espiritual.'));
children.push(...svc(3, 'Liberação de Quadril, 1h30', 'R$ 250', 'Sessão focada na parte inferior do corpo: pernas, quadril, lombar. Harmoniza os chakras inferiores (raiz e sacral). Combina manobras da Thai massage com alongamentos específicos, liberação miofascial e técnicas de descompressão. Centro energético e biomecânico do corpo.'));

children.push(hr());

// Step 10
children.push(h2('Step 10: Hours'));
children.push(codeBlock([
  'Segunda:  10:00 - 19:00',
  'Terça:    10:00 - 19:00',
  'Quarta:   10:00 - 19:00',
  'Quinta:   10:00 - 19:00',
  'Sexta:    10:00 - 19:00',
  'Sábado:   09:00 - 16:00',
  'Domingo:  Fechado',
]));
children.push(p('(Adjust to Vicji\'s actual schedule. Check with him.)'));
children.push(rich([
  { text: 'Mark ' },
  { text: '"By appointment"', bold: true },
  { text: ' if available, since he doesn\'t take walk-ins.' },
]));

children.push(hr());

// Step 11
children.push(h2('Step 11: Photos'));
children.push(p('Upload from public/gbp/ in this repo (already cropped to the right sizes):'));
children.push(photosTable());
children.push(p(' '));
children.push(rich([
  { text: 'GBP also shows photos from Google reviews and your website automatically. ', bold: true },
  { text: 'The website OG image (your hero) will already be pulled.' },
]));

children.push(hr());

// Step 12
children.push(h2('Step 12: Attributes'));
children.push(p('GBP asks about attributes (amenities, accessibility, etc.). Fill in what\'s true:'));

children.push(h4('Highlights:'));
children.push(bullet('Online appointments: Yes (WhatsApp counts)'));
children.push(bullet('LGBTQ+ friendly: Yes (if true)'));
children.push(bullet('Wi-Fi: If the studio has it'));
children.push(bullet('Wheelchair accessible entrance: Check with Vicji (Espaço Clô may or may not)'));

children.push(h4('Service options:'));
children.push(bullet('In-store services: Yes'));

children.push(h4('Payment methods:'));
children.push(bullet('Pix: Yes'));
children.push(bullet('Dinheiro: Yes'));
children.push(bullet('Cartão de crédito: Yes'));
children.push(bullet('Cartão de débito: Yes'));

children.push(h4('Languages spoken:'));
children.push(bullet('Português'));
children.push(bullet('English'));

children.push(hr());

// First 30 days
children.push(h2('After setup: the first 30 days (critical for ranking)'));
children.push(p('The GBP algorithm gives a "new business boost" for the first 30-60 days. Use it.'));

children.push(h3('Week 1'));
children.push(num('Get 5+ Google reviews fast. Ask 5 happiest clients (from the top 10 reviews you\'ve already collected) to also leave a Google review. Send them the direct review link: g.page/r/[YOUR-GBP-ID]/review (Google gives you this URL after verification).', 0));
children.push(num('Upload all 8 photos from public/gbp/', 0));
children.push(num('Verify all fields are filled (don\'t leave anything blank)', 0));

children.push(h3('Week 2'));
children.push(num('Post a "Welcome" Update on the GBP. Use his story:', 0));
children.push(new Paragraph({
  spacing: { before: 80, after: 120, line: 320 },
  indent: { left: 720 },
  children: [new TextRun({
    text: '"Sou Vicji, terapeuta de massagem tailandesa em Atibaia. Aprendi na fonte, em Chiang Mai, e trouxe a prática pro Brasil. Atendo no Espaço Clô. Te espero pra uma sessão."',
    font: FONT, size: 22, italic: true, color: MUTED,
  })],
}));
children.push(num('Reply to every review (positive or negative) within 24h. Google notices.', 0));

children.push(h3('Week 3'));
children.push(num('Add a new photo every 3-4 days. Even a phone shot of the studio counts. Algorithmic preference for active profiles.', 0));
children.push(num('Post another Update: maybe a "What is Thai massage" mini-explainer linking to the blog post.', 0));

children.push(h3('Week 4'));
children.push(num('Audit Search Console for any "vicji" or "massagem tailandesa atibaia" impressions to see if you\'re appearing yet.', 0));
children.push(num('Add 2 more reviews if you can.', 0));

children.push(p('By day 30, the GBP should be ranking for branded queries (vicji massage, vicji massagem) and starting to show for non-branded local queries (massagem tailandesa atibaia, massagista atibaia).'));

children.push(hr());

// Manager
children.push(h2('Adding Suroy as a Manager (optional but recommended)'));
children.push(p('Once verified, Vicji can add you so you can manage day-to-day without owning the profile:'));
children.push(num('In GBP dashboard: Settings > Managers > Add', 0));
children.push(num('Enter Suroy\'s Google email', 0));
children.push(num('Role: Manager (NOT Owner)', 0));
children.push(num('Suroy gets an invite, accepts, has full edit access but can\'t transfer ownership or delete', 0));

children.push(hr());

// Don'ts
children.push(h2('Don\'ts (mistakes that get profiles suspended)'));
children.push(bullet('Don\'t put the city in the business name'));
children.push(bullet('Don\'t put the website URL in the business name'));
children.push(bullet('Don\'t make up an address (Google verifies)'));
children.push(bullet('Don\'t list service areas if Vicji only works from the studio'));
children.push(bullet('Don\'t add fake reviews'));
children.push(bullet('Don\'t bulk-import reviews from another platform'));
children.push(bullet('Don\'t add categories that don\'t actually apply (no "Hair salon")'));
children.push(bullet('Don\'t make a second profile for "the Itacaré location" before he moves. Wait. When he moves, you UPDATE the address on this one profile. Two profiles for one person = duplicate listing penalty.'));

children.push(hr());

// Itacaré
children.push(h2('When Vicji moves to Itacaré later this year'));
children.push(callout('IMPORTANT', [
  'DON\'T delete this profile. DON\'T create a new one.',
  'Just go to GBP dashboard > Edit business > change the address. Google preserves all the review history and authority you\'ve built. Takes a few days for the new address to verify.',
], TEAL));

children.push(hr());

// Reference
children.push(h2('Reference'));
children.push(bullet('Photos to upload: vicjimassage-site/public/gbp/ (8 files)'));
children.push(bullet('Website to enter: https://vicjimassage.com.br'));
children.push(bullet('Business name: Vicji Massagem Tailandesa'));
children.push(bullet('Primary category: Massagista'));
children.push(bullet('Address: Rua Magnólia, 69, Vila Gardênia, Atibaia, SP, 12942-010, Brasil'));

children.push(p(' '));
children.push(rich([
  { text: 'Once verified, send the GBP profile link back and Suroy/Claude can embed it on the contact page so visitors can leave reviews with one click.', italic: true, color: MUTED },
]));

// ---------- Build document ----------

const doc = new Document({
  creator: 'Suroy (with Claude)',
  title: 'Google Business Profile setup for Vicji',
  description: 'Step-by-step GBP creation guide',
  styles: {
    default: {
      document: { run: { font: FONT, size: 22 } },
    },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 48, bold: true, font: FONT, color: TEAL },
        paragraph: { spacing: { before: 0, after: 300 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, font: FONT, color: TEAL },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, font: FONT, color: TERRACOTTA },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: 'bullets',
        levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: 'numbers',
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    children,
  }],
});

const buf = await Packer.toBuffer(doc);
writeFileSync('docs/Vicji-GBP-Setup-Guide.docx', buf);
console.log(`Generated docs/Vicji-GBP-Setup-Guide.docx (${(buf.length / 1024).toFixed(1)} KB)`);
