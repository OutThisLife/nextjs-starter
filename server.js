const next = require('next')
const LRUCache = require('lru-cache')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

const app = next({ dir: './app', dev })

if (!dev) {
  require('newrelic')
}

const cache = new LRUCache({
  max: 100,
  maxAge: 36e5
})

app.prepare().then(() => {
  const handle = app.getRequestHandler()
  const render = (page = '/') => async (req, res) => {
    const key = req.url

    if (cache.has(key)) {
      res.setHeader('x-cache', 'HIT')
      res.send(cache.get(key))
      return
    }

    try {
      const html = await app.renderToHTML(req, res, page, req.params)

      if (res.statusCode !== 200) {
        res.send(html)
        return
      }

      cache.set(key, html)

      res.setHeader('x-cache', 'MISS')
      res.send(html)
    } catch (err) {
      app.renderError(err, req, res, page, req.params)
    }
  }

  require('express')()
    .use(require('compression')())
    .use((req, res, next) => {
      if (dev) {
        return next()
      } else if (!req.secure && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(`https://${req.hostname}${req.url}`)
      }

      return next()
    })

    .get('/', render())
    .get('/:slug', render('/single'))
    .get('/category/:slug', render('/archive'))
    .get('/author/:slug', render('/author'))
    .get('/design-resources/:slug', render('/freebie'))

    .get('*', (req, res) => handle(req, res))

    .listen(port, err => {
      if (err) {
        throw err
      }

      console.log(`Ready on [::1]:${port}`)
    })
})
