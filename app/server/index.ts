import * as compression from 'compression'
import * as express from 'express'
import { RequestHandlerParams } from 'express-serve-static-core'
import * as helmet from 'helmet'
import * as LRU from 'lru-cache'
import * as next from 'next'
import * as path from 'path'

import routes from './routes'
import schema from './schema'

const dev = process.env.NODE_ENV !== 'production'

if (!dev && process.env.NEW_RELIC_HOME) {
  require('newrelic')
}

const dir = path.resolve(process.cwd(), 'app')
const port = parseInt(process.env.PORT, 10) || 3000

const nextApp = next({ dir, dev })
const handle = nextApp.getRequestHandler()

export const cache = new LRU({
  max: 500,
  maxAge: 10e4
})

// -----------------------------------------

nextApp.prepare().then(() => {
  const app = express()

  app
    .use(helmet())
    .use(
      compression({
        level: 6,
        filter: () => true
      })
    )

    .use((req, _, resolve) => {
      if (!('API_URL' in nextApp.nextConfig.publicRuntimeConfig)) {
        Object.defineProperty(nextApp.nextConfig.publicRuntimeConfig, 'API_URL', {
          value: `${req.protocol}://${req.headers.host}/graphql`
        })
      }

      return resolve()
    })

    .use((req, res, resolve) => {
      let staticUrl

      if (req.url.endsWith('service-worker.js')) {
        staticUrl = path.join(dir, `./.next/${req.url}`)
      } else if (/(robots\.txt|favicon\.ico)$/.test(req.url)) {
        staticUrl = path.join(dir, `./static/${req.url}`)
      }

      if (staticUrl) {
        return nextApp.serveStatic(req, res, staticUrl)
      }

      return resolve()
    })

    .use(routes({ app, dev, cache }))
    .use(schema({ app, dev }))
    .get('*', handle as RequestHandlerParams)

    .listen(port, err => {
      if (err) {
        throw err
      }

      console.log(`>ready on http://[::1]:${port}\n🚀`)
    })
})
