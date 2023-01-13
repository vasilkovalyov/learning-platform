import { PUBLIC_REQUESTS } from 'constants/api-requests'
import $api from 'common/ajax-config'
import { RoleType } from 'types/common'

export interface UserResponseProps {
  _id: string
  email: string
  fullname: string
  login: string
  phone: string
  role: RoleType
}

export interface AuthenticationUserResponse {
  data: UserResponseProps
  token: string
  message: string
}

class AuthService {
  async signIn(email, password): Promise<AuthenticationUserResponse> {
    const response = await $api().post(`/${PUBLIC_REQUESTS.SIGN_IN}`, {
      params: { email, password },
    })
    return response.data
  }
}

export default new AuthService()
