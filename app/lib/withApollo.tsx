import { ApolloClient } from 'apollo-boost'
import { DocumentNode } from 'graphql'
import { withRouter } from 'next/router'
import { Component } from 'react'
import { DataProps, getDataFromTree, graphql, MutateProps, OperationOption } from 'react-apollo'
import { branch, compose, lifecycle, renderComponent, setStatic } from 'recompose'

import initApollo from './initApollo'

const dev = process.env.NODE_ENV !== 'production'

export default App => class extends Component {
    public static displayName = 'withApollo(App)'

    public static async getInitialProps(ctx) {
      let appProps = {}
      const apollo = initApollo()

      try {
        if (App.getInitialProps) {
          appProps = await App.getInitialProps(ctx)
        }

        await getDataFromTree(
          <App {...appProps} apolloClient={apollo} {...ctx} />
        )
      } catch (err) {
        if (dev) {
          console.error(err)
        } else if ('slug' in ctx.router.query) {
          err.code = 'ENOENT'
          throw err
        }
      }

      return {
        ...appProps,
        apolloState: apollo.cache.extract()
      }
    }

    private apolloClient: ApolloClient<{}>

    constructor(props) {
      super(props)
      this.apolloClient = initApollo(props.apolloState)
    }

    public render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
}

// --------------------------------------

export const withLoader = <
TProps extends TGraphQLVariables | {} = {},
TData = {},
TGraphQLVariables = {},
TChildProps = Partial<DataProps<TData, TGraphQLVariables>> & Partial<MutateProps<TData, TGraphQLVariables>>
>(
  query: DocumentNode,
  operationOptions: OperationOption<TProps, TData, TGraphQLVariables, TChildProps> = {}
) => {
  let skip = (props: { data?: { loading?: boolean } } = {}) => typeof window !== 'undefined' && !/preview_id/.test(window.location.search) && props.data && props.data.loading
  const blockRender = branch(skip, renderComponent(() => <div />))
  const withQuery = () => graphql<TProps, TData, TGraphQLVariables, TChildProps>(query, Object.assign({}, operationOptions, { skip }))

  return compose(
    withRouter,
    setStatic('prefetchData', async () => {
      try {
        await withQuery()(() => null)
      } catch (err) {
        if (dev) {
          console.error(err)
        }
      }
    }),
    lifecycle({
      componentWillUnmount() {
        skip = () => true
      }
    }),
    blockRender,
    withQuery(),
    blockRender
  )
}
