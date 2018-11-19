export default {
  JSON: require('graphql-type-json'),

  Query: {
    pages: async (_, args = {}, { dataSources: { CMS } }) => CMS.getPages(args)
  }
}
