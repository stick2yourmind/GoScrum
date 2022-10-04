import axios from 'axios'

const baseURL = 'https://goscrum-api.alkemy.org'

const goScrumApi = axios.create({ baseURL })

goScrumApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token || ''}`
    }
  }

  return config
})

export default goScrumApi
