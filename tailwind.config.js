/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        woofBrown: '#C58048',
        woofCream: '#F8EDDA',
        woofGrey: "#A6A9AC",
        woofHeart: "#ED1F4F",
        woofGreyBorder: "#EDF1F5",
        woofDarkGrey: "#747677",
      },
      fontFamily: {
        manrope: ["Manrope_400Regular"],
        manropeMedium: ["Manrope_500Medium"],
        manropeSemiBold: ["Manrope_600SemiBold"],
        manropeBold: ["Manrope_700Bold"],
        manropeExtraBold: ["Manrope_800ExtraBold"],
      },
    },
  },
  plugins: [],
}