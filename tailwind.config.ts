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
        primary: '#00829c',
        oldPrimary: '#35b8be',
        lightBrand: '#f5fbfc',
        headings: '#191b22',
        text: '#546285',
      },
    },
  },
  plugins: [],
};
export default config;
