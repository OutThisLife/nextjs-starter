import ApolloClient from 'apollo-client'
import Head from 'next/head'
import { Component } from 'react'
import { getDataFromTree } from 'react-apollo'
import { getDisplayName } from 'recompose'

import initApollo from './initApollo'

export default App =>
  class extends Component<{ serverState: IObject }> {
    public static displayName = `withApollo(${getDisplayName(App)})`

    public static async getInitialProps(ctx) {
      let serverState = {}
      const pageProps: IObject = {}

      try {
        const client = initApollo()

        await getDataFromTree(<App client={client} router={ctx.router} Component={ctx.Component} />, ctx)

        serverState = client.cache.extract() || {}

        if (!('browser' in process)) {
          const {
            ctx: { req }
          } = ctx

          pageProps.headers = req.headers

          Head.rewind()
        }
      } catch (err) {
        console.error('Error while running `getDataFromTree`', err)

        err.code = 'ENOENT'
        throw err
      }

      return { pageProps, serverState }
    }

    private client: ApolloClient<{}>

    constructor(props) {
      super(props)
      this.client = initApollo(this.props.serverState)
    }

    public render() {
      const { serverState, ...props } = this.props
      return <App client={this.client} {...props} />
    }
  }
