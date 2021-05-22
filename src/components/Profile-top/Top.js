import React from 'react';
import './top.css';

const Top = (props) => {
   return (
      <div>
         <div className="top-container">
            <h2>{props.title}</h2>
            <p style={{ marginTop: '5px' }}>{props.subtitle}</p>
         </div>
      </div>
   );
};

export default Top;
