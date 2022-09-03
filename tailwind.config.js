/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotifyGray: {
          100: "#a2a2a2",
          200: "#373737",
          300: "#282828",
          400: "#1f1f1f",
          500: "#181818",
          600: "#111111",
        },
        spotifyPrimary: "#1ABA53",
      },
    },
  },
  plugins: [],
};
