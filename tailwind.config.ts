import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Background — warm parchment system
        paper: {
          DEFAULT: '#F5F1E8',
          warm: '#EFE9D9',     // deeper section backgrounds
          card: '#FAF7EE',     // raised surfaces
          edge: '#E5DFCE',     // subtle borders
        },
        // Text — never harsh black
        ink: {
          DEFAULT: '#1A1815',
          dim: '#5A554C',
          deep: '#8B8478',
          fade: '#B8B0A0',
        },
        // Single confident accent — terracotta/sienna
        terra: {
          DEFAULT: '#B8543B',
          deep: '#8E3F2C',
          soft: '#D88E78',
          tint: '#F2D9CF',
        },
        // Quiet secondary — antique gold for editorial details
        gold: {
          DEFAULT: '#A8842F',
          soft: '#D4B669',
        },
        // Reserved for "good news" KPIs — moss green
        moss: {
          DEFAULT: '#5C7544',
          deep: '#3F5230',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'micro': ['10.5px', { lineHeight: '1.4', letterSpacing: '0.18em' }],
        'tiny': ['11.5px', { lineHeight: '1.5', letterSpacing: '0.12em' }],
        'eyebrow': ['12px', { lineHeight: '1.5', letterSpacing: '0.22em' }],
        'small': ['13.5px', { lineHeight: '1.55' }],
        'body': ['16px', { lineHeight: '1.65' }],
        'lead': ['clamp(1.25rem, 1.6vw, 1.55rem)', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
        'h3': ['clamp(1.6rem, 2.4vw, 2.2rem)', { lineHeight: '1.18', letterSpacing: '-0.02em' }],
        'h2': ['clamp(2.2rem, 4vw, 3.8rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'h1': ['clamp(3rem, 8vw, 7.5rem)', { lineHeight: '0.92', letterSpacing: '-0.045em' }],
        'mega': ['clamp(4rem, 12vw, 12rem)', { lineHeight: '0.85', letterSpacing: '-0.055em' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scaleIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'shimmer': 'shimmer 2.4s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'sway': 'sway 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
