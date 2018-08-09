const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
  require('dotenv').config()
}

module.exports = {
  assetPrefix: isDev ? '' : process.env.SERVER,
  useFileSystemPublicRoutes: false,
  publicRuntimeConfig: {
    CMS: process.env.CMS
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.output.publicPath = `${process.env.SERVER}${config.output.publicPath}`
    }

    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.(css|scss|svg)/,
        use: ['babel-loader', 'raw-loader']
      }
    )

    return config
  }
}
