# Contributing to GMBA Class 19 Skills

Thanks for wanting to add to this. The whole point of this repo is that it gets better as more of us share what works.

This is an open-source project on GitHub. Anyone can contribute. The submission flow uses standard GitHub fork-and-pull-request mechanics. If you've never done that before, see [GitHub's guide to fork & PR](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project) before continuing.

## The Standard We Follow

This repo follows the **open Agent Skills standard**. It's a portable spec for packaging reusable AI capabilities. It started as Claude's skill format and has since been natively adopted by Codex, Gemini CLI, Cursor, and others. Every skill in this repo must:

- Have a `SKILL.md` file with valid YAML front-matter (`name` and `description` fields)
- Use the `description` field properly: a one-or-two-sentence summary followed by clear trigger phrases (mandatory triggers, strong triggers, and false positives to avoid)
- Live in its own folder named the same as the `name` field (kebab-case)
- Be written in plain Markdown so it loads cleanly across any agent that supports the standard

If you're not familiar with the format, read the existing [`llm-council`](./skills/decision-making/llm-council/SKILL.md) skill and the [`SKILL_TEMPLATE.md`](./SKILL_TEMPLATE.md). That's the pattern.

We don't fragment the format with tool-specific extensions or dilute it to fit weaker prompt-only setups. Skills are written to the standard. Tools that support the standard pick them up natively. Tools that don't can still load them as a system prompt or custom instruction.

## Before You Submit

A skill is worth adding if you can answer **yes** to all three:

1. **It solves a real problem.** You've actually used it (or something like it) on a real assignment, case, or exam prep session.
2. **It's specific enough to be useful.** "Help me write better" is too vague. "Structure a Harvard-style case write-up with the four-section format" is a skill.
3. **It's general enough to be reusable.** If only you can use it because it's hardcoded to your specific class section, it's not ready. Strip out the personal stuff.

If you're not sure, open an issue first using the **New Skill Proposal** template and pitch the idea. Someone will tell you if it's worth building.

## When to Note Compatibility

Most skills you write will work on any agent that supports the Agent Skills standard. You don't need to add a Compatibility section in that case.

You **do** need to add a Compatibility section near the top of your `SKILL.md` if your skill genuinely depends on tool-specific features:

- Sub-agents (parallel orchestration — supported in Claude Code and Codex, partially elsewhere)
- Filesystem tool / file outputs
- Bash / code execution
- Computer use / browser tools
- Specific MCP servers

In that section, state:

- Which tools it works fully on
- Which tools it works partially on, and what's degraded
- Which tools it doesn't work on at all

This lets users pick the right tool. A skill that quietly fails on Cursor because it assumes Claude sub-agents is worse than a skill that says upfront "needs sub-agent support."

## How to Submit a Skill

This is the full step-by-step flow. Don't skip the README update step. PRs missing it will be sent back.

### 1. Fork the repo on GitHub

Click the **Fork** button at the top of the repo page on GitHub. This creates your own copy under your account.

### 2. Clone your fork locally

```bash
git clone https://github.com/YOUR-USERNAME/gmba-class-19-skills.git
cd gmba-class-19-skills
```

### 3. Create a branch

```bash
git checkout -b add-[skill-name]
```

Use kebab-case for the skill name (e.g. `add-case-study-structure`, `add-flashcard-generator`).

### 4. Pick the right category

Place your skill under one of the existing folders in `skills/`:

- `research/`, `writing/`, `analysis/`, `decision-making/`, `exam-prep/`, `productivity/`

If none of these fit, **open an issue first** to discuss adding a new category. Don't add new top-level categories in the same PR as a new skill.

### 5. Create the skill folder and file

```bash
mkdir -p skills/[category]/[skill-name]
```

Copy [`SKILL_TEMPLATE.md`](./SKILL_TEMPLATE.md) into your new folder and rename it to `SKILL.md`:

```bash
cp SKILL_TEMPLATE.md skills/[category]/[skill-name]/SKILL.md
```

### 6. Fill in the template

The most important fields are:

- **`name`** in the front-matter (kebab-case, must match the folder name)
- **`description`** in the front-matter, including:
  - One or two sentences on what the skill does
  - **MANDATORY TRIGGERS:** phrases that should always fire the skill
  - **STRONG TRIGGERS:** phrases that fire it in context
  - **Do NOT trigger on:** false positives to avoid
- **Compatibility** section if (and only if) your skill depends on tool-specific features
- **At least one full worked example**

The description field is what determines whether the skill actually fires at the right time. Spend more time on it than you think you need to.

### 7. Test your skill

Run it on at least **two real tasks** before submitting. Document what you tested in the **Tested on** footer of the skill file.

### 8. Update the main README ⚠️ (MANDATORY)

Open the root `README.md` and add your skill to the **"Available Skills"** section, under the right category heading. Use this exact format:

```markdown
- **[skill-name](./skills/[category]/[skill-name])** — One-sentence description of what the skill does. *Compatibility note if relevant.*
```

If your category doesn't have a sub-heading in "Available Skills" yet (because yours is the first skill in it), add the sub-heading too.

**PRs that don't update the README will be rejected.** This is the single most-skipped step. Reviewers check it first.

### 9. Commit and push

```bash
git add .
git commit -m "Add [skill-name] skill to [category]"
git push origin add-[skill-name]
```

### 10. Open a Pull Request

Go to your fork on GitHub. You'll see a banner offering to open a PR against the upstream repo. Click it.

Fill in the PR template completely. Specifically:

- One-sentence summary of what the skill does
- One real task you used it on
- Which AI tool(s) you tested it on
- Anything you'd want a reviewer to push back on
- Confirm (with the checkbox) that you updated the README

### 11. Respond to review

A maintainer will review within a few days. Common feedback:

- "Your trigger phrases would also fire on X, which is not what this skill is for. Tighten them."
- "The example doesn't show enough of the output. Add a fuller one."
- "This depends on tool-specific features but doesn't say so. Add a Compatibility section."
- "You forgot to update the README." (See? Told you.)

Push fixes to the same branch. The PR updates automatically.

## Becoming a Reviewer

If you'd like to help curate this repo by reviewing PRs from other students, reach out to **Rafa** (Refael Lachmish):

- 📧 Email: [Rephaell@gmail.com](mailto:Rephaell@gmail.com)
- 💬 WhatsApp: same number / contact via email first

Reviewers commit to turning around PRs within a few days and helping keep the quality bar consistent. The best reviewers tend to be people who have already shipped at least one skill themselves, but it's not a hard requirement.

## Skill Quality Bar

**Things that get a skill merged:**

- Follows the Agent Skills standard correctly
- Clear triggers. A reviewer reading your `description` field can tell immediately when this skill should fire and when it shouldn't.
- Concrete examples with real prompts and real outputs.
- Honest limitations: what this skill is **not** for.
- Tight scope: does one thing well rather than five things okay.
- Compatibility section is present when (and only when) tool-specific features are required.

**Things that get a skill sent back for revisions:**

- Doesn't conform to the Agent Skills standard (missing front-matter, malformed `description`, etc.)
- Vague descriptions that would trigger on everything ("use this for any business question")
- No examples
- Trigger phrases that overlap heavily with another skill in the repo
- Hardcoded to one specific course, professor, or assignment
- Silently assumes tool-specific features without saying so
- Missing README update (yes, again)

## Improving an Existing Skill

Found something that doesn't work as well as it could? Open a PR with your fix. In the description, include:

- What wasn't working (give a concrete example)
- What you changed
- What's better now (give a concrete example)
- Which AI tool(s) you tested the fix on

You **don't** need to update the README for an improvement PR (the skill is already listed). Just update the skill itself.

## Reporting Bugs

If a skill is misbehaving (firing when it shouldn't, missing obvious triggers, producing bad output), open an issue with the **Bug Report** template. Include:

- Which skill
- Which AI tool you ran it on
- The prompt that caused the issue
- What you expected vs what happened

## Code of Conduct

Be useful, be honest, be kind. We're all here to help each other get through the program with better work and less suffering. Don't submit AI-generated slop you didn't read. Don't trash someone's contribution without offering a fix. That's it.
