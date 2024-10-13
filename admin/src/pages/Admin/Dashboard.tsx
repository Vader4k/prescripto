import { assets } from "../../assets/assets";
import DashboardCard from "../../components/DashboardCard";
import { useAdminContext } from "../../hooks/useAllContext";
import { useEffect } from "react";
import AppointmentCard from "../../components/AppointmentCard";

const Dashboard: React.FC = () => {
  const { dashboardData, getDashboardData, aToken } = useAdminContext();

  useEffect(() => {
    getDashboardData();
  }, [aToken, getDashboardData]);

  return (
    dashboardData && (
      <div className="max-w-6xl m-5">
        <div className="flex flex-wrap gap-3 ">
          <DashboardCard
            data={dashboardData.doctors}
            image={assets.doctor_icon}
            text="Doctors"
          />
          <DashboardCard
            data={dashboardData.appointments}
            image={assets.appointments_icon}
            text="Appointments"
          />
          <DashboardCard
            data={dashboardData.patients}
            image={assets.patients_icon}
            text="Patients"
          />
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="list_icon" />
            <p>Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashboardData.latestAppointments.map((item) => (
              <AppointmentCard
                key={item._id}
                docData={item.docData}
                cancelled={item.cancelled}
                _id={item._id}
                slotDate={item.slotDate}
                payment={item.payment}
                isCompleted={item.isCompleted}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
