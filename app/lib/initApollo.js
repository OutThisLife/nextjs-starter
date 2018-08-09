import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloLink } from 'apollo-link'
import { RestLink } from 'apollo-link-rest'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { CMS }
} = getConfig()

global.fetch = global.fetch || fetch
global.Headers = global.Headers || require('fetch-headers')

let apolloClient = null

const headersLink = new ApolloLink((op, next) => {
  op.setContext(({ headers }) => ({
    headers: {
      ...headers,
      Accept: 'application/json'
    },
    headersMergePolicy: (...headerGroups) =>
      headerGroups.reduce((acc, current) => {
        if (!current) {
          return acc
        }

        for (let k in current) {
          const v = current[k]

          if (typeof v === 'string') {
            acc[k] = v
          }
        }

        return acc
      }, new Headers())
  }))

  return next(op)
})

const restLink = new RestLink({
  uri: `${CMS}/wp-json`,
  endpoints: {
    inv: `${CMS}/wp-json/inv`,
    wp: `${CMS}/wp-json/wp/v2`
  }
})

const createStore = initialState =>
  new ApolloClient({
    ssrMode: !process.browser,
    connectToDevTools: process.browser,
    cache: new InMemoryCache().restore(initialState || {}),
    link: ApolloLink.from([headersLink, restLink])
  })

export default initialState => {
  if (!process.browser) {
    return createStore(initialState)
  }

  if (!apolloClient) {
    apolloClient = createStore(initialState)
  }

  return apolloClient
}
