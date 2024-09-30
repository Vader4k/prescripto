import { useNavigate } from "react-router-dom";

const navOptions = [
  {
    name: "My Profile",
    path: "/profile",
  },
  {
    name: "My Appointments",
    path: "/my-appointments",
  },
  {
    name: "Logout",
    path: "/auth",
  },
];

interface INavdropDown {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavDropDown = ({ setShowMenu, setToken }: INavdropDown) => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    if (path === "/auth") {
      setToken(false);
    }
    navigate(path);
    setShowMenu(false);
  };

  return (
    <div className="absolute top-12 left-0 w-48 p-4 bg-white rounded-lg shadow-lg">
      {navOptions.map((option) => (
        <button
          onClick={() => handleClick(option.path)}
          key={option.name}
          className="block p-2 hover:bg-gray-100 rounded-md w-full"
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default NavDropDown;
