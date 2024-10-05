import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import DoctorsList from "../pages/Admin/DoctorsList";
import AllAppointment from "../pages/Admin/AllAppointment";
import AddDoctor from "../pages/Admin/AddDoctor";

const Routing:React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/doctor-list" element={<DoctorsList />} />
        <Route path="/all-appointments" element={<AllAppointment />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
      </Routes>
    </div>
  )
}

export default Routing
