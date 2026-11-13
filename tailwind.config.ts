import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { forest: "#244a36", leaf: "#78a987", cream: "#f7f8f2" } } },
  plugins: []
};

export default config;
