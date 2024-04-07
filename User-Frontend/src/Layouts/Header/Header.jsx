import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './Header.css'
import Button from '../../Components/Button/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import { CgChevronDown } from 'react-icons/cg'
import { CgChevronUp } from 'react-icons/cg'
import { CgProfile } from 'react-icons/cg'
import { RiMenu2Fill } from 'react-icons/ri'
import { RxCross1 } from 'react-icons/rx'
import { useState, useEffect, useRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { FiShoppingCart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import { pages } from '../../assets/ImportantData/pagesNameAndPath'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory, getCategory } from '../../services/Category/CategoryActions'
import { getCart } from '../../services/Cart/CartAction'
import debounce from 'lodash.debounce'
import Cookies from 'js-cookie'
const Header = () => {
  const location = useLocation()
  const token = Cookies.get('fashioniqueUserToken')
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategory())
    dispatch(getCart())
  }, [])
  const debouncedDispatch = debounce((value) => {
    dispatch(getCategory(value))
  }, 200)
  useEffect(() => {
    debouncedDispatch(search)
    return () => debouncedDispatch.cancel()
  }, [search])
  const category = useSelector((state) => state.category.allCategory)
  const cart = useSelector((state) => state.cart.Cart)
  const searchValue = useSelector((state) => state.category.Category)
  const navigate = useNavigate()
  const [hamBurger, setHamBurger] = useState(false)
  const [categoryDropDown, setcategoryDropDown] = useState(false)
  const [SearchDiv, setSearchDiv] = useState(true)
  const divRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setSearchDiv(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  const isLoginPage = location.pathname === '/login'
  return (
    <div className='w-[screen]  '>
      <nav className='z-20 shadow navBar md:block md:items-center '>
        <div className='justify-between block p-4 md:p-4 md:flex first'>
          <div className='flex flex-wrap items-center md:w-[100vw] box'>
            <div className='flex items-center box1'>
              <img className='inline h-6 md:h-8 logo' src={logo} alt='' />
              <span className='text-xl md:text-2xl name'>
                Fashion<b style={{ color: 'black' }}>ique</b>
              </span>
            </div>
            <div ref={divRef} className='md:flex-1 order-3 md:mx-8  md:order-2 flex-[100%]'>
              <div
                onClick={() => setSearchDiv(true)}
                className='flex items-center md:my-0 mt-2  justify-between w-[90vw]    md:w-[40vw]   searchBox'
              >
                <div className='p-2 md:p-1 md:px-2 '>
                  <input
                    placeholder='Search here.. '
                    className='text-[16px] md:text-lg w-[65vw] md:w-[35vw] bg-[#F5F5F7]  searchInput'
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <span className='text-xl p-[10px] md:p-2 md:text-2xl searchIcon' color='white'>
                  <RiSearchLine color='white' />
                </span>
              </div>
              {SearchDiv && (
                <div className='searchField    md:w-[40vw] w-[90vw]'>
                  {searchValue.slice(0, 10).map((item) => (
                    <p
                      onClick={() => navigate(`store?category=${item.title}`)}
                      className='searchValue'
                    >
                      <RiSearchLine size={14} color='grey' />
                      &nbsp;&nbsp;{item.title}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className='flex-col items-end justify-end flex-1 order-2 md:flex md:order-3 box3 '>
              <div className='flex justify-end '>
                <div
                  onClick={() => navigate('/wishlist')}
                  className='flex flex-col items-center mx-1 cursor-pointer md:mx-5'
                >
                  <FaHeart className='text-2xl md:text-2xl headIcon' />
                  <p className='hidden iconText md:block'>Wishlist</p>
                </div>
                <div
                  onClick={() => navigate('/cart')}
                  className='flex flex-col items-center mx-1 cursor-pointer md:mx-5'
                >
                  <div className='relative inline-flex mx-3'>
                    <FiShoppingCart className='text-2xl headIcon md:text-2xl' />
                    {cart?.products?.length > 0 && token && (
                      <p className="absolute min-w-[12px] min-h-[12px]  rounded-full  p-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4  bg-[#FF6008] text-[#fff]">
                        {cart.products.length}
                      </p>
                    )}
                  </div>
                  <p className='hidden iconText md:block'>Cart</p>
                </div>
                <span
                  onClick={() => setHamBurger(!hamBurger)}
                  className='block text-2xl cursor-pointer md:hidden'
                >
                  {hamBurger ? <RxCross1 color='black' /> : <RiMenu2Fill color='black' />}
                </span>
                <div className='hidden ml-3 md:block'>
                  {token !== null && token !== undefined && (
                    <div
                      onClick={() => navigate('/userprofile?tab=My Account')}
                      className='flex flex-col items-center cursor-pointer'
                    >
                      <CgProfile className='text-2xl md:text-2xl headIcon' />
                      <p className='iconText'> Profile</p>
                    </div>
                  )}
                  {!isLoginPage && (token === null || token === undefined) && (
                    <Button navigation={'/login'} title={'Login'} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul
          className={`navSecond bg-[#000] md:bg-[#2b6777] md:flex md:justify-center ${
            hamBurger ? 'opacity-100   left-[0px]  ' : 'opacity-0'
          } md:items-center  z-[1] md:z-auto md:static   w-full left-0 md:w-auto md:py-0 py-2 md:pl-0 pl-7 md:opacity-100 absolute opacity-0 left-[-400px] transition-all ease-out duration-500`}
        >
          {hamBurger && !isLoginPage && (
            <div className='flex items-center justify-between md:hidden'>
              {!isLoginPage && token === null && (
                <li className='mx-6 my-4 hamlink md:my-0'>
                  <NavLink onClick={() => setHamBurger(!hamBurger)} to='/login'>
                    Login
                  </NavLink>
                </li>
              )}
              {token !== null && (
                <li className='mx-6 my-4 hamlink md:my-0'>
                  <NavLink onClick={() => setHamBurger(!hamBurger)} to='/userProfile'>
                    Profile
                  </NavLink>
                </li>
              )}
            </div>
          )}
          {pages.map((item) => (
            <div className='flex items-center justify-between md:my-5'>
              <li key={item} className='mx-6 my-4 link md:my-0'>
                <NavLink
                  onClick={() => setHamBurger(!hamBurger)}
                  className={`nav-link   ${({ isActive }) => (isActive ? 'active' : 'inactive')}`}
                  to={`${item.route}`}
                >
                  {item.name}
                </NavLink>
              </li>
            </div>
          ))}
          <div
            onMouseEnter={() => setcategoryDropDown(!categoryDropDown)}
            onMouseLeave={() => setcategoryDropDown(!categoryDropDown)}
          >
            <div className='flex flex-row items-end justify-between mx-6 my-4 md:my-5 link'>
              <p>Shop by Category </p>
              {categoryDropDown ? (
                <CgChevronUp size={18} className='mx-2' />
              ) : (
                <CgChevronDown className='mx-2' size={18} />
              )}
            </div>
            {categoryDropDown && (
              <div
                data-aos='zoom-in'
                data-aos-duration='500'
                className='relative  grid grid-cols-1 md:grid-cols-3 gap-0 categoryList md:w-[30vw] w-[80vw] md:absolute'
              >
                {category.map((item) => (
                  <p
                    onClick={() => {
                      navigate(`store?category=${item.title}`)
                      setHamBurger(!hamBurger)
                    }}
                    className='mx-4 md:border-b-[1px] md:border-r-[1px] p-1 md:p-3 border-[#514f4f]   categoryName md:mx-0'
                  >
                    {item.title.slice(0, 12)}
                  </p>
                ))}
              </div>
            )}
          </div>
        </ul>
      </nav>
    </div>
  )
}
export default Header
