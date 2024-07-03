import { useState } from "react";

import { NavLink, useLocation } from "react-router-dom";

import MobileMenu from "./MobileMenu";
import { FiAlignLeft } from "react-icons/fi";

const NavigationMenu = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuItems = [
    {
      label: "Home",
      path: "/",
    },
    {
        label: "Resources",
        path: "/resources",
      },
      {
        label: "Teams",
        path: "/teams",
      },
    {
      label: "Signin",
      path: "/signin",
    },
    {
      label: "Add User",
      path: "/adduser",
    },
    
  ];
  const handleCloseClick = () => {
    // Delay setting isMobileMenuOpen to false by 1000 milliseconds (1 second)
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 200);
  };

  return (
    <nav className="flex items-center justify-center grow">
      <ul className=" hidden md:flex space-x-12">
        {menuItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.path}
              className={`${
                location.pathname === item.path
                  ? "font-semibold"
                  : "font-normal"
              } px-2  transition duration-300 ease-in-out`}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        className="md:hidden" type="button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FiAlignLeft size={24} />
      </button>
      {isMobileMenuOpen && (
        <MobileMenu handleCloseClick={handleCloseClick}></MobileMenu>
      )}
    </nav>
  );
};

export default NavigationMenu;
