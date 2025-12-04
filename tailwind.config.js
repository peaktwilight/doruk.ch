/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial Noir Palette
        'noir': {
          950: '#0C0A09',  // Deepest black-brown
          900: '#1C1917',  // Rich charcoal
          800: '#292524',  // Dark warm gray
          700: '#44403C',  // Medium charcoal
          600: '#57534E',  // Warm gray
          500: '#78716C',  // Mid gray
          400: '#A8A29E',  // Light warm gray
          300: '#D6D3D1',  // Pale gray
          200: '#E7E5E4',  // Near white
          100: '#F5F5F4',  // Off-white
          50: '#FAFAF9',   // Cream white
        },
        // Accent - Warm Amber
        'amber': {
          DEFAULT: '#D97706',
          light: '#F59E0B',
          dark: '#B45309',
          muted: 'rgba(217, 119, 6, 0.15)',
        },
        // Secondary - Sage/Teal
        'sage': {
          DEFAULT: '#059669',
          light: '#10B981',
          dark: '#047857',
          muted: 'rgba(5, 150, 105, 0.15)',
        },
        // Tertiary - Soft Rose
        'rose': {
          DEFAULT: '#DB2777',
          light: '#EC4899',
          muted: 'rgba(219, 39, 119, 0.15)',
        },
      },
      fontFamily: {
        'serif': ['Fraunces', 'Georgia', 'serif'],
        'sans': ['DM Sans', 'system-ui', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        // Editorial type scale
        'display-xl': ['4.5rem', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'title': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subtitle': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'micro': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.12)',
        'elevated': '0 8px 40px rgba(0, 0, 0, 0.16)',
        'dramatic': '0 20px 60px rgba(0, 0, 0, 0.25)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'glow-amber': '0 0 40px rgba(217, 119, 6, 0.2)',
        'glow-sage': '0 0 40px rgba(5, 150, 105, 0.2)',
      },
      borderRadius: {
        'editorial': '3px',
        'soft': '8px',
        'card': '12px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
