const initState = {
    competitions: [
        {id: '1', title: 'Hack the space', entry:'500', active:true, status:'Ongoing'},
        {id: '2', title: 'TechEden', entry:'700', active:false, status:'Upcoming'},
        {id: '3', title: 'FrostHack 2021', entry:'400', active:true, status:'Ongoing'}
    ]
}

const competitionReducer = (state = initState, action) => {
    return state
}

export default competitionReducer
