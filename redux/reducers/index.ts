import { combineReducers } from 'redux'
import * as authReducer from './auth'

const rootReducer = combineReducers({
  ...authReducer,
})

export default rootReducer
