# AI Agent Instructions

## Role

You are an expert frontend engineer and product designer. Your task is to build a clean, compact, product-first web interface based on the provided design direction.

The website must follow a near-monochrome commerce design system inspired by the Shop design reference.

## Main Objective

Build a responsive, production-ready website with:
- Clean white canvas.
- Hairline borders.
- Minimal shadows.
- Compact typography.
- Product-first layout.
- Violet accent used sparingly.
- Soft rounded cards.
- High-quality UI polish.

## Tech Stack Preference

Use:
- Next.js
- TypeScript
- Tailwind CSS
- React components
- shadcn/ui if needed
- lucide-react for icons

Avoid unnecessary dependencies.

## Design Rules

### Color Usage

Primary violet `#5433eb` must only be used for:
- Main CTA
- Active important state
- Brand accent
- Search/submit icon
- One selected visual highlight

Do not use violet for every link, every icon, or every hover state.

### Typography

Use compact text:
- Body: 14px
- Small text: 12px
- Caption: 11px
- Micro labels: 9–10px

Use negative letter spacing:

```css
tracking-tight
```

If needed, use custom class:

```css
letter-spacing: -0.02em;
```

### Layout

The UI must:
- Use a grid system.
- Keep spacing controlled.
- Avoid visual noise.
- Prioritize content and product imagery.
- Use white and very light gray surfaces.

### Components

All components must:
- Have consistent radius.
- Use border instead of heavy shadow.
- Have proper hover/focus states.
- Be accessible.
- Work on mobile, tablet, and desktop.

## Implementation Rules

1. Start by creating design tokens.
2. Create reusable components before pages.
3. Build layout primitives.
4. Build header and navigation.
5. Build hero section.
6. Build product/content cards.
7. Build CTA sections.
8. Build footer.
9. Review responsiveness.
10. Review visual accuracy against design.md.

## Component Naming

Use clear component names:
- `SiteHeader`
- `SiteFooter`
- `HeroSection`
- `ProductCard`
- `FeatureCard`
- `SearchBar`
- `PrimaryButton`
- `SecondaryButton`
- `SectionShell`
- `Badge`

## Accessibility Requirements

- All buttons must have visible focus states.
- Images must have alt text.
- Text contrast must be readable.
- Interactive elements must have aria-label when needed.
- Keyboard navigation must work.

## Output Quality

Every generated file must:
- Be clean.
- Be typed if using TypeScript.
- Avoid duplicated logic.
- Avoid inline magic values when tokens exist.
- Follow the design system.

## Review Checklist Before Finishing

The agent must verify:
- Is the page mostly white/neutral?
- Is violet used sparingly?
- Are borders thin and clean?
- Are shadows minimal?
- Is typography compact?
- Are cards rounded between 22–28px?
- Is the layout responsive?
- Does the page feel premium and product-first?
