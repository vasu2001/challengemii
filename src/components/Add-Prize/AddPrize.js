import React, { useState } from 'react'
import './addPrize.css'
import {toast} from 'react-toastify'
import {v4 as uuid4} from 'uuid'
import firebase from '../../firebase';
import Loading from '../Loading/Loading';

const AddPrize = () => {
    const [details,setDetails]=useState({
       name:"",
       coins:"",
       image:"" ,
    })
    const [loading,setLoading] = useState(false);

    const handleChange = (e)=>{
        setDetails({
            ...details,
            [e.target.id]: e.target.value
        })
    }

    const handleUpload = (e) => {
        setDetails({
            ...details,
            image: e.target.files[0] 
        })
    }

    const onSubmit= async (e)=>{
        e.preventDefault()
        const uid = uuid4()

        try{
            const storageRef = firebase.storage().ref(`prize-covers/${uid}`);
            await storageRef.put(details.image)
            const imageURL = await storageRef.getDownloadURL()

            await firebase.firestore().collection('prizes').doc(uid).set({
                name:details.name,
                coins:details.coins,
                image:imageURL
            })
            setLoading(false);
            toast.success('Prize Uploaded Successfully!')


        }catch(err){
            console.log(err)
            toast.error('Error')
        }
       
        
    }

    return (
        <div className='add-prize'>
            {
                loading?<Loading />:null
            }
            <p>Prize Title:</p>
            <input type='text' id='name' onChange={handleChange} className='input-field host-field' placeholder='Name'></input>
            <p>Prize Coin:</p>
            <input type='number' id='coins' onChange={handleChange} className='input-field host-field' placeholder='Coins'></input>
            <p>Add Product Image:</p>
            <input id='choose-input' type='file' onChange={handleUpload}></input><br/>
            <a href={false} className='btn-add-product' onClick={(e) => {
                if(details.name === '' || details.coins === '' || details.image === ''){
                    toast.error('Fill out all the fields');
                }
                else{
                    setLoading(true);
                    onSubmit(e);
                }
            }}>Add Product</a>
        </div>
    )
}

export default AddPrize
