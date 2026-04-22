import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black:    '#000000',
          purple:   '#270036',
          neon:     '#CC00FF',
          'neon-10': 'rgba(204,0,255,0.10)',
          'neon-20': 'rgba(204,0,255,0.20)',
          'neon-30': 'rgba(204,0,255,0.30)',
          'neon-60': 'rgba(204,0,255,0.60)',
        },
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        neon:      '0 0 20px rgba(204,0,255,0.3)',
        'neon-lg': '0 0 40px rgba(204,0,255,0.5)',
        'neon-sm': '0 0 10px rgba(204,0,255,0.2)',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(to bottom, #270036, #000000)',
      },
      animation: {
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'pulse-neon':  'pulseNeon 2s ease-in-out infinite',
        blink:         'blink 1s step-end infinite',
        spin:          'spin 1s linear infinite',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(204,0,255,0.3)' },
          '50%':      { boxShadow: '0 0 30px rgba(204,0,255,0.8)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
