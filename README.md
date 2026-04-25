# GMBA Class 19 Skills

A curated, open-source collection of AI Skills built by and for GMBA Class 19.

The goal is simple: turn the things that actually help us do better work, write better papers, prep for exams, and think more clearly into reusable skills that anyone in the class (and beyond) can use with their AI assistant.

This repo is fully open source under [MIT](./LICENSE). Fork it, use it, contribute back.

## What is a Skill?

A Skill is a self-contained folder that teaches an AI agent how to do something specific really well. At minimum it's a `SKILL.md` file with YAML front-matter (`name` + `description`) and a Markdown body. The agent reads the metadata, decides when the skill is relevant, and pulls the full instructions in on demand.

**Agent Skills are an open standard.** The format originated with Anthropic's Claude, but the spec has been adopted across the major AI coding tools as a common way to package reusable expertise. Every skill in this repo follows that standard.

Examples of what skills can do:
- Run a single decision through 5 different thinking styles before you commit
- Structure a case study analysis the way your professor expects
- Pressure-test a financial model
- Draft an exam answer in the format the rubric rewards
- Turn a 40-page reading into a 1-page study sheet without losing the nuance

## Tools that natively support this format

The same `SKILL.md` file works across all of these. No conversion. No reformatting. Drop the folder in the right directory and the tool picks it up.

| Tool | How it loads skills |
|---|---|
| **Claude / Claude Code** | Native. Drop in `~/.claude/skills/` (global) or `.claude/skills/` (project). Or upload the folder to a Claude Project on claude.ai. |
| **OpenAI Codex (CLI / IDE / app)** | Native. Drop in `~/.codex/skills/` (global) or `.agents/skills/` (project). Discover via `/skills`, invoke via `$skill-name` or implicit triggering. |
| **Gemini CLI / Antigravity** | Native. Drop in `~/.gemini/skills/` (global) or `.gemini/skills/` / `.agents/skills/` (project). Discover via `/skills`. |
| **Cursor** | Native. Drop in `.cursor/skills/` (project) or your global Cursor skills directory. Invoked via slash command menu or implicit triggering. |
| **GitHub Copilot / VS Code agents** | Via the `.agents/skills/` convention or community bridges. |
| **Other agents (Letta, OpenCode, etc.)** | Most modern agents have adopted the same format. Check your agent's docs for the skills directory. |

If the tool you use isn't listed and doesn't support skills natively, you can still get value from these by pasting the contents of `SKILL.md` into a Custom GPT (ChatGPT), a Gem (Gemini consumer app), or as a system prompt / first-message context. You lose the on-demand loading, but the instructions still work.

If a specific skill in this repo relies on tool-specific features (sub-agents, filesystem access, code execution, etc.), the `SKILL.md` will say so in a Compatibility note near the top.

## How to Get a Skill

1. Browse the categories below and find a skill that fits what you're working on.
2. Either copy the skill folder into your tool's skills directory (see table above), or clone the whole repo and symlink / copy individual skills:
   ```bash
   git clone https://github.com/refaelach/gmba-class-19-skills.git
   ```
3. Trigger it naturally in conversation. Each `SKILL.md` lists the trigger phrases at the top.

## Categories

| Category | What's in here |
|---|---|
| [research](./skills/research) | Finding sources, structuring literature reviews, summarizing readings |
| [writing](./skills/writing) | Papers, case write-ups, essays, executive summaries |
| [analysis](./skills/analysis) | Frameworks, financial analysis, case breakdowns |
| [decision-making](./skills/decision-making) | Pressure-testing choices, weighing tradeoffs, getting unstuck |
| [exam-or-class-prep](./skills/exam-or-class-prep) | Study sheets, practice questions, cheat sheets, concept drilling, study-aid generators |
| [productivity](./skills/productivity) | Workflow, planning, getting the boring parts out of the way |

## Available Skills

### Decision-Making
- **[llm-council](./skills/decision-making/llm-council)** — Run any decision through a council of 5 AI advisors who independently analyze it, peer-review each other anonymously, and synthesize a final verdict. Based on Andrej Karpathy's LLM Council methodology. *Full experience on tools that support sub-agents (Claude Code, Codex). Runs sequentially on others.*

### Exam or Class Prep
- **[exam-prep](./skills/exam-or-class-prep/exam-prep)** — Turn one or more past exams into a realistic mock exam that mirrors the real one's question types, structure, point distribution, and phrasing style. Withholds answers until the student submits, so it works as actual practice instead of read-along review. Surfaces topics that repeat across years as high-yield. Works on PDFs, images, or pasted text.
- **[mba-infographic-prompts](./skills/exam-or-class-prep/mba-infographic-prompts)** — Turn an MBA topic (formula, framework, process, comparison, study sheet, concept map) into a polished, ready-to-paste GPT image prompt. Picks one of six visual archetypes (cheat-sheet, narrative-collage, quadrant-framework, comparison-evidence, mind-map, procedural-flowchart), asks for aspect ratio, and outputs a prompt formatted per the OpenAI gpt-image-2 guide plus a fresh ChatGPT link. Produces text, not images. *Full support on tools that load bundled skill resources. Partial on prompt-only setups (paste the references file too).*

*More coming. This is just the start.*

## Contributing

Built something useful? Add it. See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to submit a skill, the template to use, and the quality bar we're holding things to.

The short version: a skill should solve a real problem you've actually had, follow the Agent Skills standard, be specific enough to be useful, and be tested on at least one real task before submitting.

**Important:** every PR that adds a new skill must also update the "Available Skills" section of this README. Reviewers will reject PRs that don't. See the [step-by-step contribution flow](./CONTRIBUTING.md#how-to-submit-a-skill) for exactly what to update and where.

### Reviewers

PRs are reviewed by:

- **Rafa** (Refael Lachmish) — [@refaelach](https://github.com/refaelach) · [Rephaell@gmail.com](mailto:Rephaell@gmail.com)
- **Dani Sofer** — [@soferdani](https://github.com/soferdani)

`main` is protected: every PR needs at least one approving review from a reviewer above before it can be merged.

### Want to help review submissions?

If you'd like to help curate this repo by reviewing PRs, reach out to **Rafa** (contact above).

Reviewers help keep the quality bar high and turn around PRs in a few days. If you've shipped a skill yourself and want to pay it forward, this is the way.

## License

[MIT](./LICENSE). Use it, fork it, remix it. Just keep the attribution.

## Maintainers

This repo is maintained by GMBA Class 19. If you're a Class 19 student and want to help curate, reach out to Rafa (contact above). Contributions from outside Class 19 are welcome via pull request.
