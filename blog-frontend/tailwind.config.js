/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000000',
        'card': '#263d4d',
        'input': '#596771',
        'accent-dark': '#466f75',
        'brand': '#263d4d',
        'main': '#ffffff',
        'secondary': '#babcc6',
        'navbar': '#5d4173',
        'meta': '#989aab',
        'card-border': '#845ca3',
        'accent': '#5d4173',
        'highlight': '#a374bb',
        'auth-text': '#d6c6e0',
        'input-text': '#845ca3',
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
