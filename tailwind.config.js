/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './index.html',
  ],
  theme: {
    extend: {
        colors: {
            myBlue: '#06448d',
            coolOrange: '#f97559',
        },
        fontFamily:{
            Outfit: ['Outfit'],
            SCPro: ['Source Code Pro'],
            Kanit: ['Kanit'],
            Oran: ['Oranienbaum']
        }
    },
  },
  plugins: [],
}

