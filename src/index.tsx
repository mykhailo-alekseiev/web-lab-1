import React from 'react'
import * as ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './app/providers/with-mui5/theme'
import App from './app'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement!)

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
)
