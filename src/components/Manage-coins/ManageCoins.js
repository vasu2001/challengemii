import React, { useContext, useEffect, useState } from 'react'
import './manageCoins.css'
import coins from '../../assets/coin.png'
import firebase from '../../firebase';
import PrizeBox from '../prize-box/PrizeBox';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Auth';

const db = firebase.firestore();

const ManageCoins = (props) => {
    const [active, setActive] = useState(false);
    const [paytm_upi, setPaytm_upi] = useState('');
    const [loading,setLoading] = useState(false);

    const {userData:user,currentUser}=useContext(AuthContext)
    const [prizes,setPrizes]=useState([])
    
    const redeem = (prize) => {
        db.collection('redeem_req').add({
            user_id: currentUser.uid,
            name: user.name,
            details: paytm_upi,
            coins: prize.coins,
            prize_id:prize.id
        })
        .then((docRef) => {
            console.log('Request sent');
            toast('Redeem Request Sent!')
        })
        .catch((err) => {
            console.log('Error sending request');
        })
    }

    useEffect(()=>{
        firebase.firestore().collection('prizes').get().then(doc=>{
            setPrizes(doc.docs.map(x=>({...x.data(),id:x.id})))
        })
    },[])

    return (
            <div className='manage-coins'>
            <div className='container-1'>
            <div className='cash-req'>
                    <h4>Get Cash</h4>
                    <p>Note: Minimum redeem cash limit is INR 1000</p>
                    <div className='cash-action'>
                        <input type='text' id='paytm_upi' className='input-field' onChange={event => setPaytm_upi(event.target.value)} placeholder='Paytm/UPI'></input> 
                        <a href={false} className='btn-redeem' onClick={() => {
                            // if(paytm_upi!==''){
                            //     setLoading(true)
                            //     redeem()
                            // }
                            // else{
                            //     toast.error('Enter your paytm/upi id');
                            // }
                        }}>Redeem</a>
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
                        {/* <a className='btn-redeem' onClick={redeem}>Redeem</a> */}
                    </div>
                <div className='prizes'>
                   {
                       prizes.map((data,i)=>(<PrizeBox data={data} key={i} onRedeem={()=>redeem(data)} />))
                   }
                </div>
            </div>
            </div>
    )
}

export default ManageCoins
