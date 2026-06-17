# Page Structure

## Home Page Wireframe

```txt
┌──────────────────────────────────────────┐
│ Header                                   │
│ Logo        Nav Links          CTA       │
├──────────────────────────────────────────┤
│ Hero                                     │
│ Eyebrow                                  │
│ Headline                                 │
│ Description                              │
│ Search / CTA                             │
│ Product Preview Cards                    │
├──────────────────────────────────────────┤
│ Featured Section                         │
│ Section Title       Small Link           │
│ Card Grid                                │
├──────────────────────────────────────────┤
│ Product / Service Grid                   │
│ Filters optional                         │
│ Cards                                    │
├──────────────────────────────────────────┤
│ Trust / Stats                            │
│ Compact metrics                          │
├──────────────────────────────────────────┤
│ CTA                                      │
├──────────────────────────────────────────┤
│ Footer                                   │
└──────────────────────────────────────────┘
```

## Responsive Behavior

### Mobile

- Single column.
- Header compact.
- Cards full width.
- CTA full width if needed.
- Text remains compact but readable.

### Tablet

- Two-column card grid.
- Hero can use stacked layout.
- Navigation may still collapse depending width.

### Desktop

- Max width container.
- Multi-column grid.
- Hero split layout.
- Product cards 3–4 columns.

## Container Width

Recommended:

```css
max-width: 1200px;
padding-inline: 24px;
```

For larger desktop:

```css
max-width: 1280px;
```
