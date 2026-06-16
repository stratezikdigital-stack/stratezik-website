/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Champion's Hall palette  -  editorial, considered, premium.
        ink: {
          DEFAULT: '#0d0c0a',
          900: '#0d0c0a',
          800: '#1a1815',
          700: '#2a2722',
          600: '#403c34',
          500: '#5a554b',
          400: '#7d7669',
          300: '#a89f8e',
          200: '#cdc5b4',
          100: '#e6dfcf',
        },
        cream: {
          DEFAULT: '#f4ede1',
          50: '#faf6ec',
          100: '#f4ede1',
          200: '#ece2cf',
          300: '#dccfb6',
        },
        oxblood: {
          DEFAULT: '#7a1f1f',
          50: '#faecec',
          400: '#a93232',
          500: '#8d2727',
          600: '#7a1f1f',
          700: '#5e1717',
        },
        gold: {
          DEFAULT: '#c9a961',
          400: '#d6b876',
          500: '#c9a961',
          600: '#b08f4a',
        },
        // Legacy aliases kept so existing components don't break instantly
        primary: '#7a1f1f',
        secondary: '#0d0c0a',
        accent: '#c9a961',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Editorial scale  -  bigger than typical web. Designed for hero
        // headlines that fill the viewport.
        'display-1': ['clamp(3.5rem, 13vw, 12rem)', { lineHeight: '0.92', letterSpacing: '-0.045em' }],
        'display-2': ['clamp(2.75rem, 9vw, 8rem)', { lineHeight: '0.96', letterSpacing: '-0.035em' }],
        'display-3': ['clamp(2rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
      },
      letterSpacing: {
        'editorial': '-0.04em',
        'notation': '0.22em',
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        4: 'repeat(4, minmax(0, 1fr))',
        8: 'repeat(8, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'marquee': 'marquee 40s linear infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#2a2722',
            '--tw-prose-headings': '#0d0c0a',
            '--tw-prose-links': '#7a1f1f',
            '--tw-prose-code': '#0d0c0a',
            '--tw-prose-pre-bg': '#faf6ec',
          },
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
