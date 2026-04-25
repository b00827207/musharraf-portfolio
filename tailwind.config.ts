import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Near-black operating room background
        ink: {
          950: '#08090A',
          900: '#0E1011',
          800: '#16191B',
          700: '#22262A',
          600: '#3A3F44',
        },
        // Bone — primary text
        bone: {
          DEFAULT: '#EAE6DD',
          dim: '#A09B91',
          deep: '#6E6A62',
          fade: '#3D3A35',
        },
        // The single accent — vital green. Only on EKG and active states.
        vital: {
          DEFAULT: '#7CFFB7',
          dim: 'rgba(124, 255, 183, 0.5)',
          glow: 'rgba(124, 255, 183, 0.18)',
        },
        // Critical — only used to signal a "presenting symptom"
        critical: '#FF6B6B',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fluid scale
        'micro': ['10px', { lineHeight: '1.4', letterSpacing: '0.18em' }],
        'tiny': ['11px', { lineHeight: '1.5', letterSpacing: '0.15em' }],
        'eyebrow': ['12px', { lineHeight: '1.5', letterSpacing: '0.22em' }],
        'lead': ['clamp(1.5rem, 2.4vw, 2.4rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'diagnosis': ['clamp(2.4rem, 5.2vw, 5.6rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'mega': ['clamp(3rem, 7vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      animation: {
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'cursor': 'cursor 1.05s steps(1) infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'count-tick': 'countTick 0.4s ease-out',
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
        countTick: {
          '0%': { transform: 'translateY(-4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
