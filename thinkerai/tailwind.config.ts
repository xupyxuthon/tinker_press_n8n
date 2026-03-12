import type { Config } from 'tailwindcss';

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sage-gold': 'hsl(45, 80%, 52%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
