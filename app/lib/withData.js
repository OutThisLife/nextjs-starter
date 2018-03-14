import { PureComponent } from 'react'
import withRedux from 'next-redux-wrapper'
import fetch from 'isomorphic-fetch'
import cache from 'memory-cache'
import { initStore, setData } from '@/store'
import parsePage from '@/services/parsePage'

export default Component => {
  class Index extends PureComponent {
    static async getInitialProps ({ isServer, query, asPath, store }) {
      if (isServer) {
        try {
          let { CMS } = process.env

          if (query.preview_id) {
            cache.clear()
            CMS += `&preview_id=${query.preview_id || -1}`
          }

          if (!cache.get('chunk')) {
            const data = await (await fetch(CMS)).json()
            cache.put('chunk', JSON.stringify(data))
          }

          const json = JSON.parse(cache.get('chunk'))
          store.dispatch(setData({
            ...json,
            homepage: json.pages.find(({ id }) => id === 476)
          }))
        } catch (e) {
          throw e
        }
      }

      const { homepage, ...state } = store.getState()
      const pathname = asPath.replace(/\/$/, '').split(/(\/?\?)/)[0]

      if (pathname === '') {
        return { page: { ...homepage, type: 'home' } }
      }

      return parsePage(state, pathname || '/')
    }

    render () {
      return <Component {...this.props} />
    }
  }

  return withRedux(initStore)(Index)
}
