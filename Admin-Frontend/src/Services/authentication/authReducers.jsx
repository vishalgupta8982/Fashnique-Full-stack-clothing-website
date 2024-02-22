const initialState = {
    loading:false,
    user: null,
    error: null,
    isSuccess:false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADMIN_LOGIN_REQUEST":
            return { ...state, loading: true, error: null };
        case 'ADMIN_LOGIN_SUCCESS':
            return {
                ...state,
                loading:false,
                user: action.payload.user,
                error: null,
                isSuccess:true
            };
        case 'ADMIN_LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                error: action.payload,
                loading:false
            };
        case 'ADMIN_REGISTER_REQUEST':
            return{
                ...state,loading:true,error:null
            }

        case 'ADMIN_REGISTER_SUCCESS':
            return{
                ...state,
                loading: false,
                user: action.payload.user,
                error: null,
                isSuccess: true
            }
        case 'ADMIN_REGISTER_FAILURE':
            return{
                ...state,
                loading:false,
                user:null,
               error:action.payload
            }
        case 'LOGOUT':
            return initialState; 
        default:
            return state;
    }
};

export default authReducer;