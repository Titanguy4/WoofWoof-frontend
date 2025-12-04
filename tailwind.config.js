import { COLORS } from "./utils/constants/colors";
export const content = [
  "./App.{js,jsx,ts,tsx}",
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./screens/**/*.{js,jsx,ts,tsx}",
  "./layouts/**/*.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    colors: {
      ...COLORS,
    },
    fontFamily: {
      manrope: ["Manrope_400Regular"],
      manropeMedium: ["Manrope_500Medium"],
      manropeSemiBold: ["Manrope_600SemiBold"],
      manropeBold: ["Manrope_700Bold"],
      manropeExtraBold: ["Manrope_800ExtraBold"],
    },
  },
};
export const plugins = [];
