export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        acento: {
          50: '#f2f7f4',
          100: '#dfede4',
          200: '#bfdac9',
          300: '#93bfa4',
          400: '#639d7e',
          500: '#41805f',
          600: '#2f6549',
          700: '#27513c',
          800: '#214132',
          900: '#1c362a',
        },
      },
    },
  },
  plugins: [],
}
