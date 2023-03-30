export interface IAuthUserResponse<T> {
  message?: string
  user: Partial<T> | null
  token?: string
}

export interface ISignUpUserResponse {
  message: string
  user: {
    _id: string
    email: string
  }
}
