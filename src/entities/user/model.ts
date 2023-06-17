import { createEffect, createStore, sample } from 'effector'
import { axiosApiInstance } from 'shared/utils'
import { GetUserInfoResponse, Sex } from './types'
import { spread } from 'patronum'

export const getUserInfoFx = createEffect(async () => {
  const { data } = await axiosApiInstance.get<GetUserInfoResponse>('/auth/user')

  return data
})

export const $name = createStore('')
export const $email = createStore('')
export const $sex = createStore<Sex>(Sex.Male)

sample({
  clock: getUserInfoFx.doneData,
  target: spread({
    targets: {
      name: $name,
      email: $email,
      sex: $sex,
    },
  }),
})
