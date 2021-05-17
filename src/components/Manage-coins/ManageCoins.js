import React, { useEffect, useState } from 'react'
import './manageCoins.css'
import coins from '../../assets/coin.png'
import firebase from '../../firebase';
import PrizeBox from '../prize-box/PrizeBox';

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
            {/* <div className='manage-coins'>
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
            </div> */},
            <div className='manage-coins'>
            <div className='container-1'>
            <div className='cash-req'>
                    <h4>Get Cash</h4>
                    <p>Note: Minimum redeem cash limit is INR 1000</p>
                    <div className='cash-action'>
                        <input type='text' id='paytm_upi' className='input-field' onChange={event => setPaytm_upi(event.target.value)} placeholder='Paytm/UPI'></input> 
                        <a className='btn-redeem' onClick={redeem}>Redeem</a>
                    </div>
                </div>
                <div className='balance-container'>
                    <h3 className='balance-titls'>Balance:</h3>
                    <h4><span><img src={coins} className='balance-img'></img></span>120</h4>
                </div>
            </div>
            <div className='prize-container'>
                <h4>Get Prize</h4>
                <div className='cash-action'>
                        <input type='text' id='paytm_upi' className='input-field' placeholder='Full shipping address'></input> 
                        <a className='btn-redeem' onClick={redeem}>Redeem</a>
                    </div>
                <div className='prizes'>
                    <PrizeBox />
                    <PrizeBox />
                    <PrizeBox />
                    <PrizeBox />
                    <PrizeBox />
                    <PrizeBox />
                </div>
            </div>
            </div>
    )
}

export default ManageCoins
