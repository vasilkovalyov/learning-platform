import { AxiosResponse } from 'axios'
import $api from 'common/ajax-config'
import { RoleType } from 'types/common'

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

  async removeUser(
    role: RoleType,
    userId: string,
    token: string,
  ): Promise<AxiosResponse<RemovedUserResponse> | undefined> {
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
