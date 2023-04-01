import { PUBLIC_REQUESTS } from 'constants/api-requests'
import $api from 'common/ajax-config'
import { IUserAccountProps } from 'interfaces/user.interface'
import { AxiosResponse } from 'axios'

export interface AuthenticationUserResponse {
  user: IUserAccountProps
  token: string
  message: string
}

class AuthService {
  async signIn(email: string, password: string): Promise<AxiosResponse<AuthenticationUserResponse>> {
    const response = await $api().get(`/${PUBLIC_REQUESTS.SIGN_IN}`, {
      params: {
        email,
        password,
      },
    })
    return response
  }
}

export default new AuthService()
