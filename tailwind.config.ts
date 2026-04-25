import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#06070A',
          900: '#0B0D11',
          800: '#11141A',
          700: '#1B1F26',
          600: '#2C313A',
        },
        bone: {
          DEFAULT: '#EAE6DD',
          dim: '#A09B91',
          deep: '#6E6A62',
          fade: '#3D3A35',
        },
        vital: {
          DEFAULT: '#7CFFB7',
          dim: 'rgba(124, 255, 183, 0.5)',
          glow: 'rgba(124, 255, 183, 0.18)',
        },
        amber: '#F2C062',
        critical: '#FF6B6B',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'micro': ['10px', { lineHeight: '1.4', letterSpacing: '0.18em' }],
        'tiny': ['11px', { lineHeight: '1.5', letterSpacing: '0.15em' }],
        'eyebrow': ['12px', { lineHeight: '1.5', letterSpacing: '0.22em' }],
        'lead': ['clamp(1.5rem, 2.4vw, 2.4rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'diagnosis': ['clamp(2rem, 4vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'mega': ['clamp(2.4rem, 5.5vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      animation: {
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'cursor': 'cursor 1.05s steps(1) infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        cursor: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
