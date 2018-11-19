require('dotenv').load()

const { withPlugins } = require('next-compose-plugins')
const withTypescript = require('@zeit/next-typescript')
const withOffline = require('next-offline')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const config = {
  publicRuntimeConfig: {
    isDev: process.env.NODE_ENV !== 'production'
  },
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
  }
}

const plugins = [
  withTypescript,
  [
    withOffline,
    {
      workboxOpts: {
        runtimeCaching: [
          {
            urlPattern: /.(png|jpg|gif|mp4|ogg)$/,
            handler: 'cacheFirst'
          },
          {
            urlPattern: /graphql$/,
            handler: 'networkFirst',
            options: {
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

module.exports = withPlugins(plugins, config)
