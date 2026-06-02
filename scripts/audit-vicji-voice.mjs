#!/usr/bin/env node
/**
 * Vicji voice audit — runs before `npm run build` to catch PT-BR copywriting
 * violations against the patterns established across batches 1-14 of Vicji's
 * editorial review.
 *
 * - HARD FAIL (exits 1, blocks build): patterns Vicji has explicitly and
 *   consistently corrected. No false positives expected.
 * - WARN (logs but doesn't block): patterns that *usually* need fixing but
 *   can be intentional in some contexts. Run manually to review.
 *
 * Usage:
 *   node scripts/audit-vicji-voice.mjs        (full audit)
 *   node scripts/audit-vicji-voice.mjs --hard (only hard failures, faster)
 *
 * Wired into `npm run build` via prebuild hook in package.json.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(import.meta.url), '..', '..');
const args = process.argv.slice(2);
const HARD_ONLY = args.includes('--hard');

// ─── PATTERN DEFINITIONS ─────────────────────────────────────────────────

// HARD failures: exact-string patterns Vicji always corrects.
// No false positives. Block build on any hit.
const HARD = [
  {
    name: 'Em dash (—)',
    pattern: /—/g,
    fix: 'Replace with comma, period, en dash (–), or bullet (·).',
    appliesTo: /\.(astro|md|json|ts|mjs)$/,
  },
  {
    name: 'Old session count "Mais de 200 sessões"',
    pattern: /Mais de 200 sessões/g,
    fix: 'Use "Mais de 500 sessões" (current per batch — 2026-05-29).',
    appliesTo: /\.(astro|md|json)$/,
  },
  {
    name: 'Old session count "200+ sessions"',
    pattern: /200\+ sessions\b|Over 200 sessions/g,
    fix: 'Use "500+ sessions" / "Over 500 sessions" (current per batch 2026-05-29).',
    appliesTo: /\.(astro|md|json)$/,
  },
  {
    name: 'Old Instagram follower count "11.1k"',
    pattern: /11\.1k/g,
    fix: 'Use "11k+" (current per 2026-05-29 — ages gracefully).',
    appliesTo: /\.(astro|md|json)$/,
  },
  {
    name: 'Portugal-style 2nd-person conjugation (tu form)',
    // Use Unicode-aware boundaries (lookbehind/lookahead with \p{L}) because
    // JS \b is ASCII-only and false-matches inside "pés", "Ofereço", etc.
    pattern: /(?<!\p{L})(podes|deves|sabes|estás|queres|sejas|vais|és|falas|dizes|hás)(?!\p{L})/gu,
    fix: 'Use Brazilian 3rd-person with você: pode, deve, sabe, está, quer, seja, vai, é, fala, diz, há.',
    appliesTo: /\.(astro|md|json)$/,
    excludePath: /skills.*brazilian-portuguese|HANDOFF\.md/,
  },
  {
    name: 'Tu pronoun forms (teu/tua/teus/tuas/ti/contigo)',
    pattern: /(?<!\p{L})(teu|tua|teus|tuas|contigo)(?!\p{L})|(?<!\p{L})pra ti(?!\p{L})/gu,
    fix: 'Use você equivalents: seu, sua, seus, suas, com você, pra você.',
    appliesTo: /\.(astro|md|json)$/,
    excludePath: /skills.*brazilian-portuguese|HANDOFF\.md/,
  },
  {
    name: 'Masculine article before feminine "Thai Massage"',
    pattern: /(?<!\p{L})(o Thai Massage|do Thai Massage|no Thai Massage|ao Thai Massage|pelo Thai Massage|um Thai Massage|esse Thai Massage|este Thai Massage)(?!\p{L})/gu,
    fix: 'Thai Massage is feminine (a/da/na/à/pela/uma/essa/esta).',
    appliesTo: /\.(astro|md|json)$/,
  },
  {
    name: 'Old Nuad Boran translation "trabalho ancestral"',
    pattern: /trabalho ancestral/g,
    fix: 'Nuad Boran literally = "Massagem antiga" (Vicji correction, batch 14).',
    appliesTo: /\.(astro|md|json)$/,
    excludePath: /HANDOFF\.md/,
  },
  {
    name: 'Hidrata-te (tu imperative)',
    pattern: /\bHidrata-te\b/g,
    fix: 'Use "Hidrate-se" (você imperative, site-wide register consistency).',
    appliesTo: /\.(astro|md|json)$/,
  },
  {
    // Vicji's preference (codified across batches 14, 15): spell out "pra"
    // unless it's one of the established colloquial idioms below.
    // Allowed: pra você, pra mim, pra cá, pra lá, pra frente, pra trás,
    // pra baixo, pra cima, pra dentro, pra fora, pra nós, pra si.
    name: '"pra" followed by anything except allowed colloquials',
    pattern: /(?<!\p{L})pra (?!você|voce|mim|cá|ca|lá|la|frente|trás|tras|baixo|cima|dentro|fora|nós|nos|si)(\p{L}+)/gu,
    fix: 'Spell out as "para" (batches 14 + 15). Allowed colloquials only: pra você / pra mim / pra cá / pra lá / pra frente / pra trás / pra baixo / pra cima / pra dentro / pra fora.',
    appliesTo: /\.(astro|md|json)$/,
    // Skip reviews (client quotes, never modify) + skill docs + handoff
    excludePath: /reviews\.json|skills.*brazilian-portuguese|HANDOFF\.md/,
  },
  {
    // "pro" is a contraction of "pra o" — same problem class as bare "pra".
    // Catch "pro X" / "pros X" / "pra os X" / "pra as X" when X is a noun.
    name: '"pro" / "pros" / "pra os" / "pra as" contractions',
    pattern: /(?<!\p{L})(pro|pros|pra os|pra as) (\p{L}+)/gu,
    fix: 'Spell out as "para o" / "para os" / "para as" (batches 13-15: Vicji rejects pra+article contractions).',
    appliesTo: /\.(astro|md|json)$/,
    excludePath: /reviews\.json|skills.*brazilian-portuguese|HANDOFF\.md/,
  },
];

// WARN-only patterns. Usually wrong but can be intentional.
// Don't block build, just flag for review.
const WARN = [
  {
    name: '"num" contraction',
    pattern: /\bnum (a|um|ritmo|local|tempo|momento|dia)/g,
    fix: 'Vicji prefers "em um" expanded (batch 9: "num ritmo" → "em um ritmo").',
    appliesTo: /\.(astro|md|json)$/,
    excludePath: /HANDOFF\.md/,
  },
  {
    name: 'Singular "roupa confortável"',
    pattern: /roupa confortável/g,
    fix: 'Vicji uses plural "roupas confortáveis" (batch 14).',
    appliesTo: /\.(astro|md|json)$/,
  },
  {
    name: '"joias" in clothing/prep context',
    pattern: /\bjoias\b/g,
    fix: 'Vicji uses "acessórios" (covers watches/rings/glasses too — batch 6).',
    appliesTo: /\.(astro|md|json)$/,
    excludePath: /HANDOFF\.md/,
  },
  {
    name: '"está pagando" (price-context, should be "investindo")',
    // Negative lookbehind for "não " preserves the legitimate "não está
    // pagando... Está investindo" contrast Vicji uses in /servicos batch 7.
    pattern: /(?<!não )está pagando/g,
    fix: 'Vicji reframes payment as investment: "está investindo" (batch 7).',
    appliesTo: /\.(astro|md|json)$/,
    excludePath: /HANDOFF\.md/,
  },
  {
    name: '"pegada" (colloquial for vibe)',
    pattern: /\baquela pegada\b/g,
    fix: 'Vicji prefers "aquela sensação" (batch 9 — refined for wellness).',
    appliesTo: /\.(astro|md|json)$/,
    excludePath: /HANDOFF\.md/,
  },
  {
    name: 'Location callout "Atendo em Atibaia, no Espaço Clô" in blog/CTA',
    pattern: /Atendo em Atibaia, no Espaço Clô/g,
    fix: 'Drop from per-page content — Footer + LocalBusiness schema carry it (batches 8, 10, 13, 14).',
    appliesTo: /^src\/content\/blog\/.+\.md$/,
  },
  {
    name: '"mais profunda que" (should be "do que")',
    pattern: /mais profunda que\b/g,
    fix: 'Vicji prefers "mais profunda do que" (batch 11).',
    appliesTo: /\.(astro|md|json)$/,
    excludePath: /HANDOFF\.md/,
  },
  {
    name: '"sem saber por quê" / "sem saber porquê" (should be "o porquê" as noun)',
    pattern: /sem saber por\s?quê/g,
    fix: 'When "porquê" functions as a noun, use "o porquê" (batch 9).',
    appliesTo: /\.(astro|md|json)$/,
    excludePath: /HANDOFF\.md/,
  },
];

// ─── FILE WALKER ─────────────────────────────────────────────────────────

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'public']);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (SKIP_DIRS.has(entry)) continue;
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, files);
    } else if (/\.(astro|md|json|ts|mjs)$/.test(extname(entry))) {
      files.push(fullPath);
    }
  }
  return files;
}

// ─── AUDIT LOGIC ─────────────────────────────────────────────────────────

function auditFile(filePath, patterns) {
  const relPath = relative(root, filePath).replace(/\\/g, '/');
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations = [];

  for (const rule of patterns) {
    if (rule.appliesTo && !rule.appliesTo.test(relPath)) continue;
    if (rule.excludePath && rule.excludePath.test(relPath)) continue;

    lines.forEach((line, idx) => {
      const matches = [...line.matchAll(rule.pattern)];
      if (matches.length > 0) {
        for (const m of matches) {
          violations.push({
            file: relPath,
            line: idx + 1,
            col: m.index + 1,
            match: m[0],
            ruleName: rule.name,
            fix: rule.fix,
          });
        }
      }
    });
  }

  return violations;
}

// ─── MAIN ────────────────────────────────────────────────────────────────

const srcDir = join(root, 'src');
const docsDir = join(root, 'docs');
const files = [];
try { walk(srcDir, files); } catch {}
try { walk(docsDir, files); } catch {}

const hardViolations = [];
const warnViolations = [];

for (const file of files) {
  hardViolations.push(...auditFile(file, HARD));
  if (!HARD_ONLY) {
    warnViolations.push(...auditFile(file, WARN));
  }
}

// ─── REPORT ──────────────────────────────────────────────────────────────

const RED = '\x1b[31m', YELLOW = '\x1b[33m', GREEN = '\x1b[32m', DIM = '\x1b[2m', RESET = '\x1b[0m', BOLD = '\x1b[1m';

function report(title, violations, color) {
  if (violations.length === 0) return;
  console.log(`\n${color}${BOLD}${title}${RESET} ${DIM}(${violations.length} hit${violations.length === 1 ? '' : 's'})${RESET}`);
  // Group by rule name
  const byRule = {};
  for (const v of violations) {
    (byRule[v.ruleName] ||= []).push(v);
  }
  for (const ruleName of Object.keys(byRule)) {
    console.log(`\n  ${BOLD}${ruleName}${RESET}`);
    console.log(`  ${DIM}↳ ${byRule[ruleName][0].fix}${RESET}`);
    for (const v of byRule[ruleName].slice(0, 10)) {
      console.log(`    ${color}${v.file}:${v.line}:${v.col}${RESET}  ${DIM}"${v.match.trim()}"${RESET}`);
    }
    if (byRule[ruleName].length > 10) {
      console.log(`    ${DIM}... and ${byRule[ruleName].length - 10} more${RESET}`);
    }
  }
}

console.log(`${BOLD}Vicji voice audit${RESET} ${DIM}(scanned ${files.length} files in src/ + docs/)${RESET}`);

report('HARD FAILURES (build blockers)', hardViolations, RED);
if (!HARD_ONLY) {
  report('WARNINGS (manual review recommended)', warnViolations, YELLOW);
}

if (hardViolations.length === 0 && warnViolations.length === 0) {
  console.log(`\n${GREEN}✓ Clean. No Vicji-voice violations found.${RESET}\n`);
  process.exit(0);
}

if (hardViolations.length > 0) {
  console.log(`\n${RED}✗ ${hardViolations.length} hard failure${hardViolations.length === 1 ? '' : 's'} — build blocked.${RESET}`);
  console.log(`${DIM}Fix the above, then re-run. (See .claude/skills/brazilian-portuguese-copywriting/SKILL.md for context.)${RESET}\n`);
  process.exit(1);
}

console.log(`\n${YELLOW}⚠ ${warnViolations.length} warning${warnViolations.length === 1 ? '' : 's'} — review recommended but not blocking.${RESET}\n`);
process.exit(0);
