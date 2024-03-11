import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { AiOutlineClose } from "react-icons/ai";
import { FaAddressCard } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import MyAccount from "../MyAccount/MyAccount";
import ChangePassword from "../ChangePassword/ChangePassword";
import {useSelector,useDispatch} from "react-redux"
import ClipLoader from 'react-spinners/ClipLoader'
import { logout, userDetail } from "../../services/Authentication/authAction";
const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(userDetail())
  },[])
  const user=useSelector((state)=>state.auth)
  const {  loading, userInformation }=user;
  // this is used for store differecnt value
  const [showSideBar, setShowSideBar] = useState(false);
  const [showTab, setShowTab] = useState("My Account");
  const subHead = [
    { head: "My Account", icon: <MdOutlineAccountCircle /> },
    { head: "My Orders", icon: <FaBasketShopping /> },
    { head: "My Cart", icon: <FiShoppingCart />, path: "/cart" },
    { head: "My Wishlist", icon: <FaRegHeart />, path: "/wishlist" },
    { head: "Manage Addresses", icon: <FaAddressCard /> },
    { head: "Change Password", icon: <RiLockPasswordFill /> },
      { head: "Log Out", icon: <MdOutlineLogout /> },
  ];
  const handleSideTabClick=(item)=>{
    if(item.path){
        navigate(item.path);
    }
      if(item.head == "Log Out") {
        localStorage.clear()
        dispatch(logout())
        navigate('/login')
      }
    if(!item.path){
        setShowTab(item.head)
        setShowSideBar(!showSideBar)
    }
       
  }
  return (
    <>
        <div className={`flex w-[screen]  min-h-[73vh] p-2 userProfile`}>
          <section className=" profileSection">
          {loading && (
            <div className="loader">
              <ClipLoader
                color={'#52ab98'}
                loading={loading}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
            <div
              className={` flex md:mr-1 h-[100vh]   overflow-x-hidden  absolute    top-0   md:h-fit transition-all ease-out duration-500 profileContainer   ${
                showSideBar? `left-[0px]` : ` opacity-1`
              }   left-[-400px]    
                    md:static md:left-0`}
            >
              <div className="relative  w-[100%]    ">
                <div className="flex items-center justify-between">
                  <p className="profileHead">Profile</p>
                  <span
                    className="p-2 md:hidden"
                    onClick={() => setShowSideBar(!showSideBar)}
                  >
                    <AiOutlineClose />
                  </span>
                </div>
                <div className="upSubHeadCont">
                  <div className="upProfile">
                    <img
                      className="upImg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbI78v3a7Q5Tcm1DrdpZ7KEH2-ArooT9qzvFe6cLOYxy4wY-hp6dG-NrJKyv9_n5Hcjs&usqp=CAU"
                      alt=""
                    />
                    <div className="upName">
                      {" "}
                      <p className="upHello">Hello,</p>
                      <p className="upUserName">{userInformation?.firstName}{" "}{userInformation?.lastName}</p>
                    </div>
                  </div>
                  {subHead.map((item) => (
                      <div
                          onClick={() => handleSideTabClick(item)}
                          className={`upSubHead ${showTab==item.head && 'activeTab'}`}
                      >

                          <span  className={`upSubHeadIcon ${showTab == item.head && 'activeTabIcon'}`}>{item.icon}</span>
                      <p className="upSubHeadText">{item.head}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="smallTabPageSection w-[100%]">
             <div onClick={()=>setShowSideBar(!showSideBar)} className="flex flex-row items-center md:hidden bg-[#fff] p-1">
                <IoMenu size={22}/><p className="text-xl">&nbsp;Account</p>
             </div>
                      {showTab =="My Account" &&<MyAccount   />}
                      {showTab =="Change Password" &&<ChangePassword/>}
          </section>
        </div>
    </>
  );
};

export default UserProfile;
