import { AxiosResponse } from 'axios'
import { PUBLIC_REQUESTS } from 'constants/api-requests'
import $api from 'common/ajax-config'
import { IRegistrationStudentProps } from 'components/Forms/Registration/RegistrationStudent/RegistrationStudent.type'
import { RegistrationTeacherFullProps } from 'components/Forms/Registration/RegistrationTeacher/RegistrationTeacher.type'

interface RegistrationUserResponse {
  data: {
    _id: string
    email: string
  }
  message: string
}

class RegistrationService {
  async signUpStudent(data: IRegistrationStudentProps): Promise<AxiosResponse<RegistrationUserResponse>> {
    const response = await $api().post(`${PUBLIC_REQUESTS.SIGN_UP_STUDENT}`, {
      ...data,
    })

    return response
  }

  async signUpTeacher(data: RegistrationTeacherFullProps): Promise<RegistrationUserResponse> {
    const response = await $api().post(`/${PUBLIC_REQUESTS.SIGN_UP_TEACHER}`, {
      ...data,
    })

    return response.data
  }
}

export default new RegistrationService()
