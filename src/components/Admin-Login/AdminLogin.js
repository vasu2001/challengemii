import React, { useState } from 'react';
import './adminLogin.css';
import firebase from '../../firebase';
import { toast } from 'react-toastify';

export const AdminLogin = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const updateUsername = (e) => {
      setUsername(e.target.value);
   };

   const updatePassword = (e) => {
      setPassword(e.target.value);
   };
   const handleLogin = () => {
      firebase
         .auth()
         .signInWithEmailAndPassword(username, password)
         .catch((err) => {
            toast.error('Wrong email/pass');
         });
   };

   return (
      <div>
         <div className="admin-login">
            <div className="admin-login-container">
               <h3>Admin Login</h3>
               <hr />
               <div style={{ marginTop: '30px' }}>
                  <p>Username:</p>
                  <input
                     type="text"
                     onChange={(e) => updateUsername(e)}
                     className="input-field"
                     placeholder=""
                  ></input>
                  <p>Password:</p>
                  <input
                     type="password"
                     onChange={(e) => updatePassword(e)}
                     className="input-field"
                     placeholder=""
                  ></input>
                  <div className="save">
                     <a
                        href={() => false}
                        onClick={handleLogin}
                        className="btn-save"
                     >
                        Login
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
