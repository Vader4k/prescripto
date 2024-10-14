import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useAppContext, useDoctorContext } from "../../hooks/useAllContext";
import { useEffect } from "react";
import axios from "axios";

const DoctorAppointment: React.FC = () => {
  const { dToken, getAppointments, appointments, baseUrl } = useDoctorContext();
  const { calculateAge } = useAppContext();

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken, getAppointments]);

  const cancelAppointment = async (appId: string) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/doctor/cancel-appointment`,
        { appId },
        {
          headers: { dToken },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const completeAppointment = async (appId: string) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/doctor/complete-appointment`,
        { appId },
        {
          headers: { dToken },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="text-sm bg-white border rounded max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="grid max-sm:hidden grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 transition-all"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="rounded-full size-8"
                src={item.userData.image}
                alt={item.userData.name + "image"}
              />
              <p className="capitalize">{item.userData.name}</p>
            </div>
            <div>
              <p className="inline px-2 text-xs border rounded-full border-primary">
                {item.payment ? "Online" : "CASH"}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {item.slotDate}, {item.slotTime}
            </p>
            <p>${item.amount}</p>
            <div>
              {item.cancelled == false &&
                item.payment == false &&
                item.isCompleted == false && (
                  <button onClick={() => cancelAppointment(item._id)}>
                    <img
                      className="w-10"
                      src={assets.cancel_icon}
                      alt="cancel_icon"
                    />
                  </button>
                )}
              {item.cancelled && (
                <p className="text-sm text-red-300">Cancelled</p>
              )}
              {item.payment && <p className="text-sm text-green-300">Paid</p>}
              {item.isCompleted === false && item.cancelled === false && (
                <button onClick={()=> completeAppointment(item._id)}>
                  <img
                    src={assets.tick_icon}
                    alt="tick_icon"
                    className="w-10"
                  />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
