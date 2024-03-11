import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from '../services/Authentication/authReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from '../services/Blogs/BlogReducer';
import enquiryReducer from '../services/Enquiry/EnquiryReducer';
import categoryReducer from '../services/Category/CategoryReducers';
import colorReducer from '../services/Color/ColorReducer';
import productReducer from '../services/Products/ProductReducer';
import wishlistReducer from '../services/Wishlist/WishlistReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    blog:blogReducer,
    enquiry:enquiryReducer,
    category:categoryReducer,
    color:colorReducer,
    product:productReducer,
    wishlist:wishlistReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
