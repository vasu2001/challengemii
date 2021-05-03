export const createCompetition = (competition) => {
    return (dispatch,getstate, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('competitions').add({
            ...competition
        }).then(()=>{dispatch({type: 'CREATE_COMPETITION', competition});})
        .catch((err)=>{dispatch({type: 'ERR', err});})
    }
};