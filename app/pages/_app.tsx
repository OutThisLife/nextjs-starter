import { ApolloClient } from 'apollo-boost'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

import withApolloClient from '../lib/withApollo'

interface TInner {
  apolloClient: ApolloClient<{}>
}

export default withApolloClient(
  class extends App<TInner> {
    public static async getInitialProps({ Component }) {
      let pageProps = {}

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps()
      }

      return { pageProps }
    }

    public render() {
      const { Component, pageProps, apolloClient } = this.props

      console.log(Component)

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
