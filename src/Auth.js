import React, {useState, createContext} from 'react'

export const AuthContext = createContext();

export const AuthProvider = props => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData,setUserData]=useState(null);

    return(
        <AuthContext.Provider value={{currentUser, setCurrentUser,userData,setUserData}}>
            {props.children}
        </AuthContext.Provider>
    )
}