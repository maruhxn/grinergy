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
      },
      animation: {
        blink: "blink 1.5s step-end infinite",
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
