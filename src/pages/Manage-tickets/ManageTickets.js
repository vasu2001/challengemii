import React from 'react';
import './manageTickets.css';

const ManageTickets = () => {
   return (
      <div className="manage-tickets">
         <div className="manage-tickets-card">
            <h3 style={{ color: '#333' }}>Tickets</h3>
            <div className="tickets-balance">
               <h3>Balance: 3 tickets</h3>
            </div>
            <div className="buy-tickets">
               <h4>Buy more </h4>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <input
                     type="number"
                     className="buy-more"
                     placeholder="0"
                  ></input>
                  <p style={{ marginTop: '20px', marginLeft: '10px' }}>
                     Tickets
                  </p>
               </div>
               <a className="btn-buy-tickets">Buy tickets</a>
            </div>
         </div>
      </div>
   );
};

export default ManageTickets;
