---
name: pestel-analysis
description: "Applies PESTEL macro-environmental analysis to a base note (idea, market, or business) across six dimensions: Political, Economic, Social, Technological, Environmental, Legal. Creates a structured research file and links it back to the source note. MANDATORY TRIGGERS: 'run a PESTEL', 'PESTLE analysis', 'do a PESTEL', 'macro-environmental analysis', 'political economic social technological'. STRONG TRIGGERS (use when context fits): 'what are the macro forces', 'analyze the external environment', 'macro factors affecting'. Do NOT trigger on: SWOT requests, Porter's 5 Forces requests, internal analysis, competitive landscape analysis."
---

# PESTEL Analysis Skill

Applies the PESTEL framework to systematically analyze the six macro-environmental forces affecting a business, market, or idea. Each dimension is rated and supported with concrete observations, then synthesized into strategic implications. Use this when you need to understand the external landscape before writing a market entry recommendation, a strategy paper, or a case analysis that requires macro context.

## Compatibility

- **Claude Code, Codex (full support):** Reads the base note from disk, creates the output file in `05_Processed/`, and updates the base note with a back-link.
- **ChatGPT, Gemini, Cursor, others (partial):** Cannot write files. Run the analysis and output the full structured Markdown in-chat. Copy it manually to your notes.

## When to use this skill

- A case or assignment asks for a macro-environmental or external environment analysis.
- You are evaluating market entry and need to understand country- or industry-level forces before making a recommendation.
- You want to identify which external factors are favorable, neutral, or risky before running a SWOT or Porter's 5 Forces.
- A professor asks for the "context" or "environmental scan" section of a strategy paper.

## When NOT to use this skill

- You need internal strengths and weaknesses — use `swot-analysis` instead.
- You need competitive intensity (rivalry, buyer power, supplier power) — use `porter-5-forces` instead.
- The question is about a single factor (e.g., "what's the regulatory risk?") — answer directly without running the full framework.

## How it works

1. **Read the base note** — extract the topic, market, and any context the user has written.
2. **Analyze all six dimensions** — for each, assign a rating and generate 2–4 concrete observations grounded in the topic.
3. **Write a summary and strategic implications** — 2–3 sentences on the overall macro picture and what it means for the strategy.
4. **Write the output file** — save to `05_Processed/{BaseNoteName} - PESTEL Analysis.md`.
5. **Update the base note** — append a `## Research` section (or add to existing one) linking to the new file.

## The 6 Dimensions

| Letter | Factor | Key Questions |
|--------|--------|---------------|
| **P** | Political | Government stability, policy direction, trade restrictions, geopolitical risk |
| **E** | Economic | Growth rates, inflation, unemployment, consumer spending power, FX exposure |
| **S** | Social | Demographics, cultural attitudes, lifestyle trends, education levels |
| **T** | Technological | Innovation pace, automation pressure, digital infrastructure, R&D intensity |
| **E** | Environmental | Climate risk, sustainability regulation, carbon pressure, supply chain exposure |
| **L** | Legal | Employment law, IP protection, industry-specific regulation, data privacy |

**Rating scale:** 🟢 Favorable / 🟡 Neutral / 🔴 Risk

## Example

**User prompt:** `@00_Inbox/EV market Europe.md` — run a PESTEL on this.

**What the skill does:** Reads the note, identifies European EV market as the topic, fills all six dimensions with rated observations, synthesizes strategic implications, saves the output, and links it back.

**Output (representative chunk):**

```markdown
# PESTEL Analysis: European Electric Vehicle Market

## Political 🟢
- EU Green Deal and Fit for 55 package mandate 55% CO2 reduction for new cars by 2030 — strong regulatory tailwind for EV adoption
- Several member states offer purchase subsidies (Germany, France, Netherlands) reducing price gap to ICE
- Risk: political backlash in upcoming EU elections could soften enforcement timelines

## Economic 🟡
- Energy price volatility post-2022 cuts both ways: raises EV running cost appeal but also increases battery production costs
- Inflation squeezed consumer discretionary spending — premium EV segment more resilient than mass market
- EUR depreciation vs. USD and CNY raises import cost of battery cells for European OEMs

## Social 🟢
- Strong climate consciousness among 18–35 demographic in Northern and Western Europe
- Urban consumers increasingly comfortable with charging-at-home model; range anxiety declining in surveys
- Southern and Eastern Europe lag in adoption — different income levels and infrastructure maturity

## Technological 🟢
- Solid-state battery R&D accelerating; Toyota and Samsung targets 2027–2028 — could reset range and cost benchmarks
- China-based CATL and BYD have significant cost advantages in LFP cell chemistry
- Software-defined vehicle trend shifts value from hardware to OTA updates and in-car platforms

## Environmental 🟡
- Lifecycle emissions of EVs remain positive vs. ICE even on coal-heavy grids; improves as grid decarbonizes
- Battery mining (lithium, cobalt) under regulatory scrutiny for supply chain ESG compliance
- Circular economy regulation incoming for battery recycling — cost risk for OEMs without closed-loop supply chains

## Legal 🔴
- 2035 ICE ban confirmed in EU but legal challenge from Italy and Germany secured a synthetic fuel carve-out — creates uncertainty
- GDPR and incoming EU AI Act affect connected vehicle data handling — compliance cost rising
- Anti-dumping tariffs on Chinese EVs (up to 38%) create pricing floor but also retaliatory risk for European OEMs selling in China

## Summary & Implications
The European EV market offers a structurally favorable macro environment driven by binding regulation and strong climate policy, but economic headwinds and legal uncertainty around the 2035 mandate introduce timing risk. Entrants with cost-competitive battery supply chains and strong software platforms are best positioned. Companies exposed to Chinese retaliation tariffs or lacking ESG-compliant battery sourcing face material downside.
```

## Inputs the skill expects

- A base note path or pasted content describing the market, industry, or business to analyze.
- Optional: a specific geography or time horizon to focus on.

If no base note is provided, ask for it before proceeding.

## Outputs the skill produces

- A new file at `05_Processed/{BaseNoteName} - PESTEL Analysis.md` (or in-chat Markdown if filesystem is unavailable).
- The base note updated with a `## Research` back-link to the output file.

## Notes for contributors

- PESTEL works best as a precursor to SWOT or Porter's 5 Forces — the three skills can chain naturally.
- The rating (🟢/🟡/🔴) per dimension is load-bearing: it lets the user scan the output in seconds. Keep it.
- If the base note is thin on context, ask for geography and time horizon before running — these two inputs drive most of the analysis quality.

---

**Author:** [soferdani](https://github.com/soferdani)
**Created:** 2026-04-25
**Tested on:** Claude Sonnet 4.6, OpenAI Codex
**Real tasks tested:** Macro-environmental scan of the European EV market for a Global Strategy case; PESTEL on the Southeast Asian digital payments sector for a market entry assignment.

---

> ⚠️ **Reminder before opening your PR:** did you also update the "Available Skills" section in the root [README.md](../../README.md)? If not, do that now. PRs missing this step are rejected.
