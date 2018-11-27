export default {
  JSON: require('graphql-type-json'),

  Query: {
    pages: async (_, __, { dataSources: { CMS } }) => CMS.getPages(),
    single: async (_, args = {}, { dataSources: { CMS } }) => CMS.getSingle(args)
  }
}
