import firebase from '../../firebase';

export const createSubmission = (submission) => {
    return (dispatch,getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        let sub_id = '12345';
        firestore.collection('submissions').add({
            ...submission
        }).then((docRef)=>{
            sub_id = docRef.id;
            console.log(sub_id);
           dispatch({type: 'CREATE_SUBMISSION',submission});
        })
        .catch((err) => {dispatch({type: 'ERR', err});})
        
        firestore.collection('competitions').doc(submission.competition_id).set({
            submissions: firebase.firestore.FieldValue.increment(1)
        },{merge:true}).then(() => {
            console.log('Document written');
        })
        .catch((err) => {
            console.log('Error');
        })
    }
}