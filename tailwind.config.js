/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shop-violet': 'var(--color-shop-violet)',
        'violet-glow': 'var(--color-violet-glow)',
        'pure-white': 'var(--color-pure-white)',
        'ink-black': 'var(--color-ink-black)',
        'near-black': 'var(--color-near-black)',
        'soft-canvas': 'var(--color-soft-canvas)',
        'hairline': 'var(--color-hairline)',
        'concrete': 'var(--color-concrete)',
        'slate': 'var(--color-slate)',
        'ash': 'var(--color-ash)',
        'violet-glow': 'var(--color-violet-glow)'
      },
      fontFamily: {
        'gt': ['var(--font-gt-standard)'],
        'gt-medium': ['var(--font-gt-standard-medium)'],
        'shopify': ['var(--font-shopify-sans)'],
      },
      fontSize: {
        'caption': ['var(--text-caption)', 'var(--leading-caption)'],
        'body-sm': ['var(--text-body-sm)', 'var(--leading-body-sm)'],
        'body': ['var(--text-body)', 'var(--leading-body)'],
        'body-lg': ['var(--text-body-lg)', 'var(--leading-body-lg)'],
      },
      boxShadow: {
        'shop': 'var(--shadow-sm)',
        'shop-md': 'var(--shadow-md)',
        'shop-lg': 'var(--shadow-lg)',
        'shop-violet-glow': '0 12px 32px rgba(84, 51, 235, 0.20)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        'tags': 'var(--radius-tags)',
        'cards': 'var(--radius-cards)',
        'images': 'var(--radius-images)',
        'search': 'var(--radius-search)',
        'buttons': 'var(--radius-buttons)',
      }
    },
  },
  plugins: [],
}
