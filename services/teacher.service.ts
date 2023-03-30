import { ITeacherPrivateData } from 'interfaces/teacher.interface'
import $api from 'common/ajax-config'
import { PRIVATE_REQUESTS } from 'constants/api-requests'
import { parseCookies } from 'nookies'
import { AxiosResponse } from 'axios'
import { UserReadableAccountInfo, UserAccountProps } from 'interfaces/user.interface'

class TeacherService {
  async updateUserAccount(props: UserReadableAccountInfo): Promise<AxiosResponse<UserAccountProps> | undefined> {
    const { token } = parseCookies()
    const response = await $api(token).post(`${PRIVATE_REQUESTS.TEACHER.ACCOUNT_UPDATE}`, {
      ...props,
    })
    return response
  }

  async updateUserPrivateData(props: ITeacherPrivateData) {
    const { token } = parseCookies()
    const response = await $api(token).post(`${PRIVATE_REQUESTS.TEACHER.PRIVATE_DATA_UPDATE}`, {
      ...props,
    })
    return response
  }

  async getUserPrivateData(id: string) {
    const { token } = parseCookies()
    const response = await $api(token).get(`${PRIVATE_REQUESTS.TEACHER.PRIVATE_DATA}/${id}`)
    return response
  }
}

export default new TeacherService()
