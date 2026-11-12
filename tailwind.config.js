/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#172B3A',
          50: '#E8EEF2',
          100: '#C5D4DE',
          200: '#9FB7C7',
          300: '#7999B0',
          400: '#5A82A0',
          500: '#3B6B90',
          600: '#2E5470',
          700: '#223E52',
          800: '#172B3A',
          900: '#0C1820',
        },
        accent: {
          DEFAULT: '#C49A6C',
          50: '#F9F2E9',
          100: '#F0DFC8',
          200: '#E5C9A4',
          300: '#DAB380',
          400: '#CF9D5C',
          500: '#C49A6C',
          600: '#B08550',
          700: '#8F6B3F',
          800: '#6E522F',
          900: '#4D391F',
        },
        atelier: {
          dark: '#171311',
          darkSecondary: '#202B35',
          navy: '#192E3D',
          champagne: '#C9A16E',
          gold: '#B88B54',
          offwhite: '#F6F5F2',
          muted: '#A4A4A4',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.04)',
        modal: '0 20px 60px 0 rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}

