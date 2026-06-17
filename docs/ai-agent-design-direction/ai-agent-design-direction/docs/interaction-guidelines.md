# Interaction Guidelines

## Hover States

Hover harus subtle:
- Border menjadi lebih gelap.
- Background berubah sedikit ke soft canvas.
- Shadow sangat ringan.
- Hindari animasi scale besar.

Example:

```css
hover:border-black
hover:bg-[#f2f4f5]
```

## Focus States

Focus harus jelas:

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-[#5433eb]
focus-visible:ring-offset-2
```

## Motion

Gunakan motion dengan sangat hemat.

Durasi:

```css
transition-duration: 150ms;
```

Easing:

```css
ease-out
```

Hindari:
- Bounce animation.
- Parallax berat.
- Scroll hijacking.
- Animasi terlalu playful.

## Loading State

Loading state:
- Skeleton putih/abu-abu.
- Border hairline.
- Tidak menggunakan shimmer warna-warni.

## Empty State

Empty state:
- Copy singkat.
- Icon minimal.
- CTA kecil jika perlu.
- Warna netral.
