import { BiShapeSquare } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import NavigationMenu from './NavigationMenu'

const Header = () => {
  return (
    <div className='flex justify-between container px-5 py-2 border border-slate-200'>
        <Link to="/" className='flex space-x-2 gap-2 items-center text-xl uppercase'><BiShapeSquare size={32} /> Connexs</Link> 
        <NavigationMenu/>
        
    </div>
  )
}

export default Header