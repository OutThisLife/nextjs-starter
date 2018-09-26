const { withPlugins } = require('next-compose-plugins')
const typescript = require('@zeit/next-typescript')
const offline = require('next-offline')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const plugins = [
  typescript,
  [
    offline,
    {
      workboxOpts: {
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'networkFirst',
            options: {
              cacheName: 'https-calls',
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 30 * 24 * 60 * 60
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    },
    ['!', PHASE_DEVELOPMENT_SERVER]
  ]
]

const config = {
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|otf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: ['babel-loader', 'raw-loader']
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      }
    )

    return config
  },

  exportPathMap() {
    return {
      '/': { page: '/' }
    }
  }
}

module.exports = withPlugins(plugins, config)
