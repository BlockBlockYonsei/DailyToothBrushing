import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ['"Playwrite RO"', "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
