import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAdminContext } from "../hooks/useAllContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { aToken, setAToken } = useAdminContext();
  const dToken = localStorage.getItem("dToken");

  const handleLogout = () => {
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      localStorage.removeItem("dToken");
    }
    navigate("/")
  };

  return (
    <div className="flex items-center justify-between p-5 bg-white border-b">
      <div className="flex items-center gap-2 text-xs">
        <img className="cursor-pointer w-36" src={assets.admin_logo} alt="" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-600">
          {aToken && "Admin"} {dToken && "Doctor"}{" "}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="px-10 py-2 text-sm text-white rounded-full bg-primary"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
