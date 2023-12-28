module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#f6993f',
        owngreen: '#B5CB99',
      },
      fontFamily: {
        sans: ['Nunito', 'sans'],
        chalkduster: ['Chalkduster', 'cursive'],
        comicSans: ['Comic Sans MS', 'cursive'],
        lobster: ['Lobster', 'cursive'],
        pacifico: ['Pacifico', 'cursive'],
        dancingScript: ['Dancing Script', 'cursive'],
      },
      shadow: {
        all: '0 0 10px rgba(0, 0, 0, 0.1)',
      },
      backgroundColor: {
        '24b6e1': '#24b6e1',
        '#eaf5f9': '#eaf5f9',
        '#564c5d': '#564c5d',
        '#26a7cc': '#26a7cc',
        '#5ab1d0': '#5ab1d0',
      },
      textColor:{
        '24b6e1': '#24b6e1',
        '#eaf5f9': '#eaf5f9',
        '#564c5d': '#564c5d',
        '#26a7cc': '#26a7cc',
        '#5ab1d0': '#5ab1d0',
      }
    },
  },
  variants: {},
  plugins: [],
};
