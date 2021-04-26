import React from 'react'
import './competitionStat.css'

const CompetitionStat = () => {
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
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CompetitionStat
