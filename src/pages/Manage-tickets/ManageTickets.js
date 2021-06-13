import React, { useContext, useState } from 'react';
import TicketCard from '../../components/TicketCard/TicketCard';
import './manageTickets.css';
import { v4 as uuid4 } from 'uuid';
import { firebaseEndpoints } from '../../firebase';
import postForm from '../../postForm';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AuthContext } from '../../Auth';
import { toast } from 'react-toastify';

const TICKET_VALUE = 5;

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
   const tickets = Math.floor(
      ((amount / TICKET_VALUE) * (100 + discount)) / 100,
   );
   const { currentUser } = useContext(AuthContext);

   document.title = 'ChallengeMii - Buy Tickets';

   const handleBuy = (e) => {
      e.preventDefault();
      return buyTicket(amount);
   };

   const buyTicket = async (amt) => {
      if (amt === 0 || amt % TICKET_VALUE !== 0) {
         toast.error('Enter amount in the multiples of ' + TICKET_VALUE);
         return;
      }

      try {
         const value = amt.toFixed(2);
         const orderId = uuid4();
         const { uid } = currentUser;

         const { data } = await axios.post(
            firebaseEndpoints.initializePayment,
            {
               value,
               orderId,
               uid,
            },
         );
         const { txnToken } = data.body;

         postForm({
            action: `https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${process.env.REACT_APP_PAYTM_MERCHANT_ID}&orderId=${orderId}`,
            params: {
               mid: process.env.REACT_APP_PAYTM_MERCHANT_ID,
               orderId,
               txnToken,
            },
         });
      } catch (err) {
         console.log(err);
         toast.error('Some error occured');
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 1 }}
      >
         <div className="buy-tickets">
            <div className="buy_tickets_conatainer">
               <div className="tickets_titlebox">
                  <h2>BUY TICKETS</h2>
                  <h5>
                     BUY MORE <span>=</span> <span>GET MORE</span>
                  </h5>
               </div>
               <div className="ticket_pre_container">
                  <TicketCard inr={100} discount={5} buyTicket={buyTicket} />
                  <TicketCard inr={500} discount={10} buyTicket={buyTicket} />
               </div>
               <div className="ticket_pre_container">
                  <TicketCard inr={1000} discount={10} buyTicket={buyTicket} />
                  <TicketCard inr={1500} discount={15} buyTicket={buyTicket} />
               </div>
               <div className="ticket_pre_container">
                  <TicketCard inr={2000} discount={15} buyTicket={buyTicket} />
                  <TicketCard inr={2500} discount={20} buyTicket={buyTicket} />
               </div>
               <p className="ticket-ques">
                  Enter the amount for which you would like to buy tickets for?
               </p>
               <p>1 Ticket = Rs. {TICKET_VALUE}</p>
               <input
                  type="number"
                  className="buy-more"
                  placeholder="Enter amount"
                  onChange={(e) => setAmount(parseInt(e.target.value))}
               ></input>
               <div>
                  {amount % TICKET_VALUE == 0 ? (
                     <p>
                        Tickets = {amount / TICKET_VALUE}{' '}
                        {discount > 0 ? ` + ${discount}% = ${tickets}` : ''}
                     </p>
                  ) : (
                     <p className="error">
                        Please enter amount in the multiples of {TICKET_VALUE}!
                     </p>
                  )}
               </div>
               <a className="btn-buy-tickets" onClick={handleBuy}>
                  Buy Ticket
               </a>
            </div>
         </div>
      </motion.div>
   );
};

export default ManageTickets;
