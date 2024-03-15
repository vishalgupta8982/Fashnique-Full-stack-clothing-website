const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
  Color: [],
}

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COLOR_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_COLOR_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
        Color: action.payload.color,
      }
    case 'GET_COLOR_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case 'COLOR_RESET_STATE':
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

export default colorReducer
