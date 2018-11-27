import { RESTDataSource } from 'apollo-datasource-rest'

if (!process.env.NODE_ENV) {
  require('dotenv').config()
}

const { CMS } = process.env

export default () => ({
  CMS: new class extends RESTDataSource {
    constructor() {
      super()
      this.baseURL = CMS
    }

    public async getPages(params = {}) {
      try {
        const data = await this.get('/wp/v2/pages', params)

        return data.map(({ title, content, ...page }) => ({
          ...page,
          title: title.rendered,
          content: content.rendered
        }))
      } catch (e) {
        console.error(e)
        return []
      }
    }

    public async getSingle(params = {}) {
      try {
        const page = await this.getPages(params)
        return page[0]
      } catch (e) {
        console.error(e)
        return {}
      }
    }
  }()
})
