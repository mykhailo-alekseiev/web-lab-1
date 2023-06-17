import axios from 'axios'
import { REACT_APP_SERVER_URL } from 'shared/get-env'

const NOT_AUTHORIZED = 401

const axiosApiInstance = axios.create({
  baseURL: REACT_APP_SERVER_URL,
})

axiosApiInstance.interceptors.request.use(
  async (config: any) => {
    const access_token = localStorage.getItem('access_token')
    config.headers = {
      Authorization: access_token ? JSON.parse(access_token) : undefined,
      'Content-Type': 'application/json',
    }
    return config
  },
  (error: any) => {
    Promise.reject(error)
  },
)

axiosApiInstance.interceptors.response.use(
  (response: any) => {
    return response
  },
  async function (error: any) {
    const originalRequest = error.config
    if (error.response.status === NOT_AUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true
      // logoutEv()
      return axiosApiInstance(originalRequest)
    }
    return Promise.reject(error)
  },
)

export { axiosApiInstance }
