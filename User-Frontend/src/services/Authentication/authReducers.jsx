
const initialState = {
    loading:false,
    user: localStorage.getItem('User')
        ? JSON.parse(localStorage.getItem('User'))
        : null,
    error: null,
    userInformation:null,
    isLoginSuccess:false,
    isRegisterSuccess:false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_LOGIN_REQUEST":
            return { ...state, loading: true, error: null };
        case 'USER_LOGIN_SUCCESS':
            return {
                ...state,
                loading:false,
                error: null,
                user: JSON.parse(localStorage.getItem('User')),
                isLoginSuccess:true
            };
        case 'USER_LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                error: action.payload,
                loading:false
            };
        case 'USER_REGISTER_REQUEST':
            return{
                ...state,loading:true,error:null
            }

        case 'USER_REGISTER_SUCCESS':
            return{
                ...state,
                loading: false,
                user: action.payload.user,
                error: null,
                isRegisterSuccess: true
            }
        case 'USER_REGISTER_FAILURE':
            return{
                ...state,
                loading:false,
                user:null,
               error:action.payload
            }
        case 'USER_DETAIL_REQUEST':
            return{
                ...state,loading:true,error:null
            }

        case 'USER_DETAIL_SUCCESS':
            return{
                ...state,
                loading: false,
                userInformation: action.payload.user,
                error: null,
                isSuccess:true
            }
        case 'USER_DETAIL_FAILURE':
            return{
                ...state,
                loading:false,
                user:null,
               error:action.payload
            }
        case 'USER_DETAIL_UPDATE_REQUEST':
            return{
                ...state,loading:true,error:null
            }

        case 'USER_DETAIL_UPDATE_SUCCESS':
            return{
                ...state,
                loading: false,
                error: null,
                isSuccess:true
            }
        case 'USER_DETAIL_UPDATE_FAILURE':
            return{
                ...state,
                loading:false,
                user:null,
               error:action.payload
            }
        case 'UPDATE_PASSWORD_REQUEST':
            return{
                ...state,loading:true,error:null
            }

        case 'UPDATE_PASSWORD_SUCCESS':
            return{
                ...state,
                loading: false,
                error: null,
                isSuccess:true
            }
        case 'UPDATE_PASSWORD_FAILURE':
            return{
                ...state,
                loading:false,
                user:null,
               error:action.payload
            }
        case 'USER_DETAIL_RESET':
            return {
                ...state,
                error: null,
                isSuccess: false,
                
            }; 
        case 'LOGOUT':
            return {
                ...state,
                loading: false,
                user: null,
                error: null,
                userInformation: null,
                isLoginSuccess: false,
                isRegisterSuccess: false
            }; 
        default:
            return state;
    }
};

export default authReducer;