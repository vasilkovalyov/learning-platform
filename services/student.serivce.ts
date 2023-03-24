import $api from 'common/ajax-config'
import { PRIVATE_REQUESTS } from 'constants/api-requests'
import getCookie from 'common/getCookie'

import { UserInfoStoreProps } from 'interfaces/user.interface'

class StudentService {
  async updateUserAccount(props: Omit<UserInfoStoreProps, '_id' | 'password' | 'login'>) {
    try {
      const token = getCookie('token')
      const response = await $api(token).post(`${PRIVATE_REQUESTS.STUDENT_ACCOUNT_UPDATE}`, {
        params: props,
      })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}

export default new StudentService()
