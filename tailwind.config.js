module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        fit: "fit-content",
      },
      zIndex: {
        "minus-10": "-10",
      },
      colors: {
        primary: "#1D4ED8",
      },
    },
  },
  plugins: [],
};
