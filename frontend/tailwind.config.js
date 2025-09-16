/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Hubot: ['"Hubot Sans"', 'sans-serif'],
        poppins:['"Poppins"', 'sans-serif;'],
        alk: ['"ALK Sanet"', 'sans-serif'],
        cups: ['"cups"', 'sans-serif'],
        pantonmtav3: ['"pantonmtav3"', 'sans-serif'],
        normal: ['"Arial"', 'sans-serif'],
        georgian: ['"Noto Sans Georgian"', 'sans-serif'],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        // თუ custom გაქვს შეცვლილი, დაამატე აქ
    },
    },
  },
  plugins: [],
}