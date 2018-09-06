/* eslint-disable */
const next = require('next')
const LRUCache = require('lru-cache')
const path = require('path')

const dir = path.resolve(process.cwd(), 'app')
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

const app = next({ dir: './app', dev })
const handle = app.getRequestHandler()

if (!dev) {
  require('newrelic')
}

app.prepare().then(() => {
  const cache = new LRUCache({
    max: 100,
    maxAge: 36e5
  })

  const render = (page = '/') => (req, res) => {
    const key = req.url

    if (!dev && cache.has(key)) {
      res.setHeader('x-cache', 'HIT')
      res.send(cache.get(key))
      return
    }

    try {
      ;(async () => {
        const html = await app.renderToHTML(req, res, page, req.params)

        if (res.statusCode !== 200) {
          res.send(html)
          return
        }

        cache.set(key, html)

        res.setHeader('x-cache', 'MISS')
        res.send(html)
      })()
    } catch (err) {
      app.renderError(err, req, res, req.query)
    }
  }

  require('express')()
    .use(require('helmet')())
    .use(
      require('compression')({
        level: 6,
        filter: () => true
      })
    )
    .use((req, res, next) => {
      if (!dev && !/localhost/.test(req.hostname) && !req.secure && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(`https://${req.hostname}${req.url}`)
      }

      return next()
    })
    .use((req, res, next) => {
      if (req.url.endsWith('service-worker.js')) {
        return app.serveStatic(req, res, path.join(dir, `./.next/${req.url}`))
      } else if (/(robots\.txt)$/.test(req.url)) {
        return app.serveStatic(req, res, path.join(dir, `./static/${req.url}`))
      }

      return next()
    })

    .get('/', render('/index'))
    .get('/:slug', render('/page'))
    .get('*', (req, res) => handle(req, res))

    .listen(port, err => {
      if (err) {
        throw err
      }

      console.log(`
        /**********************************************************/

        🚀 ready on http://[::1]:${port} 🚀

        /**********************************************************/
      `)
    })
})
