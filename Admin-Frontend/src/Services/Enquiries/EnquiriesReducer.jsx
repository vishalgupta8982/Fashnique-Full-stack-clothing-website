const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
  Enquiry: null,
}

const enquiryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ENQUIRY_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_ENQUIRY_SUCCESS':
      return {
        ...state,
        loading: false,
        Enquiry: action.payload.Enquiry,
        error: null,
      }
    case 'GET_ENQUIRY_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'UPDATE_ENQUIRY_REQUEST':
      return { ...state, loading: true, error: null }
    case 'UPDATE_ENQUIRY_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      }
    case 'UPDATE_ENQUIRY_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'DELETE_ENQUIRY_REQUEST':
      return { ...state, loading: true, error: null }
    case 'DELETE_ENQUIRY_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'DELETE_ENQUIRY_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_ENQUIRY_STATE':
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

export default enquiryReducer
