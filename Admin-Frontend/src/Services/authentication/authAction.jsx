 import {baseUrl} from '../../Utils/baseUrl'
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AdminLoginRequest = () => ({
    type: 'ADMIN_LOGIN_REQUEST',
});

export const AdminLoginSuccess = (user) => ({
    type: 'ADMIN_LOGIN_SUCCESS',
    payload: {user},
});

export const AdminLoginFailure = (error) => ({
    type: 'ADMIN_LOGIN_FAILURE',
    payload: error,
});
export const AdminRegisterRequest = () => ({
    type: 'ADMIN_REGISTER_REQUEST',
});

export const AdminRegisterSuccess = (user) => ({
    type: 'ADMIN_REGISTER_SUCCESS',
    payload: {user},
});

export const AdminRegisterFailure = (error) => ({
    type: 'ADMIN_REGISTER_FAILURE',
    payload: error,
});

export const logout = () => ({
    type: 'LOGOUT',
});
export const adminLogin=(credential)=>async(dispatch)=>{
    dispatch(AdminLoginRequest());
     
    try{
        const response=await axios.post(`${baseUrl}/user/admin-login`,credential)
        if(response){
            dispatch(AdminLoginSuccess(response.data))
            await AsyncStorage.setItem(response.data)
        }
        console.log(response.data)
    }
    catch(err){
        dispatch(AdminLoginFailure(err.response.data))
         return err.response.data
    }
}
 
export const adminRegister=(credential)=>async(dispatch)=>{
    console.log(credential,"hi")
    dispatch(AdminRegisterRequest())
    try{
        const response=await axios.post(`${baseUrl}/user/register`,credential)
        if(response){
            dispatch(AdminRegisterSuccess(response.data))
        }
        console.log(response.data)
    }
    catch(err){
        dispatch(AdminRegisterFailure(err.response.data))
        return err.response.data
    }
}