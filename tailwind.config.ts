import type { Config } from 'tailwindcss'
import {
  sky as lightBlue,
  stone as warmGray,
  neutral as trueGray,
  gray as coolGray,
  slate as blueGray,
} from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'xs': '324px', // Samsung Galaxy Fold
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
                height: '2px',
                backgroundColor: 'currentColor',
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
                height: '2px',
                backgroundColor: 'currentColor',
              },
            },
          },
        },
      },
    },
    colors: {
      primary: lightBlue,
      secondary: warmGray,
      sky: lightBlue,
      stone: warmGray,
      neutral: trueGray,
      gray: coolGray,
      slate: blueGray,
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
