import { assets } from "../../assets/assets";
import DashboardCard from "../../components/DashboardCard";
import { useAdminContext } from "../../hooks/useAllContext";
import { useEffect } from "react";

const Dashboard: React.FC = () => {
  const { dashboardData, getDashboardData, aToken } = useAdminContext();

  useEffect(() => {
    getDashboardData();
  }, [aToken, getDashboardData]);


  return (
    dashboardData && (
      <div className="m-5 ">
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
      </div>
    )
  );
};

export default Dashboard;
