import * as express from 'express'

import schema from './schema'

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000
const app = express()

const server = app.use(schema({ app, dev })).listen(port, err => {
  if (err) {
    throw err
  }

  console.log(`>ready on http://[::1]:${port}\n🚀`)
})

process.on('exit', () => server.close())
