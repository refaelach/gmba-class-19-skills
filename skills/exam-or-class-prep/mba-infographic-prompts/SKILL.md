---
name: mba-infographic-prompts
description: "Generate a ready-to-paste GPT image prompt for an MBA classroom infographic — formula, framework, process, comparison, study sheet, or concept map. Output is a polished prompt formatted per the OpenAI gpt-image-2 prompting guide plus a fresh ChatGPT link to paste it into; this skill produces text, not images. MANDATORY TRIGGERS: 'make me an infographic', 'generate an infographic prompt', 'turn this into an infographic', 'create a cheat sheet for', 'make a study sheet on', 'visualize this framework', 'design a concept map for'. STRONG TRIGGERS (when the topic is business / management / finance / stats / strategy): 'make me a visual for X', 'I need a diagram of', 'how should I picture this', 'turn this PDF into a visual', 'illustrate this concept', 'make a poster for class about', 'visualize this book / chapter / framework'. Do NOT trigger on: requests to actually render or generate the image (this skill produces a prompt only — the user pastes it into ChatGPT), requests for non-MBA / non-business visuals (personal art, party invites, kids' projects), requests for live data charts from a spreadsheet (use a charting tool), requests for multi-slide decks (this is for single-frame infographics). DO trigger when the user wants a polished, deliberately-shaped prompt for a static MBA-context infographic that they will paste into ChatGPT — even on casual phrasing if the topic is clearly business / management / finance / stats."
---

# MBA Infographic Prompt Generator

Turns an MBA topic into a ready-to-paste prompt for GPT image generation (gpt-image-2 via ChatGPT). The skill produces text, not images — the user pastes the prompt into a fresh ChatGPT chat. Built around six visual archetypes the skill picks from based on the topic.

## Compatibility

The skill loads `references/archetypes.md` from disk at runtime to get the full archetype style language. This affects portability:

- **Full support (Claude / Claude Code, OpenAI Codex, Gemini CLI, Cursor, and any tool that natively loads bundled skill resources):** Drop the skill folder in the tool's skills directory and it works as designed.
- **Partial support (ChatGPT Custom GPTs, Gemini Gems, prompt-only setups):** The bundled `references/archetypes.md` is not auto-loaded. Either paste both `SKILL.md` and `references/archetypes.md` into the system prompt, or accept that the archetype summaries inside `SKILL.md` alone will produce slightly less polished prompts.

## When to use this skill

- A student or instructor wants a study sheet, cheat sheet, framework visual, concept map, or process diagram for an MBA topic and would paste the prompt into ChatGPT.
- The user has uploaded a PDF, article, or book chapter and wants an infographic of its central framework.
- The topic is business, management, finance, accounting, statistics, or strategy and benefits from a visual representation.
- The user wants a polished, deliberately-shaped prompt — not a quick one-liner — because they care about the rendered output.

## When NOT to use this skill

- The user wants the actual image rendered — this skill produces prompts only.
- The topic is non-MBA / non-business — the archetype language is tuned for business content.
- The user wants a live chart from a spreadsheet — use a data-viz tool.
- The user wants a multi-slide deck — this is for single-frame infographics.
- The user already has the exact prompt they want — just point them at ChatGPT.

## Workflow

Follow these steps in order. Don't skip steps even if the user's request seems to imply you should. The whole point of this skill is the structured handoff.

### Step 1: Receive the topic

The user gives a topic. Two modes are supported:

**Mode A — direct topic**: the user names a concept, formula, or framework directly. Examples:
- "WACC formula"
- "Porter's Five Forces"
- "Chi-square test procedure"
- "BCG growth-share matrix"
- "How a letter of credit works"

**Mode B — source document**: the user uploads a PDF, article, book chapter, or pastes long-form content and asks for an infographic. In this case, before suggesting an archetype, extract the framework first:

1. Identify the title and author of the source
2. Find the most teachable framework, model, or concept in the source — usually the one the source is most known for (e.g., "the five legs" in Starfish and Spider, "the seven habits" in Covey, "the four disciplines" in 4DX)
3. If multiple framework candidates exist, briefly name the top 2 and let the user pick which one to visualize
4. Only then move to Step 2 (archetype suggestion)

If the topic (in either mode) is too vague to pick an archetype (e.g., "make me an infographic about finance"), ask one clarifying question to pin it down. Don't ask more than one — pick the most important gap and move on.

### Step 2: Suggest an archetype

Match the topic to ONE of the six archetypes below. Briefly explain your choice in 1–2 sentences and let the user override.

| Archetype | Use when the topic is... | Visual signature |
|---|---|---|
| **cheat-sheet** | A reference card with many discrete items, calculator/tool steps, formula collections | Dense grid of color-coded cells, small text, tabular layout |
| **narrative-collage** | A multi-concept framework with a journey or progression feel | Illustrated metaphors (rockets, mountains, paths), flowing colors, numbered concepts with explanations |
| **quadrant-framework** | A 2x2 matrix or four-type taxonomy (DISC, BCG, Ansoff, SWOT, Johari) | Four colored circles or boxes, character/icon per quadrant, supporting concepts below |
| **comparison-evidence** | A topic with opposing forces, contrasting methods, or before/after evidence | Two-column comparison cards in pastel tones, mixed icons and stats, evidence panel at bottom |
| **mind-map** | A central concept with many branching sub-points (rules, principles, components) | Radial layout, central node, watercolor/hand-drawn aesthetic, branching boxes with supporting illustrations |
| **procedural-flowchart** | A sequential procedure with formulas, decision points, or rigid steps (statistical tests, decision trees, calculation procedures) | Clean stacked boxes connected by arrows, math notation rendered properly, minimal decoration |

Phrase it conversationally, e.g.:

> For "Porter's Five Forces" I'd suggest the **quadrant-framework** archetype — actually no, this is five forces not four, so **mind-map** with the industry at center and five branches is a better fit. Want to go with that, or switch to one of the others?

When in genuine doubt between two archetypes, name both and recommend one.

### Step 3: Ask for aspect ratio

Always ask. Don't infer. Present three options:

- **Landscape (1536x1024)** — slides, presentation embeds
- **Portrait (1024x1536)** — handouts, LinkedIn, study sheets
- **Square (1024x1024)** — social media, thumbnails

Let the user pick. If they hesitate, recommend portrait for cheat-sheet and mind-map, landscape for procedural-flowchart and comparison-evidence, portrait for narrative-collage, square or landscape for quadrant-framework.

**Sanity check after they pick**: if the requested aspect ratio fights the content shape, flag it before generating the prompt. Examples of mismatches:

- Landscape requested for a comparison-evidence with 4+ stacked items per column → content wants portrait, model will likely render portrait anyway
- Portrait requested for a procedural-flowchart with side-by-side branches → content wants landscape
- Square requested for a cheat-sheet with 12+ cells → content wants portrait or landscape

When you spot a mismatch, say something brief like: "Heads up — with N items per column this will likely look better in portrait, and gpt-image-2 may auto-rotate even if we request landscape. Want to switch, or stick with landscape?" Respect the user's final choice either way.

### Step 4: Build the prompt

Read `references/archetypes.md` to get the full style template for the chosen archetype. Then assemble the prompt using this structure (taken from the OpenAI gpt-image-2 prompting guide):

```
[OPENING LINE: declare the artifact type and audience]
Create a [archetype-style descriptor] titled "[TITLE IN QUOTES]" for [audience].

[CONTENT BLOCK: the actual MBA content to depict]
[List components, formulas, labels, relationships explicitly. Spell formulas in plain text. Quote any literal text that must appear verbatim.]

[STYLE BLOCK: the archetype's visual signature, copied/adapted from references/archetypes.md]

[LAYOUT BLOCK: how the elements should be arranged]

[TYPOGRAPHY BLOCK: font style, hierarchy, readability constraints]

[CONSTRAINTS BLOCK: what must NOT appear]
- No watermarks
- No logos or trademarks
- No extra decorative text beyond what is specified
- [Any topic-specific exclusions, e.g. "no cartoon mascots" for serious finance]

[QUALITY BLOCK]
Render at high quality. Ensure all text is legible and all formulas are mathematically correct.
```

Key rules when building the prompt (from the OpenAI guide):

1. **Literal text in quotes**. Anything that must appear verbatim in the image goes inside quotation marks. Example: `Title: "Weighted Average Cost of Capital"`.
2. **Formulas in plain readable form**. Write `WACC = (E/V) × Re + (D/V) × Rd × (1 − Tc)` in the prompt. The model renders the math notation. Don't use LaTeX — describe it in plain text.
3. **List ALL labels explicitly**. If the infographic should label five forces, name all five in the prompt. Don't assume the model will infer them.
4. **State invariants**. "Do not add forces beyond the five listed." "Do not invent statistics that are not provided."
5. **Spell out tricky terms**. For abbreviations the model might miss (CAPM, EBITDA, FCFE), spell them in full at least once in the prompt.
6. **Quality cue**. Include "high quality, legible text, accurate formulas" near the end.
7. **The stranger test**. Every label, tag, and short phrase in the infographic must be readable by someone who has NOT read the source material. If a label is jargon ("Connector", "Springboard", "Norms not rules") it will be opaque to the audience. Expand each tag to a 4–8 word self-contained phrase ("Connects people across circles", "Springboard for the new movement", "Run on norms, not rules"). Always include this rule near the top of the prompt: "the audience has not necessarily read the source material, so every label must be self-explanatory."
8. **Definition lines inside primary labels**. For mind-map and quadrant-framework archetypes, the primary branch/quadrant labels should each carry a one-sentence definition rendered in slightly smaller text inside the same colored box. Don't rely on supporting tags alone to define the concept.
9. **Distinct illustrations per slot**. When a prompt specifies multiple icons or vignettes, give each one a different visual subject. Don't reuse the same metaphor (e.g., a starfish-with-question-mark) in two different slots — the result will look repetitive. Spell out a unique illustration for each slot.

### Step 5: Output

Present the result in this exact format:

> **Archetype**: [chosen archetype]
> **Aspect ratio**: [chosen ratio]
>
> **Prompt to paste into ChatGPT:**
>
> ````
> [the full prompt, ready to copy]
> ````
>
> **Open ChatGPT**: https://chatgpt.com/
>
> **How to use it**: paste the prompt into a new ChatGPT chat. ChatGPT will route to gpt-image-2 automatically when it detects an image-generation request. If the first render isn't quite right, iterate with single-change follow-ups (e.g., "make the boxes larger", "use blue instead of green for the second branch") rather than rewriting the whole prompt.

CRITICAL output formatting rules:

- **The prompt MUST be wrapped in a single fenced code block** (triple backticks) so the rendering interface gives the user a one-click copy button. This is non-negotiable.
- **Do NOT use markdown formatting INSIDE the prompt body** (no `**bold**`, no `*italic*`, no headers, no bullet markers like `-` or `*` at line starts unless they're part of the literal content). Markdown inside the code block would be pasted into ChatGPT verbatim and confuse the model.
- The prompt should be plain text with line breaks. Use ALL CAPS or quotation marks for emphasis instead of markdown bold.
- If presenting two or more prompts in the same response (e.g., two archetype options), wrap each one in its own separate code block. Do not concatenate them.

Use the `https://chatgpt.com/` URL exactly as shown. Don't add query parameters; let the user start a fresh chat from the homepage.

### Step 6: Offer a refinement loop (optional)

After delivering, offer briefly: "Want me to tweak anything before you paste it — different style, more/fewer labels, different layout?" Don't be pushy about it; some users will paste and go.

## Style anchors (don't lose these)

The six archetypes were derived from real reference infographics. Their distinguishing details are in `references/archetypes.md`. Always read that file before building the prompt — the archetype descriptions in this SKILL.md are summaries; the reference file has the actual style language to drop into prompts.

## Common pitfalls to avoid

- **Don't generate the image yourself.** This skill produces prompts only. Don't call image-generation tools or visualize tool. The output is text.
- **Don't paraphrase formulas into prose.** "WACC is calculated as the weighted sum of cost of equity and after-tax cost of debt" is worse than the literal formula. Always include the formula in symbolic form.
- **Don't pad the prompt.** OpenAI's guide warns against overloading. Aim for prompts in the 200–400 word range. Dense layouts (cheat-sheet, mind-map) can go longer.
- **Don't add "photorealistic" to infographic prompts.** That's for the photo-realism use case in the OpenAI guide. Infographics are flat illustration / editorial style.
- **Don't ask for both portrait and landscape "just in case".** Pick one per generation. The user can re-run with a different ratio if needed.
- **Don't suggest the user use the OpenAI API directly.** The user's workflow is ChatGPT in a browser. Keep it that way.

## Example

**User:** "I need an infographic for the DuPont identity for my finance class."

**You:** Suggest **procedural-flowchart** for clean decomposition (mind-map as an alternative). Ask for aspect ratio.

**User:** "flowchart, landscape."

**You:** Read `references/archetypes.md` for the flowchart style language, then output the full prompt as a single fenced code block: ROE = Net Profit Margin × Asset Turnover × Equity Multiplier, each term defined inline, arrows showing the multiplication, formula rendered with proper `×` symbols, one-sentence definitions under each step, the no-watermark/no-logo constraints block, and the quality cue. Then the ChatGPT link to paste it into.

**Mode B (source document):** If the user uploads a PDF, identify the source's central framework first (e.g. *The Starfish and the Spider* → "Five Legs of a Decentralized Organization" or the spider/starfish metaphor), name the top two candidates, let the user pick one, then proceed.

## Inputs the skill expects

- A topic, formula, framework, or concept (Mode A: direct topic), OR
- A source document — PDF, article, book chapter, or pasted long-form content — that the user wants visualized (Mode B).
- Optionally: an archetype preference if the user already knows which visual style they want. If silent, the skill suggests one and lets the user override.
- Optionally: an aspect ratio. The skill always asks if not provided.

## Outputs the skill produces

- A single ready-to-paste prompt wrapped in a fenced code block (so the rendering interface gives the user a one-click copy button).
- A URL to a fresh ChatGPT chat (`https://chatgpt.com/`) where the user pastes the prompt.
- A short label line above the prompt stating the chosen archetype and aspect ratio.

The skill does **not** render the image itself. The deliverable is text — the user pastes the prompt into ChatGPT to get the visual.

## Notes for contributors

- The "stranger test" rule (every label, tag, and short phrase in the rendered infographic must be readable by someone who has not read the source) is the single biggest quality lever. If a user complains that the rendered image has opaque jargon, the fix is almost always tightening this rule in the prompt.
- The "no markdown inside the prompt body" rule exists because users paste verbatim — markdown bullets and bold leak into ChatGPT and confuse gpt-image-2. Don't relax it.
- The bundled `references/archetypes.md` is intentional progressive disclosure — keep archetype-specific style language there, not in `SKILL.md`. New archetypes go in the references file with the same five-part structure (when to use / visual signature / style block / layout block / watch out for).
- If new archetypes are added, also add the matching row to the archetype table in Step 2 of the Workflow above so the suggester knows about them.

---

**Author:** Refael (Rafa) Lachmish ([@refaelach](https://github.com/refaelach))
**Created:** 2026-04-25
**Tested on:** Claude (Opus 4.7)
**Real tasks tested:** Generated cheat-sheet prompts for WACC and DuPont; mind-map prompt from a PDF of *The Starfish and the Spider*.
