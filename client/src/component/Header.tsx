import { BiShapeSquare } from "react-icons/bi";
import { Link } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import ProfilePic from "./ui/ProfilePic";
import { FiChevronDown,  } from "react-icons/fi";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "./ui/ThemeToggle";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Header = () => {
  const [showUserFlyout, setShowUserFlyout] = useState(false);
  const {user} = useSelector((state:RootState)=>state.auth)
  const handleUserMenu = () => {
    setShowUserFlyout(!showUserFlyout);
    setTimeout(()=>{
    },1000)
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-primary-500/50 border-b-1">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto px-5 py-2 ">
        <Link
          to="/"
          className="flex space-x-2 gap-2 items-center text-xl uppercase "
        >
          <BiShapeSquare size={32} /> Connexs
        </Link>

        <div className="ml-auto flex gap-8">
          <NavigationMenu />
          <ThemeToggle/>
          { user && 

            <button
            className="hidden md:flex relative  items-center gap-x-1 "
            onClick={handleUserMenu}
            >

              <ProfilePic size="sm" picSrc={user.profilePicture} />
            <FiChevronDown size={14} />
            {showUserFlyout && (
              <ProfileDropdown onClose={()=>setShowUserFlyout(false)}/>
            )}
          </button>
          
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
