import withApolloClient from '@/lib/withApollo'
import Layout from '@/pages/_layout'
import { ApolloClient } from 'apollo-boost'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

export default withApolloClient(
  class extends App<{ apolloClient: ApolloClient<{}> }> {
    public render() {
      const { Component, pageProps, apolloClient } = this.props

      return (
        <Container>
          <ApolloProvider client={apolloClient}>
            <Layout key="layout" render={props => <Component {...props} {...pageProps} />} />
          </ApolloProvider>
        </Container>
      )
    }
  }
)
