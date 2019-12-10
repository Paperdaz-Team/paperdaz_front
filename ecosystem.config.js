module.exports = {
  apps: [
    {
      name: 'ui',
      port: 4000,
      script: './node_modules/nuxt/bin/nuxt-start',
      cwd: '/opt/bitnami/apache2/htdocs/nuxt-paperdaz/',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        APP_URL: 'https://paperdaz.com',
        API_URL: 'https://api.paperdaz.com'
      }
    }
  ]
};
