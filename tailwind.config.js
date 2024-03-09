/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "2560px"
      },
      backgroundImage: {
        "test": "url('/src/assets/sld2-bg.jpeg')"
      },
      transitionTimingFunction: {
        "custom-cubic": "cubic-bezier(.3,.48,.29,1.46)"
      },
      fontFamily: {
        sans: ["'Poppins', sans-serif"]
      }
    },
  },
  plugins: [],
}