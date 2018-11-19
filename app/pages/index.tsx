import gql from 'graphql-tag'
import shuffle from 'lodash/shuffle'
import { DataProps, graphql } from 'react-apollo'
import { compose, setDisplayName } from 'recompose'

export default compose<DataProps<{ pages: Page[] }>, {}>(
  setDisplayName('homepage'),
  graphql(gql`
    query GetPages {
      pages {
        id
        title
      }
    }
  `)
)(({ data: { loading, pages = [] } }) => {
  if (loading) {
    return <div>Loading.</div>
  }

  const page = shuffle(pages)[0]

  return (
    <div>
      id: {page.id}
      <br /> title: {page.title.rendered}
    </div>
  )
})
