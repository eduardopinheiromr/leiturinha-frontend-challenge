module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: { colors: { primary: "#782125", secondary: "#E6E1BD" } },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
