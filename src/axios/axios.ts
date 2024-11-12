import axios from 'axios'
import { store } from '@/store/store'

axios.defaults.baseURL = 'http://api.vikingship.xyz/api'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})

axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 2000)
  return config
}, e => {
  const error = e.response.data.error
  store.commit('callMessager', {
    status: true,
    message: error,
    type: 'error',
    isVisible: true
  })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
export default axios
