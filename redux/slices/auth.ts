import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'

import { UserAuthProps } from 'interfaces/user.interface'

export interface IAuthState {
  data: UserAuthProps | null
}

const initialState: IAuthState = {
  data: null,
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<UserAuthProps>) {
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

export const selectAuthState = (state: AppState): UserAuthProps | null => state.user.data

export default authSlice.reducer
