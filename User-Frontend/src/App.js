import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import { useEffect } from 'react'
import OTP from './Components/OTP/OTP'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Store from './Pages/Store/Store'
import Blogs from './Pages/Blogs/Blogs'
import BlogDetail from './Components/BlogDetail/BlogDetail'
import ContactUs from './Pages/Contact/ContactUs'
import Category from './Pages/Category/Category'
import AddToCart from './Components/AddToCart/AddToCart'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import UserProfile from './Components/UserProfile/UserProfile'
import Wishlist from './Components/Wishlist/Wishlist'
import Layout from './Layouts/Layout/Layout'
import { toast } from 'react-toastify'
import Checkout from './Components/Checkout/Checkout'
import OrderSuccessfull from './Components/OrderSuccesfull/OrderSuccessfull'
import OrderDetail from './Components/OrderDetail/OrderDetail'
import PrivateLayout from './Layouts/PrivateLayout/PrivateLayout'
import NotFound from './Components/NotFound/NotFound'

const App = () => {
  useEffect(() => {
    const handleOnline = () => {
      toast.success('You are now back online!')
    }
    const handleOffline = () => {
      toast.error('Check Your Internet Connection')
    }
    if (!window.navigator.onLine) {
      handleOffline()
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <BrowserRouter>
      <ToastContainer position='bottom-center' autoClose={1000} theme='dark' draggable />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='blogs' element={<Blogs />} />
          <Route path='store' element={<Store />} />
          <Route path='category' element={<Category />} />
          <Route path='login' element={<Login />} />
          <Route path='signUp' element={<SignUp />} />
          <Route path='otp' element={<OTP />} />
          <Route path='blogdetail/:id' element={<BlogDetail />} />
          <Route path='productdetail/:id' element={<ProductDetail />} />
          <Route path='contact' element={<ContactUs />} />
          <Route path='cart' element={<AddToCart />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route element={<PrivateLayout />}>
            <Route path='userprofile' element={<UserProfile />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order-success' element={<OrderSuccessfull />} />
            <Route path='/order-detail/:id' element={<OrderDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
