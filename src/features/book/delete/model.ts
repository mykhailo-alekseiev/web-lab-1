import { createEffect } from 'effector'
import { axiosApiInstance } from 'shared/utils'

const deleteBookFx = createEffect(async ({ bookId }: { bookId: string }) => {
  await axiosApiInstance.delete(`/book/${bookId}`)

  return bookId
})

export { deleteBookFx }
