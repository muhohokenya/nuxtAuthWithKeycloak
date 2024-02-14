/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./nuxt.config.{js,ts}",
  ],
  css: ['~/assets/main.css'],
  theme: {
    extend: {},
  },
  plugins: [],
}

