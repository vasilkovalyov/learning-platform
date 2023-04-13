import $api from 'common/ajax-config'
import { parseCookies } from 'nookies'
import { AxiosResponse } from 'axios'
import { IGroupLessonProps } from 'interfaces/group-lesson.interface'
import { PRIVATE_REQUESTS } from 'constants/api-requests'
import { IGroupLessonFormDataUpdateProps } from 'components/Forms/GroupLesson/GroupLesson.type'

class GroupLessonService {
  async createGroupLesson(urlRequest: string, props: IGroupLessonProps): Promise<AxiosResponse> {
    const { token } = parseCookies()
    const response = await $api(token).post(urlRequest, {
      ...props,
    })
    return response
  }

  async updateGroupLesson(urlRequest: string, props: IGroupLessonFormDataUpdateProps): Promise<AxiosResponse> {
    const { token } = parseCookies()
    const response = await $api(token).post(urlRequest, {
      ...props,
    })
    return response
  }

  async getGroupLesson(id: string): Promise<AxiosResponse<IGroupLessonProps>> {
    const { token } = parseCookies()
    const response = await $api(token).get(`${PRIVATE_REQUESTS.TEACHER.GET_TEACHER_GROUP_LESSON_BY_ID}/${id}`)
    return response
  }
}

export default new GroupLessonService()
