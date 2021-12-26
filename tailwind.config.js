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
      colors: {
        primary: "#1D4ED8",
      },
      spacing: {
        hor: "2.5rem",
        calced: "max(calc((100vw - 80rem) / 2), 2.5rem)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
