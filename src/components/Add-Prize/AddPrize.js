import React from 'react'
import './addPrize.css'

const AddPrize = () => {
    return (
        <div className='add-prize'>
            <p>Prize Title:</p>
            <input type='text' id='title' className='input-field host-field' placeholder='Title'></input>
            <p>Prize Coin:</p>
            <input type='number' id='title' className='input-field host-field' placeholder='Title'></input>
            <p>Add Product Image:</p>
            <input id='choose-input' type='file'></input><br/>
            <a className='btn-add-product'>Add Product</a>
        </div>
    )
}

export default AddPrize
