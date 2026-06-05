/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0D12",
        surface: "#121722",
        foreground: "#F5F7FA",
        muted: "#94A3B8",
        accent: "#6D5DFC",
        border: "rgba(148, 163, 184, 0.16)",
        ring: "rgba(109, 93, 252, 0.36)"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 60px rgba(109, 93, 252, 0.24)",
        soft: "0 18px 40px rgba(2, 6, 23, 0.42)"
      },
      borderRadius: {
        "3xl": "2rem"
      },
      backgroundImage: {
        "hero-grid": "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
