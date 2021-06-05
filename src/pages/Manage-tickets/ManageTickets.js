import React from 'react';
import TicketCard from '../../components/TicketCard/TicketCard';
import './manageTickets.css';
import { v4 as uuid4 } from 'uuid';
import { firebaseEndpoints } from '../../firebase';
import postForm from '../../postForm';
import axios from 'axios';

const ManageTickets = () => {
   const buyTicket = async (e) => {
      e.preventDefault();
      const value = '100.00';
      const orderId = uuid4();

      console.log(orderId);

      const {
         data: { CHECKSUM },
      } = await axios.post(firebaseEndpoints.initializePayment, {
         value,
         orderId,
      });
      console.log(CHECKSUM);

      postForm({
         action: `https://securegw-stage.paytm.in/theia/api/v1/`,
         params: {
            mid: process.env.MERCHANT_ID,
            orderId,
            txnToken: CHECKSUM,
         },
      });
   };

   return (
      <div className="buy-tickets">
         <div className="buy_tickets_conatainer">
            <div className="tickets_titlebox">
               <h3 style={{ letterSpacing: '1.5px' }}>
                  BUY TICKETS <span>=</span> <span>GET MORE</span>
               </h3>
            </div>
            <div className="ticket_pre_container">
               <TicketCard tickets="1" inr="100" discount="10" />
               <TicketCard tickets="5" inr="500" discount="10" />
            </div>
            <div className="ticket_pre_container">
               <TicketCard tickets="10" inr="1000" discount="10" />
               <TicketCard tickets="15" inr="1500" discount="10" />
            </div>
            <div className="ticket_pre_container">
               <TicketCard tickets="20" inr="2000" discount="10" />
               <TicketCard tickets="25" inr="2500" discount="10" />
            </div>
            <p>Enter the number of tickets you would like to buy?</p>
            <input
               type="number"
               className="buy-more"
               placeholder="Enter amount"
            ></input>
            <br />
            <div>
               <p>Cost: INR. 500</p>
            </div>
            <a className="btn-buy-tickets" onClick={buyTicket}>
               Buy Ticket
            </a>
         </div>
      </div>
   );
};

export default ManageTickets;
