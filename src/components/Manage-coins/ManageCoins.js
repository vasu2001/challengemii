import React, { useContext, useEffect, useState } from 'react';
import './manageCoins.css';
import firebase from '../../firebase';
import PrizeBox from '../prize-box/PrizeBox';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Auth';
import QuestionModal from '../Question-modal/QuestionModal';
import Loading from '../Loading/Loading';
import moment from 'moment';
import {BsSearch} from 'react-icons/bs'

const db = firebase.firestore();

const ManageCoins = (props) => {
   // const [active, setActive] = useState(false);
   // const [paytm_upi, setPaytm_upi] = useState('');
   const [loading, setLoading] = useState(false);
   const [modal, setModal] = useState(-1);

   const { userData: user, currentUser } = useContext(AuthContext);
   const [prizes, setPrizes] = useState([]);
   const [filter, setFilter] = useState('');

   const onRedeem = (answers) => {
      const prize = prizes[modal];
      setLoading(true);

      db.collection('redeem_req')
         .add({
            user_id: currentUser.uid,
            name: user.name,
            answers,
            coins: prize.coins,
            prize_id: prize.id,
            completed: false,
            date: moment().toString(),
         })
         .then((docRef) => {
            console.log('Request sent');
            toast('Redeem Request Sent!');
            setLoading(false);
            setModal(-1);
         })
         .catch((err) => {
            console.log('Error sending request');
            setLoading(false);
         });
   };

   const openModal = (i) => {
      const { coins } = prizes[i];

      if (parseInt(user.coin) < parseInt(coins)) {
         toast.error('Insufficient coins');
         return;
      }

      setModal(i);
   };

   const onSearch = (e) => {
      setFilter(e.target.value);
   }

   useEffect(() => {
      firebase
         .firestore()
         .collection('prizes')
         .get()
         .then((doc) => {
            setPrizes(doc.docs.map((x) => ({ ...x.data(), id: x.id })));
         });
   }, []);
   
   return (
      <div className="manage-coins">
         <div className="search-filter-container">
            <div className='search-box'>
               <input
                  type="text"
                  className="input-search"
                  placeholder="Search"
                  onChange={onSearch}
               ></input>
               <a className='btn-search'><BsSearch style={{fontSize: '18px', fontWeight: '900'}}/><p id='search-text'>Search</p></a>
            </div>
            <select className='filter-combo'>
               <option disabled selected hidden>Filter</option>
                  <optgroup label='Price:'>
                  <option>Low to High</option>
                  <option>High to Low</option>
               </optgroup>
            </select>
         </div>
         {modal > -1 ? (
            <QuestionModal
               onClose={() => setModal(-1)}
               ques={prizes[modal].ques}
               onRedeem={onRedeem}
            />
         ) : null}
         <div className="prizes">
            {prizes
            .filter(prize => prize.name.toLowerCase().includes(filter.toLowerCase()))
            .map((data, i) => (
               <PrizeBox data={data} key={i} onRedeem={() => openModal(i)} />
            ))}
         </div>
         {loading ? <Loading /> : null}
      </div>
   );
};

export default ManageCoins;
