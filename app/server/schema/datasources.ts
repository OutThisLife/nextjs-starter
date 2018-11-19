import { RESTDataSource } from 'apollo-datasource-rest'

export default () => ({
  CMS: new class extends RESTDataSource {
    constructor() {
      super()
      this.baseURL = process.env.CMS
    }

    public async getPages(params = {}) {
      const data = await this.get('/wp/v2/pages', params)

      return data.map(({ title, content, ...page }) => ({
        ...page,
        title: title.rendered,
        content: content.rendered
      }))
    }
  }()
})
