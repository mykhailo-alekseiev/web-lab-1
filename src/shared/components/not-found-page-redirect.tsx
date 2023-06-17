import React from 'react'
import { Navigate } from 'react-router-dom'
import { useStore } from 'effector-react'
import { $isAuthorized } from 'process/auth'
import { Page } from 'shared/routes'

const NotFoundPageRedirect = () => {
  const isAuthorized = useStore($isAuthorized)

  return <Navigate to={isAuthorized ? Page.Home : Page.SignIn} replace />
}

export { NotFoundPageRedirect }
