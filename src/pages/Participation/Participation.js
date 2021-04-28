import React from 'react'
import './participation.css'
import Nav from '../../components/Nav-new/Nav'

const Participation = () => {

    // var sectionStyle = {
    //     width: "100%",
    //     height: "400px",
    //     backgroundImage: "url("+"https://source.unsplash.com/random/krishan"+")"
    //   };

    return (
        <div>
            <div className='participation-pg'>
                <Nav />
                <div className='participation-container'>
                    <div className='participation-main'>
                        <div className='upload-photo'>
                            <h4>Upload your submission</h4>
                            <div className='parti-img-container' style={{backgroundImage: "url(https://source.unsplash.com/random/krishan",backgroundSize:'contain',backgroundRepeat: 'no-repeat', backgroundPosition:'center'}}>
                            </div>
                            <div className='inputfile-container '>
                                <input type='file'></input>
                            </div>
                        </div>
                        <div className='upload-video'>
                        <hr />
                        <input type='text' className='input-field' placeholder='Youtube video link'></input>
                        <div style={{marginTop:'30px'}}>
                            <a href={()=>false} className='btn-upload' >Upload</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Participation
