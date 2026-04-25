import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Obsidian foundation
        ink: {
          950: '#070809',
          900: '#0B0D0F',
          800: '#111418',
          700: '#1A1E24',
          600: '#252B33',
          500: '#3A424D',
        },
        // Signal — electric cyan, the "data" color
        signal: {
          DEFAULT: '#5BE9E9',
          dim: '#3FB8B8',
          glow: '#7FFFEF',
        },
        // Warmth — amber, the "human" color
        ember: {
          DEFAULT: '#E8A14B',
          deep: '#B87020',
          pale: '#F5D199',
        },
        // Bone — warm off-white
        bone: {
          DEFAULT: '#E8E4DC',
          dim: '#A8A49A',
          deep: '#6B6862',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'mega': ['clamp(3rem, 12vw, 14rem)', { lineHeight: '0.88', letterSpacing: '-0.04em' }],
        'huge': ['clamp(2.5rem, 8vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'large': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'drift': 'drift 20s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.97' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-50%, -50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'grid-fine': 'linear-gradient(to right, rgba(91, 233, 233, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(91, 233, 233, 0.04) 1px, transparent 1px)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix values='0 0 0 0 0.36 0 0 0 0 0.91 0 0 0 0 0.91 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
