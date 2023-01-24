/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090A'
      },

      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))'
      },

      keyframes: {
        hide: {
          '0%': {
            opacity: '1'
          },
          '100%':  {
            opacity: '0'
          }
        },
        slide: {
          '0%': {
            transform: 'translateX(calc(100% + 24px))'
          },
          '100%':  {
            transform: 'translateX(0)'
          }
        }
      }
    },
  },
  plugins: [],
}
