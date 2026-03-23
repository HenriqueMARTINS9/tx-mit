import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        panel: "0 28px 80px rgba(2, 12, 27, 0.45)"
      },
      colors: {
        ink: "#06101d"
      }
    }
  },
  plugins: []
};

export default config;
