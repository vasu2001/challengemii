export const signIn = (callback) => async dispatch => {
    return (dispatch,getState,{getFirebase}) => {
        const firebase = getFirebase();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((results) => {
                dispatch({ type: 'LOGIN_SUCCES', results});
            }).catch((error) => {
                dispatch({ type: 'LOGIN_FAILED', error})
            });
    }
}