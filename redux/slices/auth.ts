import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'
import { RoleType } from 'types/common'

import { UserAccountProps } from 'interfaces/user.interface'

export type IAuthAccountState = Omit<UserAccountProps, 'password'>

export interface IAuthState {
  user: IAuthAccountState
  isAuth: boolean
}

export interface IAuthUserStore {
  user: IAuthState
}

const defaultAuthState: IAuthAccountState = {
  _id: '',
  email: '',
  fullname: '',
  login: '',
  phone: '',
  role: '',
}

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: defaultAuthState,
    isAuth: false,
  },
  reducers: {
    setAuthState(state, action: PayloadAction<UserAccountProps>) {
      state.user = action.payload
      state.isAuth = true
    },
    setUpdateAccountUser(state, action: PayloadAction<Partial<UserAccountProps>>) {
      state.user = {
        ...state.user,
        ...action.payload,
      } as UserAccountProps
    },
    clearAuthState(state) {
      state.user = defaultAuthState
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

export const selectAuthState = (state: IAuthUserStore): IAuthState => {
  return state.user
}

export default authSlice.reducer
