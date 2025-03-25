// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,

  modules: [
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxt/ui",
    "@nuxt/icon",
    "@nuxt/test-utils",
  ],
  css: ["~/assets/css/main.css"],
});
