require('dotenv').load()

const next = require('next')
const routes = require('./routes')
const express = require('express')
const compression = require('compression')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dir: './app', dev })
const handle = routes.getRequestHandler(app)

const forceSSL = (req, res, nextUse) => {
  if (!dev && !req.secure && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`)
  }

  return nextUse()
}

app.prepare().then(() => {
  express()
    .use(forceSSL)
    .use(compression())
    .use(handle)
    .listen(port)
})
