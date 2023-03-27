import { AxiosResponse } from 'axios'
import $api from 'common/ajax-config'
import { RoleType } from 'types/common'
import { parseCookies } from 'nookies'
import { UserAccountProps } from 'interfaces/user.interface'

interface RemovedUserResponse {
  message: string
}

class UserService {
  async isAuthUser(
    role: RoleType,
    userId: string,
    token: string,
  ): Promise<AxiosResponse<UserAccountProps | undefined>> {
    const response = await $api(token).get(`/${role}/account/${userId}`)
    return response
  }

  async removeUser(): Promise<AxiosResponse<RemovedUserResponse> | undefined> {
    const { token, userId, role } = parseCookies()
    const response: AxiosResponse<RemovedUserResponse> = await $api(token).delete(`/${role}/delete/${userId}`)
    return response
  }
}

export default new UserService()
