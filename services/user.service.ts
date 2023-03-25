import { AxiosResponse } from 'axios'
import $api from 'common/ajax-config'
import { RoleType } from 'types/common'
import { parseCookies } from 'nookies'

interface RemovedUserResponse {
  message: string
}

class UserService {
  async isAuthUser(role: RoleType, userId: string, token: string) {
    try {
      const response = await $api().get(`/${role}/${userId}`, {
        headers: { Authorization: `${token}` },
      })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  async removeUser(): Promise<AxiosResponse<RemovedUserResponse> | undefined> {
    const { token, userId, role } = parseCookies()

    try {
      const response: AxiosResponse<RemovedUserResponse> = await $api(token).delete(`/${role}/delete`, {
        headers: { Authorization: `${token}` },
        params: {
          id: userId,
        },
      })
      return response
    } catch (e) {
      console.log(e)
    }
  }
}

export default new UserService()
