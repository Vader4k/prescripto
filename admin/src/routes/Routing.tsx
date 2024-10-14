import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import DoctorsList from "../pages/Admin/DoctorsList";
import AllAppointment from "../pages/Admin/AllAppointment";
import AddDoctor from "../pages/Admin/AddDoctor";
import DoctorDashboard from "../pages/Doctor/DoctorDashboard";
import DoctorAppointment from "../pages/Doctor/DoctorAppointment";
import DoctorProfile from "../pages/Doctor/DoctorProfile";

const Routing:React.FC = () => {
  return (
    <div>
      <Routes>
        {/* admin routes */}
        <Route path="/" element={<></>} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/doctor-list" element={<DoctorsList />} />
        <Route path="/all-appointments" element={<AllAppointment />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        {/* doctor routes */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />}/>
        <Route path="/doctor-appointment" element={<DoctorAppointment/>} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
      </Routes>
    </div>
  )
}

export default Routing
