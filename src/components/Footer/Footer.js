import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
   return (
      <div className="footer">
         <div className="logo-footer">
            <p>
               Challenge<span style={{ color: 'red' }}>mii</span>
            </p>
         </div>
         <ul>
            <li>
               <Link className="link-tg" to="/tnc">
                  Feedback
               </Link>
            </li>
            <li>
               <Link className="link-tg" to="/tnc">
                  Affiliate Program
               </Link>
            </li>
            <li>
               <Link className="link-tg" to="/tnc">
                  Help & Support
               </Link>
            </li>
            <li>
               <Link className="link-tg" to="/tnc">
                  Terms & Conditions
               </Link>
            </li>
         </ul>
      </div>
   );
};

export default Footer;
