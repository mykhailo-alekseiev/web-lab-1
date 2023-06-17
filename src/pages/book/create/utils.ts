export const validateCreateBookErrorResponse = (errorMessages: string[]) => {
  return errorMessages
    .map((message: string) => {
      const error = {
        field: '',
        rule: 'backend',
        errorText: message,
      }

      if (message.includes('title')) {
        error.field = 'title'

        return error
      }

      if (message.includes('author')) {
        error.field = 'author'

        return error
      }

      if (message.includes('description')) {
        error.field = 'description'

        return error
      }

      if (message.includes('category')) {
        error.field = 'category'

        return error
      }

      if (message.includes('price')) {
        error.field = 'price'

        return error
      }
      return error
    })
    .filter((v) => Boolean(v))
}
