import $api from 'common/ajax-config'
import { PRIVATE_REQUESTS } from 'constants/api-requests'
import getCookie from 'common/getCookie'

import { UserInfoAccountResponse, UserInfoStoreProps } from 'interfaces/user.interface'
import { AxiosResponse } from 'axios'

class StudentService {
  async updateUserAccount(
    props: Omit<UserInfoStoreProps, 'password' | 'login'>,
  ): Promise<AxiosResponse<UserInfoAccountResponse> | undefined> {
    try {
      const token = getCookie('token')
      const response = await $api(token).post(`${PRIVATE_REQUESTS.STUDENT_ACCOUNT_UPDATE}`, {
        params: props,
      })
      return response
    } catch (e) {
      console.log(e)
    }
  }
}

export default new StudentService()
