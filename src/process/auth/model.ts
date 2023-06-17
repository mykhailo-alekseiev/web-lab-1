import { createEffect, createEvent, createStore, sample } from 'effector'
import { axiosApiInstance } from 'shared/utils'
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from './types'
import connectLocalStorage from 'effector-localstorage'
import { getUserInfoFx } from 'entities/user'
import { appModel } from 'shared/models'

const logoutEv = createEvent()

const signUpFx = createEffect(async ({ email, sex, name, password }: SignUpRequest) => {
  const { data } = await axiosApiInstance.post<SignUpResponse>('/auth/signup', {
    email,
    sex,
    name,
    password,
  })

  return { access_token: `Bearer ${data.access_token}` }
})

const signInFx = createEffect(async ({ email, password }: SignInRequest) => {
  const { data } = await axiosApiInstance.post<SignInResponse>('/auth/login', {
    email,
    password,
  })

  return { access_token: `Bearer ${data.access_token}` }
})

const accessTokenLocalStorage = connectLocalStorage('access_token')

const setAccessTokenToStorageFx = createEffect(accessTokenLocalStorage)

const $accessToken = createStore(accessTokenLocalStorage.init(''))
  .on(signUpFx.doneData, (_, { access_token }) => access_token)
  .on(signInFx.doneData, (_, { access_token }) => access_token)
  .reset(logoutEv)

const $isAuthorized = $accessToken.map((accessToken) => Boolean(accessToken))

sample({
  source: $accessToken,
  target: setAccessTokenToStorageFx,
})

sample({
  clock: appModel.initAppEv,
  source: {
    accessToken: $accessToken,
  },
  filter: ({ accessToken }) => Boolean(accessToken),
  target: getUserInfoFx,
})

export { $accessToken, signInFx, signUpFx, logoutEv, $isAuthorized }
