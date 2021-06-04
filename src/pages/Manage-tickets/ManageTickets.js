import React from 'react';
import TicketCard from '../../components/TicketCard/TicketCard';
import './manageTickets.css';

const ManageTickets = () => {
   return (
      <div className="buy-tickets">
         <div className="buy_tickets_conatainer">
            <div className="tickets_titlebox">
               <h3 style={{ letterSpacing: '1.5px' }}>
                  BUY TICKETS <span>=</span> <span>GET MORE</span>
               </h3>
            </div>
            <div className="ticket_pre_container">
               <TicketCard tickets="1" inr="100" />
               <TicketCard tickets="5" inr="500" />
            </div>
            <div className="ticket_pre_container">
               <TicketCard tickets="10" inr="1000" />
               <TicketCard tickets="15" inr="1500" />
            </div>
            <div className="ticket_pre_container">
               <TicketCard tickets="20" inr="2000" />
               <TicketCard tickets="25" inr="2500" />
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
            <a className="btn-buy-tickets">Buy Ticket</a>
         </div>
      </div>
   );
};

export default ManageTickets;
