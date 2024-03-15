import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
export default Layout
