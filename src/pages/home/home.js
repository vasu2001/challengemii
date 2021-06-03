import React, { useContext } from 'react';
import './home.css';
// import Nav from '../../components/Nav/Nav'
// import Card from '../../components/Cards/cards';
import Banner from '../../components/Home-banner/Banner';
import Info from '../../components/Info-Card/Card';
import image1 from '../../assets/explore.png';
import { AuthContext } from '../../Auth';

const Home = () => {
   const { currentUser, setCurrentUser } = useContext(AuthContext);

   return (
      <div className="homepage">
         <Banner user={currentUser} />
         <section className="section-about">
            <div className="about-text-container">
               <div className="about-text">
                  <h1 className="about-title">Lorem Impsum dolor</h1>
                  <div className="textbox">
                     <p className="about-para">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus pellentesque eros est, vel accumsan ipsum
                        finibus vestibulum.Nam hendrerit molestie nisl, quis
                        facilisis ex consectetur sed.
                     </p>
                     <p className="about-para">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus pellentesque eros est, vel accumsan ipsum
                        finibus vestibulum.
                     </p>
                     <p className="about-para">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque eros est, vel accumsan ipsum finibus
                        vestibulum.Maecenas pretium dolor ut ex mattis
                        ultricies. Phasellus vel faucibus enim.
                     </p>
                  </div>
               </div>
            </div>
            <div className="about-img-container">
               <img src={image1} alt="explore" className="about-img" />
            </div>
         </section>
         <section className="section-info">
            <Info title="Participate" />
            <Info title="Vote" />
            <Info title="Affiliate Program" />
            <Info title="Refer to friends" />
         </section>
      </div>
   );
};

export default Home;
