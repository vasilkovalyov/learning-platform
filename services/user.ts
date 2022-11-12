import $api from '../common/ajax-config'
import { RoleType } from '../types/common'

class UserService {
  async isAuthUser(role: RoleType, userId: string, token: string) {
    try {
      const response = await $api.get(`${process.env.API_URL}api/${role}/${userId}`, {
        headers: { Authorization: `${token}` },
      })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}

export default new UserService()
