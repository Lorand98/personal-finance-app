import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          500: '#98908B',
          100: '#F8F4F0',
        },
        slate: {
          600: '#666CA3',
        },
        grey: {
          900: '#201F24',
          500: '#696868',
          300: '#B3B3B3',
          100: '#F2F2F2',
        },
        green: '#277C78',
        yellow: '#F2CDAC',
        cyan: '#82C9D7',
        navy: '#626070',
        red: '#C94736',
        purple: {
          500: '#826CB0',
          300: '#AF81BA',
        },
        turquoise: '#597C7C',
        brown: '#93674F',
        magenta: '#934F6F',
        blue: '#3F82B2',
        navyGrey: '#97A0AC',
        armyGreen: '#7F9161',
        gold: '#CAB361',
        orange: '#BE6C49',
      },
      spacing: {
        50: '0.25rem',  // 4px
        100: '0.5rem',   // 8px
        150: '0.75rem',  // 12px
        200: '1rem',     // 16px
        250: '1.25rem',  // 20px
        300: '1.5rem',   // 24px
        400: '2rem',     // 32px
        500: '2.5rem',   // 40px
      },
      fontSize: {
        'preset-1': ['2rem', { lineHeight: '1.2' }],    // 32px, 120% line height
        'preset-2': ['1.25rem', { lineHeight: '1.2' }], // 20px, 120% line height
        'preset-3': ['1rem', { lineHeight: '1.5' }],    // 16px, 150% line height
        'preset-4': ['0.875rem', { lineHeight: '1.5' }],// 14px, 150% line height
        'preset-5': ['0.75rem', { lineHeight: '1.5' }], // 12px, 150% line height
      },
    },
  },
  plugins: [],
};
export default config;
