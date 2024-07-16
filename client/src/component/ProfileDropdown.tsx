import { useEffect, useRef, useState } from "react";
import { FiLock, FiLogOut, FiSettings } from "react-icons/fi";
import ProfilePic from "./ui/ProfilePic";
import CircleButton from "./ui/ButtonCircular";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { signoutSuccess } from "../store/slices/authSlice";
import useClickOutside from "../hooks/useClickOutside";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL;

interface ProfileDropdownProps {
  onClose: () => void;
}
const ProfileDropdown = ({onClose}:ProfileDropdownProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {user} = useSelector((state:RootState)=>state.auth)
  const [appear, setAppear] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null)
  const handleSignOut = async()=>{
    console.log('signpout')
    try{
      const res = await fetch(`${API_BASE_URL}/api/user/signout`, {
        method: 'POST',
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signoutSuccess())
      }


    }catch(err   ){
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('An unknown error occurred.');
      }
    }
  }

  useClickOutside({
    ref: dropdownRef,
    callback: onClose,
  });
  useEffect(() => {
    setAppear(true);
  }, []);
  return (
    <div ref={dropdownRef}
      className={` ${
        appear ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } transition-all duration-300 delay-200 absolute -right-8 top-full z-10 mt-3 w-screen max-w-xs rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5 min-h-20 overflow-hidden`}
    >
      <div className="flex flex-col items-center">
        <ProfilePic size="lg" styleClass="mb-2" picSrc={user?.profilePicture} />
        <p className="text-lg font-semibold capitalize">{ user ? user.username : 'Guest User'}</p>
        { user?.email &&
        <p className="text-sm text-gray-400">{user.email}</p>
        }
        <div className="flex gap-4 my-3">
          <CircleButton size="md" handleClick={() => navigate("/signin")}>
            <FiLock size={14} />
          </CircleButton>
          <CircleButton size="md" handleClick={() => navigate("/signin")}>
            <FiSettings size={14} />
          </CircleButton>
          <CircleButton size="md" handleClick={() => navigate("/signin")}>
            <FiLogOut size={14} />
          </CircleButton>
        </div>
      </div>
      <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
        <button className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
          Profile
        </button>
        <button onClick={handleSignOut} className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
          Signout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
