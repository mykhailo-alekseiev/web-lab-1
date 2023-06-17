import { createForm } from 'effector-forms'
import { forward, sample } from 'effector'
import { AxiosError, isAxiosError } from 'axios'
import { BookCategory } from 'shared/types'
import { Book } from 'pages/book/create/types'
import { createBookFx } from 'pages/book/create/model/api'
import { validateCreateBookErrorResponse } from 'pages/book/create/utils'

const bookCreateForm = createForm<Book>({
  fields: {
    title: {
      init: '',
    },
    author: {
      init: '',
    },
    category: {
      init: BookCategory.Adventure,
    },
    description: {
      init: '',
    },
    price: {
      init: 0,
    },
  },
  validateOn: ['submit'],
})

forward({
  from: bookCreateForm.formValidated,
  to: createBookFx,
})

sample({
  clock: createBookFx.failData,
  fn: (error: Error | AxiosError) => {
    if (isAxiosError(error) && error.response?.data.message) {
      return validateCreateBookErrorResponse(error.response.data.message as string[])
    }
    return []
  },
  target: bookCreateForm.addErrors,
})

export { bookCreateForm }
