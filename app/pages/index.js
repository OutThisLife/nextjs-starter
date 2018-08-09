import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

export default compose(
  graphql(gql`
    query home {
      init @rest(type: "Initial", path: "/init", endpoint: "inv") {
        pages
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
