import authReducer from './authReducer'
import competitionReducer from './competitionReducer'
import submissionReducer from './submissionReducer'
import redeemReducer from './redeemReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    competition: competitionReducer,
    submission: submissionReducer,
    redeem: redeemReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer