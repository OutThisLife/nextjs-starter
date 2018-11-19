import gql from 'graphql-tag'
import { RouterProps, withRouter } from 'next/router'
import { DataProps, graphql } from 'react-apollo'
import { compose, setDisplayName } from 'recompose'

interface Props extends DataProps<{ single: Page }> {
  router?: RouterProps
}

export default compose<Props, {}>(
  setDisplayName('page'),
  withRouter,
  graphql<Props, Props>(
    gql`
      query GetPages($slug: String!) {
        single(slug: $slug) {
          id
          title
        }
      }
    `,
    {
      options: ({
        router: {
          query: { slug }
        }
      }) => ({
        variables: { slug }
      })
    }
  )
)(({ data: { loading, single } }) => {
  if (loading) {
    return <div>Loading.</div>
  }

  return (
    <div>
      id: {single.id}
      <br /> title: {single.title}
    </div>
  )
})
