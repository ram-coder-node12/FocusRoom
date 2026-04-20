/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          hover: '#1e1e1e',
          DEFAULT: '#141414',
          elevated: '#2a2a2a',
        },
        primary: {
          DEFAULT: '#0a0a0a'
        },
        accent: {
          DEFAULT: '#7c3aed',
          hover: '#6d28d9',
          blue: '#6366f1'
        },
        text: {
          primary: '#f5f5f5',
          secondary: '#a3a3a3'
        },
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
