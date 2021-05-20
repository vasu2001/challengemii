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
    
    const [dropdown,setDropdown] = useState(false);

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
                <div className='search-filter-container'>
                    <input type='text' className='input-search' placeholder='Search'></input>
                    <div class="wrapper">
                        <input type="radio" name="select" id="option-1" checked></input>
                        <input type="radio" name="select" id="option-2"></input>
                        <label for="option-1" class="option option-1">
                            <div class="dot"></div>
                            <span>Low-to-High</span>
                            </label>
                        <label for="option-2" class="option option-2">
                            <div class="dot"></div>
                            <span>High-to-Low</span>
                        </label>
                    </div>
                    {/* <a className='btn-filter' onClick={() => setDropdown(!dropdown)}>Filter</a>
                    <div className={`dropdown-hide ${dropdown?'dropdown':null}`}>
                        <p id='low'>Price: Low to High</p>
                        <p id='high'>Price: High to Low</p>
                    </div> */}
                </div>
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
