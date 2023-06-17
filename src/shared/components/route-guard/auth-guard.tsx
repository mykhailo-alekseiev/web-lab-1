import React, { PropsWithChildren, Suspense, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $isAuthorized } from 'process/auth'
import { useNavigate } from 'react-router-dom'
import { Page } from 'shared/routes'
import { Loader } from 'shared/components/loader'

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: PropsWithChildren) => {
  const isAuthorized = useStore($isAuthorized)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthorized) {
      navigate?.(Page.SignIn, { replace: true })

      return
    }

    setIsLoading(false)
  }, [isAuthorized, navigate])

  if (isLoading) {
    return <Suspense fallback={<Loader />} />
  }

  return <>{children}</>
}

export { AuthGuard }
