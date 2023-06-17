import { HelmetProvider } from 'react-helmet-async'
import React from 'react'

/**
 * @hoc Initialize react-helmet-async provider for working with metadata
 */
const withHelmet = (component: Component) => () => {
  return <HelmetProvider>{component()}</HelmetProvider>
}

export default withHelmet
