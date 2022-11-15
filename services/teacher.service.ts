import { ITeacherPrivateData } from 'intefaces/teacher.interface'
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
      const response = await $api().post(`${PRIVATE_REQUESTS.TEACHER_SAVE_PRIVATE_DATA}`, {
        params: {
          ...props,
        },
      })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}

export default new TeacherService()
