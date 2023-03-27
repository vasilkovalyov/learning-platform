import { PayloadAction } from '@reduxjs/toolkit'
import $api from 'common/ajax-config'
import { PRIVATE_REQUESTS } from 'constants/api-requests'
// import getCookie from 'common/getCookie'
import { parseCookies } from 'nookies'

import { UserReadableAccountInfo, UserAccountProps } from 'interfaces/user.interface'
import { AxiosResponse } from 'axios'
import { StudentPrivateFormData } from 'components/Forms/StudentPrivateDataForm/StudentPrivateDataForm.type'

class StudentService {
  async updateUserAccount(props: UserReadableAccountInfo): Promise<AxiosResponse<UserAccountProps> | undefined> {
    try {
      // const token = getCookie('token')
      const { token } = parseCookies()
      const response = await $api(token).post(`${PRIVATE_REQUESTS.STUDENT_ACCOUNT_UPDATE}`, {
        params: props,
      })
      return response
    } catch (e) {
      console.log(e)
    }
  }

  async updateUserPrivateData(
    id: string,
    props: StudentPrivateFormData,
  ): Promise<AxiosResponse<StudentPrivateFormData> | undefined> {
    // const token = getCookie('token')
    const { token } = parseCookies()
    const response = await $api(token).post(`${PRIVATE_REQUESTS.STUDENT_PRIVATE_DATA_UPDATE}`, {
      params: {
        _id: id,
        ...props,
      },
    })
    return response
  }

  async getUserPrivateData(id: string): Promise<AxiosResponse<StudentPrivateFormData> | undefined> {
    // const token = getCookie('token')
    const { token } = parseCookies()
    const response = await $api(token).get(`${PRIVATE_REQUESTS.STUDENT_PRIVATE_DATA}/${id}`)
    return response
  }
}

export default new StudentService()
