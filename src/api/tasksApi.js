import axios from 'axios'

const baseURL = 'https://goscrum-api.alkemy.org'

const tasksApi = axios.create({ baseURL })

tasksApi.interceptors.request.use((config) => {
  const { token } = JSON.parse(window.localStorage.getItem('user'))

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`
    }
  }

  return config
})

export default tasksApi
