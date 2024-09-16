import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "electric-violet": {
          DEFAULT: "#7240fe",
          50: "#f4f2ff",
          100: "#ebe8ff",
          200: "#dad4ff",
          300: "#bfb1ff",
          400: "#9f85ff",
          500: "#7240fe",
          600: "#7231f6",
          700: "#631fe2",
          800: "#5219be",
          900: "#45179b",
          950: "#290c69",
        },
      },
    },
    boxShadow: {
      DEFAULT: "0px 0px 10px 0px rgba(100, 116, 139, 0.07)",
      sm: "0 0 6px 0 rgba(100, 116, 139, 0.1)",
      md: "0 0 12px 0 rgba(100, 116, 139, 0.1)",
      lg: "0 0 16px 0 rgba(100, 116, 139, 0.1)",
      xl: "0 0 28px 0 rgba(100, 116, 139, 0.1)",
      "2xl": "0 0 32px 0 rgba(100, 116, 139, 0.1)",
      inner: "inset 0 2px 4px 0 rgba(100, 116, 139, 0.1)",
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}
export default config
