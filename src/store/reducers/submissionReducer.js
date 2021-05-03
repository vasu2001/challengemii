const initState = {

}

const submissionReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_SUBMISSION':
            console.log('created submission', action.submission);
            return state;
        case 'ERR':
            console.log('err', action.err)
            return state;
        default:
            return state;
    }
}

export default submissionReducer