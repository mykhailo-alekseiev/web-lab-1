import { createEffect, createEvent, createStore, sample } from 'effector'
import { spread } from 'patronum'
import { axiosApiInstance } from 'shared/utils'

type GetAppDetailsResponse = {
  title: string
  description: string
  logoSrc: string
}

const initAppEv = createEvent()

const getAppDetailsFx = createEffect(async () => {
  const { data } = await axiosApiInstance.get<GetAppDetailsResponse>('/about')

  return data
})

const $title = createStore('')
const $description = createStore('')
const $logoSrc = createStore('')

sample({
  clock: getAppDetailsFx.doneData,
  target: spread({
    targets: {
      title: $title,
      description: $description,
      logoSrc: $logoSrc,
    },
  }),
})

export const appModel = {
  initAppEv,
  $title,
  $description,
  $logoSrc,
  getAppDetailsFx,
}
