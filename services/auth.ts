import { PUBLIC_REQUESTS } from '../constants/api-requests'
import $api from '../common/ajax-config'
import { RoleType } from '../types/common'
import { IFormData, IFormDataCompany, IFormDataTeacher } from '../intefaces/auth'

interface ISignUpStudentResponse {
  data: null
  message: string
}

class AuthService {
  async signUpStudent(data: IFormData): Promise<ISignUpStudentResponse> {
    const response = await $api.post(PUBLIC_REQUESTS.SIGN_UP, {
      params: {
        ...data,
        role: 'student' as RoleType,
      },
    })

    return response.data
  }

  async signUpTeacher(data: IFormDataTeacher): Promise<ISignUpStudentResponse> {
    const response = await $api.post(PUBLIC_REQUESTS.SIGN_UP, {
      params: {
        ...data,
        role: 'teacher' as RoleType,
      },
    })

    return response.data
  }

  async signUpCompany(data: IFormDataCompany): Promise<ISignUpStudentResponse> {
    const response = await $api.post(PUBLIC_REQUESTS.SIGN_UP, {
      params: {
        ...data,
        role: 'company' as RoleType,
      },
    })

    return response.data
  }
}

export default new AuthService()
