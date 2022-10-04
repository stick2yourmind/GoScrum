import axios from 'axios'

const baseURL = 'https://goscrum-api.alkemy.org'

const authApi = axios.create({ baseURL })

export default authApi
