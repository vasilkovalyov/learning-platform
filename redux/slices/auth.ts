import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'

import { IUserAccountProps } from 'interfaces/user.interface'

export type IUserAccountStateProps = Omit<IUserAccountProps, 'password'>

export interface IAuthState {
  user: IUserAccountStateProps
  isAuth: boolean
}

const defaultAuthState: IUserAccountStateProps = {
  _id: '',
  email: '',
  fullname: '',
  login: '',
  phone: '',
  role: '',
  date: '',
}

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: defaultAuthState,
    isAuth: false,
  },
  reducers: {
    setAuthState(state, action: PayloadAction<IUserAccountStateProps>) {
      state.user = action.payload
      state.isAuth = true
    },
    setUpdateAccountUser(state, action: PayloadAction<Partial<IUserAccountStateProps>>) {
      state.user = {
        ...state.user,
        ...action.payload,
      }
    },
    clearAuthState(state) {
      state.user = {
        ...state.user,
        ...defaultAuthState,
      }
      state.isAuth = false
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      }
    },
  },
})

export const { setAuthState, clearAuthState, setUpdateAccountUser } = authSlice.actions

export const selectAuthState = (state: AppState): IAuthState => {
  return state.user
}

export default authSlice.reducer
