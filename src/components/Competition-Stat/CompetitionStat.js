import React from 'react'
import './competitionStat.css'
import firebase from '../../firebase'
import { Component } from 'react';

const db = firebase.firestore();

class CompetitionStat extends Component {

    state = {
        competitions: []
    }

    componentDidMount(){
        db.collection('competitions').get().then((querySnap) => {
            querySnap.forEach((doc) => {
                this.setState(prevState => ({
                    competitions: [...prevState.competitions, doc.data()]
                }))
            })
        })
    }
    render(){
    return (
        <div>
            <div className='competition-stat'>
                <table>
                    <thead>
                        <tr>
                        <th>Title</th>
                        <th>Starts</th>
                        <th>Ends</th>
                        <th>Participants</th>
                        <th>Prize</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            this.state.competitions.map((competition, index) => {
                                const { id,title,starts,ends,prize,submissions } = competition;
                                return(
                                    <tr key={id} >
                                        <td data-column="Title">{title}</td>
                                        <td data-column="Starts">{starts}</td>
                                        <td data-column="Ends">{ends}</td>
                                        <td data-column="Participants">{submissions}</td>
                                        <td data-column="Prize">{prize}</td>
                                    </tr>
                                )
                            })
                        }

                        {/* <tr>
                        <td data-column="Title">Hack the Space</td>
                        <td data-column="Starts">16 Apr,2021 12:00 AM</td>
                        <td data-column="Ends">26 Apr,2021 06:00 AM</td>
                        <td data-column="Participants">48</td>
                        <td data-column="Prize">2000</td>
                        </tr>
                        <tr>
                        <td data-column="Title">FrostHack 2021</td>
                        <td data-column="Starts">7 May,2021 12:00 AM</td>
                        <td data-column="Ends">9 May,2021 06:00 AM</td>
                        <td data-column="Participants">22</td>
                        <td data-column="Prize">6000</td>
                        </tr>
                        <tr>
                        <td data-column="Title">Hack the Space</td>
                        <td data-column="Starts">16 Apr,2021 12:00 AM</td>
                        <td data-column="Ends">26 Apr,2021 06:00 AM</td>
                        <td data-column="Participants">48</td>
                        <td data-column="Prize">2000</td>
                        </tr>
                        <tr>
                        <td data-column="Title">FrostHack 2021</td>
                        <td data-column="Starts">7 May,2021 12:00 AM</td>
                        <td data-column="Ends">9 May,2021 06:00 AM</td>
                        <td data-column="Participants">22</td>
                        <td data-column="Prize">6000</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
    }
}

export default CompetitionStat
