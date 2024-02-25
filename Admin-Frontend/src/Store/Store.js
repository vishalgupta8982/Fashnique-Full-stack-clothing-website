import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './../Services/authentication/authReducers';
import blogCatReducer from '../Services/BlogCategory/blogCatReducer';
import brandReducer from '../Services/Brand/BrandReducer';
import categoryReducer from '../Services/Category/CategoryReducer';
import colorReducer from '../Services/Color/ColorReducer';
import customerReducer from '../Services/Customer/CustomerReducer';
import coupanReducer from '../Services/Coupan/CoupanReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
const rootReducer = combineReducers({
    auth: authReducer,
    blogCat: blogCatReducer,
    brand: brandReducer,
    category:categoryReducer,
    color:colorReducer,
    customer:customerReducer,
    coupan:coupanReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store);