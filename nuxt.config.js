export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - ${process.env.SITE_TITLE}` : process.env.SITE_TITLE
    },
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=yes' },
      { name: 'author', content: 'Mark Crawley' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'true' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;500;600&display=swap' }
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.8.0/dist/cookieconsent.js', body: true, defer: true },
      { src: '/js/cookie-consent-init.js', body: true, defer: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css/normalize.css',
    '~/assets/css/main',
    '~/assets/css/cookie-consent'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/contentful'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',

    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',

    '@nuxtjs/robots'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/markdownit',
    
    '@nuxtjs/style-resources',

    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  },

  // Custom CSS class for active page hrefs
  router: {
    linkExactActiveClass: 'current'
  },

  // Config variables and defaults
  publicRuntimeConfig: {
    SITE_TITLE: process.env.SITE_TITLE || 'Space Between Therapy',

    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_API_URL: process.env.CTF_API_URL || 'cdn.contentful.com',

    CTF_CONTENT_TYPE_PAGE: process.env.CTF_CONTENT_TYPE_PAGE || 'page',
    CTF_CONTENT_TYPE_BLOG_POST: process.env.CTF_CONTENT_TYPE_BLOG_POST || 'blogPost',
    CTF_CONTENT_TYPE_CONTACT_INFO: process.env.CTF_CONTENT_TYPE_CONTACT_INFO || 'contactInfo',
    CTF_CONTENT_TYPE_MAIN_MENU: process.env.CTF_CONTENT_TYPE_MAIN_MENU || 'mainMenu',
    CTF_CONTENT_TYPE_FOOTER_MENU: process.env.CTF_CONTENT_TYPE_FOOTER_MENU || 'footerMenu',
    CTF_CONTENT_TYPE_HOME_MENU: process.env.CTF_CONTENT_TYPE_HOME_MENU || 'homeMenu',

    ACAST_SHOW_ID: process.env.ACAST_SHOW_ID || '6230990be23a6d0012c856e6'
  },

  // Module configs
  markdownit: {
    injected: true,
    linkify: true
  },

  robots: {
    UserAgent: '*',
    Disallow: ''
  },

  render: {
    // We don't need JS injected
    injectScripts: false,
    resourceHints: false
  },

  hooks: {
    // JS tags remain in static files https://github.com/nuxt/nuxt.js/issues/8178
    'generate:page': page => {
      const $ = require('cheerio')
      const doc = $.load(page.html)

      // Clean Vue data- attributes because we don't use client-side JS
      doc('*').each((i, node) => {
        Object.keys(node.attribs).forEach((attr) => {
          if (['data-n-head-ssr', 'data-n-head', 'data-hid', 'data-server-rendered', 'data-fetch-key'].indexOf(attr) >= 0) {
            doc(node).removeAttr(attr)
          }
        })
      })

      page.html = doc.html()
    }
  },

  styleResources: {
    scss: ['~/assets/css/*.scss']
  },

  // https://google-analytics.nuxtjs.org/setup
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID || 'G-RS6L04XFVD'
  },

  // Force generation of our routes from Contentful
  generate: {
    subFolders: false,
    crawler: false,
    // fallback: '404.html',

    routes () {
      const contentful = require("contentful")
      const client = contentful.createClient({
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
        host: process.env.CTF_API_URL
      })

      return Promise.all([
        client.getEntries({
          content_type: 'page',
          'fields.slug[ne]': 'index'
        }),
        client.getEntries({
          content_type: 'blogPost'
        })
      ]).then(([pages, posts]) => {
        return [
          ...pages.items.map(entry => '/' + entry.fields.slug),
          ...posts.items.map(entry => '/journal/' + entry.fields.slug)
        ];
      });
    }
  },

  sitemap: {
    hostname: 'https://spacebetweentherapy.com'
  }
}
