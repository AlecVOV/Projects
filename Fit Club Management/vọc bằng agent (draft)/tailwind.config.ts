import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        border: '#e5e7eb',
        background: '#ffffff',
        foreground: '#111827',
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
      },
      maxWidth: {
        container: '1400px',
      },
      spacing: {
        'nav-height': '64px',
      },
      backdropBlur: {
        nav: '12px',
      },
    },
  },
  plugins: [],
} satisfies Config