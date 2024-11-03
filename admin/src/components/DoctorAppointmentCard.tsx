import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useDoctorContext } from "../hooks/useAllContext";
import { IAppointment } from "../context/AdminContext";

type AppointmentCardProps = Pick<
  IAppointment,
  "_id" | "userData" | "slotDate" | "cancelled" | "payment" | "isCompleted"
>;

const DoctorAppointmentCard = ({
  _id,
  userData,
  slotDate,
  cancelled,
  payment,
  isCompleted,
}: AppointmentCardProps) => {
  const { getDashData, baseUrl, dToken } = useDoctorContext();

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
        getDashData();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const canCancel = !cancelled && !payment && !isCompleted;

  return (
    <div className="flex gap-3 items-center px-6 py-3 hover:bg-gray-100">
      <img
        className="rounded-full size-10"
        src={userData.image}
        alt={userData.name + "_image"}
      />
      <div className="flex-1 text-sm">
        <p className="font-medium text-gray-800">{userData.name}</p>
        <p className="text-gray-600">{slotDate}</p>
      </div>
      {canCancel && (
        <button onClick={() => cancelAppointment(_id)}>
          <img className="w-10" src={assets.cancel_icon} alt="cancel_icon" />
        </button>
      )}
      {cancelled && <p className="text-sm text-red-300">Cancelled</p>}
      {payment && <p className="text-sm text-green-300">Paid</p>}
    </div>
  );
};

export default DoctorAppointmentCard;
