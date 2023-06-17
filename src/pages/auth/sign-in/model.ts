import { createForm } from 'effector-forms'
import { forward, sample } from 'effector'
import { signInFx, SignInRequest } from 'process/auth'
import { AxiosError, isAxiosError } from 'axios'
import { validateSignInErrorResponse } from 'pages/auth/sign-in/utils'

export const signInForm = createForm<SignInRequest>({
  fields: {
    email: {
      init: '',
    },
    password: {
      init: '',
    },
  },
  validateOn: ['submit'],
})

forward({
  from: signInForm.formValidated,
  to: signInFx,
})

sample({
  clock: signInFx.failData,
  fn: (error: Error | AxiosError) => {
    if (isAxiosError(error) && error.response?.data.message) {
      return validateSignInErrorResponse(error.response.data.message as string[])
    }
    return []
  },
  target: signInForm.addErrors,
})
