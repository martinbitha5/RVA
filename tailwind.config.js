/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // RDC institutional palette (used with restraint per CLAUDE.md §1.2)
        rdc: {
          blue: '#003DA5',
          'blue-dark': '#002E7A',
          'blue-light': '#1E5BC6',
          yellow: '#FFCE00',
          'yellow-warm': '#F2C200',
          red: '#CE1126',
          'red-dark': '#A30D1F',
          green: '#009A44',
          'green-dark': '#007A36',
          cream: '#F7F7F2',
          sand: '#D9C7A7',
          anthracite: '#1A1A1A',
        },
        // shadcn/ui tokens (HSL via CSS vars in globals.css)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        'display-xs': ['1.5rem',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-sm': ['2rem',     { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['2.75rem',  { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem',   { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'display-xl': ['4.5rem',   { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-2xl': ['6rem',    { lineHeight: '0.9',  letterSpacing: '-0.035em' }],
        'display-3xl': ['7.5rem',  { lineHeight: '0.88', letterSpacing: '-0.04em' }],
      },
      boxShadow: {
        'premium':     '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        'premium-lg':  '0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)',
        'blue':        '0 8px 32px rgba(0,61,165,0.35)',
        'blue-lg':     '0 16px 48px rgba(0,61,165,0.45)',
        'inset-bottom':'inset 0 -2px 0 0',
      },
      backgroundImage: {
        'gradient-night': 'linear-gradient(135deg, #080F1E 0%, #0D1B3E 50%, #003DA5 100%)',
        'gradient-blue':  'linear-gradient(135deg, #003DA5 0%, #001E6E 100%)',
        'gradient-rdc':   'linear-gradient(90deg, #003DA5, #FFCE00, #CE1126, #009A44)',
        'gradient-dark':  'linear-gradient(180deg, rgba(8,15,30,0) 0%, rgba(8,15,30,0.9) 100%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'ping-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease both',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'ping-slow': 'ping-slow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
