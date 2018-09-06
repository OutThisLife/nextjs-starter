import gql from 'graphql-tag'
import shuffle from 'lodash/shuffle'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

interface TInner {
  data: {
    loading: boolean
    [key: string]: any
  }
}

export default compose<TInner, {}>(
  graphql(gql`
    query {
      pages @rest(type: "Page", path: "/pages") {
        id
        title
      }
    }
  `)
)(({ data }) => {
  if (data.loading) {
    return <div>Loading.</div>
  }

  const page = shuffle(data.pages)[0]

  return <div>id: {page.id} <br /> title: {page.title.rendered}</div>
})
