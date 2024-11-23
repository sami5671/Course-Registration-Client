/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: "#D95F59",
        softpink: "#FFDFD6",
        pinkviolet: "#E3A5C7",
        paleindigo: "#B692C2",
        violet: "#694F8E",
        superpink: "#FF5580",
      },
    },
  },
  plugins: [require("daisyui")],
};
