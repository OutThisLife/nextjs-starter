import withData from '@/lib/withData'
import Layout from '@/pages/_layout'
import { ApolloClient } from 'apollo-boost'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

export default withData(
  class extends App<{ client: ApolloClient<{}> }> {
    public render() {
      const { Component, pageProps, client } = this.props

      return (
        <Container>
          <ApolloProvider client={client}>
            <Layout key="layout" render={props => <Component {...props} {...pageProps} />} />
          </ApolloProvider>
        </Container>
      )
    }
  }
)
