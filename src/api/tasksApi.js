import axios from 'axios'

const baseURL = 'https://goscrum-api.alkemy.org'

const tasksApi = axios.create({ baseURL })

tasksApi.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`
    }
  }

  return config
})

export default tasksApi
