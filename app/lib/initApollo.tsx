import 'isomorphic-unfetch'

import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost'
import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { toIdValue } from 'apollo-utilities'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { API_URL, isDev }
} = getConfig()

// -------------------------------------

const errorLink = () =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(
        ({ message, locations, path }) =>
          isDev &&
          console.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`)
      )
    }

    if (networkError && isDev) {
      console.error('[Network error]', networkError)
    }
  })

const httpLink = () =>
  createPersistedQueryLink().concat(
    createHttpLink({
      uri: API_URL,
      credentials: 'same-origin'
    })
  )

// -------------------------------------

let client

const createCache = () => {
  const redir = typeName => (_, args = {}) =>
    toIdValue(
      cache.config.dataIdFromObject({
        __typename: typeName,
        ...args
      })
    )

  const cache = new InMemoryCache({
    dataIdFromObject: o => (o.id ? `${o.__typename}:${o.id}` : null),
    cacheRedirects: {
      Query: {
        pages: redir('[Page]')
      }
    }
  })

  return cache
}

const create = (initialState = {}) => {
  const cache = createCache().restore(initialState)
  const link = ApolloLink.from([errorLink(), httpLink()])

  return new ApolloClient({
    link,
    cache,
    ssrMode: !('browser' in process),
    connectToDevTools: 'browser' in process && isDev
  })
}

export default (initialState = {}) => {
  if (!('browser' in process)) {
    return create(initialState)
  }

  if (!client) {
    client = create(initialState || (window as any).__NEXT_DATA__.props.apolloState)
  }

  return client
}
