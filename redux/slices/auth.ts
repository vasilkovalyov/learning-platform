import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'

import { UserAccountProps } from 'interfaces/user.interface'

export interface IAuthState {
  data: UserAccountProps | null
}

const initialState: IAuthState = {
  data: null,
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<UserAccountProps>) {
      state.data = action.payload
    },
    setUpdateAccountUser(state, action: PayloadAction<Partial<UserAccountProps>>) {
      state.data = {
        ...state.data,
        ...action.payload,
      } as UserAccountProps
    },
    clearAuthState(state) {
      state.data = null
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

export const selectAuthState = (state: AppState): UserAccountProps | null => state.user.data

export default authSlice.reducer
