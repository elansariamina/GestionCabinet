module.exports = {
  purge: [
    './src/**/*.{js,jsx, ts, tsx}'
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#f6993f',
        owngreen: '#B5CB99'
      },
      fontFamily: {
        sans: ['Nunito', 'sans'],
      },
      shadow: {
        all: '0 0 10px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  variants: {},
  plugins: [],
};
