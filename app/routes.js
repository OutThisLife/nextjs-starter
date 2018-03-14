const nextRoutes = require('next-routes')
const routes = nextRoutes()

routes.add('home', '/', 'index')
routes.add('main', '/:slug/:child?/:child2?', 'index')

routes.getParams = slug => {
  const params = {}
  const parts = slug.split('/')

  params.slug = parts[0]

  if (parts[1]) {
    params.child = parts[1]
  }

  if (parts[2]) {
    params.child2 = parts[2]
  }

  return params
}

routes.flatten = params => `/${Object.values(params).join('/')}/`

module.exports = routes
