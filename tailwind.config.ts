import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050816",
        abyss: "#0B1123",
        ultraviolet: "#7A5CFF",
        "cipher-mint": "#1CF2C7",
        "prism-cyan": "#46CFFF",
        "signal-coral": "#FF8E72",
        cloud: "#F6F8FF",
        mist: "#91A2C7",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
