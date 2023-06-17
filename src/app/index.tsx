import React, { useEffect } from 'react'
import { withProviders } from './providers'
import { appModel } from 'shared/models'
import Routing from 'pages'

/**
 * App's entry-point
 * @remark Contains application initialization logic in a HOC wrapper
 * @see withProviders
 */
const App = () => {
  useEffect(() => {
    appModel.initAppEv()
    appModel.getAppDetailsFx()
  }, [])

  return (
    <>
      <Routing />
    </>
  )
}

export default withProviders(App)
