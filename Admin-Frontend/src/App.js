import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login/Login'
import ChangePassword from './Components/ChangePassword/ChangePassword.jsx'
import PrivateLayouts from './Layout/Layout.jsx'
import SignUp from './Components/SignUp/SignUp'
import OTP from './Components/OTP/OTP.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Customer from './Pages/Customer/Customer.jsx'
import Enquiries from './Pages/Enquiries/Enquiries.js'
import BlogList from './Pages/Bloglist/BlogList.jsx'
import BlogCategoryList from './Pages/BlogCategoryList/BlogCategoryList.jsx'
import Orders from './Pages/Orders/Orders.jsx'
import ColorList from './Pages/ColorList/ColorList.jsx'
import CategoryList from './Pages/CategoryList/CategoryList.jsx'
import BrandList from './Pages/BrandList/BrandList.jsx'
import ProductList from './Pages/ProductList/ProductList.jsx'
import AddBlog from './Pages/AddBlog/AddBlog.jsx'
import AddBlogCategory from './Pages/AddBlogCategory/AddBlogCategory.jsx'
import AddColor from './Pages/AddColor/AddColor.jsx'
import AddCategory from './Pages/AddCategory/AddCategory.jsx'
import AddBrand from './Pages/AddBrand/AddBrand.jsx'
import AddProduct from './Pages/AddProduct/AddProduct.jsx'
 import {AuthProvider} from './Utils/AuthVerify.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import CoupanList from './Pages/CoupanList.jsx/CoupanList.jsx'
import AddCoupan from './Pages/AddCoupan/AddCoupan.jsx'
import ViewOrder from './Pages/ViewOrder/ViewOrder.jsx'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  useEffect(() => {
    const handleOnline = () => {
      toast.success("You are now back online!");
    };
    const handleOffline = () => {
      toast.error("Check Your Internet Connection");
    };
    if (!window.navigator.onLine) {
      handleOffline();
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
   return (
    <BrowserRouter>
       <ToastContainer position="bottom-center" autoClose={1000} theme="dark" draggable />
       <AuthProvider> <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="otp" element={<OTP />} />
        <Route path="changePassowrd" element={<ChangePassword />} />
         
        <Route path="/admin" element={<PrivateLayouts />}>
          <Route index element={<Dashboard />} />
          <Route path="customer" element={<Customer />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="bloglist" element={<BlogList />} />
          <Route path="listcategory" element={<BlogCategoryList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="colorlist" element={<ColorList />} />
          <Route path="categorylist" element={<CategoryList />} />
          <Route path="brandlist" element={<BrandList />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="coupanlist" element={<CoupanList />} />
          <Route path="addblog" element={<AddBlog />} />
          <Route path="addblog/:id" element={<AddBlog />} />
          <Route path="addcoupan" element={<AddCoupan />} />
          <Route path="addcoupan/:id" element={<AddCoupan />} />
          <Route path="addblogcategory/:id" element={<AddBlogCategory />} />
          <Route path="addblogcategory" element={<AddBlogCategory />} />
          <Route path="addcolor" element={<AddColor />} />
          <Route path="addcolor/:id" element={<AddColor />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="addcategory/:id" element={<AddCategory />} />
          <Route path="addbrand" element={<AddBrand />} />
          <Route path="addbrand/:id" element={<AddBrand />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="addproduct/:id" element={<AddProduct />} />
          <Route path="vieworder/:id" element={<ViewOrder />} />
           </Route> 
        <Route path="*" element={<NotFound />} />
       </Routes></AuthProvider>
    </BrowserRouter>
  )
}

export default App
