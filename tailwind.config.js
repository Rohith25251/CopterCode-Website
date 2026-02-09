/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
      colors: {
        background: "#FFFFFF", // Pure White
        surface: "#F1F5F9", // Slate 100
        "surface-highlight": "#E2E8F0", // Slate 200
        primary: "#020617", // Slate 950 (Almost Black)
        secondary: "#334155", // Slate 700 (Dark Steel) - Better Contrast
        accent: "#334155", // Slate 700 (Dark Steel)
        "accent-dark": "#1E293B", // Slate 800
        border: "#CBD5E0", // Slate 300
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
