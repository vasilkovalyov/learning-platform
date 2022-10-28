import { createSlice } from '@reduxjs/toolkit'

import { AppState } from '../store'

export interface IAuthState {
  authState: {
    email: string | null
    login: string | null
    role: string | null
    _id: string | null
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

export const selectAuthState = (state: AppState) => state.auth.authState

export default authSlice.reducer
