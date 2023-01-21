import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'

import { UserInfoStoreProps } from 'interfaces/user.interface'

export interface IAuthState {
  data: UserInfoStoreProps | null
}

const initialState: IAuthState = {
  data: null,
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<UserInfoStoreProps>) {
      state.data = action.payload
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

export const { setAuthState, clearAuthState } = authSlice.actions

export const selectAuthState = (state: AppState): UserInfoStoreProps | null => state.user.data

export default authSlice.reducer
