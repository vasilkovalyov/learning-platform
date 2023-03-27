import { PUBLIC_REQUESTS } from 'constants/api-requests'
import $api from 'common/ajax-config'
import { UserAccountProps } from 'interfaces/user.interface'
import { AxiosResponse } from 'axios'

export interface AuthenticationUserResponse {
  user: UserAccountProps
  token: string
  message: string
}
class AuthService {
  async signIn(email: string, password: string): Promise<AxiosResponse<AuthenticationUserResponse> | undefined> {
    const response = await $api().get(`/${PUBLIC_REQUESTS.SIGN_IN}`, {
      params: { email, password },
    })
    return response
  }
}

export default new AuthService()
