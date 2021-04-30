import authReducer from './authReducer'
import competitionReducer from './competitionReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    competition: competitionReducer
})

export default rootReducer