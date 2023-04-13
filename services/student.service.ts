import { parseCookies } from 'nookies'

import $api from 'common/ajax-config'
import { PRIVATE_REQUESTS } from 'constants/api-requests'

import { IUserAccountProps } from 'interfaces/user.interface'
import { AxiosResponse } from 'axios'

import { IStudentAccountEditableProps } from 'components/Forms/Account/Student/Student.type'
import { IStudentPrivateDataEditableProps } from 'components/Forms/PrivateData/Student/Student.type'

import { IStudentPrivateDataProps } from 'interfaces/student.interface'

class StudentService {
  async updateUserAccount(props: IStudentAccountEditableProps): Promise<AxiosResponse<IUserAccountProps> | undefined> {
    const { token } = parseCookies()
    const response = await $api(token).post(`${PRIVATE_REQUESTS.STUDENT.ACCOUNT_UPDATE}`, {
      ...props,
    })
    return response
  }

  async updateUserPrivateData(
    id: string,
    props: IStudentPrivateDataEditableProps,
  ): Promise<AxiosResponse<IStudentPrivateDataProps> | undefined> {
    const { token } = parseCookies()
    const response = await $api(token).post(`${PRIVATE_REQUESTS.STUDENT.PRIVATE_DATA_UPDATE}`, {
      _id: id,
      ...props,
    })
    return response
  }

  async getUserPrivateData(id: string): Promise<AxiosResponse<IStudentPrivateDataProps> | undefined> {
    const { token } = parseCookies()
    const response = await $api(token).get(`${PRIVATE_REQUESTS.STUDENT.PRIVATE_DATA}/${id}`)
    return response
  }

  async addToGroupLesson(studentId: string, lessonId: string) {
    const { token } = parseCookies()
    const response = await $api(token).post(PRIVATE_REQUESTS.STUDENT.ADD_TO_GROUP_LESSON, {
      userId: studentId,
      lessonId: lessonId,
    })
    return response
  }
}

export default new StudentService()
