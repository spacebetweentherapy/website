export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - Space Between` : 'Space Between'
    },
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'author', content: 'Mark Crawley' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css/normalize.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/contentful.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/markdownit'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    cache: true,
    hardSource: true
  },

  // Custom CSS class for active page hrefs
  router: {
    linkExactActiveClass: 'current'
  },

  // Config variables and defaults
  publicRuntimeConfig: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_API_URL: process.env.CTF_API_URL || 'cdn.contentful.com',

    CTF_CONTENT_TYPE_PAGE: process.env.CTF_CONTENT_TYPE_PAGE || 'page',
    CTF_CONTENT_TYPE_HOME: process.env.CTF_CONTENT_TYPE_HOME || 'home',
    CTF_CONTENT_TYPE_MENU: process.env.CTF_CONTENT_TYPE_MENU || 'menu',
    CTF_CONTENT_TYPE_CONTACT: process.env.CTF_CONTENT_TYPE_CONTACT || 'contact',
    CTF_CONTENT_TYPE_TESTIMONIAL: process.env.CTF_CONTENT_TYPE_TESTIMONIAL || 'testimonial',
    CTF_CONTENT_ID_MAIN_MENU: process.env.CTF_CONTENT_ID_MAIN_MENU || 'main-menu',
    CTF_CONTENT_ID_FOOTER_MENU: process.env.CTF_CONTENT_ID_FOOTER_MENU || 'footer-menu'
  },

  // Module configs
  markdownit: {
    injected: true,
    linkify: true
  }
}
