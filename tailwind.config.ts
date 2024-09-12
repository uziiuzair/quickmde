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
