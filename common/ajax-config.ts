import axios from 'axios'

function $api(token?: string) {
  return axios.create({
    baseURL: `${process.env.API_URL || window.location.origin || 'http://localhost:3000'}/api/`,
    // timeout: 10000,
    withCredentials: true,
    method: 'get, post, put, delete',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: token || '',
    },
  })
}

export default $api
