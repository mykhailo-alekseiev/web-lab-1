import React, { PropsWithChildren, Suspense, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { useNavigate } from 'react-router-dom'

import { Page } from 'shared/routes'
import { $isAuthorized } from 'process/auth'
import { Loader } from 'shared/components/loader'

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: PropsWithChildren) => {
  const isAuthorized = useStore($isAuthorized)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isAuthorized) {
      navigate?.(Page.Home, { replace: true })

      return
    }

    setIsLoading(false)
  }, [isAuthorized, navigate])

  if (isLoading) {
    return <Suspense fallback={<Loader />} />
  }

  return <>{children}</>
}

export { GuestGuard }
