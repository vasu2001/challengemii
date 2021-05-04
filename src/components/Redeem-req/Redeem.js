import React, { useEffect, useState } from 'react'
import { Component } from 'react';
import firebase from '../../firebase';

const db = firebase.firestore();

class Redeem extends Component {

    state = {
        requests: []
    }

    componentDidMount(){
        db.collection('redeem_req').get().then((querySnap) => {
            querySnap.forEach((doc) => {
                this.setState(prevState => ({
                    requests: [...prevState.requests, doc.data()]
                }))
                // this.setState({requests: doc.data()})
            })
        })
    }
    render(){
    return (
        <div>  
            <div className='redeem'>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Paytm/UPI Id</th>
                    <th>Amount</th>
                    </tr>
                </thead>
                <tbody>

                {
                    this.state.requests.map((request, index) => {
                        const {id, name, paytm_upi, coins} = request
                        return(
                            <tr key={id}>
                                <td data-column="Name">{name}</td>
                                <td data-column="Paytm/UPI Id">{paytm_upi}</td>
                                <td data-column="Amount">{coins}</td>
                            </tr>
                        )
                    })
                }
                    {/* <tr>
                    <td data-column="Name">Johnny Depp</td>
                    <td data-column="Paytm/UPI Id">9987877666</td>
                    <td data-column="Amount">400</td>

                    </tr>
                    <tr>
                    <td data-column="Name">Tom Ellies</td>
                    <td data-column="Paytm/UPI Id">9974838473</td>
                    <td data-column="Amount">600</td>

                    </tr>
                    <tr>
                    <td data-column="Name">Ian Somerhalder</td>
                    <td data-column="Paytm/UPI Id">9987877666</td>
                    <td data-column="Amount">800</td>

                    </tr>
                    <tr>
                    <td data-column="Name">Chris Evans</td>
                    <td data-column="Paytm/UPI Id">9987899989</td>
                    <td data-column="Amount">300</td>

                    </tr> */}
                </tbody>
            </table>
            </div>
        </div>
    )
}
}

export default Redeem
