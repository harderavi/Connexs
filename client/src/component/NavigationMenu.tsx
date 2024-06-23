import { NavLink, useLocation } from "react-router-dom"

const NavigationMenu = () => {
    const location = useLocation();
    const menuItems = [
        {
            label:'Home',
            path:'/'
        },
        {
            label:'Signin',
            path:'/signin'
        }
    ]
    
  return (
    <nav>
        <ul className="flex space-x-4">
            {
             menuItems.map((item)=>(
                <li key={item.label}>
                    <NavLink to={item.path}
                          className={`${location.pathname === item.path ? 'font-semibold' : 'font-normal'} text-gray-800 hover:text-white transition duration-300 ease-in-out`}


                    >{item.label}</NavLink> 
                    </li>
             ))   
            }
        </ul>
    </nav>
  )
}

export default NavigationMenu