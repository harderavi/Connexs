import { BiShapeSquare } from "react-icons/bi";
import { Link } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import ProfilePic from "./ui/ProfilePic";
import { FiChevronDown,  } from "react-icons/fi";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  const [showUserFlyout, setShowUserFlyout] = useState(false);
  const handleUserMenu = () => {
    setShowUserFlyout(!showUserFlyout);
  };
  return (
    <header className="border border-slate-200">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto px-5 py-2">
        <Link
          to="/"
          className="flex space-x-2 gap-2 items-center text-xl uppercase "
        >
          <BiShapeSquare size={32} /> Connexs
        </Link>

        <div className="ml-auto flex gap-4">
          <NavigationMenu />
          <button
            className="hidden md:flex relative  items-center gap-x-1 "
            onClick={handleUserMenu}
          >
            <ProfilePic size="sm" />
            <FiChevronDown size={14} />
            {showUserFlyout && (
              <ProfileDropdown />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
