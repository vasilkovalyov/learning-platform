import $api from '../common/ajax-config'
import { IUser } from 'intefaces/user'
import { RoleType } from '../types/common'

class UserService {
  async isAuthUser(role: RoleType, userId: string, token: string): Promise<IUser> {
    const response = await $api.get(`${process.env.API_URL}api/${role}${userId}`, {
      headers: { Authorization: `${token}` },
    })
    return response.data
  }
}

export default new UserService()
