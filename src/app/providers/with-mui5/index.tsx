import React from 'react'
import theme from './theme'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

/**
 * @hoc Initialize Muit5 theme and styles provider
 */
const withMui5 = (component: Component) => () =>
  (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {component()}
    </ThemeProvider>
  )

export default withMui5
