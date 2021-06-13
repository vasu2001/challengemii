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
         <div className="ft-links-ct">
            <div>
               <a className="link-tg" href="">
                  Feedback
               </a>
            </div>
            <div>
               <a
                  className="link-tg"
                  target="_blank"
                  href="https://forms.gle/2a9eooGNLK9FAzk2A"
               >
                  Affiliate Program
               </a>
            </div>
            <div>
               <a
                  className="link-tg"
                  target="_blank"
                  href="https://forms.gle/twDFeqsbXNdBeBXk9"
               >
                  Help & Support
               </a>
            </div>
            <div>
               <a
                  className="link-tg"
                  target="_blank"
                  href="/https://forms.gle/a6fyaq9krgPAkZGL9"
               >
                  Contact Us
               </a>
            </div>
            <div>
               <Link className="link-tg" to="/tnc">
                  Terms & Conditions
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Footer;
