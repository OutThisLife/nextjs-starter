import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'

import dataSources from './datasources'
import resolvers from './resolvers'
import typeDefs from './types'

export default ({ app, dev }): express.Router => {
  const router = express.Router()

  new ApolloServer({
    typeDefs,
    dataSources,
    resolvers,
    introspection: dev,
    playground: dev,
    tracing: dev,
    engine: false,
    cacheControl: true
  }).applyMiddleware({ app })

  return router
}
