module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}','./layouts/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      'white': '#ffffff',
      'red':'#ea6e6f',
      'pink': '#fff5fa',
      'brown':'#570000',
      'yellow':'#fff964',
      'blue':'#656df6',
      'skyblue':'#96fcf8',
    },
    extend: {
      gridTemplateColumns: {
       'auto': 'repeat(auto-fit, minmax(128px, 1fr))',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
