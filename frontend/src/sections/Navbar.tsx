import { assets } from "../assets/assets_frontend/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import NavDropDown from "../components/NavDropDown";
import useClickOutside from "../hooks/useClickOutside";
import { useUserContext } from "../hooks/useUserContext";

const Navbar: React.FC = () => {
  const navLinks = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Doctors", path: "/doctors" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
    []
  );

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);

  const { token, setToken, userData } = useUserContext();

  const dropdownRef = useClickOutside(() => {
    setShowMenu(false);
  });

  return (
    <header className="p-3 border-b border-gray-200">
      <div className="flex justify-between items-center px-4 md:px-6 lg:px-20 max-w-[1440px] mx-auto">
        <Link to="/">
          <img className="w-32 md:w-44" src={assets.logo} alt="Company logo" />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `
                    transition-all duration-300 font-medium py-1
                    ${
                      isActive
                        ? "text-primary border-b-2 border-primary"
                        : "text-black"
                    }
                  `}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="relative flex items-center gap-2">
          {token && userData ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="flex items-center w-full gap-4 cursor-pointer group"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={userData.image}
                  alt="Profile"
                />
                <img
                  className="w-2.5"
                  src={assets.dropdown_icon}
                  alt="Arrow down"
                />
              </button>
              {showMenu && (
                <NavDropDown setShowMenu={setShowMenu} setToken={setToken} />
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="nav__btn"
              aria-label="Create account"
            >
              Create account
            </button>
          )}
          <button
            onClick={() => setShowNav(true)}
            className="w-6 h-6 md:hidden"
            aria-label="Open menu"
          >
            <img src={assets.menu_icon} alt="menu" />
          </button>
          <div
            className={`fixed z-[20] md:hidden inset-0 bg-white transition-all duration-500 ease-in-out ${
              showNav ? "opacity-100 visible w-screen" : "opacity-0 invisible"
            }`}
          >
            <div className="flex items-center justify-between p-4">
              <img className="w-36" src={assets.logo} alt="logo" />
              <button onClick={() => setShowNav(false)}>
                <img
                  src={assets.cross_icon}
                  className="w-7 h-7"
                  alt="close_icon"
                />
              </button>
            </div>
            <ul className="flex flex-col gap-3 p-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={() => setShowNav(false)}
                    className={({ isActive }) => `
                      block py-2 px-2 transition-colors duration-300 text-2xl font-medium
                      ${isActive ? "text-primary" : "text-black"}
                    `}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
