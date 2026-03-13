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
        ultraviolet: {
          DEFAULT: "#7A5CFF",
          50: "rgba(122, 92, 255, 0.5)",
          20: "rgba(122, 92, 255, 0.2)",
          10: "rgba(122, 92, 255, 0.1)",
        },
        "cipher-mint": {
          DEFAULT: "#1CF2C7",
          50: "rgba(28, 242, 199, 0.5)",
          20: "rgba(28, 242, 199, 0.2)",
        },
        "prism-cyan": {
          DEFAULT: "#46CFFF",
          50: "rgba(70, 207, 255, 0.5)",
          20: "rgba(70, 207, 255, 0.2)",
        },
        "signal-coral": {
          DEFAULT: "#FF8E72",
          50: "rgba(255, 142, 114, 0.5)",
          20: "rgba(255, 142, 114, 0.2)",
        },
        cloud: "#F6F8FF",
        mist: "#91A2C7",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "slide-in": "slide-in 0.5s ease-out forwards",
        "spin-slow": "spin 8s linear infinite",
        "word-flow": "word-flow 15s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(122, 92, 255, 0.2)",
            borderColor: "rgba(122, 92, 255, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(122, 92, 255, 0.4)",
            borderColor: "rgba(122, 92, 255, 0.4)",
          },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "word-flow": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      backgroundImage: {
        "gradient-ultraviolet": "linear-gradient(135deg, #7A5CFF 0%, #46CFFF 100%)",
        "gradient-mint": "linear-gradient(135deg, #1CF2C7 0%, #46CFFF 100%)",
        "gradient-coral": "linear-gradient(135deg, #FF8E72 0%, #7A5CFF 100%)",
        "gradient-hero": "linear-gradient(180deg, #050816 0%, #0B1123 50%, #050816 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-radial-uv":
          "radial-gradient(ellipse at center, rgba(122, 92, 255, 0.15) 0%, transparent 70%)",
        "gradient-radial-mint":
          "radial-gradient(ellipse at center, rgba(28, 242, 199, 0.1) 0%, transparent 70%)",
        "gradient-uv-cyan": "linear-gradient(135deg, #7A5CFF 0%, #46CFFF 100%)",
        "gradient-mint-cyan": "linear-gradient(135deg, #1CF2C7 0%, #46CFFF 100%)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
