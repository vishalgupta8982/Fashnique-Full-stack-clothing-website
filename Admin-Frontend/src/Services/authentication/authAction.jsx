import { baseUrl } from '../../Utils/baseUrl'
import axios from 'axios'
import Cookies from 'js-cookie';
export const AdminLoginRequest = () => ({
  type: 'ADMIN_LOGIN_REQUEST',
})

export const AdminLoginSuccess = (user) => ({
  type: 'ADMIN_LOGIN_SUCCESS',
  payload: { user },
})

export const AdminLoginFailure = (error) => ({
  type: 'ADMIN_LOGIN_FAILURE',
  payload: error,
})
export const AdminRegisterRequest = () => ({
  type: 'ADMIN_REGISTER_REQUEST',
})

export const AdminRegisterSuccess = (user) => ({
  type: 'ADMIN_REGISTER_SUCCESS',
  payload: { user },
})

export const AdminRegisterFailure = (error) => ({
  type: 'ADMIN_REGISTER_FAILURE',
  payload: error,
})

export const logout = () => ({
  type: 'LOGOUT',
})
export const adminLogin = (credential) => async (dispatch) => {
  dispatch(AdminLoginRequest())

  try {
    const response = await axios.post(`${baseUrl}/user/admin-login`, credential)
    if (response) {
      dispatch(AdminLoginSuccess(response.data))
      Cookies.set('fashniqueAdminToken', response.data.token.token, { expires: 1, secure: true });
      localStorage.setItem('name', response.data.firstName+" "+response.data.lastName)
      localStorage.setItem('email',response.data.email)
    }
    console.log(response.data)
  } catch (err) {
    dispatch(AdminLoginFailure(err.response.data))
    return err.response.data
  }
}

export const adminRegister = (credential) => async (dispatch) => {
  console.log(credential, 'hi')
  dispatch(AdminRegisterRequest())
  try {
    const response = await axios.post(`${baseUrl}/user/register`, credential)
    console.log(response.data)
    if (response) {
      dispatch(AdminRegisterSuccess(response.data))
    }
  } catch (err) {
    console.log(err.response.data)
    dispatch(AdminRegisterFailure(err.response.data))
    return err.response.data
  }
}
