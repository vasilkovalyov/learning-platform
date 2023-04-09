import $api from 'common/ajax-config'
import { parseCookies } from 'nookies'
import { AxiosResponse } from 'axios'
import { IGroupLessonProps } from 'interfaces/group-lesson.interface'

class GroupLessonService {
  async createGroupLesson(urlRequest: string, props: IGroupLessonProps): Promise<AxiosResponse> {
    const { token } = parseCookies()
    const response = await $api(token).post(urlRequest, {
      ...props,
    })
    return response
  }
}

export default new GroupLessonService()
