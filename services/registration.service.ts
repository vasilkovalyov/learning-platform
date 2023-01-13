import { PUBLIC_REQUESTS } from 'constants/api-requests'
import $api from '../common/ajax-config'
import { RoleType } from 'types/common'
import { RegistrationStudentFormProps } from 'components/Forms/Registration/RegistrationStudent/RegistrationStudent.type'
import { RegistrationTeacherFullProps } from 'components/Forms/Registration/RegistrationTeacher/RegistrationTeacher.type'

interface RegistrationUserResponse {
  data: {
    _id: string
    email: string
  }
  message: string
}

class RegistrationService {
  async signUpStudent(data: RegistrationStudentFormProps): Promise<RegistrationUserResponse> {
    const response = await $api().post(`${PUBLIC_REQUESTS.SIGN_UP_STUDENT}`, {
      params: {
        ...data,
        role: 'student' as RoleType,
      },
    })

    return response.data
  }

  async signUpTeacher(data: RegistrationTeacherFullProps): Promise<RegistrationUserResponse> {
    const response = await $api().post(`/${PUBLIC_REQUESTS.SIGN_UP_TEACHER}`, {
      params: {
        ...data,
        role: 'teacher' as RoleType,
      },
    })

    return response.data
  }
}

export default new RegistrationService()
