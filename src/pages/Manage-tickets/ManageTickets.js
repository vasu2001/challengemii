import React, { useState } from 'react';
import TicketCard from '../../components/TicketCard/TicketCard';
import './manageTickets.css';
import { v4 as uuid4 } from 'uuid';
import { firebaseEndpoints } from '../../firebase';
import postForm from '../../postForm';
import axios from 'axios';

const calcDiscount = (amount) => {
   if (amount < 100) return 0;
   if (amount < 500) return 5;
   if (amount < 1500) return 10;
   if (amount < 2500) return 15;
   return 20;
};

const ManageTickets = () => {
   const [amount, setAmount] = useState(0);
   const discount = calcDiscount(amount);
   const tickets = Math.floor(((amount / 5) * (100 + discount)) / 100);

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
               <h2>BUY TICKETS</h2>
               <h5>
                  BUY MORE <span>=</span> <span>GET MORE</span>
               </h5>
            </div>
            <div className="ticket_pre_container">
               <TicketCard inr={100} discount={5} />
               <TicketCard inr={500} discount={10} />
            </div>
            <div className="ticket_pre_container">
               <TicketCard inr={1000} discount={10} />
               <TicketCard inr={1500} discount={15} />
            </div>
            <div className="ticket_pre_container">
               <TicketCard inr={2000} discount={15} />
               <TicketCard inr={2500} discount={20} />
            </div>
            <p className="ticket-ques">
               Enter the amount for which you would like to buy tickets for?
            </p>
            <p>1 Ticket = Rs. 5</p>
            <input
               type="number"
               className="amount"
               placeholder="Enter amount"
               onChange={(e) => setAmount(e.target.value)}
            ></input>
            <div>
               {amount % 5 == 0 ? (
                  <p>
                     Tickets = {amount / 5}{' '}
                     {discount > 0 ? ` + ${discount}% = ${tickets}` : ''}
                  </p>
               ) : (
                  <p className="error">
                     Please enter amount in the multiples of 5!
                  </p>
               )}
            </div>
            <a className="btn-buy-tickets" onClick={buyTicket}>
               Buy Ticket
            </a>
         </div>
      </div>
   );
};

export default ManageTickets;
