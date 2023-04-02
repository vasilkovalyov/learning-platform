import { ITeacherPrivateDataProps } from 'interfaces/teacher.interface'
import { IUserAccountProps } from 'interfaces/user.interface'
import { IStudentAccountEditableProps } from 'components/Forms/Account/Student/Student.type'
import $api from 'common/ajax-config'
import { PRIVATE_REQUESTS } from 'constants/api-requests'
import { parseCookies } from 'nookies'
import { AxiosResponse } from 'axios'
import { ITeacherPrivateDataEditableProps } from 'components/Forms/PrivateData/Teacher/Teacher.type'

class TeacherService {
  async updateUserAccount(props: IStudentAccountEditableProps): Promise<AxiosResponse<IUserAccountProps> | undefined> {
    const { token } = parseCookies()
    const response = await $api(token).post(`${PRIVATE_REQUESTS.TEACHER.ACCOUNT_UPDATE}`, {
      ...props,
    })
    return response
  }

  async updateUserPrivateData(
    id: string,
    props: ITeacherPrivateDataEditableProps,
  ): Promise<AxiosResponse<ITeacherPrivateDataProps>> {
    const { token } = parseCookies()
    const response = await $api(token).post(`${PRIVATE_REQUESTS.TEACHER.PRIVATE_DATA_UPDATE}`, {
      ...props,
      user: id,
    })
    return response
  }

  async getUserPrivateData(id: string): Promise<AxiosResponse<ITeacherPrivateDataProps>> {
    const { token } = parseCookies()
    const response = await $api(token).get(`${PRIVATE_REQUESTS.TEACHER.PRIVATE_DATA}/${id}`)
    return response
  }
}

export default new TeacherService()
