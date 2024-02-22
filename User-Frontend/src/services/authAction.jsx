 import {baseUrl} from './../utils/baseUrl.jsx'
import axios from "axios"


export const UserLoginRequest = () => ({
    type: 'USER_LOGIN_REQUEST',
});

export const UserLoginSuccess = (user) => ({
    type: 'USER_LOGIN_SUCCESS',
    payload: {user},
});

export const UserLoginFailure = (error) => ({
    type: 'USER_LOGIN_FAILURE',
    payload: error,
});
export const UserRegisterRequest = () => ({
    type: 'USER_REGISTER_REQUEST',
});

export const UserRegisterSuccess = (user) => ({
    type: 'USER_REGISTER_SUCCESS',
    payload: {user},
});

export const UserRegisterFailure = (error) => ({
    type: 'USER_REGISTER_FAILURE',
    payload: error,
});

export const logout = () => ({
    type: 'LOGOUT',
});
export const userLogin=(credential)=>async(dispatch)=>{
    dispatch(UserLoginRequest());
     
    try{
        const response=await axios.post(`${baseUrl}/user/login`,credential)
        if(response){
            dispatch(UserLoginSuccess(response.data))
        }
        console.log(response.data)
    }
    catch(err){
        dispatch(UserLoginFailure(err.response.data))
         return err.response.data
    }
}
 
export const userRegister=(credential)=>async(dispatch)=>{
    console.log(credential,"hi")
    dispatch(UserRegisterRequest())
    try{
        const response=await axios.post(`${baseUrl}/user/register`,credential)
        if(response){
            dispatch(UserRegisterSuccess(response.data))
        }
        console.log(response.data)
    }
    catch(err){
        dispatch(UserRegisterFailure(err.response.data))
        return err.response.data
    }
}