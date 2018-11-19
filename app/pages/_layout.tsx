import themeVars from '@/theme'
import { RouterProps, withRouter } from 'next/router'
import { compose, setDisplayName } from 'recompose'
import styled, { ThemeProvider } from 'styled-components'

interface TOutter {
  render: (a?: any) => JSX.Element
  router?: RouterProps
}

export default compose<TOutter, TOutter>(
  setDisplayName('layout'),
  withRouter
)(({ render }) => (
  <ThemeProvider theme={themeVars}>
    <Main>
      <section>
        <div key="app">{render({})}</div>
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
