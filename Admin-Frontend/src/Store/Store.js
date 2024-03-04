import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { thunk } from 'redux-thunk'
import authReducer from './../Services/authentication/authReducers'
import blogCatReducer from '../Services/BlogCategory/blogCatReducer'
import brandReducer from '../Services/Brand/BrandReducer'
import categoryReducer from '../Services/Category/CategoryReducer'
import colorReducer from '../Services/Color/ColorReducer'
import customerReducer from '../Services/Customer/CustomerReducer'
import coupanReducer from '../Services/Coupan/CoupanReducer'
import orderReducer from '../Services/Orders/OrderReducer'
import enquiryReducer from '../Services/Enquiries/EnquiriesReducer'
import productReducer from '../Services/CreateProduct/CreateProductReducer'
import uploadReducer from '../Services/Upload/UploadReducer'
import blogReducer from '../Services/CreateBlog/CreateBlogReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  blogCat: blogCatReducer,
  brand: brandReducer,
  category: categoryReducer,
  color: colorReducer,
  customer: customerReducer,
  coupan: coupanReducer,
  order: orderReducer,
  enquiry: enquiryReducer,
  product: productReducer,
  blog: blogReducer,
  upload: uploadReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)
export default store
