import React, { useState, useEffect } from "react";
import Layout from "./../../Layouts/Layout/Layout";
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
const UserProfile = () => {
  const navigate = useNavigate();
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

      }
    if(!item.path){
        setShowTab(item.head)
        setShowSideBar(!showSideBar)
    }
       
  }
  return (
    <>
      <Layout>
        <div className={`flex w-[screen]  min-h-[73vh] p-2 userProfile`}>
          <section className=" profileSection">
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
                      src="https://cdn.dribbble.com/userupload/10952292/file/original-aa93cf8881fc2e8754d6342c32ce3ef1.png?resize=450x338&vertical=center"
                      alt=""
                    />
                    <div className="upName">
                      {" "}
                      <p className="upHello">Hello</p>
                      <p className="upUserName">vishal Gupta</p>
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
                      {showTab =="My Account" &&<MyAccount/>}
                      {showTab =="Change Password" &&<ChangePassword/>}
          </section>
        </div>
      </Layout>
    </>
  );
};

export default UserProfile;
