import gql from 'graphql-tag'

export default gql`
  scalar JSON

  type Query {
    pages: [Page]
    single(slug: String!): Page
  }

  type Page @cacheControl(maxAge: 10e5) {
    id: ID!
    pid: ID
    title: String
    url: String
    slug: String
    type: String
  }
`
