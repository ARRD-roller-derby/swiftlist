/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages_related/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        happy: {
          bg: '#fef6e4',
          button: '#f582ae',
          buttonText: '#001858',
          stroke: '#001858',
          text: '#172c66',
          secondary: '#8bd3dd',
          DEFAULT: '#f3d2c1',
        },
        teal: {
          lightest: '#f0f9f9',
          light: '#a6e3e3',
          DEFAULT: '#5ca4a9',
          dark: '#2a7e7d',
        },
        peach: {
          lightest: '#ffe8e1',
          light: '#ffc3a0',
          DEFAULT: '#d68060',
          dark: '#a63f1f',
        },
      },
      fontFamily: {
        default: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}
