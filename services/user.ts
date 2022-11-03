import { PUBLIC_REQUESTS } from '../constants/api-requests'
import $api from '../common/ajax-config'
import { IUser } from 'intefaces/user'

class UserService {
  async isAuthUser(userId: string, token: string): Promise<IUser> {
    const response = await $api.get(`${process.env.API_URL}api/${PUBLIC_REQUESTS.GET_USER_BY_ID}${userId}`, {
      headers: { Authorization: `${token}` },
    })
    return response.data
  }
}

export default new UserService()
