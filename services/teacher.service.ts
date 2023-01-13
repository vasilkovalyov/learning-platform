import { ITeacherPrivateData } from 'interfaces/teacher.interface'
import { UserAuthProps } from 'interfaces/user.interface'
import $api from 'common/ajax-config'
import { PRIVATE_REQUESTS } from 'constants/api-requests'
import getCookie from 'common/getCookie'

class TeacherService {
  async loadPrivateData(userId: string) {
    try {
      const token = getCookie('token')
      const response = await $api(token).get(`${PRIVATE_REQUESTS.TEACHER_SAVE_PRIVATE_DATA}/${userId}`)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  async savePrivateData(props: ITeacherPrivateData) {
    try {
      const token = getCookie('token')
      const response = await $api(token).post(`${PRIVATE_REQUESTS.TEACHER_SAVE_PRIVATE_DATA}`, {
        params: {
          ...props,
        },
      })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  async saveAccountData(props: Omit<UserAuthProps, 'role'>) {
    try {
      const token = getCookie('token')
      const { email, fullname, login, phone, _id } = props
      const response = await $api(token).post(`${PRIVATE_REQUESTS.TEACHER_SAVE_AUTH_DATA}`, {
        params: {
          _id,
          phone,
          email,
          fullname,
          login,
        },
      })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}

export default new TeacherService()
