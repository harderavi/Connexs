import React, { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";
import { MdClear } from "react-icons/md";
import ProfilePic from "./ui/ProfilePic";
import CircleButton from "./ui/ButtonCircular";
import { FiLock, FiLogOut, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
interface MobileMenuProps {
  handleCloseClick: () => void;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ handleCloseClick }) => {
  const navigate = useNavigate();
  const [appear, setAppear] = useState(false);
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
  ];
  useEffect(() => {
    setAppear(true);
  }, []);

  return (
    <div
      className={`bg-white/70 absolute left-0 top-0 overflow-hidden transition-all duration-300 ${
        appear ? "  backdrop-blur-md" : "  backdrop-blur-0 "
      }`}
    >
      <div
        className={`md:hidden w-screen   bg-white transition-all duration-200 ${
          appear ? " translate-x-0" : " translate-x-[100%]"
        }`}
      >
        <div className="flex justify-between p-5">
          <BrandLogo />{" "}
          <span
            onClick={() => {
              handleCloseClick();
              setAppear(false);
            }}
          >
            <MdClear size={24} />
          </span>
        </div>
        <div className="flex flex-col items-center">
          <ProfilePic size="lg" styleClass="mb-2" />
          <p className="text-lg font-semibold">Ravi Harde</p>
          <div className="flex gap-4">
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
        <ul className="flex flex-col gap-5 text-xl p-5 ">
          {menuItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? "font-semibold"
                    : "font-normal"
                } text-gray-800 hover:text-gray-900 transition duration-300 ease-in-out`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
