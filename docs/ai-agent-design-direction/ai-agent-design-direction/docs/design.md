# Design Direction

## Design Reference

Website ini mengikuti arah visual dari referensi Shop design system pada Refero Styles.

Karakter utama desain:
- Near-monochrome interface.
- Canvas utama putih bersih.
- Border tipis abu-abu sebagai struktur visual.
- Tidak menggunakan decorative gradient.
- Tidak menggunakan heavy shadow.
- Warna utama violet dipakai sangat hemat.
- Product image atau visual utama menjadi sumber warna terbesar.
- Komponen compact, rapi, dan commerce-oriented.

## Visual Personality

Desain harus terasa:
- Clean
- Minimal
- Compact
- Premium
- Product-first
- Engineered
- Calm
- High trust
- Modern commerce UI

Desain tidak boleh terasa:
- Ramai
- Terlalu playful
- Terlalu banyak warna
- Terlalu banyak shadow
- Terlalu editorial
- Terlalu corporate
- Terlalu dark

## Color Palette

### Primary

```css
--shop-violet: #5433eb;
```

Digunakan untuk:
- Primary CTA
- Brand mark
- Submit/search arrow
- Active state penting
- Satu aksen visual kuat pada halaman

Jangan gunakan violet terlalu sering. Violet harus terasa sebagai signal utama, bukan warna dekoratif umum.

### Supporting Accent

```css
--violet-glow: #c0b5f3;
```

Digunakan untuk:
- Soft glow kecil
- Background aksen yang sangat jarang
- Decorative emphasis minor

Jangan jadikan warna ini sebagai warna tombol utama.

### Neutrals

```css
--ink-black: #000000;
--near-black: #121212;
--slate: #707070;
--ash: #7b7b7b;
--concrete: #c9cbcc;
--hairline: #ebebeb;
--soft-canvas: #f2f4f5;
--pure-white: #ffffff;
```

Penggunaan:
- `#000000` untuk teks utama dan border dominan.
- `#121212` untuk area gelap atau teks emphasis.
- `#707070` untuk secondary text dan metadata.
- `#7b7b7b` untuk caption.
- `#c9cbcc` untuk disabled text atau placeholder.
- `#ebebeb` untuk border paling halus.
- `#f2f4f5` untuk section background ringan.
- `#ffffff` untuk canvas utama dan card.

## Typography

Gunakan pendekatan type scale compact.

Font utama:

```css
font-family: "GT Standard", "Inter Tight", system-ui, sans-serif;
```

Jika GT Standard tidak tersedia:

```css
font-family: "Inter Tight", system-ui, sans-serif;
```

### Type Scale

```css
--text-body-lg: 16px;
--text-body: 14px;
--text-body-sm: 12px;
--text-caption: 11px;
--text-micro: 10px;
--text-nano: 9px;
```

Line-height:

```css
--leading-body-lg: 1.38;
--leading-body: 1.29;
--leading-body-sm: 1.33;
--leading-caption: 1.33;
--leading-micro: 1.2;
--leading-nano: 1.33;
```

Tracking:

```css
letter-spacing: -0.02em;
```

Untuk ukuran 9–12px, tracking boleh dibuat lebih rapat:

```css
letter-spacing: -0.04em;
```

## Layout Principle

Gunakan layout yang:
- Banyak whitespace.
- Komponen compact.
- Border-driven, bukan shadow-driven.
- Rounded corner besar tapi tidak pill berlebihan.
- Grid-based.
- Product image menjadi fokus utama.

## Radius

```css
--radius-sm: 12px;
--radius-md: 18px;
--radius-lg: 22px;
--radius-xl: 28px;
```

Gunakan radius 22–28px untuk card utama agar terasa soft tanpa menjadi pill.

## Border

Gunakan border tipis:

```css
border: 1px solid #ebebeb;
```

Untuk komponen yang membutuhkan emphasis:

```css
border: 1px solid #000000;
```

## Shadow

Hindari shadow tebal.

Jika diperlukan:

```css
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
```

Primary button boleh memiliki glow violet ringan:

```css
box-shadow: 0 12px 32px rgba(84, 51, 235, 0.20);
```

## Button Style

### Primary Button

- Background: `#5433eb`
- Text: `#ffffff`
- Radius: 22–28px
- Padding compact
- Tidak full gradient
- Boleh ada violet glow halus

### Secondary Button

- Background: transparent atau white
- Border: black atau hairline
- Text: black
- No glow

## Card Style

Card harus:
- Background putih
- Border hairline
- Radius 22–28px
- Shadow minimal atau tanpa shadow
- Image menjadi pusat perhatian
- Metadata compact
- Typography kecil dan rapat

## Image Direction

Image harus:
- Bersih
- High quality
- Banyak area putih atau neutral
- Product-first
- Tidak terlalu saturated kecuali objek produk
- Tidak menggunakan background yang ramai

## Do

- Gunakan warna violet hanya untuk CTA penting.
- Gunakan border sebagai pemisah utama.
- Gunakan font kecil dan compact.
- Berikan ruang kosong cukup.
- Pastikan UI terlihat seperti modern commerce/product platform.

## Don’t

- Jangan gunakan banyak warna.
- Jangan gunakan gradient dekoratif.
- Jangan gunakan shadow besar.
- Jangan gunakan font terlalu besar untuk semua elemen.
- Jangan membuat UI terlalu playful.
- Jangan membuat setiap tombol berwarna violet.
