import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

import withApolloClient from '../lib/withApollo'

export default withApolloClient(
  class extends App {
    render() {
      const { Component, pageProps, apolloClient } = this.props

      return (
        <Container>
          <ApolloProvider client={apolloClient}>
            <main id="app">
              <Component {...pageProps} />
            </main>
          </ApolloProvider>
        </Container>
      )
    }
  }
)
