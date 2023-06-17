import { createEffect, createEvent, createStore } from 'effector'
import { axiosApiInstance } from 'shared/utils'
import { Book } from 'pages/book/create/types'

const createBookFx = createEffect(async ({ category, price, title, description, author }: Book) => {
  await axiosApiInstance.post('/book', {
    category,
    price,
    title,
    description,
    author,
  })
})

const resetBookCreateFormEv = createEvent()

const $isSuccessfulCreate = createStore(false)
  .on(createBookFx.done, () => true)
  .reset(resetBookCreateFormEv)

export { createBookFx, $isSuccessfulCreate, resetBookCreateFormEv }
