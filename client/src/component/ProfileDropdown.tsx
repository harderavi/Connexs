import  { useEffect, useState } from 'react'
import { FiLock, FiLogOut, FiSettings } from 'react-icons/fi'
import ProfilePic from './ui/ProfilePic'
import CircleButton from './ui/CircleButton'
import { useNavigate } from 'react-router-dom'

const ProfileDropdown = () => {
    const navigate = useNavigate();

    const [appear, setAppear] = useState(false)
    useEffect(()=>{
        setAppear(true);
        
    },[])
  return (
    <div
                className={` ${
                    appear ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                } transition-all duration-300 delay-200 absolute -right-8 top-full z-10 mt-3 w-screen max-w-xs rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5 min-h-20 overflow-hidden`}
              >
                <div className="flex flex-col items-center">
                  <ProfilePic size="lg" styleClass="mb-2" />
                  <p className="text-lg font-semibold">Ravi Harde</p>
                  <p className="text-sm text-gray-400">raviharde@gmail.com</p>
                  <div className="flex gap-4 my-3">
                    <CircleButton
                      size="md"
                      handleClick={() => navigate("/signin")}
                    >
                      <FiLock size={14} />
                    </CircleButton>
                    <CircleButton
                      size="md"
                      handleClick={() => navigate("/signin")}
                    >
                      <FiSettings size={14} />
                    </CircleButton>
                    <CircleButton
                      size="md"
                      handleClick={() => navigate("/signin")}
                    >
                      <FiLogOut size={14} />
                    </CircleButton>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  <button className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    Profile
                  </button>
                  <button className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    Signout
                  </button>
                </div>
              </div>
  )
}

export default ProfileDropdown