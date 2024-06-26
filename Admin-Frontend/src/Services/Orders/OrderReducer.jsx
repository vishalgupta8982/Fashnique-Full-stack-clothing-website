const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
  Order: null,
  OrderByUserId: null,
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDER_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        Order: action.payload.Order,
        error: null,
      }
    case 'GET_ORDER_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'GET_ORDER_BY_USER_ID_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_ORDER_BY_USER_ID_SUCCESS':
      return {
        ...state,
        loading: false,
        OrderByUserId: action.payload.Order,
        error: null,
      }
    case 'GET_ORDER_BY_USER_ID_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'UPDATE_ORDER_REQUEST':
      return { ...state, loading: true, error: null }
    case 'UPDATE_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      }
    case 'UPDATE_ORDER_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_ORDER_STATE':
      return {
        ...state,
        error: null,
        loading: false,
        isSuccess: false,
        Order: null,
        OrderByUserId: null,
      }
    default:
      return state
  }
}

export default orderReducer
