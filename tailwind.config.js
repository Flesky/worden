const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Lora", "serif"],
      body: ["Inter", "sans-serif"],
    },
    extend: {
      screens: {
        sm: { raw: "(min-width: 20rem) and (min-height: 36rem)" },
        md: { raw: "(min-width: 24rem)" },
        lg: { raw: "(min-width: 1112px)" },
        hi: { raw: "(min-height: 44rem)" },
      },
      animation: {
        pop: "pop 100ms",
        shake: "shake 500ms",
      },
      colors: {
        current: colors.current,
        black: colors.black,
        white: colors.white,
        gray: colors.neutral,
        green: colors.lime["600"],
        yellow: colors.yellow["600"],
        red: colors.red["600"],
      },
    },
  },
  plugins: [],
};
