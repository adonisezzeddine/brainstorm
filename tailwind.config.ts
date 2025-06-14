import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#18181A",
          sidebar: "#202123",
          card: "#232329",
        },
        foreground: {
          DEFAULT: "#F7F7F8",
          secondary: "#A3A3A8",
        },
        border: {
          DEFAULT: "#26262A",
        },
        primary: {
          DEFAULT: "#4F8CFF",
          chatgpt: "#10A37F",
        },
        accent: {
          DEFAULT: "#35353B",
        },
        muted: {
          DEFAULT: "#8E8EA0",
        },
        destructive: {
          DEFAULT: "#DA3633",
        },
        card: "#232329",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
