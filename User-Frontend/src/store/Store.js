import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { thunk } from 'redux-thunk' // Import 'redux-thunk' correctly
import authReducer from '../services/Authentication/authReducers'
import blogReducer from '../services/Blogs/BlogReducer'
import enquiryReducer from '../services/Enquiry/EnquiryReducer'
import categoryReducer from '../services/Category/CategoryReducers'
import colorReducer from '../services/Color/ColorReducer'
import productReducer from '../services/Products/ProductReducer'
import wishlistReducer from '../services/Wishlist/WishlistReducers'
import cartReducer from '../services/Cart/CartReducer'
import coupanReducer from '../services/Coupan/CoupanReducer'
import manageAddressReducer from '../services/Manage-Address/Manage-AddressReducer'
import orderReducer from '../services/Order/OrderReducer'

// Define logout action type
const LOGOUT = 'LOGOUT'

// Logout action creator
export const logout = () => ({
  type: LOGOUT,
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }
  return combineReducers({
    auth: authReducer,
    blog: blogReducer,
    enquiry: enquiryReducer,
    category: categoryReducer,
    color: colorReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    Coupan: coupanReducer,
    Address: manageAddressReducer,
    order: orderReducer,
  })(state, action)
}
const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  // composeWithDevTools(applyMiddleware(thunk))
)

export default store
