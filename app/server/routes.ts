import * as express from 'express'

const router = express.Router()

module.exports = ({ app, cache, dev }) => {
  const render = (page = '/') => (req: express.Request, res: express.Response) => {
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

  router.get('/', render('/index'))
  router.get('/:slug/:lv0/:lv1', render('/page'))

  return router
}
