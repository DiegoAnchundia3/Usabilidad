/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        shake: 'shake 0.5s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        float: 'float 3s ease-in-out infinite',
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(102, 126, 234, 0.5)' },
          '50%': { boxShadow: '0 0 25px rgba(102, 126, 234, 0.8)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e6edff',
          200: '#d1dfff',
          300: '#a6c1ff',
          400: '#779aff',
          500: '#667eea',
          600: '#5a6dd8',
          700: '#4c5bc4',
          800: '#3e4a9e',
          900: '#344080',
        },
        secondary: {
          50: '#f7f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#764ba2',
          600: '#6d44a0',
          700: '#5b3485',
          800: '#4c2c6d',
          900: '#3f2559',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e2228',
          900: '#12161a',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e2228 0%, #12161a 100%)',
      },
      fontFamily: {
        dyslexic: [
          'OpenDyslexic',
          'Comic Sans MS',
          'Trebuchet MS',
          'Arial',
          'sans-serif',
        ],
      },
      backdropBlur: {
        xs: '2px',
      },
      fontSize: {
        accessibility: 'var(--accessibility-font-size)',
      },
      lineHeight: {
        accessibility: 'var(--accessibility-line-height)',
      },
      letterSpacing: {
        accessibility: 'var(--accessibility-letter-spacing)',
      },
      saturate: {
        accessibility: 'var(--accessibility-saturation)',
      },
    },
  },
  plugins: [require('./src/plugins/accessibility-plugin.js')],
};
