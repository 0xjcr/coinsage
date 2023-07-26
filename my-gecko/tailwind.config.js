/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
    },
    keyframes: {
      flip: {
        'from': {
          transform: 'rotateY(0deg)',
        },
        'to': {
          transform: 'rotateY(180deg)',
        },
      },
    },
    animation: {
      flip: 'flip 1s linear',
    },
  },
  plugins: [],
};

