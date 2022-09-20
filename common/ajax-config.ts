import axios from 'axios'

const $api = axios.create({
  baseURL: `/api/`,
  // timeout: 10000,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
})

export default $api
