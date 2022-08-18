/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffc605',
        seccondary: '#128bb5',
        tertiary: '#282828',
        dark: '#181818',
        light: '#fcf7f7'
      },
      backgroundImage: {
        'hero-pattern': "url('./assets/background.jpg')"
      },
      fontFamily: {
        'montserrat': 'Montserrat'
      }
    },
  },
  plugins: [],
}