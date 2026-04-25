# Infographic Archetypes — Style Reference

Six archetypes covering the visual range of MBA classroom infographics. Each entry below gives:
1. **When to use it** — the topic shapes that fit
2. **Visual signature** — the distinguishing aesthetic
3. **Style block** — the exact language to drop into the GPT prompt
4. **Layout block** — arrangement guidance
5. **Watch out for** — common failure modes for this archetype

Read the archetype the user picked (or that you suggested) in full before building the prompt.

---

## 1. cheat-sheet

**When to use it**: Reference cards with many discrete items packed into one view. Calculator key-press procedures, formula collections, shortcut tables, "everything you need to know" study sheets, function reference cards.

**Visual signature**: Dense grid of color-coded cells, each cell a small self-contained block. Tight typography. Banner header at top with title and key/legend. Small device or icon illustration in a corner. Functional, not decorative.

**Style block** (drop into the prompt):
```
Style: dense classroom cheat-sheet poster, flat editorial design, color-coded cells on a deep navy or dark teal background. Each topic occupies its own bordered cell with a colored title bar (rotate through warm yellows, oranges, greens, blues, teals so adjacent cells are visually distinct). Use small clean sans-serif typography (think Inter or similar) sized for dense reference content. Include a key/legend strip near the top that explains color coding. Add small monochrome icons or device illustrations in cell corners only where they aid comprehension; do not over-decorate.
```

**Layout block**:
```
Layout: full-bleed banner header at top with the title in large bold text, plus a one-line legend strip beneath it. Below the header, arrange content as a 4–5 column grid of equal-width cells, each cell roughly 1/15 to 1/20 of the canvas. Number cells sequentially (1, 2, 3...) with the number in the colored title bar. Reserve a "Quick Tips" or "Common Keys" cell at the bottom-right. Keep generous internal padding inside cells but tight gutters between them.
```

**Watch out for**:
- Too few cells looks empty; aim for 12–15 cells minimum
- If the topic has numerical examples, include them verbatim in the prompt — the model will respect concrete numbers better than placeholders
- Specify "small but legible text" — without that, the model often makes the text too big and the cells look sparse

---

## 2. narrative-collage

**When to use it**: Multi-concept frameworks that have a journey, progression, or "how it all fits together" feel. Business models, change-management frameworks, leadership models, learning-and-development frameworks. Topics that benefit from metaphor.

**Visual signature**: Illustrated metaphors layered over a flowing colored background (gradient ribbons, painted strokes). Numbered concept cards ("#1 Focus & Commit", "#2 Align & Connect"). Small character illustrations and icons interspersed. Editorial and warm, not corporate.

**Style block** (drop into the prompt):
```
Style: editorial illustrated infographic in the style of a NotebookLM or modern explainer guide. Soft painted background with flowing color ribbons (warm pastels: peach, lavender, teal, sky blue) that suggest a journey. Mixed illustration: stylized scenes with small character figures, light metaphor objects (rocket, mountain, compass, path with milestone pins), all rendered in a friendly flat-vector look with subtle shading. Headline serif or chunky sans-serif title in deep navy. Body text in clean sans-serif, dark grey. Numbered concept callouts use a bold "#1", "#2" prefix in a contrasting accent color.
```

**Layout block**:
```
Layout: title in the upper-left or top-center, large and confident. Three to five concept cards arranged across the canvas, each with: a numbered prefix, a short bold heading (3–6 words), and 1–2 sentences of body text below. Weave a continuous flowing ribbon or painted band that physically connects the concept cards in narrative order. Include 2–4 small illustrated vignettes (characters, metaphor objects) placed between cards to break up the text grid. Reserve a small panel on one side for a supporting comparison table or callout if the content needs it.
```

**Watch out for**:
- Don't ask for too many concept cards (cap at 5); collage falls apart with more
- Specify the metaphor explicitly in the prompt ("rocket launching from mountain", "compass and map") — leaving it open invites generic stock imagery
- Always include "no overlapping text", "do not let illustration cover the labels"

---

## 3. quadrant-framework

**When to use it**: Any 2x2 matrix or four-type taxonomy. DISC, BCG growth-share matrix, Ansoff matrix, Johari window, Eisenhower matrix, SWOT, Boston Consulting quadrants. Also useful for four-stage models even when not strictly orthogonal.

**Visual signature**: Four large colored circles or rounded squares, each representing one quadrant. A character illustration or icon inside each, embodying that quadrant's archetype. Quadrant labels (RED / DOMINANT, YELLOW / INSPIRING) in large type at the four corners. Supporting concepts in a strip below the main quadrants.

**Style block** (drop into the prompt):
```
Style: clean educational quadrant infographic. Four large overlapping or adjacent circles in distinct primary-but-muted colors (one red, one yellow, one green, one blue is the canonical scheme; substitute when the topic dictates). Each circle contains a stylized flat-illustration character or scene that embodies the quadrant's archetype, plus a 3-bullet trait list. The four quadrant labels appear in large bold sans-serif at the four outer corners of the cluster, color-matched to the circle. Background is off-white or very pale grey with subtle hand-drawn squiggle accents. Below the main quadrant cluster, add a horizontal strip of 2–3 supporting concept cards with small icons.
```

**Layout block**:
```
Layout: title and subtitle stacked at the top center. The four-circle cluster occupies the upper two-thirds of the canvas, arranged in a 2x2 with circles slightly overlapping at the center to suggest a Venn-style relationship. Color labels at the four outer corners. Supporting strip across the bottom third, divided into 2–3 equal panels, each with a small icon, short heading, and one-sentence explanation. Optionally add a single closing insight line at the very bottom in italic.
```

**Watch out for**:
- The model sometimes makes the four circles unequal sizes; specify "four circles of equal size, arranged in a balanced 2x2"
- Specify gender/profession diversity for the character illustrations if relevant — leaving it open often produces homogeneous figures
- For finance frameworks (BCG, Ansoff) you usually want boxes not circles, and you want axis labels on the X and Y axes — adapt the style block accordingly

---

## 4. comparison-evidence

**When to use it**: Topics with two opposing approaches, methods, or schools of thought, especially when you want to show evidence at the bottom. Old vs new, theory A vs theory B, before/after, traditional vs novel. Useful for behavioral science, marketing, and management research topics.

**Visual signature**: Two large pastel-colored content cards side by side, each with its own header, several sub-concepts, and small icons. A third "evidence" panel spans the bottom showing supporting stats with bold percentages and trend arrows. Soft, modern, slightly hand-drawn aesthetic.

**Style block** (drop into the prompt):
```
Style: modern editorial infographic with a soft pastel palette. Two main content panels rendered as large rounded rectangles in contrasting muted colors (e.g., warm coral and teal). Inside each panel: a panel title with small accent icon, then 2–4 sub-concept blocks each with a small flat illustration (book stack, brain, shield, building blocks, etc.), a bold mini-heading, and 1–2 sentences of body text. A third panel at the bottom in a third color (lavender or pale yellow) presenting evidence: bold large percentages with directional arrows (up/down) and a one-line caption per stat. Hand-drawn, friendly feel with subtle texture; not corporate.
```

**Layout block**:
```
Layout: title and subtitle at top center. Optional context-summary banner just below the title in a fourth pastel color, containing 2–3 sentences of orientation. Main body split into two vertical columns of equal width, each column a single tall rounded rectangle with the panel header and sub-concepts stacked inside. Bottom third reserved for the evidence panel, full-width, divided into 3 equal sub-cells each with one stat. Generous white space between panels.
```

**Watch out for**:
- The model tends to invent statistics if you leave the evidence panel underspecified — provide the actual numbers in the prompt or instruct "leave evidence panel blank with placeholder labels"
- Keep the two main panels visually balanced; if one side has more content, the layout breaks. Tell the prompt explicitly: "both columns should appear equally weighted"
- For polarizing topics, include "neutral, even-handed framing — do not visually favor one side"

---

## 5. mind-map

**When to use it**: A central concept with many branching sub-points. Lists of rules or principles (e.g., "10 rules of X"), components of a system, types/categories radiating from a parent concept. Also good for visualizing books or frameworks with named chapters.

**Visual signature**: Central node (often illustrated as an open book, brain, or hub with the topic title). 6–10 labeled boxes branching outward via curved connector lines. Each branch has 2–4 supporting concept tags floating around it. Watercolor or hand-drawn aesthetic with light texture.

**Style block** (drop into the prompt):
```
Style: hand-drawn mind-map illustration with a soft watercolor / colored-pencil aesthetic. Off-white background with subtle paper texture. Central illustrated node depicting the topic visually (e.g., open book, brain, magnifying glass, hub). Branching concept boxes are pale yellow rectangles with thin dark borders and bold sans-serif labels. Connector lines are thin dark organic curves, not rigid straight lines. Each branch is surrounded by 2–4 small floating tag-shaped supporting concept labels in pale blue, pink, or green. Small illustrated vignettes (cityscape, characters, lab equipment, items relevant to that branch) appear next to the branches.
```

**Layout block**:
```
Layout: central node positioned at the geometric center of the canvas, occupying roughly 15–20% of the canvas area. 6–10 branch boxes arrayed radially around the center, with even angular spacing. Each branch box sits at roughly equal distance from center. Supporting tags cluster around their parent branch in a loose orbit. Small vignette illustrations placed in the gaps between branches to fill negative space. Title is implicit in the central node — no separate header bar needed.
```

**Watch out for**:
- Specify the exact branch count; "10 rules" needs "exactly 10 branch boxes". Otherwise the model picks a number.
- Name all branches verbatim in the prompt. Mind maps live or die on the specificity of the labels.
- **Add a one-sentence definition inside each primary branch box** (in slightly smaller text below the bold label). Don't rely on the supporting tags alone to define the concept. A reader who hasn't seen the source must understand each branch from the box content alone.
- **Supporting tags must pass the stranger test**: each tag is a 4–8 word self-contained phrase, not a single jargon word. Bad: "Connector". Good: "Connects people across circles". Bad: "Springboard". Good: "Springboard for the new movement".
- **Each vignette illustration must depict a different visual subject.** If the central node is a starfish, none of the vignettes should also be a starfish. Spell out a unique illustration for each branch slot.
- If the topic has an author or source (e.g., "by Tim Harford"), put that as a subtitle inside the central node
- Specify "branches should not overlap" and "all labels should be readable without cropping"

---

## 6. procedural-flowchart

**When to use it**: Sequential procedures with rigid steps. Statistical test procedures, decision processes, calculation workflows, audit checklists, troubleshooting guides. Anything where order matters and the math/logic must be exact.

**Visual signature**: Clean rounded rectangles stacked vertically (or arranged in a tree), connected by chunky downward-pointing arrows. Each box has a numbered step title in bold and supporting detail (formulas, conditions) below. Math notation rendered properly with proper Greek letters, subscripts, and superscripts. Minimal decoration; functional aesthetic.

**Style block** (drop into the prompt):
```
Style: clean procedural flowchart in the style of a textbook or formal academic handout. Pale blue or pale grey rounded rectangles with a slightly darker blue border, stacked vertically (or branching where logic requires). Chunky filled-arrow connectors point from each box to the next, in a medium grey tone. Step titles in bold serif or bold sans-serif (e.g., dark navy). Body content inside each box uses regular weight serif typography (Times-like) to render math notation cleanly, with proper subscripts, superscripts, Greek letters, and summation symbols. Background is white or very pale tint. No illustrations, no characters, no decorative elements.
```

**Layout block**:
```
Layout: title at top in large bold serif. Below it, 4–6 procedure boxes arranged vertically, each box wider than tall, with chunky arrows between consecutive boxes. Each box internal layout: numbered step heading (e.g., "1. State Hypotheses") in bold at the top, then the procedure detail below, then any formula on its own line centered. Boxes are roughly equal width across the chart. Arrows are aligned vertically down the centerline. Generous margin around the entire chart.
```

**Watch out for**:
- Math notation is the make-or-break for this archetype. Spell out every symbol in the prompt: "use the Greek letter chi-squared (χ²) not 'X squared'", "use proper subscripts E_ij rendered with the i and j as actual subscripts"
- For formulas with fractions, describe the fraction structure: "Expected frequency = (Row Total × Column Total) / Grand Total, rendered as a proper horizontal-bar fraction not with a forward slash"
- Tell the prompt explicitly: "no decorative elements, no characters, no icons, no background patterns"
- Verify the procedure logic in the prompt before sending — the model will faithfully render whatever sequence you describe, including any errors

---

## Cross-archetype prompt scaffolding

Regardless of archetype, every prompt should open with this audience preamble:

```
The audience is MBA students who have NOT necessarily read the source material, so every label, tag, and short phrase must be self-explanatory on its own.
```

Regardless of archetype, every prompt should end with this constraints block (adapt as needed):

```
Constraints:
- All text must be legible at the chosen output size
- Render every label, number, and formula exactly as written in this prompt
- Do not add labels, steps, or content beyond what is specified
- Every label, tag, and short phrase must be readable without prior knowledge of the source — no insider jargon
- Each illustration or vignette in the infographic must depict a different visual subject — do not reuse the same metaphor in multiple slots
- No watermarks, no logos, no trademarks
- No stock-photo treatments, no generic clip art
- Keep the visual hierarchy clean and scannable
```

And every prompt should end with the quality cue:

```
Render at high quality with crisp text, accurate formulas, and clean composition.
```
