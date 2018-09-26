import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

let apolloClient = null
const isDev = process.env.NODE_ENV !== 'production'
const isBrowser = 'browser' in process

if (!isBrowser) {
  (global as any).fetch = require('isomorphic-unfetch');
  (global as any).Headers = require('fetch-headers')
}

// --------------------------------

const mainLink = new HttpLink({
  uri: `http://localhost:4000/graphiql`
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(
      ({ message, locations, path }) => isDev
        && console.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`)
    )
  }

  if (networkError && isDev) {
    console.error('[Network error]', networkError)
  }
})

const createStore = (initialState): ApolloClient<{}> => new ApolloClient({
  link: ApolloLink.from([errorLink, mainLink]),
  ssrMode: !isBrowser,
  connectToDevTools: isDev && isBrowser,
  cache: new InMemoryCache({
    dataIdFromObject: o => (o.id ? `${o.__typename}:${o.id}` : null)
  }).restore(initialState)
})

// --------------------------------

export default (initialState = {}): ApolloClient<{}> => {
  if (!isBrowser) {
    return createStore(initialState)
  }

  if (!apolloClient) {
    if ('__NEXT_DATA__' in window) {
      initialState = (window as any).__NEXT_DATA__.props.apolloState || {}
    }

    apolloClient = createStore(initialState)
  }

  return apolloClient
}
