export const createSubmission = (submission) => {
    return (dispatch,getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('submissions').add({
            ...submission
        }).then(()=>{dispatch({type: 'CREATE_SUBMISSION',submission});})
        .catch((err) => {dispatch({type: 'ERR', err});})
    }
}