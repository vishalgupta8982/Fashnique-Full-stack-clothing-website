 import { config } from '../../utils/AxiosConfig.jsx';
import {baseUrl} from '../../utils/baseUrl.jsx'
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
export const UserDetailRequest = () => ({
    type: 'USER_DETAIL_REQUEST',
});

export const UserDetailSuccess = (user) => ({
    type: 'USER_DETAIL_SUCCESS',
    payload: {user},
});

export const UserDetailFailure = (error) => ({
    type: 'USER_DETAIL_FAILURE',
    payload: error,
});
export const UserDetailUpdateRequest = () => ({
    type: 'USER_DETAIL_UPDATE_REQUEST',
});

export const UserDetailUpdateSuccess = (user) => ({
    type: 'USER_DETAIL_UPDATE_SUCCESS',
    payload: {user},
});

export const UserDetailUpdateFailure = (error) => ({
    type: 'USER_DETAIL_UPDATE_FAILURE',
    payload: error,
});
export const updatePasswordRequest = () => ({
    type: 'UPDATE_PASSWORD_REQUEST',
});

export const updatePasswordSuccess = (user) => ({
    type: 'UPDATE_PASSWORD_SUCCESS',
    payload: {user},
});

export const updatePasswordFailure = (error) => ({
    type: 'UPDATE_PASSWORD_FAILURE',
    payload: error,
});
export const resetUserDetail=()=>({
    type: 'USER_DETAIL_RESET',
})

export const logout = () => ({
    type: 'LOGOUT',
});
export const userLogin=(credential)=>async(dispatch)=>{
    dispatch(UserLoginRequest());
     
    try{
        const response=await axios.post(`${baseUrl}/user/login`,credential)
        if(response){
            localStorage.setItem('User', JSON.stringify(response.data))
            dispatch(UserLoginSuccess(response.data))
            setTimeout(() => {
                dispatch(resetUserDetail())
            }, 1000)
        }
        console.log(response.data)
    }
    catch(err){
        dispatch(UserLoginFailure(err.response.data))
        setTimeout(() => {
            dispatch(resetUserDetail())
        }, 1000)
         return err.response.data
    }
}
 
export const userRegister=(credential)=>async(dispatch)=>{
    dispatch(UserRegisterRequest())
    try{
        const response=await axios.post(`${baseUrl}/user/register`,credential)
        if(response){
            dispatch(UserRegisterSuccess(response.data))
            setTimeout(() => {
                dispatch(resetUserDetail())
            }, 1000)
        }
        
    }
    catch(err){
        dispatch(UserRegisterFailure(err.response.data))
        setTimeout(() => {
            dispatch(resetUserDetail())
        }, 1000)
        return err.response.data
    }
}


export const userDetail = () => async(dispatch) => {
    dispatch(UserDetailRequest())
    try {
        const response = await axios.get(`${baseUrl}/user/userdetail`, config)
        if (response) {
            dispatch(UserDetailSuccess(response.data))
            setTimeout(() => {
                dispatch(resetUserDetail())
            }, 1000)
        }
    }
    catch (err) {
        dispatch(UserDetailFailure(err.response.data))
        setTimeout(() => {
            dispatch(resetUserDetail())
        }, 1000)
        return err.response.data
    }
}

export const userDetailUpdate = (detail) => async(dispatch) =>{ 
    dispatch(UserDetailUpdateRequest())
    try {
        const response = await axios.put(`${baseUrl}/user/edit-user`,detail, config)
        if (response) {
            dispatch(UserDetailUpdateSuccess(response.data))
            setTimeout(() => {
                dispatch(resetUserDetail())
            }, 1000)
        }
    }
    catch (err) {
        dispatch(UserDetailUpdateFailure(err.response.data))
        setTimeout(() => {
            dispatch(resetUserDetail())
        }, 1000)
        return err.response.data
    }
}

export const updatePassword = (password) => async(dispatch) => {
    console.log(password)
    dispatch(updatePasswordRequest())
    try {
        const response = await axios.put(`${baseUrl}/user/password`,password, config)
        if (response) {
            dispatch(updatePasswordSuccess(response.data))
            setTimeout(() => {
                dispatch(resetUserDetail())
            }, 1000)
        }
    }
    catch (err) {
        dispatch(updatePasswordFailure(err.response.data))
        setTimeout(() => {
            dispatch(resetUserDetail())
        }, 1000)
        return err.response.data
    }
}