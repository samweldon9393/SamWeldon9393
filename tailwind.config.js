/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      'index.html',
      'about.html',
      './src/js/**/*.js',
  ],
  theme: {
    extend: {
        colors: {
            deepBlue: '#0f1021',
            deeperBlue:'#060714',
            coolOrange: '#f97559',
            myRed: '#ffe8e8',
            deepRed: '#200000',
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

