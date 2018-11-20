import * as express from 'express'

import schema from './schema'

const dev = process.env.NODE_ENV !== 'production'
const app = express()

const server = app.use(schema({ app, dev })).listen(3000)
process.on('exit', () => server.close())
