import axios from 'axios'

type UniversalDataType = 'countries' | 'states' | 'cities'

export interface ICountry {
  country_name: string
  country_phone_code: number
  country_short_name: string
}

export interface IState {
  state_name: string
}

export interface ICity {
  city_name: string
}

class UniversalCountries {
  private API_TOKEN: string
  private API_URL: string
  private API_URL_ACCESS_TOKEN: string
  private API_EMAIL: string

  constructor() {
    this.API_TOKEN =
      process.env.UNIVERSAL_COUNTRIES_API_TOKEN || 'ENPyCjAijVqoPG4JpeiMi8Nb70CPlhiUpsRLRB5qwjdZLcz8VewtWf6k21gLfLyC31I'
    this.API_EMAIL = process.env.UNIVERSAL_COUNTRIES_API_EMAIL || 'vasiliy.kovalyov94@gmail.com'
    this.API_URL = 'https://www.universal-tutorial.com/api'
    this.API_URL_ACCESS_TOKEN = 'https://www.universal-tutorial.com/api/getaccesstoken'
  }

  private async getAccessToken() {
    try {
      const res = await axios.get(this.API_URL_ACCESS_TOKEN, {
        headers: {
          Accept: 'application/json',
          'api-token': this.API_TOKEN,
          'user-email': this.API_EMAIL,
        },
      })
      return res.data.auth_token
    } catch (e) {
      console.log(e)
    }
  }

  async getUniversalDataByType<T>(type: UniversalDataType, value?: string): Promise<T[] | undefined> {
    try {
      const authToken = await this.getAccessToken()
      if (!authToken) return undefined
      const res = await axios.get<T[]>(`${this.API_URL}/${type}/${value ? value : ''}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/json',
        },
      })
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}

export default new UniversalCountries()
