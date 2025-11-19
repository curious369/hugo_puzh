/** @type {import('tailwindcss').Config} */

// ═══════════════════════════════════════════════════════════════════
// PUZH.COM DESIGN SYSTEM
// ═══════════════════════════════════════════════════════════════════
// RESPONSIVE BREAKPOINTS (Apple Standard):
// - iPhone: < 768px (320-428px)
// - iPad: 768px - 1024px
// - Desktop: > 1024px
//
// CONTAINER:
// - iPhone/iPad: Full-width (px-4 padding)
// - Desktop: max-w-[1100px] centered
//
// FONT-GROSSEN IN STEIN GEMEISSELT (wie monninghoff.com):
// - text-5xl: Hero Headline
// - text-4xl: Section Headlines
// - text-xl: Body Text
// - text-sm: Nav, Footer, Buttons
// - text-xs: Micro Copy
//
// BUTTONS: px-4 py-1.5 rounded-full text-sm font-medium
// SPACING: gap-8 (32px) zwischen Nav-Items
// ═══════════════════════════════════════════════════════════════════

module.exports = {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    "./layouts/**/*.html",
    "./content/**/*.{md,html}",
  ],
  theme: {
    // CUSTOM BREAKPOINTS (Apple Standard)
    screens: {
      'sm': '640px',   // Small phones
      'md': '768px',   // iPad portrait
      'lg': '1024px',  // iPad landscape / Small desktop
      'xl': '1280px',  // Desktop
      '2xl': '1536px', // Large desktop
    },
    extend: {
      colors: {
        // BLACK/WHITE Design
        'puzh': {
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
        },
        // Primary color (like monninghoff.com)
        primary: {
          600: '#000000',  // Black buttons
          700: '#262626',  // Hover state
        }
      },
      maxWidth: {
        'content': '1100px',  // Desktop Container (wie monninghoff.com)
      },
      fontFamily: {
        // System fonts (performance + native feel)
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
