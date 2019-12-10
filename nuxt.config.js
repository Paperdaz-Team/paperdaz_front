const pkg = require('./package');

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no' },
      {
        name: 'google-signin-client_id',
        content: '993472828761-ucqhdqlicnonq0s8b7t18c4nejittcgp.apps.googleusercontent.com',
      },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: 'Paperdaz' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
      { href: '/font.css' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
      },
    ],
    script: [
      {
        src: '/jquery.min.js',
      }, {
        src: 'https://apis.google.com/js/platform.js',
        async: true,
        defer: true,
      }, {
        src: 'https://connect.facebook.net/en_US/sdk.js',
        async: true,
        defer: true,
      }, {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js',
        async: true,
        defer: true,
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js',
        integrity: 'sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA',
        crossorigin: 'anonymous',
        defer: true,
      },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'vuetify/dist/vuetify.css',
    '~/assets/css/ionicons.min.css',
    '~/assets/css/custom.css',
    '~/assets/css/animate.min.css',
    '~/assets/css/themify-icons.css',
    {
      src: 'ant-design-vue/dist/antd.less',
      lang: 'less',
    }, {
      src: '@/assets/scss/main.scss',
      lang: 'scss',
    },
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/vee-validate.js', ssr: true },
    { src: '~plugins/shards-vue.js' },
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/config.js', ssr: false },
    { src: '~/plugins/boots.js', ssr: false },
    '~/plugins/route',
    '@/plugins/antd-ui',
    '@/plugins/prototypes',
  ],

  /*
  **Nuxt.js dev-modules
  */
  devModules: [
    '@nuxtjs/vuetify',
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module#usage
    '@nuxtjs/dotenv',
    // Progressive Web App Module
    '@nuxtjs/pwa',
  ],

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {},

  /*
  **Prograssive Web App Configration
  */
  manifest: {
    name: 'Paperdaz',
    lang: 'en',
    display: 'standalone',
    title: 'Paperdaz',
    'og:title': 'Paperdaz',
    description: 'Reduce carbon footprint in the world we live in',
    'og:description': 'Reduce carbon footprint in the world we live in',
    theme_color: '#77c35f',
    background_color: '#fafafa',
    start_url: '/',
    short_name: 'Paperdaz',
  },

  workbox: {
    autoRegister: true,
    skipWaiting: true,
    clientsClaim: true,
    offlineAnalytics: true,
    cleanupOutdatedCaches: true,
    offlineStrategy: 'StaleWhileRevalidate',
    cacheNames: {
      prefix: 'paperdaz_cache',
      suffix: 'v1',
      precache: 'precache',
      runtime: 'runtimecache',
    },
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  router: {
    middleware: ['auth'],
  },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'ant-design-vue',
            // libraryDirectory: 'es'
            // style: true
          },
          'ant-design-vue',
        ],
      ],
    },
    splitChunks: {
      layouts: true,
    },
    loaders: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#78C360',
          'link-color': '#78C360',
          'component-background': '#ffffff',
        },
      },
    },
    extend(config, { loaders: { scss } }) {
      // eslint-disable-next-line no-param-reassign
      scss.includePaths = ['node_modules'];
    },
  },

  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    timing: false,
  },
};
