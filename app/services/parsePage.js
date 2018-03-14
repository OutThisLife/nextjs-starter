export const clean = str => {
  if (/\.com/.test(str)) {
    str = str.split('.com')[1]
  }

  return str.replace(/\//g, '')
}

export default (state, pathname) => {
  if (/\./.test(pathname)) {
    return { sections: [], page: {} }
  }

  const { pages } = state
  const page = pages.find(({ url }) => clean(url) === clean(pathname)) || {
    template: 'Error404',
    type: 'page'
  }

  if (page) {
    page.children = pages.filter(({ pid }) => pid === page.id)
  }

  return { page, ...state }
}
