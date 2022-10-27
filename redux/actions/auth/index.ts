import { LOGIN_USER, LOGOUT_USER } from '../../constants'
import { Dispatch } from 'redux'

interface LoginDispatch {
  type: typeof LOGIN_USER
}

export const login_user = (userData) => {
  return (dispatch: Dispatch<LoginDispatch>) => {
    dispatch({
      type: LOGIN_USER,
      data: { ...userData },
    })
  }
}

export const logout_user = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER,
      data: {},
    })
  }
}
