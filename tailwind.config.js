module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React fayllarini qamrab olish
  ],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['"Helvetica"', "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
