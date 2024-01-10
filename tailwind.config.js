/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          sans: ["Orbitron", ...defaultTheme.fontFamily.sans],
      },
      colors: {
          'primary': {
              yellow: '#FED404',
              green: '#0A8300',
              black: '#141414'
          },
      }
    },
  },
  plugins: [
    aspectRatio,
    containerQueries,
    lineClamp
  ],
}

