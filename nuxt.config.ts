// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },


  css: ['~/assets/main.css'],

  modules: [
      '@nuxtjs/tailwindcss',
      'nuxt-icon'
  ],

  plugins: [
    { src: '~/plugins/keycloak.client.js' },
  ],

  runtimeConfig: {
    public: {
      STUDENTS_API: process.env.STUDENTS_API,
      LIBRARY_API: process.env.LIBRARY_API,
      LIBRARY_ROLE: process.env.LIBRARY_ROLE,
      API: process.env.API,
      KEY_CLOAK_API_URL: process.env.KEY_CLOAK_API_URL,
      REALM: process.env.REALM,
      CLIENT_ID: process.env.CLIENT_ID,
      UI_URL: process.env.UI_URL,
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}

    }
  },

})
