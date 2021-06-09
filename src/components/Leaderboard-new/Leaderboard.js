import React from 'react';
import './leaderboard.css';
import girl from '../../assets/girl.jpg';
import prof from '../../assets/user.png';
import LeaderboardCard from '../LeaderboardCard/LeaderboardCard';
import uparrow from '../../assets/increase.png';

const Leaderboard = () => {
   return (
      <div className="ld-new">
         <div className="ld-new-top-container">
            <h2 className="submission-title" style={{ color: 'white' }}>
               LEADERBOARD
            </h2>
            <div className="ld-winners-container">
               <div className="winner-pos-2">
                  <img src={prof} class="runnerUp-img"></img>
                  <p>Vasu Aggrawal</p>
                  <p>345</p>
               </div>
               <div className="winner-pos-1">
                  <img src={girl} class="winner-img"></img>
                  <p>Krishna Saxena</p>
                  <p>355</p>
               </div>
               <div className="winner-pos-3">
                  <img src={prof} class="runnerUp-img last-pos"></img>
                  <p>Aviral Tanwar</p>
                  <p>315</p>
               </div>
            </div>
         </div>
         <div className="ld-new-bottom-container">
            {/* <LeaderboardCard /> */}
            <ul className="ld-list">
               <li>
                  <div>
                     <p>1</p>
                     <img
                        src={girl}
                        style={{
                           width: '50px',
                           height: '50px',
                           borderRadius: '50%',
                        }}
                     ></img>
                  </div>
                  <p class="li-name">Krishna Saxena</p>
                  <div>
                     <p>355</p>
                     <img
                        src={uparrow}
                        style={{
                           width: '30px',
                           height: '30px',
                           marginLeft: '5px',
                        }}
                     ></img>
                  </div>
               </li>
               <li>
                  <div>
                     <p>2</p>
                     <img
                        src={prof}
                        style={{
                           width: '50px',
                           height: '50px',
                           borderRadius: '50%',
                        }}
                     ></img>
                  </div>
                  <p class="li-name">Vasu Aggrawal</p>
                  <div>
                     <p>345</p>
                     <img
                        src={uparrow}
                        style={{
                           width: '30px',
                           height: '30px',
                           marginLeft: '5px',
                        }}
                     ></img>
                  </div>
               </li>
               <li>
                  <div>
                     <p>3</p>
                     <img
                        src={prof}
                        style={{
                           width: '50px',
                           height: '50px',
                           borderRadius: '50%',
                        }}
                     ></img>
                  </div>
                  <p class="li-name">Aviral Tanwar</p>
                  <div>
                     <p>315</p>
                     <img
                        src={uparrow}
                        style={{
                           width: '30px',
                           height: '30px',
                           marginLeft: '5px',
                        }}
                     ></img>
                  </div>
               </li>
               <li>
                  <div>
                     <p>4</p>
                     <img
                        src={prof}
                        style={{
                           width: '50px',
                           height: '50px',
                           borderRadius: '50%',
                        }}
                     ></img>
                  </div>
                  <p class="li-name">Shivansh Srivastava</p>
                  <div>
                     <p>215</p>
                     <img
                        src={uparrow}
                        style={{
                           width: '30px',
                           height: '30px',
                           marginLeft: '5px',
                        }}
                     ></img>
                  </div>
               </li>
               <li>
                  <div>
                     <p>5</p>
                     <img
                        src={prof}
                        style={{
                           width: '50px',
                           height: '50px',
                           borderRadius: '50%',
                        }}
                     ></img>
                  </div>
                  <p class="li-name">Aaryan Nehra</p>
                  <div>
                     <p>205</p>
                     <img
                        src={uparrow}
                        style={{
                           width: '30px',
                           height: '30px',
                           marginLeft: '5px',
                        }}
                     ></img>
                  </div>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Leaderboard;
