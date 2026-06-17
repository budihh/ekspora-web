import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        base: "var(--color-base)",
        surface: {
          DEFAULT: "var(--color-surface)",
          2: "var(--color-surface-2)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          hairline: "var(--color-border-hairline)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          2: "var(--color-accent-2)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["var(--text-display-xl)", { letterSpacing: "-3.0px", lineHeight: "1.05" }],
        "display-lg": ["var(--text-display-lg)", { letterSpacing: "-2.5px", lineHeight: "1.1" }],
        "display": ["var(--text-display)", { letterSpacing: "-2.0px", lineHeight: "1.1" }],
        "h1": ["var(--text-h1)", { letterSpacing: "-1.5px", lineHeight: "1.2" }],
        "h2": ["var(--text-h2)", { letterSpacing: "-1.0px", lineHeight: "1.3" }],
        "h3": ["var(--text-h3)", { letterSpacing: "-0.5px", lineHeight: "1.4" }],
        "body": ["var(--text-body)", { letterSpacing: "0px", lineHeight: "1.6" }],
        "small": ["var(--text-small)", { letterSpacing: "0px", lineHeight: "1.5" }],
        "micro": ["var(--text-micro)", { letterSpacing: "0.02em", lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
};

export default config;
