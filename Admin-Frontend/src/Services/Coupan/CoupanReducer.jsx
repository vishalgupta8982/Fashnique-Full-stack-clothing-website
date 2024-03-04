const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
  Coupan: null,
  aCoupan: null,
}

const coupanReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COUPAN_REQUEST':
      return { ...state, loading: true, error: null }
    case 'ADD_COUPAN_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'ADD_COUPAN_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
        isSuccess: false,
      }
    case 'GET_COUPAN_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_COUPAN_SUCCESS':
      return {
        ...state,
        loading: false,
        Coupan: action.payload.Coupan,
        error: null,
      }
    case 'GET_COUPAN_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'DELETE_COUPAN_REQUEST':
      return { ...state, loading: true, error: null }
    case 'DELETE_COUPAN_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'DELETE_COUPAN_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'GETA_COUPAN_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GETA_COUPAN_SUCCESS':
      return {
        ...state,
        loading: false,
        aCoupan: action.payload.Coupan,
        error: null,
      }
    case 'GETA_COUPAN_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'UPDATE_COUPAN_REQUEST':
      return { ...state, loading: true, error: null }
    case 'UPDATE_COUPAN_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'UPDATE_COUPAN_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_COUPAN_STATE':
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

export default coupanReducer
