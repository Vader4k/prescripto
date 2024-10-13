import { IAppointment } from "../context/AdminContext";
import axios from "axios";
import { assets } from "../assets/assets";
import { useAdminContext } from "../hooks/useAllContext";
import { toast } from "react-toastify";

type AppointmentCardProps = Pick<
  IAppointment,
  "_id" | "docData" | "slotDate" | "cancelled" | "payment" | "isCompleted"
>;

const AppointmentCard = ({
  docData,
  cancelled,
  _id,
  slotDate,
  payment,
  isCompleted,
}: AppointmentCardProps) => {
  const { baseUrl, aToken, getAllAppointments } = useAdminContext();

  const cancelAppointment = async (appId: string) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/admin/cancel-appointment`,
        { appId },
        {
          headers: { aToken },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllAppointments();
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
    <div className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100">
      <img
        className="rounded-full size-10"
        src={docData.image}
        alt={docData.name + "_image"}
      />
      <div className="flex-1 text-sm">
        <p className="font-medium text-gray-800">{docData.name}</p>
        <p className="text-gray-600">{slotDate}</p>
      </div>
      {cancelled == false && payment == false && isCompleted == false && (
        <button onClick={() => cancelAppointment(_id)}>
          <img className="w-10" src={assets.cancel_icon} alt="cancel_icon" />
        </button>
      )}
      {cancelled && <p className="text-sm text-red-300">Cancelled</p>}
      {payment && <p className="text-sm text-green-300">Paid</p>}
    </div>
  );
};

export default AppointmentCard;
