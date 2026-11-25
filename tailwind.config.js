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
        bg: '#F7F5F0', // warm ledger paper
        surface: '#FFFFFF',
        'surface-2': '#F1EEE7', // sidebar, table headers
        border: '#DDD8CC', // 1px borders
        'border-strong': '#8C8573',
        ink: '#16213A', // Primary deep ink text
        'ink-2': '#3E4A63', // Secondary text
        'ink-3': '#5A6275', // Muted text
        accent: {
          DEFAULT: '#0E6466', // Deep teal
          hover: '#0A4F51',
        },
        sidebar: '#16213A', // Deep navy for Admin, warm neutral for Startups
        status: {
          success: '#1D5E3A',
          'success-bg': '#E4F1E8',
          warning: '#7A4A00',
          'warning-bg': '#FBF0D9',
          error: '#9B1C1C',
          'error-bg': '#FBE6E4',
          info: '#1E4E8C',
          'info-bg': '#E5EEF9',
          neutral: '#4A5266',
          'neutral-bg': '#ECEAE4',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '10px',
        'xl': '14px',
        'pill': '9999px',
      },
      boxShadow: {
        'ledger': '0 1px 3px rgba(22, 33, 58, 0.05)',
      }
    },
  },
  plugins: [],
}
