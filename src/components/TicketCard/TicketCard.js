import React from 'react';
import './ticketCard.css';
import ticket from '../../assets/ticket.png';

const TicketCard = ({ inr, discount }) => {
   const tickets = inr / 5;
   return (
      <div className="ticket_card">
         <div className="ticket_value">
            <h5>
               <span>
                  <img src={ticket}></img>
               </span>
               <span className="o-tickets"> {tickets}</span>
               {(tickets * (100 + discount)) / 100}
               <span className="tickets">Tickets</span>
            </h5>
         </div>
         <div className="inr_value">
            <h5 className="inr-mob">
               <span>
                  <img src={ticket}></img>
               </span>
               {tickets} Tickets
            </h5>
            <h5>INR. {inr}</h5>
         </div>
         <div className="discount">{discount}%</div>
      </div>
   );
};

export default TicketCard;
