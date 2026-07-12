import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '324px', // Samsung Galaxy Fold
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      typography: {
        invert: {
          css: {
            h1: {
              position: 'relative',
              paddingBottom: '0.5rem',
              marginBottom: '1rem',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: '1px',
                backgroundColor: 'var(--color-hairline)',
              },
            },
            h2: {
              position: 'relative',
              paddingBottom: '0.5rem',
              marginBottom: '1rem',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: '1px',
                backgroundColor: 'var(--color-hairline)',
              },
            },
          },
        },
      },
    },
    colors: {
      ...colors,
      // Semantic design tokens — values live in src/app/globals.css (:root)
      bg: 'var(--color-bg)',
      fg: {
        DEFAULT: 'var(--color-fg)',
        muted: 'var(--color-fg-muted)',
        subtle: 'var(--color-fg-subtle)',
      },
      hairline: 'var(--color-hairline)',
      // Legacy aliases — remove once every component is migrated to tokens
      primary: colors.green,
      secondary: colors.yellow,
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
