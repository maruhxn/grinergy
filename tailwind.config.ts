import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "300px",
      md: "450px",
      lg: "652px",
      xl: "1059px",
      "2xl": "1375px",
      "3xl": "1919px",
    },
    extend: {
      colors: {
        green: "rgba(0, 145, 145)",
      },
      keyframes: {
        blink: {
          // @ts-ignore
          "50%": { opacity: 0 },
        },
        forwardRotate: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        backwardRotate: {
          from: { transform: "rotate(-0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        forwardAndScale: {
          "0%": { transform: "rotate(0deg) scale(2)" },
          "12.5%": { transform: "rotate(45deg) scale(1)" },
          "25%": { transform: "rotate(90deg) scale(1)" },
          "37.5%": { transform: "rotate(135deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(2)" },
          "62.5%": { transform: "rotate(225deg) scale(1)" },
          "75%": { transform: "rotate(270deg) scale(1)" },
          "87.5%": { transform: "rotate(315deg) scale(1)" },
          "100%": { transform: "rotate(360deg) scale(2)" },
        },
        mobileForwardAndScale: {
          "0%": { transform: "rotate(0deg) scale(1.3)" },
          "12.5%": { transform: "rotate(45deg) scale(1)" },
          "25%": { transform: "rotate(90deg) scale(1)" },
          "37.5%": { transform: "rotate(135deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.3)" },
          "62.5%": { transform: "rotate(225deg) scale(1)" },
          "75%": { transform: "rotate(270deg) scale(1)" },
          "87.5%": { transform: "rotate(315deg) scale(1)" },
          "100%": { transform: "rotate(360deg) scale(1.3)" },
        },
        forwardOpacity: {
          "0%": { opacity: "1", transform: "scale(0.65)" },
          "12.5%": { opacity: "0" },
          "25%": { opacity: "0" },
          "37.5%": { opacity: "0" },
          "50%": { opacity: "1", transform: "scale(0.65)" },
          "62.5%": { opacity: "0" },
          "75%": { opacity: "0" },
          "87.5%": { opacity: "0" },
          "100%": { opacity: "1", transform: "scale(0.65)" },
        },
        backwardAndScale: {
          "0%": { transform: "rotate(-0deg) scale(1)" },
          "12.5%": { transform: "rotate(-45deg) scale(1)" },
          "25%": { transform: "rotate(-90deg) scale(2)" },
          "37.5%": { transform: "rotate(-135deg) scale(1)" },
          "50%": { transform: "rotate(-180deg) scale(1)" },
          "62.5%": { transform: "rotate(-225deg) scale(1)" },
          "75%": { transform: "rotate(-270deg) scale(2)" },
          "87.5%": { transform: "rotate(-315deg) scale(1)" },
          "100%": { transform: "rotate(-360deg) scale(1)" },
        },
        mobileBackwardAndScale: {
          "0%": { transform: "rotate(-0deg) scale(1)" },
          "12.5%": { transform: "rotate(-45deg) scale(1)" },
          "25%": { transform: "rotate(-90deg) scale(1.3)" },
          "37.5%": { transform: "rotate(-135deg) scale(1)" },
          "50%": { transform: "rotate(-180deg) scale(1)" },
          "62.5%": { transform: "rotate(-225deg) scale(1)" },
          "75%": { transform: "rotate(-270deg) scale(1.3)" },
          "87.5%": { transform: "rotate(-315deg) scale(1)" },
          "100%": { transform: "rotate(-360deg) scale(1)" },
        },
        backwardOpacity: {
          "0%": { opacity: " 0" },
          "12.5%": { opacity: " 0" },
          "25%": { opacity: "1", transform: "scale(0.65)" },
          "37.5%": { opacity: " 0" },
          "50%": { opacity: " 0" },
          "62.5%": { opacity: " 0" },
          "75%": { opacity: "1", transform: "scale(0.65)" },
          "87.5%": { opacity: " 0" },
          "100%": { opacity: " 0" },
        },
      },
      animation: {
        blink: "blink 1.5s step-end infinite",
        forwardRotate: "forwardRotate 16s linear infinite",
        backwardRotate: "backwardRotate 16s linear infinite",
        forwardAndScale: "forwardAndScale 16s linear infinite",
        backwardAndScale: "backwardAndScale 16s linear infinite",
        forwardOpacity: "forwardOpacity 16s linear infinite",
        backwardOpacity: "backwardOpacity 16s linear infinite",
        mobileForwardAndScale: "mobileForwardAndScale 16s linear infinite",
        mobileBackwardAndScale: "mobileBackwardAndScale 16s linear infinite",
      },
      fontFamily: {
        kr: ["var(--font-kr)"],
        en: ["var(--font-en)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
