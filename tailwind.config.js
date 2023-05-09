/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      maxsm: "400px",
      sm: "640px",
      md: "768px",
      lg: "	1024px",
      xl: "1280px",
      twoxl: "1536px",
    },
    colors: {
      mainColor: "#4380a7",
      whiteColor: "#fff",
      blackColor: "#222",
      grayColor: "#edebeb",
      textColor: "#646464",
    },
    extend: {},
  },
  plugins: [],
};
