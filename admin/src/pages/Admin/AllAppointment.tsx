import { useEffect } from "react";
import { useAdminContext } from "../../hooks/useAllContext";
import { useAppContext } from "../../hooks/useAllContext";
import { assets } from "../../assets/assets";

const AllAppointment: React.FC = () => {
  const { aToken, getAllAppointments, appointments } = useAdminContext();
  const { calculateAge } = useAppContext();

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);


  return (
    <div className="w-full max-w-6xl m-5">
      <h1 className="mb-3 text-lg font-medium">All Appointments</h1>
      <div className="text-sm bg-white border rounded max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, i) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500  py-3 px-6 border-b hover:bg-gray-200 transition-all"
            key={item._id}
          >
            <p className="max-sm:hidden">{i + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="rounded-full size-8"
                src={item.userData.image}
                alt={item.userData.name + "image"}
              />
              <p className="capitalize">{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(item.userData.dob.toString())}
            </p>
            <p>
              {item.slotDate}, {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="bg-gray-200 rounded-full size-8"
                src={item.docData.image}
                alt={item.docData.name + "image"}
              />
              <p className="capitalize">{item.docData.name}</p>
            </div>
            <p>${item.docData.fees}</p>
            {item.cancelled == false && item.payment == false && item.isCompleted == false && (
              <button>
                <img
                  className="w-10"
                  src={assets.cancel_icon}
                  alt="cancel_icon"
                />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointment;
