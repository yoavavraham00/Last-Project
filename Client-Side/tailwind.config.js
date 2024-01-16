/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    // paths to all of your components where Tailwind CSS classes will be used
    './src/**/*.{js,jsx,ts,tsx}',
    // ...
  ],
  theme: {
    extend: {
      backgroundImage: {
        'club-bg': "url('./Pictures/club-background.png')",
      },
      colors: {
        'rich-brown': '#5B3A29',
        // add more custom colors as needed
      },
      // add other customizations here
    },
  },
  plugins: [],
}


