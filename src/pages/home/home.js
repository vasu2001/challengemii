import React, { useContext, useEffect } from 'react';
import './home.css';
// import Nav from '../../components/Nav/Nav'
// import Card from '../../components/Cards/cards';
import Banner from '../../components/Home-banner/Banner';
import Info from '../../components/Info-Card/Card';
import image1 from '../../assets/explore.png';
import { AuthContext } from '../../Auth';
import { motion } from 'framer-motion';
import Faq from '../../components/FAQs/Faq';

const Home = () => {
   const { userData, setUserData } = useContext(AuthContext);
   document.title = 'ChallengeMii';
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.5 }}
      >
         <div className="homepage">
            <Banner user={userData} />
            <section className="section-about">
               <div className="about-text-container">
                  <div className="about-text">
                     <h1 className="about-title">What is ChallengeMii ?</h1>
                     <div className="textbox">
                        <p className="about-para">
                           The <span>Challengemii</span> website is a platform
                           for people talented in various categories like{' '}
                           <span style={{ fontWeight: '600' }}>
                              writing , painting , photography{' '}
                           </span>
                           etc. to come together and showcase their talent .
                        </p>
                        <p className="about-para">
                           People can take part in{' '}
                           <span>various competitions</span> organised for
                           various talent category. People can vote for
                           deserving participate to appreciate the work of
                           exceptional talent and <span>earn money.</span>
                        </p>
                        <p className="about-para">
                           Through this platform we intent to{' '}
                           <span>discover talent</span> and recognise it. So, if
                           you think you have some talent then you have come to
                           the right place. Don't hide your talents,{' '}
                           <span>get ready to show them to the world!</span>
                        </p>
                     </div>
                  </div>
               </div>
               <div className="about-img-container">
                  <img src={image1} alt="explore" className="about-img" />
               </div>
            </section>
            <section className="section-info">
               <Info
                  title="Participate"
                  para="Test yourself by competiting with talents all over the country by participating in various amazing competitions, organized under various skills categories and win exciting prizes and cash."
               />
               <Info
                  title="Vote"
                  para="Vote your friends, family, acquaintances or your favourite contestant and help them win. Also get a chance to win exciting prizes and money by predicting the winner. "
               />
               <Info title="Affiliate Program" />
               <Info
                  title="Refer to friends"
                  para="Refer competitions to your friends and give them chance to compete in various talent categories. Also earn various prizes and money on every successful referral."
               />
            </section>
            <section className="section-faq">
               <h3>Frequently Asked Questions (FAQs) </h3>
               <Faq />
            </section>
         </div>
      </motion.div>
   );
};

export default Home;
