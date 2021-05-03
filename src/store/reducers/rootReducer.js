import authReducer from './authReducer'
import competitionReducer from './competitionReducer'
import submissionReducer from './submissionReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    competition: competitionReducer,
    submission: submissionReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer