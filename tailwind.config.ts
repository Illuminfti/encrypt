import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050816",
        abyss: "#0B1123",
        ultraviolet: {
          DEFAULT: "#7A5CFF",
          50: "rgba(122, 92, 255, 0.5)",
          20: "rgba(122, 92, 255, 0.2)",
          10: "rgba(122, 92, 255, 0.1)",
          5: "rgba(122, 92, 255, 0.05)",
        },
        "cipher-mint": {
          DEFAULT: "#1CF2C7",
          50: "rgba(28, 242, 199, 0.5)",
          20: "rgba(28, 242, 199, 0.2)",
          10: "rgba(28, 242, 199, 0.1)",
        },
        "prism-cyan": {
          DEFAULT: "#46CFFF",
          50: "rgba(70, 207, 255, 0.5)",
          20: "rgba(70, 207, 255, 0.2)",
        },
        "signal-coral": {
          DEFAULT: "#FF8E72",
          20: "rgba(255, 142, 114, 0.2)",
          10: "rgba(255, 142, 114, 0.1)",
        },
        cloud: "#F6F8FF",
        mist: "#91A2C7",
      },
      fontFamily: {
        display: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "sans-serif",
        ],
        body: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      maxWidth: {
        shell: "1440px",
        content: "1200px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      borderRadius: {
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
