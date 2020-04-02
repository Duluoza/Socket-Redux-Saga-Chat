import {combineReducers} from 'redux'
import usersReducer from './usersReducer'
import chatsReducer from './chatsReducer'

const rootReducer = combineReducers({
  usersReducer: usersReducer,
  chatsReducer: chatsReducer
})

export default rootReducer