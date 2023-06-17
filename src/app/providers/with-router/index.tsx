import React from 'react'
import { BrowserRouter } from 'react-router-dom'

/**
 * @hoc Initialize react-router-dom provider
 */
const withRouter = (component: Component) => () => <BrowserRouter>{component()}</BrowserRouter>

export default withRouter
