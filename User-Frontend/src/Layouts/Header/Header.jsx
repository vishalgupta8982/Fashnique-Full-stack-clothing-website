import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./Header.css";
import Button from "../../Components/Button/Button";
import { useNavigate, useLocation } from "react-router-dom"
import { CgChevronDown } from "react-icons/cg";
import { CgChevronUp } from "react-icons/cg";
import { RiMenu2Fill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { pages } from "../../assets/ImportantData/pagesNameAndPath";
const Header = () => {
  const navigate=useNavigate()
  const [hamBurger, setHamBurger] = useState(false);
  const[categoryDropDown,setcategoryDropDown]=useState(false)
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <div className="w-[screen]  ">
      <nav className="z-20 shadow navBar md:block md:items-center ">
        <div className="justify-between block p-4 md:p-4 md:flex first">
          <div className="flex flex-wrap items-center md:w-[100vw] box">
            <div className="flex items-center box1">
              <img className="inline h-6 md:h-8 logo" src={logo} alt="" />
              <span className="text-xl md:text-2xl name">
                Fashion<i style={{ color: "black" }}>ique</i>
              </span>
            </div>
            <div className="md:flex-1 order-3    md:order-2 flex-[100%]">
              <div className="flex items-center md:my-0 my-2  justify-between w-[90vw]    md:w-[40vw] md:mx-8 searchBox">
                <div className="p-2 md:p-2 ">
                  <input
                    placeholder="Search here.. "
                    className="text-[16px] md:text-lg w-[65vw] md:w-[35vw] bg-[#F5F5F7]  searchInput"
                    type="text  "
                  />
                </div>
                <span
                  className="text-xl p-[10px] md:p-3 md:text-2xl searchIcon"
                  color="white"
                >
                  <RiSearchLine color="white" />
                </span>
              </div>
            </div>
            <div className="flex-col items-end justify-end flex-1 order-2 md:flex md:order-3 box3 ">
              <div className="flex justify-end ">
                <div onClick={()=>navigate('/wishlist')} className="flex flex-col items-center mx-1 cursor-pointer md:mx-5">
                  <FaHeart className="text-2xl md:text-2xl headIcon" />
                  <p className="hidden iconText md:block">Wishlist</p>
                </div>
                <div onClick={()=>navigate('/cart')} className="flex flex-col items-center mx-1 cursor-pointer md:mx-5">
                  <div className="relative inline-flex mx-3">
                    <FiShoppingCart className="text-2xl headIcon md:text-2xl" />
                    <p className="absolute min-w-[12px] min-h-[12px] rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4  bg-[#FF6008] text-[#fff]">10</p>
                  </div>
                  <p className="hidden iconText md:block">Cart</p>
                </div>
                <span
                  onClick={() => setHamBurger(!hamBurger)}
                  className="block text-2xl cursor-pointer md:hidden"
                >
                  {hamBurger ? (
                    <RxCross1 color="black" />
                  ) : (
                    <RiMenu2Fill color="black" />
                  )}
                </span>
                <div className="hidden ml-3 md:block">
                  {!isLoginPage && <Button navigation={"/login"} title={"Login"} />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul
          className={`navSecond bg-[#000] md:bg-[#2b6777] md:flex md:justify-center ${
            hamBurger ? "opacity-100   left-[0px]  " : "opacity-0"
          } md:items-center  z-[1] md:z-auto md:static   w-full left-0 md:w-auto md:py-0 py-2 md:pl-0 pl-7 md:opacity-100 absolute opacity-0 left-[-400px] transition-all ease-out duration-500`}
        >
          {hamBurger && !isLoginPage && (
            <div className="flex items-center justify-between">
              <li className="mx-6 my-4 hamlink md:my-0">
                <NavLink to="/login">Login</NavLink>
              </li>
              {/* <span className="mx-8">
                <IoIosArrowForward color="white" />
              </span> */}
            </div>
          )}
          {pages.map((item) => (
            <div className="flex items-center justify-between md:my-5">
              <li key={item} className="mx-6 my-4 link md:my-0">
                <NavLink
                  className={`nav-link   ${({ isActive }) =>
                    isActive ? "active" : "inactive"}`}
                  to={`${item.route}`}
                >
                  {item.name}
                </NavLink>
                {/* {hamBurger && (
                  <span className="mx-8 ml-auto">
                    <IoIosArrowForward size={16} color="white" />
                  </span>
                )} */}
              </li>
            </div>
          ))}
          <div
            onClick={() => setcategoryDropDown(!categoryDropDown)}
          >
            <div className="flex flex-row items-end justify-between mx-6 my-4 md:my-5 link"> 
              <p  >Shop by Category  </p>
              {categoryDropDown ? (<CgChevronUp size={18} className="mx-2" />) : (<CgChevronDown className="mx-2" size={18} />)}</div>
             {categoryDropDown && (
              <div className="relative categoryList md:absolute">
                <p className="mx-4 md:border-b-[1px] border-[#514f4f]   categoryName md:mx-0">Shoes</p>
                <p className="mx-4 md:border-b-[1px]  border-[#514f4f] categoryName md:mx-0">Shoes</p>
              </div>
            )}
             </div>
           
        </ul>
         
      </nav>
       
    </div>
  );
};
export default Header;