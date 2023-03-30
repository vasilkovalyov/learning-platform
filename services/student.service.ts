import { parseCookies } from 'nookies'

import $api from 'common/ajax-config'
import { PRIVATE_REQUESTS } from 'constants/api-requests'

import { UserReadableAccountInfo, UserAccountProps } from 'interfaces/user.interface'
import { AxiosResponse } from 'axios'
import { StudentPrivateFormData } from 'components/Forms/StudentPrivateDataForm/StudentPrivateDataForm.type'

class StudentService {
  async updateUserAccount(props: UserReadableAccountInfo): Promise<AxiosResponse<UserAccountProps> | undefined> {
    const { token } = parseCookies()
    const response = await $api(token).post(`${PRIVATE_REQUESTS.STUDENT.ACCOUNT_UPDATE}`, {
      ...props,
    })
    return response
  }

  async updateUserPrivateData(
    id: string,
    props: StudentPrivateFormData,
  ): Promise<AxiosResponse<StudentPrivateFormData> | undefined> {
    const { token } = parseCookies()
    const response = await $api(token).post(`${PRIVATE_REQUESTS.STUDENT.PRIVATE_DATA_UPDATE}`, {
      _id: id,
      ...props,
    })
    return response
  }

  async getUserPrivateData(id: string): Promise<AxiosResponse<StudentPrivateFormData> | undefined> {
    const { token } = parseCookies()
    const response = await $api(token).get(`${PRIVATE_REQUESTS.STUDENT.PRIVATE_DATA}/${id}`)
    return response
  }
}

export default new StudentService()
