# Web Project Design Direction

This project uses a clean, compact, near-monochrome visual system inspired by a premium commerce interface.

## Main Design Characteristics

- White canvas.
- Hairline borders.
- Compact typography.
- Minimal shadows.
- Rounded product cards.
- Violet primary accent.
- Product imagery as the main visual color source.

## Important Files

- `docs/design.md`  
  Main visual direction.

- `docs/agent.md`  
  AI agent behavior and implementation rules.

- `docs/component-guidelines.md`  
  Component-level design instructions.

- `docs/page-structure.md`  
  Recommended page layout.

- `docs/interaction-guidelines.md`  
  Hover, focus, loading, and motion rules.

- `docs/qa-checklist.md`  
  Review checklist before delivery.

- `prompts/build-agent-prompt.md`  
  Main prompt for AI coding agent.

- `prompts/review-agent-prompt.md`  
  Prompt for UI review agent.

## Design Summary

Build a clean, product-first interface. Use violet sparingly. Let content and product visuals carry the experience.

## Recommended Usage

1. Put this folder into the root of your project.
2. Give `prompts/build-agent-prompt.md` to your AI coding agent.
3. Ask the agent to read every file in `docs/` before coding.
4. After implementation, use `prompts/review-agent-prompt.md` to audit the result.
