import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { FiMoon, FiSun } from 'react-icons/fi'
import  { toggleTheme } from '../../store/slices/themeSlice'

const ThemeToggle = () => {
    const  currentTheme = useSelector((state: RootState)=> state.theme.currrentTheme)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(currentTheme === 'dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }
    },[currentTheme])
  return (
    <button className='flex gap-x-3 items-center border border-gray-300 dark:border-gray-700 rounded-full px-2' onClick={()=>dispatch(toggleTheme())}><FiSun className='dark:text-gray-600'/><FiMoon className=' dark:text-gray-100 text-gray-400'/></button>
  )
}

export default ThemeToggle