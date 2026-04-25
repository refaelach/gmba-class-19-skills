#!/usr/bin/env node
// Build step: walk ../skills/ for SKILL.md files, parse them, and emit
// src/data/skills.json + src/data/categories.json for the Astro pages.

import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = resolve(__dirname, '..');
const REPO_ROOT = resolve(SITE_ROOT, '..');
const SKILLS_ROOT = resolve(REPO_ROOT, 'skills');
const DATA_DIR = resolve(SITE_ROOT, 'src', 'data');

const CATEGORIES = {
  'analysis': 'Frameworks for breaking down problems, cases, and markets.',
  'decision-making': 'Pressure-test choices and structure tradeoffs.',
  'exam-or-class-prep': 'Practice generators, study aids, and visual prompts.',
  'writing': 'Drafting scaffolds for cases, memos, and reviews.',
  'research': 'Lit reviews, sourcing, synthesizing.',
  'productivity': 'Cohort workflows, meeting notes, follow-ups.',
};

// Map H2 heading text (lowercased, normalized) -> JSON section key.
// Includes a handful of aliases observed in real skills (e.g. llm-council
// uses "when to run the council" instead of "when to use this skill").
const SECTION_MAP = new Map([
  ['compatibility', 'compatibility'],
  ['when to use this skill', 'whenToUse'],
  ['when to use', 'whenToUse'],
  ['when to run the council', 'whenToUse'],
  ['when not to use this skill', 'whenNotToUse'],
  ['when not to use', 'whenNotToUse'],
  ['how it works', 'howItWorks'],
  ['workflow', 'howItWorks'],
  ['how a council session works', 'howItWorks'],
  ['example', 'example'],
  ['inputs the skill expects', 'inputs'],
  ['outputs the skill produces', 'outputs'],
  ['notes for contributors', 'notesForContributors'],
  ['important notes', 'notesForContributors'],
]);

const warnings = [];
const warn = (msg) => {
  warnings.push(msg);
  console.error(`[build-skills] WARN: ${msg}`);
};

// -- helpers ---------------------------------------------------------------

async function walkForSkills(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkForSkills(full)));
    } else if (entry.isFile() && entry.name === 'SKILL.md') {
      out.push(full);
    }
  }
  return out;
}

function titleCase(slug) {
  return slug
    .split('-')
    .map((p) => (p.length ? p[0].toUpperCase() + p.slice(1) : p))
    .join(' ');
}

// Pull the structured trigger fields out of the description string.
// Patterns can appear in any order. We use indices into the description so we
// can grab the trailing prose for each marker without confusing it with the
// next marker.
function parseDescription(description) {
  if (!description || typeof description !== 'string') {
    return {
      summaryLine: '',
      triggers: { mandatory: [], strong: [], doNot: null, doWhen: null },
    };
  }

  const desc = description.trim();

  // summaryLine = everything before "MANDATORY TRIGGERS"
  const mandIdx = desc.indexOf('MANDATORY TRIGGERS');
  const summaryLine =
    mandIdx >= 0 ? desc.slice(0, mandIdx).trim() : desc.trim();

  // Find each marker by its (case-insensitive-ish) prefix. The two TRIGGERS
  // markers always carry a `:` (the STRONG one may have a parenthetical
  // qualifier between the word and the colon). The "Do NOT trigger" /
  // "DO trigger" markers in real skills sometimes have a colon (`on:`) and
  // sometimes don't — so we end those markers right after the keyword and
  // let the prose include any "on ..." continuation.
  const markers = [
    { key: 'mandatory', pattern: /MANDATORY TRIGGERS\s*:\s*/ },
    { key: 'strong', pattern: /STRONG TRIGGERS\b[^:]*:\s*/ },
    // For doNot/doWhen, optionally consume an "on" or "when[ever]" lead-in
    // and an optional ":" so the captured prose is just the substantive
    // clause. Examples seen in the wild:
    //   "Do NOT trigger on: foo, bar."
    //   "Do NOT trigger on simple yes/no questions..."
    //   "DO trigger when the user..."
    //   "DO trigger whenever the student has..."
    {
      key: 'doNot',
      pattern: /Do NOT trigger(?:\s+on)?\s*:?\s*/,
    },
    {
      key: 'doWhen',
      pattern: /\bDO trigger(?:\s+when(?:ever)?)?\s*:?\s*/,
    },
  ];

  // Find positions of each marker in the description.
  const found = [];
  for (const m of markers) {
    const match = m.pattern.exec(desc);
    if (match) {
      found.push({
        key: m.key,
        start: match.index,
        end: match.index + match[0].length,
      });
    }
  }
  // Sort by position in the string.
  found.sort((a, b) => a.start - b.start);

  const triggers = { mandatory: [], strong: [], doNot: null, doWhen: null };

  for (let i = 0; i < found.length; i++) {
    const cur = found[i];
    const next = found[i + 1];
    const sliceEnd = next ? next.start : desc.length;
    let chunk = desc.slice(cur.end, sliceEnd).trim();

    // Strip a single trailing period if it's the only one terminating the
    // section (the format usually ends each section with a period).
    if (cur.key === 'mandatory' || cur.key === 'strong') {
      // chunk looks like: 'phrase1', 'phrase2', 'phrase3'.
      // peel off trailing period(s)
      let body = chunk.replace(/\.\s*$/, '').trim();
      const phrases = extractQuotedPhrases(body);
      triggers[cur.key] = phrases;
    } else {
      // doNot / doWhen are free-form prose. Keep as-is, but trim trailing
      // whitespace.
      triggers[cur.key] = chunk.length ? chunk : null;
    }
  }

  return { summaryLine, triggers };
}

// Pull single-quoted phrases out of a string. The frontmatter format uses
// single quotes around each trigger phrase, separated by ", ". Phrases may
// contain apostrophes (e.g. "I'm torn between", "I can't decide"), so we
// can't just match `[^']+`. Instead we lazy-match and require the closing
// quote to be followed by a comma, a period, or end-of-string — which is the
// real terminator for a phrase in this format.
function extractQuotedPhrases(s) {
  const phrases = [];
  const re = /'(.+?)'(?=\s*(?:,|\.|$))/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    phrases.push(m[1].trim());
  }
  if (phrases.length === 0) {
    // Fallback: comma-split.
    return s
      .split(',')
      .map((p) => p.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  return phrases;
}

// Split markdown body into:
//   - hookParagraph: text before the first H2
//   - sections keyed by SECTION_MAP
//   - h1 (if present at top of body)
// Footer prose (Author / Created / etc.) is also detected and stripped.
function splitBodyIntoSections(body) {
  const lines = body.split('\n');

  // Find first H1 (single-#)
  let h1 = null;
  let cursor = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^#\s+/.test(line)) {
      h1 = line.replace(/^#\s+/, '').trim();
      cursor = i + 1;
      break;
    }
    if (/^##\s+/.test(line)) {
      // No H1, only H2 — leave cursor at 0
      break;
    }
    // tolerate blank lines / frontmatter slop before the H1
  }

  // Find footer block: an HR followed by **Author:** lines.
  let footerStart = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (line === '---' || line === '***') {
      // Check if subsequent non-blank lines look like footer fields
      let probe = i + 1;
      while (probe < lines.length && lines[probe].trim() === '') probe++;
      if (
        probe < lines.length &&
        /^\*\*(Author|Created|Tested on|Real tasks tested):?\*\*\s*:?/i.test(
          lines[probe].trim()
        )
      ) {
        footerStart = i;
        break;
      }
    }
  }

  const bodyEnd = footerStart >= 0 ? footerStart : lines.length;
  const footerLines = footerStart >= 0 ? lines.slice(footerStart + 1) : [];

  // Walk from cursor to bodyEnd. Collect chunks between H2s.
  const sections = {
    hookParagraph: null,
    compatibility: null,
    whenToUse: null,
    whenNotToUse: null,
    howItWorks: null,
    example: null,
    inputs: null,
    outputs: null,
    notesForContributors: null,
  };

  let currentKey = null; // null = hook
  const hookBuf = [];
  const sectionBufs = {};

  const flush = (key, buf) => {
    if (buf.length === 0) return;
    const text = buf.join('\n').trim();
    if (!text) return;
    if (key === null) {
      hookBuf.push(...buf);
    } else if (sections.hasOwnProperty(key)) {
      // append in case multiple aliases hit (e.g. multiple Example sections)
      sectionBufs[key] = sectionBufs[key]
        ? sectionBufs[key] + '\n\n' + text
        : text;
    }
  };

  let buf = [];
  for (let i = cursor; i < bodyEnd; i++) {
    const line = lines[i];
    const h2 = /^##\s+(.+?)\s*$/.exec(line);
    if (h2) {
      // flush previous
      flush(currentKey, buf);
      buf = [];
      const heading = h2[1].trim();
      const norm = heading.toLowerCase();
      let mappedKey = null;
      // Prefer exact match; otherwise startsWith fallback.
      if (SECTION_MAP.has(norm)) {
        mappedKey = SECTION_MAP.get(norm);
      } else {
        // startsWith match for things like "Example: full skill run"
        for (const [k, v] of SECTION_MAP) {
          if (norm.startsWith(k)) {
            mappedKey = v;
            break;
          }
        }
      }
      if (!mappedKey) {
        // Unknown H2. We still want to keep the heading visible — drop it
        // into notesForContributors as a fallback so we don't lose content.
        mappedKey = '__unknown__';
      }
      currentKey = mappedKey;
      // Don't include the heading line itself in the section body — the
      // page will render its own heading. But keep the heading text by
      // putting it back when the key is __unknown__ so nothing gets lost.
      if (mappedKey === '__unknown__') {
        buf.push(`## ${heading}`);
      }
    } else {
      buf.push(line);
    }
  }
  // flush last
  if (currentKey === '__unknown__') {
    // append unknown section content into notesForContributors as a salvage
    const text = buf.join('\n').trim();
    if (text) {
      sectionBufs.notesForContributors = sectionBufs.notesForContributors
        ? sectionBufs.notesForContributors + '\n\n' + text
        : text;
    }
  } else {
    flush(currentKey, buf);
  }

  // hook paragraph: keep only up to the first blank-line-separated paragraph
  // ... actually, the format puts a multi-paragraph intro before the first
  // H2 sometimes. Keep ALL of it as hookParagraph, since it's the "lede".
  const hookText = hookBuf.join('\n').trim();
  sections.hookParagraph = hookText.length ? hookText : null;

  for (const k of Object.keys(sections)) {
    if (k === 'hookParagraph') continue;
    sections[k] = sectionBufs[k] || null;
  }

  // Render sections that exist as HTML.
  const renderedSections = {};
  for (const [k, v] of Object.entries(sections)) {
    renderedSections[k] = v ? marked.parse(v) : null;
  }

  // footer parsing
  const footer = parseFooter(footerLines.join('\n'));

  return { h1, sections: renderedSections, rawSections: sections, footer };
}

function parseFooter(footerText) {
  if (!footerText || !footerText.trim()) {
    return {
      author: null,
      authorHandle: null,
      created: null,
      testedOn: null,
      realTasksTested: null,
    };
  }

  const out = {
    author: null,
    authorHandle: null,
    created: null,
    testedOn: null,
    realTasksTested: null,
  };

  // Each field is on its own line like:
  //   **Author:** Refael (Rafa) Lachmish ([@refaelach](https://...))
  // Capture the colon INSIDE the **...** so it's stripped from the label.
  const fieldPattern =
    /^\s*\*\*([^*:]+?):?\*\*\s*:?\s*(.+?)\s*$/;

  for (const rawLine of footerText.split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;
    const m = fieldPattern.exec(line);
    if (!m) continue;
    const label = m[1].trim().toLowerCase();
    let value = m[2].trim();

    if (label === 'author') {
      // Pull the handle out of [@name](url) if present.
      const handleMatch = /\[@([^\]]+)\]\([^)]+\)/.exec(value);
      if (handleMatch) {
        out.authorHandle = '@' + handleMatch[1];
      }
      // Strip the "(...)" handle-bearing tail to get the bare name.
      const stripped = value
        .replace(/\s*\(\[@[^\]]+\]\([^)]+\)\)\s*$/, '')
        .trim();
      out.author = stripped || value;
    } else if (label === 'created') {
      out.created = value;
    } else if (label === 'tested on') {
      out.testedOn = value;
    } else if (label === 'real tasks tested') {
      out.realTasksTested = value;
    }
  }

  return out;
}

// Determine the verified-tools list for a skill. Default to the common four
// (Claude / ChatGPT / Gemini / Codex). If the Compatibility section indicates
// partial / prompt-only / Custom-GPT support, narrow to the two with full
// support (Claude / Codex).
function deriveTools(_rawCompatibility, _renderedCompatibility) {
  // Every skill works via copy-paste in the three consumer AI tools at minimum.
  // We display brand icons for these three. Codex / Cursor / Claude Code etc.
  // are surfaced separately in the "Power users" block on the skill detail page.
  return ['Claude', 'ChatGPT', 'Gemini'];
}

// Derive a short display string from a "Tested on" footer value.
function deriveTestedShort(testedOn) {
  if (!testedOn) return '';
  const original = String(testedOn).trim();
  if (!original) return '';

  // Take first comma- or slash-separated entry.
  const first = original.split(/[,/]/)[0].trim();
  if (!first) return original;

  // If the first entry contains parens, pull out the parenthesized text.
  const parenMatch = /\(([^)]+)\)/.exec(first);
  if (parenMatch) {
    const inside = parenMatch[1].trim();
    return inside || first;
  }

  // Otherwise strip a leading "Claude " if present.
  if (/^Claude\s+/.test(first)) {
    const stripped = first.replace(/^Claude\s+/, '').trim();
    return stripped || first;
  }

  return first;
}

async function buildSkillEntry(skillMdPath) {
  const raw = await readFile(skillMdPath, 'utf8');
  const parsed = matter(raw);
  const fm = parsed.data || {};
  const body = parsed.content || '';

  const relPath = relative(REPO_ROOT, skillMdPath);
  // skills/<category>/<slug>/SKILL.md
  const parts = relPath.split('/');
  if (parts.length < 4 || parts[0] !== 'skills' || parts[3] !== 'SKILL.md') {
    warn(`Unexpected SKILL.md location: ${relPath}`);
  }
  const category = parts[1] || 'unknown';
  const slug = parts[2] || (fm.name ? String(fm.name) : 'unknown');

  if (!fm.name) warn(`${relPath}: missing 'name' in frontmatter`);
  if (!fm.description) warn(`${relPath}: missing 'description' in frontmatter`);

  const description = fm.description ? String(fm.description) : '';
  const { summaryLine, triggers } = parseDescription(description);

  if (!triggers.mandatory.length)
    warn(`${relPath}: no MANDATORY TRIGGERS phrases parsed`);
  if (!triggers.strong.length)
    warn(`${relPath}: no STRONG TRIGGERS phrases parsed`);
  if (!triggers.doNot) warn(`${relPath}: no 'Do NOT trigger' clause found`);
  if (!triggers.doWhen) warn(`${relPath}: no 'DO trigger when' clause found`);

  const { h1, sections, rawSections, footer } = splitBodyIntoSections(body);

  // Title: prefer H1, else title-cased slug.
  const title = h1 || titleCase(slug);

  // Sanity-check expected sections — log warnings only, don't crash.
  const expectedKeys = [
    'whenToUse',
    'whenNotToUse',
    'howItWorks',
    'inputs',
    'outputs',
    'notesForContributors',
  ];
  for (const k of expectedKeys) {
    if (!sections[k]) warn(`${relPath}: missing section "${k}"`);
  }

  // hasReferences: does sibling references/ exist?
  const skillDir = dirname(skillMdPath);
  const referencesDir = join(skillDir, 'references');
  let hasReferences = false;
  try {
    const s = await stat(referencesDir);
    hasReferences = s.isDirectory();
  } catch {
    hasReferences = false;
  }

  // Render the full body too (without the footer).
  // Strip the trailing footer block from the body before rendering so the
  // bodyHtml doesn't double up with the structured footer fields.
  const bodyForRender = stripFooter(body);
  const bodyHtml = marked.parse(bodyForRender);

  const tools = deriveTools(
    rawSections ? rawSections.compatibility : null,
    sections ? sections.compatibility : null
  );
  const testedShort = deriveTestedShort(footer ? footer.testedOn : null);

  return {
    slug,
    category,
    name: fm.name ? String(fm.name) : slug,
    title,
    description,
    summaryLine,
    triggers,
    bodyHtml,
    bodyMarkdown: bodyForRender,
    sections,
    footer,
    tools,
    testedShort,
    githubPath: relPath,
    hasReferences,
    frontmatter: fm,
  };
}

function stripFooter(body) {
  const lines = body.split('\n');
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (line === '---' || line === '***') {
      let probe = i + 1;
      while (probe < lines.length && lines[probe].trim() === '') probe++;
      if (
        probe < lines.length &&
        /^\*\*(Author|Created|Tested on|Real tasks tested):?\*\*\s*:?/i.test(
          lines[probe].trim()
        )
      ) {
        return lines.slice(0, i).join('\n').trimEnd() + '\n';
      }
    }
  }
  return body;
}

// -- main ------------------------------------------------------------------

async function main() {
  if (!existsSync(SKILLS_ROOT)) {
    console.error(`[build-skills] FATAL: skills directory not found at ${SKILLS_ROOT}`);
    process.exit(1);
  }

  const skillFiles = (await walkForSkills(SKILLS_ROOT)).sort();
  console.error(`[build-skills] Found ${skillFiles.length} SKILL.md file(s).`);

  const skills = [];
  for (const f of skillFiles) {
    try {
      const entry = await buildSkillEntry(f);
      skills.push(entry);
      console.error(
        `[build-skills] parsed: ${entry.category}/${entry.slug} (${entry.triggers.mandatory.length} mandatory, ${entry.triggers.strong.length} strong)`
      );
    } catch (err) {
      warn(`Failed to parse ${f}: ${err.message}`);
    }
  }

  // Sort: by category, then by slug.
  skills.sort((a, b) =>
    a.category === b.category
      ? a.slug.localeCompare(b.slug)
      : a.category.localeCompare(b.category)
  );

  // Canonical display names (preserve the hyphenation from the repo's category
  // names — title-casing the slug would lose "Decision-Making" -> "Decision Making").
  const CATEGORY_DISPLAY_NAMES = {
    'analysis':           'Analysis',
    'decision-making':    'Decision-Making',
    'exam-or-class-prep': 'Exam or Class Prep',
    'writing':            'Writing',
    'research':           'Research',
    'productivity':       'Productivity',
  };

  // Build categories.json. Include skill counts so the index page can show
  // empty-state copy for categories with no skills yet.
  const categories = Object.entries(CATEGORIES).map(([slug, description]) => {
    const count = skills.filter((s) => s.category === slug).length;
    return {
      slug,
      title: CATEGORY_DISPLAY_NAMES[slug] || titleCase(slug),
      description,
      skillCount: count,
    };
  });

  // Make sure src/data exists.
  await mkdir(DATA_DIR, { recursive: true });

  await writeFile(
    join(DATA_DIR, 'skills.json'),
    JSON.stringify(skills, null, 2) + '\n',
    'utf8'
  );
  await writeFile(
    join(DATA_DIR, 'categories.json'),
    JSON.stringify(categories, null, 2) + '\n',
    'utf8'
  );

  console.error(
    `[build-skills] Wrote ${skills.length} skills and ${categories.length} categories.`
  );

  if (warnings.length) {
    console.error(`[build-skills] ${warnings.length} warning(s).`);
  }

  // For verifying the parser, print the exam-prep skill JSON.
  const examPrep = skills.find((s) => s.slug === 'exam-prep');
  if (examPrep) {
    console.log('---- exam-prep parsed entry ----');
    console.log(JSON.stringify(examPrep, null, 2));
  } else {
    console.error('[build-skills] note: no exam-prep skill found to print.');
  }
}

main().catch((err) => {
  console.error('[build-skills] fatal error:', err);
  process.exit(1);
});
