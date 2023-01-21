import { PUBLIC_REQUESTS } from 'constants/api-requests'
import $api from 'common/ajax-config'
import { UserInfoStoreProps } from 'interfaces/user.interface'

export interface AuthenticationUserResponse {
  data: UserInfoStoreProps
  token: string
  message: string
}

class AuthService {
  async signIn(email: string, password: string): Promise<AuthenticationUserResponse> {
    const response = await $api().post(`/${PUBLIC_REQUESTS.SIGN_IN}`, {
      params: { email, password },
    })
    return response.data
  }
}

export default new AuthService()
