
const initialState = {
    loading: false,
    error: null,
    isSuccess: false,
    Customer: null
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CUSTOMER_REQUEST":
            return { ...state, loading: true, error: null };
        case 'GET_CUSTOMER_SUCCESS':
            return {
                ...state,
                loading: false,
                Customer: action.payload.Customer,
                error: null,

            };
        case 'GET_CUSTOMER_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
         
        case 'RESET_CUSTOMER_STATE':
            return {
                ...state,
                error: null,
                loading: false,
                isSuccess: false
            };
        default:
            return state;
    }
};

export default customerReducer;