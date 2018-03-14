require('dotenv').load()
require('dotenv').load()

const fetch = require('isomorphic-fetch')

module.exports = {
  useFileSystemPublicRoutes: false,
  webpack: config => {
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
  },

  async exportPathMap () {
    const pages = { '/': { page: '/' } }

    try {
      const json = await (await fetch(process.env.CMS)).json()
      json.pages.map(page => {
        pages[page.url] = { page: '/' }
      })
    } catch (e) {
      throw e
    }

    return pages
  }
}
