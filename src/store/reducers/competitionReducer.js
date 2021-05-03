const initState = {
    // competitions: [
    //     {id: '1', title: 'Hack the space', entry:'500', active:true, status:'Ongoing'},
    //     {id: '2', title: 'TechEden', entry:'700', active:false, status:'Upcoming'},
    //     {id: '3', title: 'FrostHack 2021', entry:'400', active:true, status:'Ongoing'}
    // ]
}

const competitionReducer = (state = initState, action) => {
    switch (action.type){
        case 'CREATE_COMPETITION':
            console.log('created competition', action.competition);
            return state;
        case 'ERR':
            console.log('err', action.err);
            return state;
        default:
            return state
    }
}

export default competitionReducer
