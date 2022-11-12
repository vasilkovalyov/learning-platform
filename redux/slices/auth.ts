import { createSlice } from '@reduxjs/toolkit'
import { IUserStudent } from 'intefaces/user'

import { AppState } from '../store'
import { RoleType } from 'types/common'

export interface IAuthState {
  authState: {
    email: string
    login: string
    role: RoleType
    _id: string
  } | null
}

const initialState: IAuthState = {
  authState: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload
    },
    clearAuthState(state) {
      state.authState = null
    },
  },
})

export const { setAuthState, clearAuthState } = authSlice.actions

export const selectAuthState = (state: AppState): IUserStudent | null => state.auth.authState

export default authSlice.reducer
