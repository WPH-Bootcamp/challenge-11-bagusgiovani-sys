import type { Config } from "tailwindcss";

// Generate 1:1 spacing ratio (0-1000px)
const generateSpacing = () => {
  const spacing: Record<string, string> = {};
  for (let i = 0; i <= 1000; i++) {
    spacing[i.toString()] = `${i}px`;
  }
  return spacing;
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: generateSpacing(),
      typography: {
        // Extended typography classes
        "display-2xl-bold": {
          fontSize: "4.5rem",
          fontWeight: "700",
          lineHeight: "1.1",
        },
      },
      colors: {
        // Design system colors will be defined in globals.css
      },
    },
  },
  plugins: [],
};

export default config;