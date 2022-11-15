import { PUBLIC_REQUESTS } from 'constants/api-requests'
import $api from '../common/ajax-config'
import { RoleType } from 'types/common'
import { IFormData, IFormDataCompany, IFormDataTeacher } from 'intefaces/auth'
import { IUserStudent, IUserCompany, IUserTeacher } from 'intefaces/user'

interface ISignUpResponse<T> {
  data: T
  message: string
}

interface ISignInResponse {
  data: IUserStudent
  token: string
  message: string
}

class AuthService {
  async signUpStudent(data: IFormData): Promise<ISignUpResponse<IUserStudent>> {
    const response = await $api().post(`${PUBLIC_REQUESTS.SIGN_UP_STUDENT}`, {
      params: {
        ...data,
        role: 'student' as RoleType,
      },
    })

    return response.data
  }

  async signUpTeacher(data: IFormDataTeacher): Promise<ISignUpResponse<IUserTeacher>> {
    const response = await $api().post(`/${PUBLIC_REQUESTS.SIGN_UP_TEACHER}`, {
      params: {
        ...data,
        role: 'teacher' as RoleType,
      },
    })

    return response.data
  }

  async signUpCompany(data: IFormDataCompany): Promise<ISignUpResponse<IUserCompany>> {
    const response = await $api().post(`/${PUBLIC_REQUESTS.SIGN_UP_COMPANY}`, {
      params: {
        ...data,
        role: 'company' as RoleType,
      },
    })

    return response.data
  }

  async signIn(data: Pick<IFormData, 'email' | 'password'>): Promise<ISignInResponse> {
    const response = await $api().post(`/${PUBLIC_REQUESTS.SIGN_IN}`, {
      params: data,
    })
    return response.data
  }
}

export default new AuthService()
