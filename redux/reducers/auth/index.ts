import { LOGIN_USER, LOGOUT_USER } from '../../constants'

export interface IAuthState {
  authState: {
    email: string | null
    login: string | null
    role: string | null
    _id: string | null
  } | null
}

const initialStore: IAuthState = {
  authState: null,
}

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case LOGIN_USER:
      if (action.data) {
        return {
          ...state,
          authState: { ...action.data },
        }
      }
    case LOGOUT_USER:
      return {
        ...state,
        authState: { ...action.data },
      }
    default:
      return state
  }
}

export default reducer
