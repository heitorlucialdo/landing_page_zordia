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
        'bounce-slow':  'bounce 2s ease-in-out infinite',
        'pulse-neon':   'pulseNeon 2s ease-in-out infinite',
        blink:          'blink 1s step-end infinite',
        spin:           'spin 1s linear infinite',
        'border-spin':  'border-spin 3s linear infinite',
        marquee:        'marquee 28s linear infinite',
        sonar:          'sonar 2s ease-out infinite',
        'sonar-delay':  'sonar 2s ease-out 1s infinite',
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
        'border-spin': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        sonar: {
          '0%':   { transform: 'scale(1)',   opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
