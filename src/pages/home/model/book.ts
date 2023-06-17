import { createEffect, restore } from 'effector'
import { axiosApiInstance } from 'shared/utils'
import { Book } from 'shared/types'
import { keyBy, pick } from 'lodash'
import { deleteBookFx } from 'features/book/delete'

const getBookListFx = createEffect(async () => {
  const { data } = await axiosApiInstance.get<Book[]>('/book')

  return keyBy(data, '_id')
})

const $books = restore(getBookListFx.doneData, {}).on(deleteBookFx, (state, { bookId }) => {
  return pick(
    { ...state },
    Object.keys(state).filter((id) => bookId !== id),
  )
})
const $bookList = $books.map((books) => Object.values(books))

export { $bookList, getBookListFx }
