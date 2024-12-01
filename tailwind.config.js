/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './pub/index.html',
  ],
  theme: {
    extend: {
        colors: {
            myBlue: '#06448d',
            coolOrange: '#f97559',
        },
        fontFamily:{
            body: ['Abril Fatface']
        }
    },
  },
  plugins: [],
}

