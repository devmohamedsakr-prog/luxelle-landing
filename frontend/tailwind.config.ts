import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'rose-gold':   '#e8b4bc',
        'warm-gold':   '#d4af37',
        'blush-pink':  '#f8c1d4',
        'luxelle-dark': '#0c0c0e',
      },
      backgroundColor: {
        'luxelle':        'var(--bg-primary)',
        'luxelle-card':   'var(--bg-secondary)',
        'luxelle-card-2': 'var(--bg-tertiary)',
      },
      textColor: {
        'luxelle':           'var(--text-primary)',
        'luxelle-secondary': 'var(--text-secondary)',
        'luxelle-tertiary':  'var(--text-tertiary)',
      },
      borderColor: {
        'luxelle-subtle': 'var(--border-subtle)',
        'luxelle-medium': 'var(--border-medium)',
      },
      boxShadow: {
        'luxelle-glow':      '0 0 24px var(--shadow-color)',
        'luxelle-glow-gold': '0 0 24px var(--shadow-gold)',
        'luxelle-card':      '0 4px 24px -4px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.1)',
        'luxelle-card-hover':'0 20px 60px -12px var(--shadow-color), 0 8px 24px -8px rgba(0,0,0,0.3)',
        'glass':             '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)',
        'inner-glow':        'inset 0 1px 0 rgba(232,180,188,0.12)',
      },
      backdropBlur: {
        'xs': '2px',
        'xl': '24px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-in-up':    'fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in-down':  'fadeInDown 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in-left':  'fadeInLeft 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in-right': 'fadeInRight 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':       'fadeIn 0.5s ease both',
        'scale-in':      'scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'orb-float':     'orbFloat 8s ease-in-out infinite',
        'glow-pulse':    'glowPulse 3s ease-in-out infinite',
        'shimmer':       'shimmer 1.8s infinite linear',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'spin-slow':     'spinSlow 20s linear infinite',
      },
      keyframes: {
        fadeInUp:    { from: { opacity: '0', transform: 'translateY(28px)' },  to: { opacity: '1', transform: 'translateY(0)' } },
        fadeInDown:  { from: { opacity: '0', transform: 'translateY(-20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeInLeft:  { from: { opacity: '0', transform: 'translateX(-28px)' },to: { opacity: '1', transform: 'translateX(0)' } },
        fadeInRight: { from: { opacity: '0', transform: 'translateX(28px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        fadeIn:      { from: { opacity: '0' },                                 to: { opacity: '1' } },
        scaleIn:     { from: { opacity: '0', transform: 'scale(0.92)' },       to: { opacity: '1', transform: 'scale(1)' } },
        orbFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%':      { transform: 'translate(-20px, 15px) scale(0.97)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px var(--shadow-color)' },
          '50%':      { boxShadow: '0 0 40px var(--shadow-color), 0 0 80px rgba(232,180,188,0.08)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0) translateX(-50%)' },
          '50%':      { transform: 'translateY(8px) translateX(-50%)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
