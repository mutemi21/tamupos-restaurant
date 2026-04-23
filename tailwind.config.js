/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ember: {
          50: '#fef7ee',
          100: '#fdedd6',
          500: '#f18a1b',
          600: '#e26e10',
          700: '#bb5310',
          900: '#7a3615',
        },
        char: {
          50: '#f6f6f5',
          100: '#e7e6e4',
          200: '#d1cfcb',
          400: '#8a8680',
          700: '#3a3733',
          800: '#2a2824',
          900: '#1a1816',
        },
      },
    },
  },
  plugins: [],
}
