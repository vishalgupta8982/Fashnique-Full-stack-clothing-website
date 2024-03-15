const getUserFromLocalStorage = localStorage.getItem('User')
  ? JSON.parse(localStorage.getItem('User'))
  : null
const initialState = {
  loading: false,
  user: getUserFromLocalStorage,
  error: null,
  isLoginSuccess: false,
  isRegisterSuccess: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADMIN_LOGIN_REQUEST':
      return { ...state, loading: true, error: null }
    case 'ADMIN_LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isLoginSuccess: true,
      }
    case 'ADMIN_LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'ADMIN_REGISTER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }

    case 'ADMIN_REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isRegisterSuccess: true,
      }
    case 'ADMIN_REGISTER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'LOGOUT':
      return initialState

    default:
      return state
  }
}

export default authReducer
