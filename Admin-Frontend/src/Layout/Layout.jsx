import React, { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './Layout.css'
import { RiCouponLine } from 'react-icons/ri'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet,} from 'react-router-dom'
import { ImBlog } from 'react-icons/im'
import { FaClipboardList, FaBloggerB } from 'react-icons/fa'
import { SiBrandfolder } from 'react-icons/si'
import { BiCategoryAlt } from 'react-icons/bi'
import { Layout, Menu } from 'antd'
import { useNavigate,useLocation } from 'react-router-dom'
import logo from '../assets/Images/logo.png'
import { useDispatch } from 'react-redux'
import { logout } from '../Services/authentication/authAction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Cookies from 'js-cookie';
import Button from '../Components/Button/Button'
import ClipLoader from 'react-spinners/ClipLoader'
const { Header, Sider, Content } = Layout
const Layouts = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const [user, setUser] = useState(Cookies.get('fashniqueAdminToken'))
  const [loading,setLoading]=useState(true)
  const handleLogOut = () => {
    dispatch(logout())
    AsyncStorage.clear()
  }
   
  const name=localStorage.getItem('name')
  const email=localStorage.getItem('email')
  const navigate = useNavigate()
  useEffect(()=>{
    const token = Cookies.get('fashniqueAdminToken');
    setUser(token)
    setLoading(false)
  },[navigate])
  return (
    <> 
      {loading ? (
        <div className="loader">
          <ClipLoader
            color={'#52ab98'}
            loading={loading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        user ? (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <img className="logoImg" src={logo} alt="" />
            <p className="lg-logo">
              Fashion<span className="sm-logo">ique</span>
            </p>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['']}
                  selectedKeys={[location.pathname.split('/').slice(2).join('/')]}
            onClick={({ key }) => {
              if (key === 'signout') {
              } else {
                navigate(key)
              }
            }}
            items={[
              {
                key: '',
                icon: <AiOutlineDashboard className="text-xl" />,
                label: 'Dashboard',
              },
              {
                key: 'customer',
                icon: <AiOutlineUser className="text-xl " />,
                label: 'Customers',
              },
              {
                key: 'Catalog',
                icon: <AiOutlineShoppingCart className="text-xl " />,
                label: 'Catalog',
                children: [
                  {
                    key: 'addproduct',
                    icon: <AiOutlineShoppingCart className="text-xl " />,
                    label: 'Add Product',
                  },
                  {
                    key: 'productlist',
                    icon: <AiOutlineShoppingCart className="text-xl " />,
                    label: 'Product List',
                  },
                  {
                    key: 'addbrand',
                    icon: <SiBrandfolder className="text-xl" />,
                    label: 'Add Brand',
                  },
                  {
                    key: 'brandlist',
                    icon: <SiBrandfolder className="text-xl" />,
                    label: 'Brand List ',
                  },
                  {
                    key: 'addcategory',
                    icon: <BiCategoryAlt className="text-xl" />,
                    label: 'Add Category',
                  },
                  {
                    key: 'categorylist',
                    icon: <BiCategoryAlt className="text-xl" />,
                    label: 'Category List',
                  },
                  {
                    key: 'addcolor',
                    icon: <AiOutlineBgColors className="text-xl" />,
                    label: 'Add Color',
                  },
                  {
                    key: 'colorlist',
                    icon: <AiOutlineBgColors className="text-xl" />,
                    label: 'Color List',
                  },
                ],
              },
              {
                key: 'orders',
                icon: <FaClipboardList className="text-xl" />,
                label: 'orders',
              },
              {
                key: 'marketing',
                icon: <RiCouponLine className="text-xl" />,
                label: 'Marketing',
                children: [
                  {
                    key: 'addcoupan',
                    icon: <ImBlog className="text-xl" />,
                    label: 'Add Coupon',
                  },
                  {
                    key: 'coupanlist',
                    icon: <RiCouponLine className="text-xl" />,
                    label: 'Coupon List',
                  },
                ],
              },
              {
                key: 'blogs',
                icon: <FaBloggerB className="text-xl" />,
                label: 'Blogs',
                children: [
                  {
                    key: 'addblog',
                    icon: <ImBlog className="text-xl" />,
                    label: 'Add Blog',
                  },
                  {
                    key: 'bloglist',
                    icon: <FaBloggerB className="text-xl" />,
                    label: 'Blog List',
                  },
                  {
                    key: 'addblogcategory',
                    icon: <ImBlog className="text-xl" />,
                    label: 'Add Blog Category',
                  },
                  {
                    key: 'listcategory',
                    icon: <FaBloggerB className="text-xl" />,
                    label: 'Blog Category List',
                  },
                ],
              },
              {
                key: 'enquiries',
                icon: <FaClipboardList className="text-xl" />,
                label: 'Enquiries',
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="adminHeader ">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              },
            )}
            <div
              className={`flex items-center md:flex ${collapsed ? `block` : `hidden`}`}
            >
              <div className="mainContainer ">
                <div className="headerImg">
                  <img
                    className="headerProfileImg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNhFeR5WtouU9r_ETzHsC6Ij8sQFLfqZtTyMxm4DJD4Q&s"
                    alt=""
                  />
                </div>
                <div
                  onClick={() => setShowDropDown(!showDropDown)}
                  className="nameEmail"
                >
                  {name && email && (
                    <>
                      <p className="headerName">
                        {name}
                      </p>
                      <p className="headerEmail">{email}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Header>
          <div className={`dropdown ${showDropDown ? `block` : `hidden`} `}>
            <li>
              {/* <Link
              className="dropdown-item "
              // to="/"
            >
              View Profile
            </Link> */}
            </li>
            <li>
              <Link
                className="dropdown-item backdrop:"
                to="/"
                onClick={handleLogOut}
              >
                Signout
              </Link>
            </li>
          </div>
          <Content>
            <main>
              <Outlet />
            </main>
          </Content>
        </Layout>
        </Layout>) : (<div className='expired'>
          <img className='expiredImg' src='https://res.cloudinary.com/dytlgwywf/image/upload/v1710662003/npwlfj1yq0boofp0cuex.png' alt='' />
          <p className='mb-2'>Your Sesssion is expired login again</p>
          <Button widthButton={"200px"} navigation={'/'} title={"Login"} />
      </div>)
)}
     </>
  )
}
export default Layouts
