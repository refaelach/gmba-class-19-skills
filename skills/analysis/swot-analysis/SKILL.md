---
name: swot-analysis
description: "Applies SWOT analysis to evaluate an idea, business, or market from internal and external perspectives. Creates a structured research file and links it back to the source note. MANDATORY TRIGGERS: 'run a SWOT', 'do a SWOT analysis', 'SWOT this', 'SWAT analysis', 'strengths weaknesses opportunities threats'. STRONG TRIGGERS (use when context fits): 'internal and external analysis', 'evaluate this idea', 'what are the strengths and weaknesses of'. Do NOT trigger on: Porter's 5 Forces requests, PESTEL requests, general competitive analysis without explicit SWOT ask."
---

# SWOT Analysis Skill

Applies SWOT to evaluate an idea, business, or market from internal and external perspectives. Produces a structured research note with all four quadrants filled in, strategic move combinations derived from the quadrant intersections, and a back-link added to the source note. Use this when you need a fast but rigorous internal/external snapshot before making a strategic recommendation or writing a case analysis.

## Compatibility

- **Claude Code, Codex (full support):** Reads the base note from disk, creates the output file in `05_Processed/`, and updates the base note with a back-link.
- **ChatGPT, Gemini, Cursor, others (partial):** Cannot write files. Run the analysis and output the full structured Markdown in-chat. Copy it manually to your notes.

## When to use this skill

- You have a base note on a company, idea, or market and need to structure your thinking before writing a case or recommendation.
- A professor or case asks for a strengths/weaknesses/opportunities/threats breakdown.
- You're pressure-testing an idea before committing — you want the honest internal gaps and external risks surfaced.
- You need to derive concrete strategic moves (S+O, W+T, etc.) not just list bullet points.

## When NOT to use this skill

- You need macro-environmental (political, economic, social...) analysis — use `pestel-analysis` instead.
- You need competitive intensity analysis (rivalry, buyer power, supplier power...) — use `porter-5-forces` instead.
- You already have a SWOT and just want to write up the implications — ask directly without invoking this skill.

## How it works

1. **Read the base note** — extract the topic, context, and key points the user has already written.
2. **Fill all four quadrants** — using the guiding questions below, generate 2–4 substantive bullets per quadrant. No filler.
3. **Derive strategic moves** — cross the quadrants (S+O, S+T, W+O, W+T) and produce one concrete recommendation per combination.
4. **Write the output file** — save to `05_Processed/{BaseNoteName} - SWOT Analysis.md`.
5. **Update the base note** — append a `## Research` section (or add to existing one) linking to the new file.

## The 4 Quadrants

|  | **Helpful** | **Harmful** |
|--|-------------|-------------|
| **Internal** | **Strengths** — unique advantages, capabilities, resources | **Weaknesses** — gaps, limitations, vulnerabilities |
| **External** | **Opportunities** — trends, market gaps, timing | **Threats** — competition, regulation, macro risks |

**Guiding questions per quadrant:**
- **Strengths** → What gives this an unfair advantage? What would be hard to replicate?
- **Weaknesses** → What would kill this if not addressed? What do competitors do better?
- **Opportunities** → What external forces make this timely? What's underserved?
- **Threats** → What external forces could make this fail? What's coming that could disrupt it?

## Strategic Moves from SWOT

| Combo | Strategy |
|-------|----------|
| S + O | Build on strengths to capture opportunities |
| S + T | Use strengths to defend against threats |
| W + O | Fix weaknesses to unlock opportunities |
| W + T | Minimize exposure — avoid or exit |

## Example

**User prompt:** `@00_Inbox/Duolingo strategic review.md` — run a SWOT on this.

**What the skill does:** Reads the note, identifies Duolingo as the topic, fills four quadrants based on what's in the note plus applied reasoning, derives four strategic moves, saves the output, and links it back.

**Output (representative chunk):**

```markdown
# SWOT Analysis: Duolingo

## Strengths
- Gamification loop (streaks, XP, leaderboards) drives daily habit formation — DAU retention significantly above category average
- Freemium model with ~8% conversion to paid keeps CAC low and funnel wide
- Brand recognition and App Store dominance in language learning category
- Proprietary learner dataset enables personalized curriculum tuning at scale

## Weaknesses
- Pedagogy criticized for surface fluency without depth — poor at grammar and conversation
- Revenue heavily dependent on Duolingo Plus; ad tier monetization lags
- Limited B2B / enterprise offering despite corporate language training being a large TAM

## Opportunities
- AI-driven conversation practice (e.g., GPT-powered speaking partner) addresses the fluency gap
- Expansion into professional certifications and credentialing (Duolingo English Test is early proof)
- Emerging markets with low smartphone cost and rising middle class

## Threats
- ChatGPT and AI tutors can replicate personalized language coaching without an app
- Google Translate / real-time translation tools reduce motivation to learn at all
- Regulatory pressure in China and other markets around edtech

## Strategic Implications
- **S+O:** Leverage dataset and gamification IP to build the best AI conversation partner — moat competitors can't replicate quickly.
- **S+T:** Use brand and distribution to acquire users before AI tutors reach mainstream — lock in habit before substitution pressure peaks.
- **W+O:** Launch a structured B2B offering targeting corporate language training budgets; fixes revenue concentration risk.
- **W+T:** Deepen curriculum quality (grammar, writing) to justify retention against AI tutors who already do this better.
```

## Inputs the skill expects

- A base note path or pasted content describing the company, idea, or market to analyze.
- Optional: any constraints the user wants foregrounded (e.g., "focus on the European market", "from an investor perspective").

If no base note is provided, ask for it before proceeding.

## Outputs the skill produces

- A new file at `05_Processed/{BaseNoteName} - SWOT Analysis.md` (or in-chat Markdown if filesystem is unavailable).
- The base note updated with a `## Research` back-link to the output file.

## Notes for contributors

- The strategic moves section (S+O, S+T, W+O, W+T) is what separates this from a generic SWOT template — don't remove it.
- If the base note is thin, the skill should ask a clarifying question rather than invent context.
- Tested on Obsidian-style notes with YAML front-matter; the output tags are compatible with Obsidian graph view.

---

**Author:** [soferdani](https://github.com/soferdani)
**Created:** 2026-04-25
**Tested on:** Claude Sonnet 4.6, OpenAI Codex
**Real tasks tested:** Strategic review of an edtech competitor for a Corporate Strategy case assignment; SWOT on a fintech startup idea evaluated in an Entrepreneurship module.

---

> ⚠️ **Reminder before opening your PR:** did you also update the "Available Skills" section in the root [README.md](../../README.md)? If not, do that now. PRs missing this step are rejected.
