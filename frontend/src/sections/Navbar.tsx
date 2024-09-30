import { assets } from "../assets/assets_frontend/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavDropDown from "../components/NavDropDown";
import useClickOutside from "../hooks/useClickOutside";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Doctors", path: "/doctors" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  const dropdownRef = useClickOutside(() => {
    setShowMenu(false);
  });

  return (
    <header className="p-3 border-b border-gray-200">
      <div className="flex justify-between items-center px-4 md:px-6 lg:px-20 max-w-[1440px] mx-auto">
        <Link to="/">
          <img className="w-44" src={assets.logo} alt="Company logo" />
        </Link>
        <nav>
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
        <div>
          {token ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="flex items-center w-full gap-4 cursor-pointer group"
              >
                <img
                  className="w-8 rounded-full"
                  src={assets.profile_pic}
                  alt="Profile"
                />
                <img
                  className="w-2.5"
                  src={assets.dropdown_icon}
                  alt="Arrow down"
                />
              </button>
              {showMenu && <NavDropDown setShowMenu={setShowMenu} setToken={setToken}/>}
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
