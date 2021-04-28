import React from 'react'
import './adminLogin.css'

export const AdminLogin = () => {
    return (
        <div>
            <div className='admin-login'>
                <div className='admin-login-container'>
                    <h3>Admin Login</h3>
                    <hr />
                    <div style={{marginTop:'30px'}}>
                        <p>Username:</p>
                        <input type='text' className='input-field' placeholder=''></input>
                        <p>Password:</p>
                        <input type='password' className='input-field' placeholder=''></input>
                        <div className='save'>
                            <a href={() => false} className='btn-save'>Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
