import React, { useEffect, useState } from 'react'
import './manageCoins.css'
import coins from '../../assets/coin.png'
import firebase from '../../firebase';

const db = firebase.firestore();

const ManageCoins = (props) => {

    const [userData, setUserData] = useState({})
    const [active, setActive] = useState(false);
    const [user_id, setUser_id] = useState('');
    const [paytm_upi, setPaytm_upi] = useState('');

    useEffect(() => {
        // db.collection('users').where('id', '==', props.user.uid).get()
        // .then((querySnap) => {
        //     querySnap.forEach()
        // })
        db.collection('users').doc(props.user.uid).get().then((doc) => {
            setUserData(doc.data());
        })
    },[])
    
    const redeem = () => {
        db.collection('redeem_req').add({
            user_id: props.user.uid,
            name: props.user.displayName,
            coins: userData.coin,
            paytm_upi: paytm_upi 
        })
        .then((docRef) => {
            console.log('Request sent');
        })
        .catch((err) => {
            console.log('Error sending request');
        })
    }

    console.log(userData);
    return (
        <div>
            <div className='manage-coins'>
                <div className='manage-coins-container'>
                    <h2>Balance</h2>
                    <img src={coins} alt='coins' className='coin-img manage-img'/>
                    <h4>{userData.coin}</h4>
                    <div className='coin-action'>
                        <a href={()=>false} className='btn-buy'>Buy</a>
                        <input type='text' id='paytm_upi' className={`input-field ${active?'':'active'}`} onChange={event => setPaytm_upi(event.target.value)} placeholder='Paytm/UPI'></input>
                        <a href={()=>false} className={`btn-redeem ${active?'active':''}`} onClick={()=> setActive(!active)}>Redeem Now</a>
                        <a href={()=>false} className={`btn-redeem ${active?'':'active'}`} onClick={redeem}>Redeem Now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageCoins
