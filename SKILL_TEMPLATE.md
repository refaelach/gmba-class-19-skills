---
name: skill-name-in-kebab-case

description: "One or two sentences describing what the skill does. Then list trigger phrases clearly. MANDATORY TRIGGERS: 'phrase one', 'phrase two'. STRONG TRIGGERS (use when context fits): 'phrase three', 'phrase four'. Do NOT trigger on: [false positives to avoid]. DO trigger when: [the specific situation that makes this skill the right fit]."

---

# Skill Name

A one-paragraph hook explaining what problem this solves and why it matters. Write this for a busy classmate skimming the README. If they read this paragraph and don't immediately get why they'd want this, rewrite it.

<!--
Compatibility section: ONLY include this if your skill depends on Claude-specific
features (sub-agents, filesystem tool, code execution, computer use, etc).
If your skill is plain Markdown instructions that work as a system prompt
on any modern assistant, delete this section entirely.

Example:

## Compatibility

- **Claude (full support):** Spawns parallel sub-agents and writes output files.
- **ChatGPT, Gemini, others (partial):** Runs sequentially in a single chat. Skip the file-output step or output the same content as Markdown in-chat.
-->

## When to use this skill

Be concrete. List the situations where this skill is the right tool.

Good examples:
- "When you're staring at a case study and don't know where to start"
- "When you need to compare three job offers and your gut keeps flipping"
- "When a professor asks for a 'critical analysis' and you don't know what they actually want"

Bad examples (too vague):
- "When you need help thinking"
- "For business questions"

## When NOT to use this skill

Equally important. What is this skill not for? This prevents the skill from firing on requests it'll do badly on.

## How it works

Walk through what the skill actually does, step by step. If it's a multi-step process, number the steps. If it produces a specific output format, describe it.

## Example

Show one full, realistic example. Include:
- The user's prompt that triggered the skill
- What the skill does in response
- The final output (or a representative chunk of it)

A skill without an example is much harder to evaluate, both for users deciding whether to use it and for reviewers deciding whether to merge it.

## Inputs the skill expects

If the skill needs specific information from the user to work well (numbers, context, files, constraints), list it here. If the user doesn't provide it, the skill should ask for it before proceeding.

## Outputs the skill produces

Be specific. Does it produce a file? A structured response? A visual? What's the format?

## Notes for contributors

Anything future maintainers should know. Edge cases you hit. Things you tried that didn't work. Ideas for v2.

---

**Author:** [Your name or GitHub handle]
**Created:** [YYYY-MM-DD]
**Tested on:** [List the AI assistant(s) you tested this on, e.g. "Claude Sonnet 4.6"]
**Real tasks tested:** [Briefly describe the real tasks you used this skill on]

---

> ⚠️ **Reminder before opening your PR:** did you also update the "Available Skills" section in the root [README.md](../../README.md)? If not, do that now. PRs missing this step are rejected.
