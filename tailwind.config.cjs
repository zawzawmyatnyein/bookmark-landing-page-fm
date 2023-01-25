const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'soft-blue': 'hsl(231, 69%, 60%)',
        'soft-red': 'hsl(0, 94%, 66%)',
        'gray-blue': 'hsl(229, 8%, 60%)',
        'dark-blue': 'hsl(229, 31%, 21%)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
