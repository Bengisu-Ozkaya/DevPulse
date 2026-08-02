/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: '#ede8f5',
        card: '#adbbda',
        secondary: '#8697c4',
        brand: '#7091e6',
        'brand-blue': '#7091e6',
        primary: '#7091e6',
        main: '#3d52a0',
        'app-hover': '#E6E1EE',
          heading: '#3d52a0', // Keeping the original line for clarity
          'heading-dark': '#374990',
      },
      borderColor: theme => ({
        ...theme('colors'),
        'custom': '#466f75',
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
