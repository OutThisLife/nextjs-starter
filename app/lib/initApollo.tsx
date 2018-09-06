import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { RestLink } from 'apollo-link-rest'
import LRUCache from 'lru-cache'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { CMS }
} = getConfig()

const dev = process.env.NODE_ENV !== 'production'
const isBrowser = 'browser' in process

if (!isBrowser) {
  (global as any).fetch = require('isomorphic-unfetch');
  (global as any).Headers = require('fetch-headers')
}

export const LRUCacheInstance = new LRUCache({
  max: 100,
  maxAge: 36e5
})

// --------------------------------

const headersLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Accept: 'application/json'
  },
  headersMergePolicy: (...headerGroups) => headerGroups.reduce((acc, current) => {
    if (!current) {
      return acc
    }

    for (const k in current) {
      if (current.hasOwnProperty(k)) {
        const v = current[k]

        if (typeof v === 'string') {
          acc[k] = v
        }
      }
    }

    return acc
  }, new Headers())
}))

const restLink = new RestLink({
  uri: `${CMS}/wp-json/wp/v2`
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(
      ({ message, locations, path }) => dev
        && console.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`)
    )
  }

  if (networkError && dev) {
    console.error('[Network error]', networkError)
  }
})

const link = ApolloLink.from([headersLink, errorLink, restLink])

// --------------------------------

let apolloClient = null

const createStore = (initialState = {}): ApolloClient<{}> => new ApolloClient({
  link,
  ssrMode: !isBrowser,
  connectToDevTools: isBrowser,
  cache: new InMemoryCache({
    dataIdFromObject: o => (o.id ? `${o.__typename}:${o.id}` : null)
  }).restore(initialState)
})

export default (initialState = {}): ApolloClient<{}> => {
  if (!isBrowser) {
    return createStore(initialState)
  }

  if (!apolloClient) {
    if (isBrowser && '__NEXT_DATA__' in window) {
      initialState = (window as any).__NEXT_DATA__.props.apolloState || {}
    }

    apolloClient = createStore(initialState)
  }

  return apolloClient
}
