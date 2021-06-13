import React from 'react';
import './card.css';

const Card = (props) => {
   return (
      <div className="card-info">
         <h3 className="info-title">{props.title}</h3>
         <div className="para-container">
            <p className="info-para">{props.para}</p>
         </div>
      </div>
   );
};

export default Card;
