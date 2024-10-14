import { NavLink } from "react-router-dom";
import { useAdminContext, useDoctorContext } from "../hooks/useAllContext";
import { assets } from "../assets/assets";

// Define an array of navigation links
const adminLinks = [
  {
    to: "/admin-dashboard",
    icon: assets.home_icon,
    label: "Dashboard",
  },
  {
    to: "/all-appointments",
    icon: assets.appointment_icon,
    label: "Appointments",
  },
  {
    to: "/add-doctor",
    icon: assets.add_icon,
    label: "Add Doctor",
  },
  {
    to: "/doctor-list",
    icon: assets.people_icon,
    label: "Doctors List",
  },
];

const doctorLinks = [
  {
    to: "/doctor-dashboard",
    icon: assets.home_icon,
    label: "Dashboard",
  },
  {
    to: "/doctor-appointment",
    icon: assets.appointment_icon,
    label: "Appointments",
  },
  {
    to: "/doctor-profile",
    icon: assets.people_icon,
    label: "Profile",
  },
];

const Sidebar = () => {
  const { aToken } = useAdminContext();
  const { dToken } = useDoctorContext();
  
  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5 flex flex-col gap-2">
          {adminLinks.map((link) => (
            <NavLink className={({isActive}) => `flex items-ceter gap-3 px-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} key={link.to} to={link.to}>
              <img src={link.icon} alt={`${link.label} icon`} />
              <p className="hidden md:block">{link.label}</p>
            </NavLink>
          ))}
        </ul>
      )}
      {dToken && (
        <ul className="text-[#515151] mt-5 flex flex-col gap-2">
        {doctorLinks.map((link) => (
          <NavLink className={({isActive}) => `flex items-ceter gap-3 px-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} key={link.to} to={link.to}>
            <img src={link.icon} alt={`${link.label} icon`} />
            <p className="hidden md:block">{link.label}</p>
          </NavLink>
        ))}
      </ul>
      )}
    </div>
  );
};

export default Sidebar;
