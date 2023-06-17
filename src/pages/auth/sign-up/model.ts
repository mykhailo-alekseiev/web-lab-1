import { createForm } from 'effector-forms'
import { forward, sample } from 'effector'
import { signUpFx, SignUpRequest } from 'process/auth'
import { AxiosError, isAxiosError } from 'axios'
import { validateSignUpErrorResponse } from 'pages/auth/sign-up/utils'
import { Sex } from 'entities/user'

export const signUpForm = createForm<SignUpRequest>({
  fields: {
    email: {
      init: '',
    },
    password: {
      init: '',
    },
    name: {
      init: '',
    },
    sex: {
      init: Sex.Male,
    },
  },
  validateOn: ['submit'],
})

forward({
  from: signUpForm.formValidated,
  to: signUpFx,
})

sample({
  clock: signUpFx.failData,
  fn: (error: Error | AxiosError) => {
    if (isAxiosError(error) && error.response?.data.message) {
      return validateSignUpErrorResponse(error.response.data.message as string[])
    }
    return []
  },
  target: signUpForm.addErrors,
})
