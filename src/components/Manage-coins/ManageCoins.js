import React, { useEffect, useState } from 'react'
import './manageCoins.css'
import coins from '../../assets/coin.png'
import firebase from '../../firebase';

const db = firebase.firestore();

const ManageCoins = (props) => {
    const user = props.user
    const [active, setActive] = useState(false);
    const [paytm_upi, setPaytm_upi] = useState('');
    
    const redeem = () => {
        db.collection('redeem_req').add({
            user_id: props.uid,
            name: user.name,
            coins: user.coin,
            paytm_upi: paytm_upi 
        })
        .then((docRef) => {
            console.log('Request sent');
        })
        .catch((err) => {
            console.log('Error sending request');
        })
    }

    return (
        <div>
            <div className='manage-coins'>
                <div className='manage-coins-container'>
                    <h2>Balance</h2>
                    <img src={coins} alt='coins' className='coin-img manage-img'/>
                    <h4>{user.coin}</h4>
                    <div className='coin-action'>
                        <input type='text' id='paytm_upi' className={`input-field ${active?'':'active'}`} onChange={event => setPaytm_upi(event.target.value)} placeholder='Paytm/UPI'></input>
                        <a href={()=>false} className={`btn-redeem ${active?'active':''}`} onClick={()=> setActive(!active)}>Redeem Now</a>
                        <a href={()=>false} className={`btn-redeem ${active?'':'active'}`} onClick={redeem} >Redeem Now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageCoins
