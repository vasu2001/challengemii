import React, { useContext, useEffect, useState } from 'react'
import './manageCoins.css'
import coins from '../../assets/coin.png'
import firebase from '../../firebase';
import PrizeBox from '../prize-box/PrizeBox';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Auth';
import QuestionModal from '../Question-modal/QuestionModal';
import Loading from '../Loading/Loading';
import moment from 'moment';

const db = firebase.firestore();

const ManageCoins = (props) => {
    // const [active, setActive] = useState(false);
    // const [paytm_upi, setPaytm_upi] = useState('');
    const [loading,setLoading] = useState(false);
    const [modal,setModal] = useState(-1)

    const {userData:user,currentUser}=useContext(AuthContext)
    const [prizes,setPrizes]=useState([])
    
    const onRedeem = (answers) => {
        const prize=prizes[modal]
        setLoading(true)

        db.collection('redeem_req').add({
            user_id: currentUser.uid,
            name: user.name,
            answers,
            coins: prize.coins,
            prize_id:prize.id,
            completed:false,
            date:moment().toString()
        })
        .then((docRef) => {
            console.log('Request sent');
            toast('Redeem Request Sent!')
            setLoading(false)
            setModal(-1)
        })
        .catch((err) => {
            console.log('Error sending request');
            setLoading(false)
        })
    }

    const openModal=(i)=>{
        const {coins}=prizes[i]

        if(parseInt(user.coin)<parseInt(coins)){
            toast.error('Insufficient coins')
            return;
        }

        setModal(i);
    }

    useEffect(()=>{
        firebase.firestore().collection('prizes').get().then(doc=>{
            setPrizes(doc.docs.map(x=>({...x.data(),id:x.id})))
        })
    },[])

    return (
            <div className='manage-coins'>
                {
                    modal > -1?<QuestionModal onClose={()=>setModal(-1)} ques={prizes[modal].ques} onRedeem={onRedeem} />: null
                }
                <div className='prizes'>
                   {
                       prizes.map((data,i)=>(<PrizeBox data={data} key={i} onRedeem={()=>openModal(i)} />))
                   }
                </div>
                {
                    loading?<Loading/>:null
                }
            </div>
    )
}

export default ManageCoins
