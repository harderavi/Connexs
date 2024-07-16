import { Outlet } from 'react-router-dom'
import Header from '../component/Header'


const Layout = () => {
  return (
    <div className='bg-neutral-50 dark:bg-gray-900 dark:text-gray-light min-h-screen'>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout