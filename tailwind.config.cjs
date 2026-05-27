/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Bohemian Tropical palette
        ocean: {
          DEFAULT: '#1F5965', // deep ocean teal — primary
          dark:    '#143E47',
          light:   '#3A7884',
        },
        palm: {
          DEFAULT: '#7A9B6E', // tropical sage — secondary
          dark:    '#5C7A54',
          light:   '#9DB893',
        },
        terracotta: {
          DEFAULT: '#D4855B', // sun-baked terracotta — warm accent
          dark:    '#B26641',
          light:   '#E3A684',
        },
        gold: {
          DEFAULT: '#C9A961', // antique gold — spiritual accent
          dark:    '#A88A45',
        },
        sand: {
          DEFAULT: '#F5EFE6', // sandy cream — background
          dark:    '#EBE2D2',
          deep:    '#DCD1BC',
        },
        ink: {
          DEFAULT: '#2C3539', // deep slate — primary text
          muted:   '#7A7268', // driftwood gray — secondary text
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        accent:  ['"Caveat"', '"Homemade Apple"', 'cursive'],
      },
      maxWidth: {
        prose: '70ch',
        content: '1200px',
        narrow: '780px',
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(31, 89, 101, 0.15)',
        card: '0 4px 24px -6px rgba(44, 53, 57, 0.12)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
