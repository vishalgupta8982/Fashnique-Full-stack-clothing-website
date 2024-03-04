 
import React, { createContext, useContext, useEffect, useState,  } from 'react';
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [sessionExpired, setSessionExpired] = useState(false);
    const navigate=useNavigate();
    useEffect(() => {
        checkAuthStatus();
    }, []);
    useEffect(() => {
        if (sessionExpired) {
            toast.error("Session expired");
            setSessionExpired(false);  
        }
    }, [sessionExpired]);

    const checkAuthStatus = () => {
        const user = JSON.parse(localStorage.getItem('User'))
        if (user) {
            const token = user.token.expiresAt
            const tokenStamp = new Date(token).getTime();
            if (tokenStamp < Date.now() ) {
                logout();
                setSessionExpired(true); 
            }  
        }
    };
    const logout = () => {
        localStorage.removeItem('User');
        navigate('/')
    };
    
    return (
        <AuthContext.Provider value={{  logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
 
