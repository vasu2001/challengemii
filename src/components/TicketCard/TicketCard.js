import React from 'react';
import './ticketCard.css';
import ticket from '../../assets/ticket.png';
import Flip from 'react-reveal/Flip';

const TicketCard = ({ inr, discount, buyTicket }) => {
   const tickets = inr / 5;
   return (
      <Flip bottom delay={500}>
         <a className="ticket_card" onClick={() => buyTicket(inr)}>
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
         </a>
      </Flip>
   );
};

export default TicketCard;
