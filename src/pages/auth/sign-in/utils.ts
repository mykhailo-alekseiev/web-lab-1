export const validateSignInErrorResponse = (errorMessages: string[]) => {
  return errorMessages
    .map((message: string) => {
      const error = {
        field: '',
        rule: 'backend',
        errorText: message,
      }

      if (message.includes('email')) {
        error.field = 'email'

        return error
      }

      if (message.includes('password')) {
        error.field = 'password'

        return error
      }
      return error
    })
    .filter((v) => Boolean(v))
}
