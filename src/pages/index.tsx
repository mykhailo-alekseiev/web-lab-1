import React, { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import Loadable from 'shared/components/loadable'
import { Page } from 'shared/routes'
import { GuestGuard, NotFoundPageRedirect } from 'shared/components'
import { AuthGuard } from 'shared/components/route-guard/auth-guard'

const SignUpPage = Loadable(lazy(() => import('pages/auth/sign-up')))
const SignInPage = Loadable(lazy(() => import('pages/auth/sign-in')))
const ProfilePage = Loadable(lazy(() => import('pages/user/profile')))
const HomePage = Loadable(lazy(() => import('pages/home')))
const BookCreatePage = Loadable(lazy(() => import('pages/book/create')))

const Routing = () => {
  return useRoutes([
    {
      path: Page.SignUp,
      element: (
        <GuestGuard>
          <SignUpPage />
        </GuestGuard>
      ),
    },
    {
      path: Page.SignIn,
      element: (
        <GuestGuard>
          <SignInPage />
        </GuestGuard>
      ),
    },
    {
      path: Page.Home,
      element: (
        <AuthGuard>
          <HomePage />
        </AuthGuard>
      ),
    },
    {
      path: Page.UserProfile,
      element: (
        <AuthGuard>
          <ProfilePage />
        </AuthGuard>
      ),
    },
    {
      path: Page.CreateBook,
      element: (
        <AuthGuard>
          <BookCreatePage />
        </AuthGuard>
      ),
    },
    {
      path: '*',
      element: <NotFoundPageRedirect />,
    },
  ])
}

export default Routing
