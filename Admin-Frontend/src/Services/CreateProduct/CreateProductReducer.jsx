const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
  Product: null,
  aProduct: null,
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_REQUEST':
      return { ...state, loading: true, error: null }
    case 'ADD_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'ADD_PRODUCT_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
        isSuccess: false,
      }
    case 'GET_PRODUCT_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        Product: action.payload.Product,
        error: null,
      }
    case 'GET_PRODUCT_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'DELETE_PRODUCT_REQUEST':
      return { ...state, loading: true, error: null }
    case 'DELETE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'DELETE_PRODUCT_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'GETA_PRODUCT_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GETA_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        aProduct: action.payload.Product,
        error: null,
      }
    case 'GETA_PRODUCT_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'UPDATE_PRODUCT_REQUEST':
      return { ...state, loading: true, error: null }
    case 'UPDATE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'UPDATE_PRODUCT_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_PRODUCT_STATE':
      return {
        ...state,
        error: null,
        loading: false,
        isSuccess: false,
      }
    default:
      return state
  }
}

export default productReducer
