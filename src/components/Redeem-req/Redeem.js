import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import firebase from '../../firebase';
import moment from 'moment';
import RedeemDetails from '../Redeem-Details/RedeemDetails';

const db = firebase.firestore();

class Redeem extends Component {
   state = {
      requests: [],
      display: false,
   };

   setDisplay = () => {
      this.setState({ display: false });
   };

   componentDidMount() {
      db.collection('redeem_req')
         .get()
         .then((querySnap) => {
            querySnap.forEach((doc) => {
               this.setState((prevState) => ({
                  requests: [...prevState.requests, doc.data()],
               }));
            });
         });
   }
   render() {
      return (
         <div>
            {this.state.display ? (
               <RedeemDetails setDisplay={this.setDisplay} />
            ) : null}
            <div className="redeem">
               <table>
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Details</th>
                     </tr>
                  </thead>
                  <tbody>
                     {this.state.requests.map((request, index) => {
                        const { id, name, date } = request;
                        return (
                           <tr key={id}>
                              <td data-column="Name">{name}</td>
                              <td data-column="Paytm/UPI Id">
                                 {moment(date).format('DD/MM/YYYY, hh:mm a')}
                              </td>
                              <td data-column="details">
                                 <a
                                    className=""
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                       this.setState({ display: true })
                                    }
                                 >
                                    Details
                                 </a>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </div>
      );
   }
}

export default Redeem;
