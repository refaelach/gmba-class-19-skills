---
name: porter-5-forces
description: "Applies Porter's 5 Forces to analyze competitive intensity and market attractiveness for an industry or market. Creates a structured research file and links it back to the source note. MANDATORY TRIGGERS: 'Porter\\'s 5 Forces', 'five forces analysis', 'run a Porter', 'competitive intensity analysis', 'Porter\\'s framework'. STRONG TRIGGERS (use when context fits): 'how attractive is this market', 'analyze the competitive landscape', 'competitive forces in this industry'. Do NOT trigger on: SWOT requests, PESTEL requests, general competitive analysis without explicit Porter or five forces ask, requests about a single competitor."
---

# Porter's 5 Forces Skill

Applies Michael Porter's framework to analyze competitive intensity and market attractiveness across five structural forces. Each force is rated and explained, and the output synthesizes an overall attractiveness verdict with strategic implications. Use this when you need to evaluate whether a market is worth entering, how much margin pressure an industry faces, or what structural advantages an incumbent has.

## Compatibility

- **Claude Code, Codex (full support):** Reads the base note from disk, creates the output file in `05_Processed/`, and updates the base note with a back-link.
- **ChatGPT, Gemini, Cursor, others (partial):** Cannot write files. Run the analysis and output the full structured Markdown in-chat. Copy it manually to your notes.

## When to use this skill

- A case or professor asks for a competitive analysis or industry structure analysis.
- You are evaluating market entry and need to know how hard it is to compete and how much profit is available.
- You want to understand why margins in an industry are high or low before making a strategy recommendation.
- You are preparing for an exam question that asks about competitive dynamics or industry attractiveness.

## When NOT to use this skill

- You need internal strengths and weaknesses — use `swot-analysis` instead.
- You need macro-environmental forces (political, economic, regulatory...) — use `pestel-analysis` instead.
- The question is about a single competitor or a competitive response — answer directly without the framework.
- The "market" is too early-stage or niche to have identifiable structural forces — the output will be speculative.

## How it works

1. **Read the base note** — extract the market or industry being analyzed.
2. **Analyze each of the 5 forces** — rate it and generate 2–4 concrete observations that explain the rating.
3. **Derive an overall attractiveness verdict** — based on the force ratings, state whether the market is attractive, mixed, or difficult and why.
4. **Write strategic implications** — 2–3 actionable points for a player in this market.
5. **Write the output file** — save to `05_Processed/{BaseNoteName} - Porter 5 Forces.md`.
6. **Update the base note** — append a `## Research` section (or add to existing one) linking to the new file.

## The 5 Forces

| Force | What it measures | High = |
|-------|-----------------|--------|
| **1. Threat of New Entrants** | How easy is it for new competitors to enter? | Erodes margins, increases rivalry |
| **2. Supplier Power** | Can suppliers dictate terms or raise prices? | Cost pressure on industry players |
| **3. Buyer Power** | Can customers demand lower prices or switch easily? | Margin squeeze |
| **4. Threat of Substitutes** | Are there alternative products that meet the same need? | Limits pricing power |
| **5. Competitive Rivalry** | How intense is competition among existing players? | Race to the bottom on price |

**Rating scale:** 🔴 High threat / 🟡 Medium / 🟢 Low threat

**Attractiveness read:**
- Mostly 🟢 → Attractive market (structural profit available)
- Mixed → Selective opportunity (need strong differentiation or niche)
- Mostly 🔴 → Difficult market (margin pressure is structural, not fixable by one player)

## Example

**User prompt:** `@00_Inbox/Cloud services industry.md` — run Porter's 5 Forces on this.

**What the skill does:** Reads the note, identifies the cloud services industry as the topic, fills all five forces with rated observations, derives an attractiveness verdict and strategic implications, saves the output, and links it back.

**Output (representative chunk):**

```markdown
# Porter's 5 Forces: Cloud Services Industry

## 1. Threat of New Entrants 🟢 (Low)
- Capital requirements for building global data center infrastructure are in the tens of billions — near-prohibitive for new entrants
- Hyperscalers (AWS, Azure, GCP) have locked in enterprise customers with proprietary tooling and long-term committed spend contracts
- Network effects in developer ecosystems (certifications, tooling, community) create switching cost moats
- Exception: vertical-specific clouds (e.g., Snowflake in data, Palantir in defense) can enter niches without competing head-on

## 2. Supplier Power 🟡 (Medium)
- GPU and specialized AI accelerator supply is highly concentrated (NVIDIA dominant) — significant leverage during supply crunches
- Commodity server hardware is competitive; less supplier power at the general compute layer
- Energy (hyperscaler data centers are major power consumers) becoming a constraint — utility providers gaining leverage in key markets

## 3. Buyer Power 🟡 (Medium)
- Large enterprise buyers negotiate significant volume discounts and can credibly threaten multi-cloud or repatriation
- SMB and startup segments have low switching costs in theory but high migration friction in practice (data gravity, retraining)
- Multi-cloud rhetoric is common but actual portability is limited by proprietary service lock-in

## 4. Threat of Substitutes 🟢 (Low)
- On-premises infrastructure is the main substitute — viable for regulated industries but declining as default choice
- Edge computing and sovereign cloud are emerging but complementary more than substitutive at this stage
- Open-source self-hosted alternatives exist but require significant operational overhead most buyers avoid

## 5. Competitive Rivalry 🟡 (Medium)
- Top three (AWS, Azure, GCP) compete aggressively on price and feature velocity but have stabilized market share
- Price wars moderated by differentiation (Azure wins on Microsoft integration, GCP on data/AI, AWS on breadth)
- Tier-2 players (Oracle Cloud, IBM, Alibaba) compete on price and vertical specialization but not overall capability

## Overall Assessment
**Attractive market with high structural barriers.** The combination of low new entrant threat and low substitute threat creates durable profit pools for incumbents. Rivalry is real but disciplined — players have differentiated enough to avoid pure price competition. The primary risks are supplier concentration in AI chips and rising buyer sophistication enabling harder negotiations. A new entrant must find a vertical or capability wedge (AI inference, sovereign compliance, industry-specific data) rather than compete on general infrastructure.

**Strategic implications:**
1. Incumbents should continue investing in proprietary tooling and managed services to deepen switching costs before multi-cloud portability improves.
2. New entrants should target regulated verticals (financial services, healthcare, government) where compliance requirements create a wedge AWS/Azure/GCP are slow to fill.
3. Watch GPU supply concentration — it is the single structural vulnerability for all hyperscalers simultaneously.
```

## Inputs the skill expects

- A base note path or pasted content describing the market or industry to analyze.
- Optional: a specific geographic lens or time horizon.

If no base note is provided, ask for it before proceeding.

## Outputs the skill produces

- A new file at `05_Processed/{BaseNoteName} - Porter 5 Forces.md` (or in-chat Markdown if filesystem is unavailable).
- The base note updated with a `## Research` back-link to the output file.

## Notes for contributors

- The overall attractiveness verdict is what students actually need for case write-ups — don't bury it at the end of bullet lists.
- Porter's 5 Forces is often confused with a competitive landscape (list of competitors). The skill should steer away from that — it's about structural forces, not individual players.
- Chains naturally after PESTEL (macro context first, then industry structure) and before SWOT (industry context then internal assessment).

---

**Author:** [soferdani](https://github.com/soferdani)
**Created:** 2026-04-25
**Tested on:** Claude Sonnet 4.6, OpenAI Codex
**Real tasks tested:** Competitive intensity analysis of the cloud services industry for a Corporate Strategy exam prep session; 5 Forces on the global streaming market for a strategy case write-up.

---

> ⚠️ **Reminder before opening your PR:** did you also update the "Available Skills" section in the root [README.md](../../README.md)? If not, do that now. PRs missing this step are rejected.
