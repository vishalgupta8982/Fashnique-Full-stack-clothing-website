import { BrowserRouter, Routes, Route,useNavigate,Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Components/Login/Login";
import ChangePassword from './Components/ChangePassword/ChangePassword.jsx'
import Layouts from './Layout/Layout.jsx'
import SignUp from "./Components/SignUp/SignUp";
import OTP from './Components/OTP/OTP.jsx'
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Customer from "./Pages/Customer/Customer.jsx";
import Enquiries from "./Pages/Enquiries/Enquiries.js";
import BlogList from "./Pages/Bloglist/BlogList.jsx";
import BlogCategoryList from "./Pages/BlogCategoryList/BlogCategoryList.jsx";
import Orders from "./Pages/Orders/Orders.jsx";
import ColorList from "./Pages/ColorList/ColorList.jsx";
import CategoryList from "./Pages/CategoryList/CategoryList.jsx";
import BrandList from "./Pages/BrandList/BrandList.jsx";
import ProductList from "./Pages/ProductList/ProductList.jsx";
import AddBlog from "./Pages/AddBlog/AddBlog.jsx";
import AddBlogCategory from "./Pages/AddBlogCategory/AddBlogCategory.jsx";
import AddColor from "./Pages/AddColor/AddColor.jsx";
import AddCategory from "./Pages/AddCategory/AddCategory.jsx";
import AddBrand from "./Pages/AddBrand/AddBrand.jsx";
import AddProduct from "./Pages/AddProduct/AddProduct.jsx";
import {useSelector} from "react-redux"
import { useEffect } from "react";
import NotFound from "./Components/NotFound/NotFound.jsx";
import CoupanList from "./Pages/CoupanList.jsx/CoupanList.jsx";
import AddCoupan from "./Pages/AddCoupan/AddCoupan.jsx";
const App = () => {
  const isAuthenticated=useSelector((state)=>state.auth.isSuccess)
   
  
    
    return (
    <BrowserRouter >
      <ToastContainer position="top-center" autoClose={2000} draggable />
      <Routes>
        <Route path="/" element={<Login/>}  />
          <Route path="signup" element={<SignUp />} />
          <Route path="otp" element={<OTP />} />
          <Route path="changePassowrd" element={<ChangePassword />} />
          
          {isAuthenticated &&( 
        <Route path='/admin' element={<Layouts />}>
          <Route index element={< Dashboard />} />
        <Route path="customer" element={<Customer/>} />
        <Route path="enquiries" element={<Enquiries/>} />
        <Route path="bloglist" element={<BlogList/>} />
            <Route path="listcategory" element={<BlogCategoryList/>} />
            <Route path="orders" element={<Orders/>} />
            <Route path="colorlist" element={<ColorList/>} />
            <Route path="categorylist" element={<CategoryList/>} />
            <Route path="brandlist" element={<BrandList/>} />
            <Route path="productlist" element={<ProductList/>} />
            <Route path="coupanlist" element={<CoupanList/>} />
            <Route path="addblog" element={<AddBlog/>} />
            <Route path="addcoupan" element={<AddCoupan/>} />
            <Route path="addcoupan/:id" element={<AddCoupan/>} />
            <Route path="addblogcategory/:id" element={<AddBlogCategory/>} />
            <Route path="addblogcategory" element={<AddBlogCategory/>} />
            <Route path="addcolor" element={<AddColor/>} />
            <Route path="addcolor/:id" element={<AddColor/>} />
            <Route path="addcategory" element={<AddCategory/>} />
            <Route path="addcategory/:id" element={<AddCategory/>} />
            <Route path="addbrand" element={<AddBrand/>} />
            <Route path="addbrand/:id" element={<AddBrand/>} />
            <Route path="addproduct" element={<AddProduct/>} />
            </Route>)}
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;