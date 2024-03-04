const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
  Images: [],
}

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_IMAGE_REQUEST':
      return { ...state, loading: true, error: null }

    case 'UPLOAD_IMAGE_SUCCESS':
      return {
        ...state,
        loading: false,
        Images: action.payload.Images,
        error: null,
        isSuccess: true,
      }
    case 'UPLOAD_IMAGE_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'DELETE_IMAGE_REQUEST':
      return { ...state, loading: true, error: null }

    case 'DELETE_IMAGE_SUCCESS':
      const { idToDelete } = action.payload.deleteId
      const updatedImages = state.Images.filter(
        (imageArray) => imageArray.public_id !== idToDelete,
      )
      return {
        ...state,
        loading: false,
        Images: updatedImages,
        error: null,
        isSuccess: true,
      }
    case 'DELETE_IMAGE_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case 'RESET_IMAGE_STATE':
      return {
        ...state,
        error: null,
        loading: false,
        isSuccess: false,
        Images: [],
      }
    default:
      return state
  }
}

export default uploadReducer
