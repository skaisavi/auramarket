import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "hsl(var(--canvas))",
        surface: "hsl(var(--surface))",
        "surface-strong": "hsl(var(--surface-strong))",
        ink: "hsl(var(--ink))",
        muted: "hsl(var(--muted))",
        line: "hsl(var(--line))",
        sage: {
          50: "#f3f7f1",
          100: "#e3eddf",
          300: "#afc9a7",
          500: "#6f9367",
          700: "#496842"
        },
        clay: {
          50: "#fbf4ef",
          200: "#eed0c0",
          500: "#bd7658",
          700: "#85503d"
        },
        pearl: "#fbfaf7",
        gold: "#b99a5f"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(67, 72, 62, 0.12)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.78)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      borderRadius: {
        "2xl": "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;
