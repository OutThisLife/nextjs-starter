import { gql, IResolvers } from 'apollo-server-express'
import * as JSON from 'graphql-type-json'
import * as LRU from 'lru-cache'

export const cache = LRU({
  max: 152,
  maxAge: 36e2
})

export const resolvers: IResolvers = {
  JSON,
  Query: {}
}

export const typeDefs = gql`
  scalar JSON

  type Query {

  }
`
