import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose, withProps } from 'recompose'

interface TInner {
  data: {
    loading: boolean
    [key: string]: any
  }
}

export default compose<TInner, {}>(
  withProps(props => {
    console.log('am here',props)
    return props
  }),
  graphql(gql`
    query home {
      init @rest(type: "Page", path: "/pages/45266") {
        id
        title
      }
    }
  `)
)(({ data }) => {
  if (data.loading) {
    return <div>Loading.</div>
  }

  console.log(data)

  return <div>hi</div>
})
