import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import themeVars from '@/theme'
import { RouterProps, withRouter } from 'next/router'
import { compose, withProps } from 'recompose'
import styled, { ThemeProvider } from 'styled-components'

interface TOutter {
  render: (a?: any) => JSX.Element
  router?: RouterProps & {
    query: {
      slug?: string
    }
  }
}

interface TInner {
  getKey: (s?: string) => string
}

export default compose<TInner & TOutter, TOutter>(
  withRouter,
  withProps(({ router: { query }, ...props }) => ({
    ...props,
    getKey: (s = '') => `${s}${query.slug || 'home'}`
  }))
)(({ render, getKey }) => (
  <ThemeProvider theme={themeVars}>
    <Main key="main">
      <Header key={getKey('header')} />

      <section>
        <Sidebar key={getKey('sidebar')} />
        <div key="app">{render({ getKey })}</div>
      </section>
    </Main>
  </ThemeProvider>
))

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  > section {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 1fr;
    position: relative;
  }
`
